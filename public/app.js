const socket = io()

socket.on('joinGame', user =>{
    console.log(user)
})