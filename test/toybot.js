import assert from 'assert'
import ToyBot from '../lib/toybot.js'

describe('ToyBot', () => {

	it('a', done => {
		var toyBot = new ToyBot('0,0,NORTH')
		toyBot.move()
		assert.equal(toyBot.toString(),'0,1,NORTH')
		done()
	})

	it('b', done => {
		var toyBot = new ToyBot('0,0,NORTH')
		toyBot.left()
		assert.equal(toyBot.toString(),'0,0,WEST')
		done()
	})

	it('c', done => {
		var toyBot = new ToyBot('1,2,EAST')
		toyBot.move()
		toyBot.move()
		toyBot.left()
		toyBot.move()
		assert.equal(toyBot.toString(),'3,3,NORTH')
		done()
	})

	it('Rotate left', done => {
		var toyBot = new ToyBot('1,2,EAST')
		toyBot.left()
		assert.equal(toyBot.toString(),'1,2,NORTH')
		done()
	})

	it('Rotate right', done => {
		var toyBot = new ToyBot('1,2,EAST')
		toyBot.left()
		assert.equal(toyBot.toString(),'1,2,SOUTH')
		done()
	})

	it('Rotate right', done => {
		var toyBot = new ToyBot('1,2,EAST')
		toyBot.move()
		assert.equal(toyBot.toString(),'1,3,EAST')
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
	
})