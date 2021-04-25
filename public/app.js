const socket = io()

socket.on('joinGame', user =>{
    console.log(user)
})

socket.on('renderCard', msg =>{
    renderCard(msg)
})