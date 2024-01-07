"use strict";

// Element Selection
const diceImage = document.querySelector(".dice");
const scoreP1 = document.querySelector("#score--0");
const scoreP2 = document.querySelector("#score--1");
const currentScoreP1 = document.querySelector("#current--0");
const currentScoreP2 = document.querySelector("#current--1");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

let activePlayer, totalScore, currentScore, playing;

// Starting Condition
const init = function () {
  playing = true;
  totalScore = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  diceImage.classList.add("hidden");
  player1.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player2.classList.remove("player--winner");
  holdBtn.classList.remove("hidden");
  rollBtn.classList.remove("hidden");
};

init();

// Switch Player Function
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// Game Function Start
rollBtn.addEventListener("click", function () {
  if (playing) {
    //1. Generate Random Number
    let randomDice = Math.trunc(Math.random() * 6 + 1);
    diceImage.classList.remove("hidden");
    diceImage.src = `dice-${randomDice}.png`;

    // Dice Image Shake****
    diceImage.classList.add("image_shake");
    setTimeout(function () {
      diceImage.classList.remove("image_shake");
    }, 200);

    if (randomDice !== 1) {
      //2. When Dice value not = 1
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //2. When Dice value = 1
      switchPlayer();
    }
  }
});

// Hold button Click
holdBtn.addEventListener("click", function () {
  if (playing) {
    // Add current number to total number
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // Check if the total number is >= 100, 100 score player wins
    if (totalScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceImage.classList.add("hidden");
      holdBtn.classList.add("hidden");
      rollBtn.classList.add("hidden");
    }
    // Switch Player
    switchPlayer();
  }
});

// New Game Button Click
newBtn.addEventListener("click", init);
