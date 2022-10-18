//selectors
const cardContainer = document.querySelector(".card-container");
const startTimer = document.querySelector(".start");
const timer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const question = document.querySelector(".prompt");
question.style.display = "none";
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
    faceCard.style.backgroundImage = "url(/assets/Tarot-back.webp)";
    backCard.style.backgroundImage = arrayOfCards[i].img;
    cardContainer.append(newCard);
    newCard.append(faceCard);
    newCard.append(backCard);
    cardContainer.style.opacity = "0";
  }
};
buildDeck();

//match cards
let counter = 0;
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
    question.style.display = "block";
    submitButton.addEventListener("click", (e) => {
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
      question.innerHTML = predictTheFuture();
      // alert(predictTheFuture());
      if (predictTheFuture) {
        reset();
      }
    });
  }
};

// //flip card
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
  resetButton.addEventListener("click", (e) => {
    question.style.display = "none";
  });
};
