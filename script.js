'use strict';

// generate number +
// get value +
// validate guess (empty, not in range) +
// if valid -> compare values +
// show result +
// -1 score +
// save highscore +
// win screen +
// reload (again button) +

let numberToGuess = generateNumber();
let message = 'Start guessing...';
let highscore = 0;
const score = 20;
setScore(score);

document.querySelector('.message').textContent = message;
document.querySelector('.highscore').textContent = highscore;

document.querySelector('.guess').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.querySelector('.check').click();
    }
});

document.querySelector('.check').addEventListener('click', function () {
    const guess = getGuess();
    const isValidGuess = validateGuess(guess);
    if (isValidGuess) {
        const isGuessed = compareNumbers(numberToGuess, guess);
        if (!isGuessed) {
            decreaseScore();
        } else {
            showWinnerPage(numberToGuess);
        }
    }
    document.querySelector('.message').textContent = message;
});

document.querySelector('.again').addEventListener('click', reset);

function generateNumber() {
    return Math.trunc(Math.random() * 20 + 1);
}

function getGuess() {
    return +document.querySelector('.guess').value;
}

function validateGuess(guess) {
    if (!guess) {
        message = 'No Number!';
        return false;
    }

    if (guess < 1 || guess > 20) {
        message = 'Guess between 1 and 20!';
        return false;
    }

    return true;
}

function compareNumbers(numberToGuess, guess) {
    switch (true) {
        case guess < numberToGuess:
            message = 'Too low!';
            return false;
        case guess > numberToGuess:
            message = 'Too high!';
            return false;
        case guess === numberToGuess:
            message = 'Bingo!';
            return true;
        default:
            message = 'Something went wrong!';
            return false;
    }
}

function decreaseScore() {
    let score = getScore();
    setScore(score > 0 ? --score : 0);
}

function getScore() {
    return +document.querySelector('.score').textContent;
}

function setScore(score) {
    document.querySelector('.score').textContent = score;
}

function showWinnerPage(numberToGuess) {
    changeBodyBackgroundColor('green');
    showGuessedNumber(numberToGuess);
    const currentScore = getScore();
    const isNewHighscore = compareHighscores(currentScore);
    if (isNewHighscore) {
        saveHighscore(currentScore);
    }
    disableBtn('check');
    disableInput('guess');
}

function saveHighscore(score) {
    document.querySelector('.highscore').textContent = score;
}

function compareHighscores(newHighscore) {
    return newHighscore > getHighscore();
}

function getHighscore() {
    return +document.querySelector('.highscore').textContent;
}

function setHighscore(highscore) {
    document.querySelector('.highscore').textContent = highscore;
}

function changeBodyBackgroundColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}

function showGuessedNumber(numberToGuess) {
    document.querySelector('.number').textContent = numberToGuess;
}

function disableBtn(className) {
    document.querySelector(`.${className}`).disabled = true;
    document.querySelector(`.${className}`).style.backgroundColor = '#ccc';
    document.querySelector(`.${className}`).style.cursor = 'default';
}

function disableInput(className) {
    document.querySelector(`.${className}`).disabled = true;
}

function reset() {
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').textContent = '?';
    document.querySelector(`.guess`).disabled = false;
    document.querySelector(`.guess`).value = '';
    document.querySelector('.score').textContent = score;
    enableBtn('check');

    numberToGuess = generateNumber();
    document.querySelector('.message').textContent = 'Start guessing...';
}

function enableBtn(className) {
    document.querySelector(`.${className}`).disabled = false;
    document.querySelector(`.${className}`).style.backgroundColor = '#eee';
    document.querySelector(`.${className}`).style.cursor = 'pointer';
}
