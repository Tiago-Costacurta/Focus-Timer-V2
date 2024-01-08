import { countdown, updateDisplay } from './events.js'
import state from './state.js'


export function start(minutes, seconds) {
    state.minutes = minutes
    state.seconds = seconds
    
    updateDisplay()
    
}