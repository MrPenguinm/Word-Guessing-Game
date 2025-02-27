//  Setting Name Game
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created by <span>Mr.Penguin</span>`;
// ================================================================
// [1] Setting Game Words
let numbersOfTries = 5;
let numbersOfLetters = 6;
let cuurentTry = 1;
let hints = 2;
let messageArea = document.querySelector(".message");
let imgeArea = document.getElementById("word-image");
//================================================================
// [2] Words Array and Image
let wordToGuess = "";
let wordArray = [
  "Elzero",
  "School",
  "Batman",
  "Spider",
  "flower",
  "dragon",
  "avatar",
  "rabbit",
  "frozen",
  "matrix",
];
const wordImages = {
  elzero: "img/Elzero.jpg",
  school: "img/school.jpg",
  batman: "img/batman.jpg",
  spider: "img/spider.jpg",
  flower: "img/flower.jpg",
  dragon: "img/dragon.jpg",
  avatar: "img/avatar.jpg",
  rabbit: "img/rabbit.jpg",
  frozen: "img/FROZEN.jpg",
  matrix: "img/matrix.jpg",
};
// Random Word and Image
wordToGuess =
  wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase();
imgeArea.src = wordImages[wordToGuess] || "img/not-found.png";
// ================================================================
// [3] Hint Button and Mange
document.querySelector(".hint span").innerHTML = hints;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", handleHint);
//================================================================
// [4] Main Function
function generateInpute() {
  // 1
  const inputContainer = document.querySelector(".inputs");
  // 2
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    // 3
    if (i !== cuurentTry) tryDiv.classList.add("hidden-input");
    // 4
    for (let j = 1; j <= numbersOfLetters; j++) {
      const inputTry = document.createElement("input");
      inputTry.type = "text";
      inputTry.id = `try-${i}-letter-${j}`;
      inputTry.maxLength = 1;
      tryDiv.appendChild(inputTry);
    }
    // 5
    inputContainer.appendChild(tryDiv);
  }
  inputContainer.children[0].children[1].focus();
  //  Display Next Try
  const inputsInDisableDiv = document.querySelectorAll(".hidden-input input");
  inputsInDisableDiv.forEach((input) => {
    input.disabled = true;
  });
  //  Convert To UpperCase
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // Next Input Focus
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    //  Next Try => KeyBord
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(this);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}
// [5] Check Word
const checkWord = document.querySelector(".check");
checkWord.addEventListener("click", handleCheckWord);
// 1 - Handle Check Word Function
function handleCheckWord() {
  let success = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(`#try-${cuurentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actuleWord = wordToGuess[i - 1];
    // Game Logic
    if (letter === actuleWord) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      success = false;
    } else {
      inputField.classList.add("no");
      success = false;
    }
  }
  // Check If The Word Is Correct or Not
  if (success) {
    messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    if (hints === 2) {
      messageArea.innerHTML = `Wow You don't use hints and You Win The Word Is <span>${wordToGuess}</span>`;
    }
    //Add Disabled Class On All Try Divs
    const allTry = document.querySelectorAll(".inputs > div");
    allTry.forEach((div) => div.classList.add("hidden-input"));
    // Add Class To Check Button
    checkWord.disabled = true;
    hintButton.disabled = true;
    imgeArea.style.opacity = 0.5;
    // Reload The Page
    setTimeout(() => {
      location.reload();
    }, 5000);
    // ================================================================
  } else {
    // Check If The User Lose The Game
    document.querySelector(`.try-${cuurentTry}`).classList.add("hidden-input");
    const currentTryinput = document.querySelectorAll(
      `.try-${cuurentTry} input`
    );
    currentTryinput.forEach((input) => (input.disabled = true));
    // Next Try
    cuurentTry++;
    // Remove Disabled Class From Next Try
    const nextTry = document.querySelectorAll(`.try-${cuurentTry} input`);
    nextTry.forEach((input) => (input.disabled = false));
    // Check if the element is exist or not
    const element = document.querySelector(`.try-${cuurentTry}`);
    if (element) {
      document
        .querySelector(`.try-${cuurentTry}`)
        .classList.remove("hidden-input");
      // Focus On First Input
      element.children[1].focus();
    } else {
      //Add Disabled in check Button
      checkWord.disabled = true;
      hintButton.disabled = true;
      imgeArea.style.opacity = 0.5;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
      // Reload The Page
      setTimeout(() => {
        location.reload();
      }, 5000);
      randomInput.classList.add("hint-filled");
    }
  }
}
//[6] Handle Hint Function
function handleHint() {
  // Check If The User Has Hints
  if (hints > 0) {
    hints--;
    document.querySelector(".hint span").innerHTML = hints;
  }
  if (hints === 0) {
    hintButton.disabled = true;
  }
  const allInputsEnabled = document.querySelectorAll("input:not([disabled])");
  const allInputsEmpty = Array.from(allInputsEnabled).filter(
    (input) => input.value === ""
  );
  // check if the input is empty or not
  let randomInput;
  if (allInputsEmpty.length > 0) {
    const randomIndex = Math.floor(Math.random() * allInputsEmpty.length);
    randomInput = allInputsEmpty[randomIndex];
    const indexToFill = Array.from(allInputsEnabled).indexOf(randomInput);
    //
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}
// [7] Handle BackSpace KeyBoard
function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0 && inputs[currentIndex].value === "") {
      inputs[currentIndex - 1].focus();
      inputs[currentIndex - 1].value = "";
    }
  }
}
document.addEventListener("keydown", handleBackSpace);
// [8] On Load
window.onload = function () {
  generateInpute();
};
