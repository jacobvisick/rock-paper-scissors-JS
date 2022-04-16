const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

function getComputerChoice() {
    let play = Math.floor(Math.random() * 3);

    return play;
}

function getPlayerChoice() {
    var choice = prompt("Rock, paper, or scissors?");

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

    return validatePlayerChoice(choice);
}

function validatePlayerChoice(choice) {
    if (choice == undefined) {
        return getPlayerChoice();
    } else {
        return choice;
    }
}

function playRound(playerSelection, computerSelection) {
    let matchup = "";
    let winner = "";

    switch(computerSelection) {
        case ROCK:
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
    }

    console.log(matchup);
    return winner;
}

function game() {
    let wins = 0;
    let losses = 0;
    let draws = 0;

    for (let i = 0; i < 5; i++) {
        let result = playRound(getPlayerChoice(), getComputerChoice());

        if (result == "computer") losses++;
        else if (result == "player") wins++;
        else if (result == "draw") draws++;
        else console.log(result);
    }

    console.log("wins: " + wins);
    console.log("losses: " + losses);
    console.log("draws: " + draws);
    
    if (wins > losses) console.log("You're the champion!");
    else console.log("Better luck next time...");
}

game();