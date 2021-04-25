const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var id = 0
var users = new Array

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'))

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

io.on('connection', socket=> {
	io.emit('renderCard', {'Value':'A','Suit': 'spades'})
    users[socket.id] = ''
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

setInterval(()=>console.log(users),1000)
//Game Logic
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = new Array();

function startGame() {
    dealCards(shuffle(getDeck()))
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

function dealCards(deck){
    jump = Math.floor(deck.legnth/users.length)
	for(x=0;x<users.legnth;x+=1){
		deck.slice(x*jump, (x+1)*jump)
	}
}

startGame()