

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




//card container
const cardContainer = document.querySelector(".card-container");
for (let i = 0; i < arrayOfCards.length; i++) {
  const newCard = document.createElement("div");
  const backCard = document.createElement("div");
  const faceCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.classList.add("flip");
  backCard.classList.add("back-card");
  faceCard.classList.add("face-card");
backCard.style.backgroundImage = "url(/assets/Tarot-back.webp)";
faceCard.style.backgroundImage = arrayOfCards[i].img;
  cardContainer.append(newCard);
  newCard.append(backCard);
  newCard.append(faceCard);
  console.log(newCard);
}

//card shuffle
const cardShuffle = () => {
  cardContainer.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 8);
  
  });
}

// (function shuffle() {
//     cards.forEach(card => {
//         let randomPos = Math.floor(Math.random() * 12);
//         card.style.order = randomPos;
//     });
// })();

cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("back-card")) {
  }
});

