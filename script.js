// Gooberjack by Sash

let productName = "Goober";
let productId = 'G00B3R'
console.log(productName, productId);

console.log("Welcome to Gooberjack");


let suitCards = [ "Ace", 
                  "King", 
                  "Queen", 
                  "Goober", 
                  "Ten", 
                  "Nine", 
                  "Eight", 
                  "Seven", 
                  "Six", 
                  "Five", 
                  "Four", 
                  "Three", 
                  "Two", 
                  ]
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

function createDeck() {
  let deck = [];
  for(i = 0; i < 52; i++) {
      deck[i] = suitCards[i % 13] + " of " + suits[Math.floor(i / 13)];
  }
  return deck;
}

let deck = createDeck();
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let textArea = document.getElementById('paragraph');
let dealerCardText = document.getElementById('dealerCards');
let playerCardText = document.getElementById('playerCards');
let newGameButton = document.getElementById('new-game');
let hitMeButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');

function getNextCard() {
  return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
}

function showStatus() {
  textArea.innerText = 'Welcome to GooberJack!\n'
  dealerCardText.innerText = 'Dealer has:\n' + dealerCards[1] + 
                              '\nTotal: ' + calculateValue(dealerCards[1]);
  playerCardText.innerText = 'Player has: ';
  for(i = 0; i < playerCards.length; i++) {
    playerCardText.innerText += '\n' + playerCards[i];
  }
  playerScore = calculateScore(playerCards);
  playerCardText.innerText += '\n Total: ' + playerScore;
  console.log("Player has:", playerScore);
  if(playerScore >= 21) {
    endGame();
  }
}

function calculateScore(hand) {
  let totalScore = 0;
  for(i = 0; i < hand.length; i++) {
    totalScore += calculateValue(hand[i]);
  }
  if (totalScore > 21) {
    for(i = 0; i < hand.length; i++) {
      if(calculateValue(hand[i]) === 11) {
        totalScore = totalScore - 10;
      }
      if(totalScore <= 21) {
        break;
      }
    }
  }
  return totalScore;
}

function calculateValue(card) {
  switch (card.split(" ")[0]) {
    case "Ace" : 
      return 11;
    case "Nine" : 
      return 9;
    case "Eight" : 
      return 8;
    case "Seven" : 
      return 7;
    case "Six" : 
      return 6;
    case "Five" : 
      return 5;
    case "Four" : 
      return 4;
    case "Three" : 
      return 3;
    case "Two" : 
      return 2;
    default :
      return 10;
  }
  
}


hitMeButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function() {
  deck = createDeck();
  dealerCards = []
  playerCards = []
  playerScore = 0;
  dealerScore = 0;
  console.log(deck);
  dealerCards.push(getNextCard());
  playerCards.push(getNextCard());
  dealerCards.push(getNextCard());
  playerCards.push(getNextCard());
  // console.log(dealerCards);
  console.log(playerCards);
  
  
  newGameButton.style.display = 'none';
  hitMeButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  
  showStatus();

  console.log("Dealer has:", calculateValue(dealerCards[1]));
  console.log("Player has:", calculateValue(playerCards[0]));

})

function endGame() {
  dealerCardText.innerText = 'Dealer has: ';
  for(i = 0; i < dealerCards.length; i++) {
    dealerCardText.innerText += '\n' + dealerCards[i];
  }
  dealerCardText.innerText += '\nTotal: ' + dealerScore;

  dealerScore = calculateScore(dealerCards);
  if(playerScore > 21) {
    textArea.innerText += '\nYou Lose!'
  } else if(playerScore < dealerScore && dealerScore <= 21) {
    textArea.innerText += '\nYou Lose!'
  } else if(playerScore > dealerScore && playerScore <= 21) {
    textArea.innerText += '\nYou Win!'
  } else if(playerScore < dealerScore && dealerScore > 21) {
    textArea.innerText += '\nYou Win!'
  } else {
    textArea.innerText += '\nYou Push!'
  }
  newGameButton.style.display = 'inline';
  hitMeButton.style.display = 'none';
  stayButton.style.display = 'none';
}

hitMeButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  console.log(playerCards)
  showStatus();
});

stayButton.addEventListener('click', function() {
  dealerScore = calculateScore(dealerCards);
  while(dealerScore < 17) {
    dealerCards.push(getNextCard());
    dealerScore = calculateScore(dealerCards);
  }
  endGame();
});  
