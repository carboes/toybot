import ToyBot from './toybot'
import * as Errors from './errors'
import prompt from 'prompt'

var toyBot = null

var loadPrompt = () => {
	prompt.get(['command'], function (err, result) {
		try {
			processCommand(result.command)
		} catch (err) {
			console.error(err)
		}
		if (result.command != 'q') {
			loadPrompt()
		}
	});
}

var processCommand = (command, toyBot) => {
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
			toyBot.report()
			break
		default:
			throw Errors.INVALID_COMMAND
			break
	}
}

var welcome = () {
	console.log('Welcome to Toy Robot Simulator.')
	console.log('To start type PLACE x,y,direction where: x and y are numbers between 0 and 5, and direction is NORTH,SOUTH,EAST,WEST')
	console.log('Other commands are MOVE, LEFT, RIGHT, REPORT')
	console.log('To quit at anytime just press q and enter')
	prompt.start()
	loadPrompt()
}

welcome()