const startGameButton = document.getElementById("start-game-button");
const gameScreen = document.getElementById("game-screen");
const playHandButton = document.getElementById("play-hand-button");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const playAgainButton = document.getElementById("play-again-button");
const choices = document.querySelectorAll(".choice");
const countdownElement = document.getElementById("countdown");
const scoreElement = document.getElementById("score");

// Game Variables
let userChoice = null;
let wins = 0;
let losses = 0;
let draws = 0;

// Start Game
startGameButton.addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    gameScreen.classList.remove("hidden");
    startCountdown();
});

// Choice Selection
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        // Toggle selection
        userChoice = choice.dataset.choice;
        choices.forEach((c) => c.classList.remove("selected"));
        choice.classList.add("selected");
        playHandButton.classList.remove("hidden");
    });
});

// Play Hand
playHandButton.addEventListener("click", () => {
    if (!userChoice) return;
    const computerChoice = getRandomChoice();
    const result = determineWinner(userChoice, computerChoice);
    displayResult(result, computerChoice);
});

// Play Again
playAgainButton.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    startCountdown();
    userChoice = null;
    choices.forEach((c) => c.classList.remove("selected"));
    playHandButton.classList.add("hidden");
});

// Countdown Timer
function startCountdown() {
    let countdown = ["Rock...", "Paper...", "Scissors...", "Shoot!"];
    let index = 0;
    countdownElement.textContent = countdown[index];
    const interval = setInterval(() => {
        index++;
        if (index >= countdown.length) {
            clearInterval(interval);
            if (!userChoice) {
                userChoice = getRandomChoice();
                alert(`Time's up! We chose ${userChoice} for you.`);
                playHandButton.click();
            }
        } else {
            countdownElement.textContent = countdown[index];
        }
    }, 1000);
}

// Generate Random Choice for Computer
function getRandomChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
}

// Determine Winner
function determineWinner(user, computer) {
    if (user === computer) return "draw";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "win";
    }
    return "lose";
}

// Display Result
function displayResult(result, computerChoice) {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    if (result === "win") {
        wins++;
        resultMessage.textContent = `You won! The computer chose ${computerChoice}.`;
    } else if (result === "lose") {
        losses++;
        resultMessage.textContent = `You lost! The computer chose ${computerChoice}.`;
    } else {
        draws++;
        resultMessage.textContent = `It's a draw! The computer also chose ${computerChoice}.`;
    }

    scoreElement.textContent = `Wins: ${wins} | Losses: ${losses} | Draws: ${draws}`;
}