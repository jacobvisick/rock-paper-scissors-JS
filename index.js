const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const playerScoreElement = document.querySelector('#player-score');
const computerScoreElement = document.querySelector('#computer-score');
const matchupElement = document.querySelector('div.matchup');

let roundsPlayed = 0;
let playerWins = 0;
let computerWins = 0;

function getComputerChoice() {
    // generate random int from 0-2, which matches our constants for each choice
    // Multiply by 3 so we have 3 different integers possible, then Math.floor to return an int
    let choice = Math.floor(Math.random() * 3);

    if (choice === 0) choice = ROCK;
    else if (choice === 1) choice = PAPER;
    else if (choice === 2) choice = SCISSORS;
    else alert("computer choice: " + choice);

    return choice;
}

function getPlayerChoice() {
    // prompt player to choose rock paper or scissors and return the result

    let choice = prompt("Rock, paper, or scissors?");

    // lower case so we don't have to worry about capitalization
    switch(choice.toLowerCase()) {
        case "rock":
            choice = ROCK;
            break;
        case "paper":
            choice = PAPER;
            break;
        case "scissors":
            choice = SCISSORS;
            break;
        default:
            alert("Invalid response, try again");
            choice = undefined;
    }

    // validate so we don't return an invalid option
    return validatePlayerChoice(choice);
}

function validatePlayerChoice(choice) {
    // ensure player choice is always rock, paper, or scissors
    
    if (choice == undefined) {
        return getPlayerChoice();
    } else {
        return choice;
    }
}

function playRound(playerSelection, computerSelection) {
    //plays one round, return winner so we can keep score
    let matchup = "";
    let winner = "";

    // computerSelection choice for each playable option by computer
    switch(computerSelection) {
        case ROCK:
            //nested playerSelection switch for each playable option by player
            switch(playerSelection) {
                case ROCK:
                    // Rock vs Rock
                    matchup = "Rock vs Rock: Draw!";
                    winner = "draw";
                    break;
                case PAPER:
                    //Rock vs Paper
                    matchup = "Paper covers Rock: You win!";
                    winner = "player";
                    break;
                case SCISSORS:
                    //Rock vs Scissors
                    matchup = "Rock smashes Scissors: You lose!";
                    winner = "computer";
                    break;
            }
            break;
        case PAPER:
            switch(playerSelection) {
                case ROCK:
                    // Paper vs Rock
                    matchup = "Paper covers Rock: You lose!";
                    winner = "computer";
                    break;
                case PAPER:
                    //Paper vs Paper
                    matchup = "Paper vs Paper: Draw!";
                    winner = "draw";
                    break;
                case SCISSORS:
                    //Paper vs Scissors
                    matchup = "Scissors cut paper: You win!";
                    winner = "player";
                    break;
            }
            break;
        case SCISSORS:
            switch(playerSelection) {
                case ROCK:
                    // Scissors vs Rock
                    matchup = "Rock smashes Scissors: You win!";
                    winner = "player";
                    break;
                case PAPER:
                    //Scissors vs Paper
                    matchup = "Scissors cut paper: You lose!";
                    winner = "computer";
                    break;
                case SCISSORS:
                    //Scissors vs Scissors
                    matchup = "Scissors vs Scissors: draw!";
                    winner = "draw";
                    break;
            }
            break;
        default:
            console.log("The computer cheated...");
            console.log("Computer choice: " + computerSelection);
    }

    matchupElement.textContent = playerSelection + " vs " + computerSelection;
    return winner;
}

function endGame() {
    document.querySelectorAll('button').forEach(button => {
        button.removeEventListener('click', buttonListener);
    });

    let winnerElement = document.createElement('span');
    
    if (playerWins > computerWins) {
        winnerElement.textContent = 'You win!';
        winnerElement.style.color = 'lightgreen';
    } else {
        winnerElement.textContent = 'You lose!';
        winnerElement.style.color = 'lightcoral';
    }

    matchupElement.appendChild(winnerElement);
}

function buttonListener(e) {
    const winner = playRound(this.getAttribute('id'), getComputerChoice());
    updateScore(winner);
}

function updateScore(winner) {
    roundsPlayed++;
    const playerScoreboard = playerScoreElement.parentNode;
    const computerScoreboard = computerScoreElement.parentNode;

    if (winner === 'player') {
        playerScoreboard.style.backgroundColor = 'lightgreen';
        computerScoreboard.style.backgroundColor = 'lightcoral';
        playerWins++;
    } else if (winner === 'computer') {
        playerScoreboard.style.backgroundColor = 'lightcoral';
        computerScoreboard.style.backgroundColor = 'lightgreen';
        computerWins++;
    } else {
        playerScoreboard.style.backgroundColor = 'yellow';
        computerScoreboard.style.backgroundColor = 'yellow';
    }

    playerScoreElement.textContent = playerWins;
    computerScoreElement.textContent = computerWins;

    if (playerWins === 5 || computerWins === 5) endGame();
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', buttonListener));