var handscore = document.getElementById('handscore')
var deckscore = document.getElementById('deckscore')
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
	alert.innerHTML = msg
	setTimeout(() => {
		alert.innerHTML = ''
	}, 3000);
}

