/*
GAME FUNCTIONS:
-Player must guess a number between amin and max
-Players get a certain amount of guesses
-Notify player of guesses remaining 
-Notify the player of the correct answer if lose
-Let player choose to play again
*/

// game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// uı elements

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign min and max number

minNum.textContent = min;
maxNum.textContent = max;


// listen for play again
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// listen for guess

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);  // change to the number

  // validate out input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between  ${min} and ${max}`, "red");
  }
  else if (guess === winningNum) {

    gameOver(true, `${winningNum} is correct, YOU WIN!`);


  } else {
    // WRONG NUMBER
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over 
      gameOver(false, `YOU LOSE! The correct number was ${winningNum}`);
    } else {
      // game continues - answer wrong
      setMessage(`${guess}s is not correct, ${guessesLeft} guesses left`, "red");
      // change border color
      guessInput.style.borderColor = "red";

      // clear the input

      guessInput.value = "";
    }
  }
});



// creating gameover function

function gameOver(won, msg) {

  let color;
  won === true ? color = "green" : color = "red";

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // change  color
  message.style.color = color;
  // set message
  setMessage(msg)


  // Play again?

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}



// create setmessage function

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}


// creatin getwinningnum function

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}