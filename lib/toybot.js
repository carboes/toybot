import * as Errors from './errors'
import * as Constants from './constants'

export default class ToyBot {

	constructor(args) {
	 	var argSplit = args.split(',')
	 	if (argSplit.length != 3) {
	 		throw Errors.INVALID_PLACE_ARGUMENTS
	 	}

	 	var x = parseInt(argSplit[0])
	 	var y = parseInt(argSplit[1])
	 	var direction = argSplit[2].toUpperCase()

	 	this.place(x, y, direction)
	}

	place (x, y, direction) {
		if (isNaN(x) || x < Constants.MIN_X_VALUE || x > Constants.MAX_X_VALUE ) {
	 		throw Errors.INVALID_X_COORDINATE_VALUE
	 	}
	 	if (isNaN(y) || y < Constants.MIN_Y_VALUE || y > Constants.MAX_Y_VALUE ) {
	 		throw Errors.INVALID_Y_COORDINATE_VALUE
	 	}

	 	if (Constants.DIRECTIONS.indexOf(direction) === -1) {
	 		throw Errors.INVALID_DIRECTION_VALUE
	 	}
	 	
	 	this._x = x
	 	this._y = y
	 	this._direction = direction
	}

	move () {
		switch(this._direction) {
			case 'NORTH':
				if (this._y !== Constants.MAX_Y_VALUE) {
					this._y++
				}
				break
			case 'SOUTH':
				if (this._y !== Constants.MIN_Y_VALUE) {
					this._y--
				}
				break
			case 'EAST':
				if (this._x !== Constants.MAX_X_VALUE) {
					this._x++
				}
				break
			case 'WEST':
				if (this._x !== Constants.MIN_X_VALUE) {
					this._x--
				}
				break
		}
	}

	left () {
		switch(this._direction) {
			case 'NORTH':
				this._direction = 'WEST'
				break
			case 'SOUTH':
				this._direction = 'EAST'
				break
			case 'EAST':
				this._direction = 'NORTH'
				break
			case 'WEST':
				this._direction = 'SOUTH'
				break
		}
	}

	right () {
		switch(this._direction) {
			case 'NORTH':
				this._direction = 'EAST'
				break
			case 'SOUTH':
				this._direction = 'WEST'
				break
			case 'EAST':
				this._direction = 'SOUTH'
				break
			case 'WEST':
				this._direction = 'NORTH'
				break
		}
	}

	toString() {
		return `${this._x},${this._y},${this._direction}`
	}

	report (logger = null) {
		if (!logger) {
			logger = console
		}
		logger.log(this.toString())
	}

    static processCommand (command, toyBot = null, logger = null) {
        var commandSplit = command.split(' ')
        var mainCommand = commandSplit[0].toUpperCase()
        var args = commandSplit[1]

        //ToyBoy class must be instantiated using PLACE command
        if (!toyBot && mainCommand !== 'PLACE') {
            throw Errors.INVALID_FIRST_COMMAND
        }

        switch(mainCommand) {
            case 'PLACE':
                toyBot = new ToyBot(args)
                break
            case 'MOVE':
                toyBot.move()
                break
            case 'LEFT':
                toyBot.left()
                break
            case 'RIGHT':
                toyBot.right()
                break
            case 'REPORT':
                toyBot.report(logger)
                break
            default:
                throw Errors.INVALID_COMMAND
                break
        }

        return toyBot
    }

}