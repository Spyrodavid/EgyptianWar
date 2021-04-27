const socket = io()

socket.on('joinGame', user =>{
})

socket.on('renderCard', card =>{
    renderCard(card)
})

socket.on('updateScores', scores =>{
    updateScores(scores)
    console.log(scores)
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
    socket.emit('slap', socket.id)
}

function place(){
	socket.emit('place', socket.id)
}