//selectors
const cardContainer = document.querySelector(".card-container");
const startTimer = document.querySelector(".start");
const timer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const question = document.querySelector(".prompt");
const form = document.querySelector("form");
let counter = 0;
let firstCard, secondCard;
let chosenCards = [];
let matchedCards = [];
let minute = 0;
let second = 0;
let displaySecond = 0;
let displayMinute = 0;
let interval = null;
let stopwatchStatus = "stopped";
let submitButton = document.querySelector(".submit");
let predictionText;
question.style.display = "none";

//array of objects
const arrayOfCards = [
  {
    name: "death",
    img: "url(/assets/death.jpeg)",
  },
  {
    name: "death",
    img: "url(/assets/death.jpeg)",
  },
  {
    name: "magician",
    img: "url(/assets/magician.jpeg)",
  },
  {
    name: "magician",
    img: "url(/assets/magician.jpeg)",
  },
  {
    name: "moon",
    img: "url(/assets/moon.jpeg)",
  },
  {
    name: "moon",
    img: "url(/assets/moon.jpeg)",
  },
  {
    name: "sun",
    img: "url(/assets/sun.jpeg)",
  },
  {
    name: "sun",
    img: "url(/assets/sun.jpeg)",
  },
];

//card shuffle
const shuffle = (array) => {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};
shuffle(arrayOfCards);
console.log(arrayOfCards);

//reset function
const reset = () => {
  clearInterval(interval);
  second = 0;
  minute = 0;
  hour = 0;
  document.getElementById("timer-display").innerHTML = "00:00";
  document.getElementById("startStop").innerHTML = "Start";
  stopwatchStatus = "stopped";
  cardContainer.innerHTML = "";
  shuffle(arrayOfCards);
  buildDeck();
  counter = 0;
  question.style.display = "none";
  question.innerHTML = `<p>You are psychic! I will grant you the answer to a single question</p>
  <form>
    <input type="text" id="text" />
    <button class="submit">Predict the future</button>
  </form>`;
  const newForm = document.querySelector("form");
  newForm.addEventListener("submit", predictionSubmitHandler);
  question.classList.remove("playAgain");
};

//question answer
const predictionSubmitHandler = (e) => {
  const predictTheFuture = (question) => {
    const answer = [
      "Yes",
      "No",
      "Maybe",
      "Meditate and ask again",
      "Honestly, probs not",
      "For sure, dude",
      "Shhhhh, can't tell you",
      "As I see it, yes",
      "Reply hazy, try again",
      "Better not tell you now",
      "Google it",
      "Tis a secret",
    ];
    let randomAns = Math.floor(Math.random() * answer.length);
    return answer[randomAns];
  };
  console.log(predictTheFuture());
  const playAgainButton = document.createElement("button");
  question.innerHTML = `<p class="prediction-text">${predictTheFuture()}</p>`;
  predictionText = document.querySelector(".prediction-text");
  question.classList.add("playAgain");
  console.log(predictionText);
  playAgainButton.classList.add("playAgainBtn");
  const buttonText = document.createElement("p");
  buttonText.classList.add("text");
  buttonText.innerText = "Play Again?";
  setTimeout(() => {
    predictionText.classList.add("fade-in");
  }, 600);
  setTimeout(() => {
    buttonText.classList.add("fade-in");
  }, 1300);
  playAgainButton.style.backgroundImage = "url(/assets/crystalball.png)";
  question.append(playAgainButton);
  playAgainButton.append(buttonText);
  playAgainButton.addEventListener("click", (e) => {
    reset();
  });
};

//card container
const buildDeck = () => {
  for (let i = 0; i < arrayOfCards.length; i++) {
    const newCard = document.createElement("div");
    const backCard = document.createElement("div");
    const faceCard = document.createElement("div");
    newCard.classList.add("card");
    backCard.classList.add("back-card");
    faceCard.classList.add("face-card");
    faceCard.setAttribute("data-name", arrayOfCards[i].name);
    faceCard.style.backgroundImage = "url(/assets/card-back.jpeg)";
    backCard.style.backgroundImage = arrayOfCards[i].img;
    cardContainer.append(newCard);
    newCard.append(faceCard);
    newCard.append(backCard);
    cardContainer.style.opacity = "0";
  }
};
buildDeck();

//match cards
const checkForMatch = () => {
  firstCard = chosenCards[0];
  secondCard = chosenCards[1];
  const nodeList = document.querySelectorAll(".flip");
  if (firstCard === secondCard) {
    nodeList.forEach((node) => {
      node.style.opacity = "0";
    });
    console.log("Match");
    chosenCards = [];
    counter++;
  } else {
    nodeList.forEach((node) => {
      node.classList.remove("flip");
    });
    chosenCards = [];
    console.log("not a match");
  }
  console.log(counter);
  if (counter === 1) {
    clearInterval(interval);
    question.style.display = "block";
    submitButton.addEventListener("click", predictionSubmitHandler);
  }
};

//flip card
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("face-card")) {
    let cardName = e.target.getAttribute("data-name");
    e.target.parentNode.classList.add("flip");
    chosenCards.push(cardName);
    if (chosenCards.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
});

//timer
const stopwatch = () => {
  second++;
  if (second / 60 === 1) {
    second = 0;
    minute++;
    if (minute / 60 === 1) {
      minute = 0;
    }
  }
  if (second < 10) {
    displaySecond = "0" + second.toString();
  } else {
    displaySecond = second;
  }
  if (minute < 10) {
    displayMinute = "0" + minute.toString();
  } else {
    displayMinute = minute;
  }
  document.getElementById("timer-display").innerHTML =
    displayMinute + ":" + displaySecond;
};

const startStop = () => {
  if (stopwatchStatus === "stopped") {
    interval = setInterval(stopwatch, 1000);
    document.getElementById("startStop").innerHTML = "Stop";
    stopwatchStatus = "started";
    cardContainer.style.opacity = "100";
    question.style.display = "none";
  } else {
    clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Start";
    stopwatchStatus = "stopped";
  }
};
