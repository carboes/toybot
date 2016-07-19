import ToyBot from './toybot'
import * as Errors from './errors'
import prompt from 'prompt'

var loadPrompt = (toyBot = null) => {
	prompt.get(['command'], function (err, result) {
        try {
			toyBot = ToyBot.processCommand(result.command, toyBot)
		}
        catch (err) {
			console.error(err)
		}
        finally {
    		if (result.command != 'q') {
    			loadPrompt(toyBot)
    		}
        }
	});
}

var init = () => {
	console.log('Welcome to Toy Robot Simulator.')
	console.log('To start type PLACE x,y,direction where: x and y are numbers between 0 and 5, and direction is NORTH,SOUTH,EAST,WEST')
	console.log('Other commands are MOVE, LEFT, RIGHT, REPORT')
	console.log('To quit at anytime just press q and enter')
	prompt.start()
	loadPrompt()
}

init()
