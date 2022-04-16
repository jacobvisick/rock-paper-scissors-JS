const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

function getComputerChoice() {
    // generate random int from 0-2, which matches our constants for each choice
    // Multiply by 3 so we have 3 different integers possible, then Math.floor to return an int
    let play = Math.floor(Math.random() * 3);

    return play;
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
    //plays one round, return 
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

    // log matchup so we only have to type console.log once,
    // then return winner so we can keep count out of 5 rounds
    console.log(matchup);
    return winner;
}

function game() {
    //play "best out of 5" and log our results
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

    console.log("Wins: " + wins);
    console.log("Losses: " + losses);
    console.log("Draws: " + draws);
    
    if (wins > losses) console.log("You're the champion!");
    else console.log("Better luck next time...");
}

game();