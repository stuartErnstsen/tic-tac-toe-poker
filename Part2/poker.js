let idInput = document.getElementById('idInput');
let colorInput = document.getElementById('colorInput');
//Stores default data for deck suites such as suit name and color. Suit objects will track entire deck and every card in each suit so no duplicate cards are dealt out. 
const deck = [{ suitType: "diamonds", suitIcon: '♦', suitDeck: [], color: 'red' },
{ suitType: "hearts", suitIcon: '♥', suitDeck: [], color: 'red' },
{ suitType: "spades", suitIcon: '♠', suitDeck: [], color: 'black' },
{ suitType: "clubs", suitIcon: '♣', suitDeck: [], color: 'black' }];
//Default hand array of Card objects for reset; 
const defaultHand = [{ suitType: "diamonds", suitIcon: '♦', cardType: 'A', color: 'grey', default: true },
{ suitType: "hearts", suitIcon: '♥', cardType: 'A', color: 'grey', default: true },
{ suitType: "spades", suitIcon: '♠', cardType: 'A', color: 'grey', default: true },
{ suitType: "clubs", suitIcon: '♣', cardType: 'A', color: 'grey', default: true }];
const deckCardTypes = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
const deckCardLength = 13
const deckCardSuits = ['hearts', 'diamonds', 'spades', 'clubs']
const deckSuitLength = 4;
const deckHandLength = 4;
let cardCount = 0;

const setCard = () => {
    const card = document.getElementById(idInput.value);
    card.style.color = colorInput.value;
}

const setHand = () => {
    //Copy structure of default hand
    //Randomize properties of Card objects of newHand
    let newHand = [];
    defaultHand.map(item => newHand.push(Object.assign({}, item)));
    newHand = newHand.map((card, index) => {
        //Check if there are unused cards left in the deck to make new hand, if not deck will reset
        if (cardCount === 52) {
            shuffleDeck();
        }
        cardCount++;
        //Check if card is a duplicates before adding card to hand, will create a new card if card already is in the deck;
        while (!checkCard(card) || card.default) {
            card.suitType = randomSuit();
            card.cardType = randomCard();
            card.default = false;
        }
        //Change value for default card to false to indicate new card has been dealt;

        //Loop through default deck suit properties to get color/icon that matches with suit type. 
        deck.forEach(suit => {
            if (suit.suitType === card.suitType) {
                card.color = suit.color;
                card.suitIcon = suit.suitIcon;
            }
        });
        //Set properties to current card (0-4) on html elements
        //Attaching tempCard to corresponding card section on html
        const tempCard = document.getElementsByClassName(`card${index}`)
        //Setting color of entire element
        tempCard[0].style.color = card.color;
        //Attaching tempCardIcon to span tag inside section element to change icon on cards
        const tempCardIcon = document.getElementById(`cardSuit${index}`)
        tempCardIcon.innerText = card.suitIcon;
        //Attaching tempCardType to text spans of card type to change card type on cards displayed
        const tempCardType = document.getElementsByClassName(`cardType${index}`)
        for (let i = 0; tempCardType[i]; i++) {
            tempCardType.item(i).innerText = card.cardType;
        }


    });
    // updateBoard(newHand);
}

const resetGame = () => {
    defaultHand.map((el, index) => {
        //Set properties to current card (0-4) on html elements
        //Attaching tempCard to corresponding card section on html
        const tempCard = document.getElementsByClassName(`card${index}`)
        //Setting color of entire element
        tempCard[0].style.color = el.color;
        //Attaching tempCardIcon to span tag inside section element to change icon on cards
        const tempCardIcon = document.getElementById(`cardSuit${index}`)
        tempCardIcon.innerText = el.suitIcon;
        //Attaching tempCardType to text spans of card type to change card type on cards displayed
        const tempCardType = document.getElementsByClassName(`cardType${index}`)
        for (let i = 0; tempCardType[i]; i++) {
            tempCardType.item(i).innerText = el.cardType;
        }
    });
    // updateBoard(defaultHand);
    shuffleDeck();
}

// const updateBoard = (cardArray) => {
//     console.log(cardArray)
//     cardArray.map((el, index) => {
//         //Set properties to current card (0-4) on html elements
//         //Attaching tempCard to corresponding card section on html
//         const tempCard = document.getElementsByClassName(`card${index}`)
//         //Setting color of entire element
//         tempCard[0].style.color = el.color;
//         //Attaching tempCardIcon to span tag inside section element to change icon on cards
//         const tempCardIcon = document.getElementById(`cardSuit${index}`)
//         tempCardIcon.innerText = el.suitIcon;
//         //Attaching tempCardType to text spans of card type to change card type on cards displayed
//         const tempCardType = document.getElementsByClassName(`cardType${index}`)
//         for (let i = 0; tempCardType[i]; i++) {
//             tempCardType.item(i).innerText = el.cardType;
//         }
//     });
// }
const randomNum = (range) => {
    return Math.floor(Math.random() * range);
}

const randomCard = () => {
    return card = deckCardTypes[randomNum(deckCardLength)]
}

const randomSuit = () => {
    return suit = deckCardSuits[randomNum(deckSuitLength)]

}

const checkCard = (card) => {
    //Check if card holds values in cardType and suitType properties and if the card is not a default card value
    if (card.suitType && card.cardType && !card.default) {
        for (let i = 0; i < deck.length; i++) {
            //Check the deck array for the matching suit and if the card type has already been used return false and if mark card used in the array with true and return true to checkCard
            if (deck[i].suitType === card.suitType) {
                if (deck[i].suitDeck[deckCardTypes.indexOf(card.cardType)]) {
                    return false
                }
                deck[i].suitDeck[deckCardTypes.indexOf(card.cardType)] = true;
                return true;
            }
        }
    }
}

const shuffleDeck = () => {
    //Reset card count and remove all used cards from each suits deck array, effectively reshuffling an entire new deck
    cardCount = 0;
    deck.map(el => el.suitDeck = []);
}