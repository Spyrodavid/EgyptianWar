var handscore = document.getElementById('handscore')
var deckscore = document.getElementById('deckscore')
var playersGame = document.getElementById('playersGame')
var playersLobby = document.getElementById('playersLobby')
var leaderboard = document.getElementById('leaderboard')

var alert = document.getElementById('alert')
function renderCard(deck)
{
	document.getElementById('deck').innerHTML = '';
	var card = document.createElement("div");
	var icon = '';
	var divsuit = document.createElement('div')
	//define icon
	if (deck.Value == "A" && deck.Suit == "spades"){
		divsuit.classList.add('aceofspades')
		icon = '♠';
	}
	else if (deck.Suit == 'hearts'){
	icon='♥';
	divsuit.classList.add("hearts")
	}
	else if (deck.Suit == 'spades'){
	icon = '♠';
	divsuit.classList.add("spades")
	}
	else if (deck.Suit == 'diamonds'){
	icon = '♦';
	divsuit.classList.add("diamonds")
	}
	else {
	icon = '♣';
	divsuit.classList.add("clubs")
	}
	
	divsuit.innerHTML = icon
	card.innerHTML = deck.Value 
	card.appendChild(divsuit)
	card.className = 'card';
	document.getElementById("deck").appendChild(card);
}

function updateScores(scores){
	handscore.innerHTML = "Cards in your hand: " + scores.hand
	deckscore.innerHTML = "Cards in the deck: " + scores.deck
	playersGame.innerHTML = "Players in Game: " + scores.playersGame
	playersLobby.innerHTML = "Players in Lobby: " + scores.playersLobby
	formatLeaderboard(scores.leaderboard)
}

function formatLeaderboard(ordering){
	while (leaderboard.firstChild) {
        leaderboard.removeChild(leaderboard.firstChild)
	}
	order = ordering[0]
	orderIdx = ordering[1]
	for (x=0; x < order.length; x++){
		guy = document.createElement('span')
		guy.innerHTML = order[x]+ "\n"
		if (x == orderIdx){
			guy.innerHTML = guy.innerHTML
			guy.classList.add('currentTurn')
		}
		leaderboard.appendChild(guy)
		leaderboard.appendChild(document.createElement('br'))
	}
}

document.addEventListener('keydown', function(event) {
    if(event.key == 'm') {
        slap();
    }
    if(event.key == 'z') {
        place();
    }
});

function disabled(msg) {
	let disable = document.createElement('div')
	disable.innerHTML = msg
	alert.appendChild(disable)
	setTimeout(() => {
		disable.remove()
	}, 3000);
}

