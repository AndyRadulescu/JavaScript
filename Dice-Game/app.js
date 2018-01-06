var scores, roundScore, activePlayer, gamePlaying, previousWasASix, maxScore;
init();

/**
 * Function that switches the players.
 */
function nextPlayer() {
    previousWasASix = false;
    console.log(previousWasASix);
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

/**
 * Event on Rolling a dice, a random dice will be thrown. The sum will be added to the player's current score.
 */
document.querySelector(".btn-roll").addEventListener('click', function () {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        if (dice > 1) {
            roundScore += dice;
            if (dice === 6) {
                if (previousWasASix) {
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                    nextPlayer();
                } else {
                    previousWasASix = true;
                }
            }
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

/**
 * Event on click for the HOLD button. If the score is heigher the the score inputed by the user,
 * the player will win.
 */
document.querySelector(".btn-hold").addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= maxScore) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winer!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();
        }
    }
});

/**
 * When the user presses on the new Game button, a new game will start.
 */
document.querySelector(".btn-new").addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;

    //0 first player - 1 second player
    activePlayer = 0;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

/**
 * User inputs a score and has to press ENTER, the score will represent the points that are needed to win the game.
 */
document.querySelector('#inputScore').addEventListener('keyup', function () {
    if (event.keyCode === 13) {
        var inputScore = parseInt(document.getElementById('inputScore').value);
        if (!isNaN(inputScore)) {
            maxScore = inputScore;
        }
    }
});