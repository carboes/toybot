import assert from 'assert'
import ToyBot from '../lib/toybot.js'

var latestMockLog = ''
var mockConsole = {
    log: (str) => {
        latestMockLog = str
    },
    output: () => {
        return latestMockLog
    }
}

describe('ToyBot tests', () => {

    it('Rotate left', done => {
        var toyBot = new ToyBot('1,2,EAST')
        toyBot.left()
        assert.equal(toyBot.toString(),'1,2,NORTH')
        done()
    })

    it('Rotate right', done => {
        var toyBot = new ToyBot('1,2,EAST')
        toyBot.right()
        assert.equal(toyBot.toString(),'1,2,SOUTH')
        done()
    })

    it('Move', done => {
        var toyBot = new ToyBot('1,2,EAST')
        toyBot.move()
        assert.equal(toyBot.toString(),'2,2,EAST')
        done()
    })

    it('Max bound north', done => {
        var toyBot = new ToyBot('5,5,NORTH')
        toyBot.move()
        assert.equal(toyBot.toString(),'5,5,NORTH')
        done()
    })

    it('Min bound south', done => {
        var toyBot = new ToyBot('5,0,SOUTH')
        toyBot.move()
        assert.equal(toyBot.toString(),'5,0,SOUTH')
        done()
    })

    it('Max bound east', done => {
        var toyBot = new ToyBot('5,5,EAST')
        toyBot.move()
        assert.equal(toyBot.toString(),'5,5,EAST')
        done()
    })

    it('Min bound west', done => {
        var toyBot = new ToyBot('0,5,WEST')
        toyBot.move()
        assert.equal(toyBot.toString(),'0,5,WEST')
        done()
    })


    it('First command not placed', done => {
        var error
        try {
            ToyBot.processCommand('TEST', null)
        }
        catch (err) {
            error = err
        }
        assert.equal(error, 'First command must be: PLACE x,y,DIRECTION')
        done()
    })

    it('First command placed', done => {
        var toyBot = ToyBot.processCommand('PLACE 1,2,NORTH', null)
        assert.equal(toyBot.toString(),'1,2,NORTH')
        done()
    })

    it('First command placed out of bounds', done => {
        var error
        try {
            ToyBot.processCommand('PLACE 1,6,NORTH', null)
        }
        catch (err) {
            error = err
        }
        assert.equal(error, 'Invalid y co-ordinate.  Must be an integer between 0 and 5.')
        done()
    })

    it('Invalid place direction', done => {
        var error
        try {
            ToyBot.processCommand('PLACE 1,3,TEST', null)
        }
        catch (err) {
            error = err
        }
        assert.equal(error, 'Invalid direction: Must be one of NORTH, SOUTH, EAST, WEST')
        done()
    })

    it('Integration a - MOVE', done => {
        var toyBot = ToyBot.processCommand('PLACE 0,0,NORTH', null)
        toyBot = ToyBot.processCommand('MOVE', toyBot, mockConsole)
        toyBot = ToyBot.processCommand('REPORT', toyBot, mockConsole)
        assert.equal(mockConsole.output(),'0,1,NORTH')
        done()
    })

    it('Integration b - LEFT', done => {
        var toyBot = ToyBot.processCommand('PLACE 0,0,NORTH', null)
        toyBot = ToyBot.processCommand('LEFT', toyBot, mockConsole)
        toyBot = ToyBot.processCommand('REPORT', toyBot, mockConsole)
        assert.equal(mockConsole.output(),'0,0,WEST')
        done()
    })

    it('Integration c - MOVE & LEFT', done => {
        var toyBot = ToyBot.processCommand('PLACE 1,2,EAST', null)
        toyBot = ToyBot.processCommand('MOVE', toyBot, mockConsole)
        toyBot = ToyBot.processCommand('MOVE', toyBot, mockConsole)
        toyBot = ToyBot.processCommand('LEFT', toyBot, mockConsole)
        toyBot = ToyBot.processCommand('MOVE', toyBot, mockConsole)
        toyBot = ToyBot.processCommand('REPORT', toyBot, mockConsole)
        assert.equal(mockConsole.output(),'3,3,NORTH')
        done()
    })

})