import * as el from './elements.js'
import state from './state.js'
import * as sound from './events-sounds.js'

export function countdown() {
    clearTimeout(state.countdownId)
    if(!state.isRunning) {
        return
    }
    
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)
    
    seconds--

    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if(minutes < 0) {
        reset()
        //kitchenTimer.play()
        return
    }

    updateDisplay(minutes, seconds)



    state.countdownId = setTimeout(() => countdown(), 1000)
}

export function updateDisplay (minutes, seconds) {
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
}


el.btnPlay.addEventListener('click', (event) => {
    state.isRunning = document.documentElement.classList.toggle('running')
    countdown()
})

el.btnStop.addEventListener('click', (event) => {
    state.isRunning = false
    state.isRunning = document.documentElement.classList.remove('running')
})

el.btnSetTimerUp.addEventListener('click', (event) => {
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    minutes = minutes + 5
    if (minutes > 60){
        minutes = 60
    }

    updateDisplay(minutes, seconds)
})

el.btnSetTimerDown.addEventListener('click', (event) => {
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    minutes = minutes - 5
    if (minutes <= 0) {
        minutes = 5
    }
    updateDisplay(minutes, seconds)
})

function verifySound(elementSound) {
    
    if(state.isMute === false){
        el.btnForest.classList.remove('sound-on')
        el.btnRain.classList.remove('sound-on')
        el.btnBakery.classList.remove('sound-on')
        el.btnFlame.classList.remove('sound-on')
        sound.forest.pause()
        sound.rain.pause()
        sound.bakery.pause()
        sound.flame.pause()
        state.isMute = true
    }else if (elementSound == 'forest' && state.isMute === true) {
        sound.forest.play()
        el.btnForest.classList.add('sound-on')
        state.isMute = false
        
    }else if (elementSound == 'rain' && state.isMute === true){
        sound.rain.play()
        el.btnRain.classList.add('sound-on')
        state.isMute = false
    }else if (elementSound == 'bakery' && state.isMute === true){
        sound.bakery.play()
        el.btnBakery.classList.add('sound-on')
        state.isMute = false
    }else if (elementSound == 'flame' && state.isMute === true) {
        sound.flame.play()
        el.btnFlame.classList.add('sound-on')
        state.isMute = false
    }
    
}

el.btnForest.addEventListener('click', (event) => {   
    el.btnForest.even
    
    verifySound('forest')
})

el.btnRain.addEventListener('click', (event) => {   
    verifySound('rain')
})

el.btnBakery.addEventListener('click', (event) => {   
    verifySound('bakery')
})

el.btnFlame.addEventListener('click', (event) => {   
    verifySound('flame')
})