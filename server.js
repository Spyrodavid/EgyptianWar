const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var users = new Object
var order = new Array
var orderIdx = new Number

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'))

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

io.on('connection', socket=> {
	var user = new Object
	user['dead'] = false
	user['turn'] = false
	user['deck'] = []
    users[socket.id] = user

	socket.on('slap',(id)=>{
		trySlapCard(id)
	})
	socket.on('place',(id)=>{
		tryPlaceCard(id)
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


//Game Logic
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = new Array();

const cancelInterval = setInterval(startGame, 1000)

function startGame() {
	if (Object.keys(users).length>1){
		dealCards(shuffle(getDeck()))
		clearInterval(cancelInterval)
		updateScores()
		renderCard()
		setOrder()
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
		deck.unshift(users[id]['deck'].shift())
		nextTurn()
	}
	renderCard()
	updateScores()
	checkDeath()
}

function trySlapCard(id){
	if (users[id]['dead'] == true){
		io.to(id).emit('slapDisabled', 'You can not slap; You are dead')
	}
	else if (!slappable()) {
		deck.push(users[id]['deck'].shift())
	}
	else if (slappable()) {
		deck = deck.reverse()
		users[id]['deck'] = users[id]['deck'].concat(deck)
		deck = []
		setTurn(id)
	}
	updateScores()
	renderCard()
	checkDeath()
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
		checkValue.unshift(card.Value)
	}
	if (checkValue[0] == checkValue[2] || checkValue[0] == checkValue[1] ){
		return true
	}
	else {
		return false
	}
}


function updateScores(){
	for (user of Object.keys(users)){
		io.to(user).emit('updateScores', {hand : users[user]['deck'].length, deck : deck.length})
	}
}

function nextTurn(){
	orderIdx += 1
	if (!(orderIdx < order.length)){
	orderIdx=0
	}
	setTurn(order[orderIdx])
}

function setTurn(id){
	for (user in users){
		users[user].turn = false
	}
	users[id].turn = true
}

function setOrder(){
	for (user of Object.keys(users)){
		order.push(user)
	}
	users[order[0]].turn = true
}

function renderCard(){
	io.emit('renderCard', deck[0])
}

function checkDeath(){
	for (user in users){
		if(users[user].deck.length == 0){
			users[user].dead = true
		}
	}
}

function checkWin(){
	for (user in users){
		if(users[user].deck.length >= 52){
			users[user].dead = true
		}
	}
}
startGame()

setInterval(()=>console.log(users), 5000)