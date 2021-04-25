function renderCard(deck)
{
	document.getElementById('deck').innerHTML = '';
	console.log(deck)
	for(var i = 0; i < 1; i++)
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

