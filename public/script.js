var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = new Array();

function getDeck()
{
	var deck = new Array();

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

function shuffle()
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

	renderDeck(deck);
}

function renderDeck(deck)
{
	document.getElementById('deck').innerHTML = '';
	console.log(deck)
	for(var i = 0; i < deck.length; i++)
	{
		var card = document.createElement("div");
		var icon = '';
		var divsuit = document.createElement('div')
		//define icon
		if (deck[i].Value == "A" && deck[i].Suit == "spades"){
			divsuit.classList.add('aceofspades')
			icon = '♠';
		}
		else if (deck[i].Suit == 'hearts'){
		icon='♥';
		divsuit.classList.add("hearts")
		}
		else if (deck[i].Suit == 'spades'){
		icon = '♠';
		divsuit.classList.add("spades")
		}
		else if (deck[i].Suit == 'diamonds'){
		icon = '♦';
		divsuit.classList.add("diamonds")
		}
		else {
		icon = '♣';
		divsuit.classList.add("clubs")
		}
		
		divsuit.innerHTML = icon
		card.innerHTML = deck[i].Value 
		card.appendChild(divsuit)
		card.className = 'card';
	document.getElementById("deck").appendChild(card);
	}
}

deck = getDeck();
shuffle(deck);

