/*
 * Create a list that holds all of your cards
 */
let cards = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube",
];

let game = [];

let previousCard = undefined;
let moves = 0;
let matches = 0;

function startGame() {
    previousCard = undefined;
    updateMoves(0);
    matches = 0;

    game = shuffle(cards);
    deck = document.querySelectorAll(".deck .card");
    deckCard = document.querySelectorAll(".deck .card i");
    for (i=0; i<deck.length; i++) {
        deckCard[i].className =  game[i];
        deck[i].className = "card";
        deck[i].addEventListener("click", function (e) {
            let currentCard = e.target;
            currentCard.className = "card open show disable";
            if (previousCard === undefined) {
                previousCard = currentCard
            } else if (previousCard.innerHTML === currentCard.innerHTML) {
                matches += 2;
                currentCard.className += " match";
                previousCard.className += " match";

                updateMoves();
                previousCard = undefined;
                if (matches === game.length) {
                    swal({
                        title: 'WINNER!',
                        imageUrl: 'http://wheelchairaccessiblevehicles.co/wp-content/uploads/2015/04/comp-winner.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        animation: false,
                        confirmButtonColor: '#4B0082'
                    });
                }
            } else {
                updateMoves();
                setTimeout(function () {
                    currentCard.className = "card";
                    previousCard.className = "card";
                    previousCard = undefined;
                }, 500);
            }
        })
        
        console.log(game[i]);
    }
}

function updateMoves(value) {
    moves++;
    if (value !== undefined) {
        moves = value;
    }
    const moveText = document.querySelector('.moves');
    moveText.innerHTML = moves;

    const stars = document.querySelectorAll(".stars li");
    stars[0].style.display = (moves < 10 ? "inline-block" : "none");
    stars[1].style.display = (moves < 15 ? "inline-block" : "none");
    stars[2].style.display = (moves < 20 ? "inline-block" : "none");
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

(function () {
    startGame();

    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", function () {
        startGame();
    });
})()


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
