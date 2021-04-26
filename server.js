const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var users = new Object
var order = new Array

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'))

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

io.on('connection', socket=> {
	io.emit('renderCard', {'Value':'A','Suit': 'spades'})
	var user = new Object
	user['dead'] = false
	user['turn'] = false
	user['deck'] = []
    users[socket.id] = user
	console.log(users)

	socket.on('slap',(socket)=>{
		trySlapCard(socket.id)
	})
	socket.on('place',(socket)=>{
		tryPlaceCard(socket.id)
	})
    socket.on('disconnect', (socket)=> {
        getUsers().then((ids)=>{
			for(user of Object.keys(users)){
				if (!ids.has(user)){
					delete users[user]				
			}}
		})
    })
})



async function getUsers(socket) {
    return await io.allSockets()
}


setInterval(()=>{console.log(users)}, 1000)
//Game Logic
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = new Array();

const cancelInterval = setInterval(startGame, 1000)

function startGame() {
	if (Object.keys(users).length>1){
		dealCards(shuffle(getDeck()))
		clearInterval(cancelInterval)
		updateScore()
	}
}

function getDeck()
{
	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < cards.length; x++)
		{
			var card = {Value: cards[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
	return deck
}
//setInterval(dealCards,1000, deck)
function dealCards(deck){
		var deckLen = deck.length
		var usersLen = Object.keys(users).length
		var jump = Math.floor(deckLen/usersLen)
		var key = Object.keys(users)
		for (var i = 0; i < usersLen; i++){
			for (var x = 0; x < jump; x++){
				users[key[i]]['deck'].push(deck.pop())
			}
		}
}

function tryPlaceCard(id){
	if (users[id]['dead'] == true){
		io.to(id).emit('placeDisabled', 'You can not place; You are dead')
		return
	}

	if (users[id]['turn'] == false){ 
		io.to(id).emit('placeDisabled', 'You can not place; It is not your turn')
		return
	}
	else {
		deck.unshift(users[id]['deck'].pop())
		io.emit('renderCard', deck[0] )
	}
}

function trySlapCard(id){
	if (users[id]['dead'] == true){
		io.to(id).emit('slapDisabled', 'You can not slap; You are dead')
		return
	}
	if (!slappable()) {
		deck.unshift(users[id]['deck'].pop())
		updateScore()
	}
	if (slappable()) {
		users[id]['deck'] = deck.concat(users[id]['deck'])
		deck = []
	}
}

function slappable(){
	let checkDeck = deck.slice(0,2)
	let checkValue = []
	for (card of checkDeck){
		if (card.Value == 'A' && card.Suit == 'spades'){
			return true
		}
	}
	for (card of checkDeck){
		checkValue.push(card.Value)
	}
	if (checkValue[0] == checkValue[2] || checkValue[0] == checkValue[1] ){
		return true
	}
	else {
		return false
	}
}


function updateScore(){
	for (user in Object.keys(users)){
		io.to(user).emit('updateScore', users[user]['deck'].length)
	}
}

startGame()
