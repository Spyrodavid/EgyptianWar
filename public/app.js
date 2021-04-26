const socket = io()

socket.on('joinGame', user =>{
    console.log(user)
})

socket.on('renderCard', card =>{
    renderCard(card)
})

socket.on('updateScore', score =>{
    updateScore(score)
})

socket.on('gameOver', state =>{
    gameOver(state)
})

socket.on('slapDisabled', msg =>{
    disabled(msg)
})

socket.on('placeDisabled', msg =>{
    disabled(msg)
})

function slap(){
    socket.emit('slap')
}

function place(){
	socket.emit('place')
}