"use strict";
const cardContainer = document.querySelector(".card-container");
const tarotCards = [{ title: "Joker", img: "", id: "" }, ];

for (let i = 0; i < 8; i++) {
  const newCard = document.createElement("div");
  const backCard = document.createElement("div");
  const faceCard = document.createElement("div");

  newCard.classList.add("card");
  backCard.classList.add("back-card");
  faceCard.classList.add("face-card");
  backCard.style.backgroundImage = "url(/assets/Tarot-back.webp)";

  cardContainer.append(newCard);
cardContainer.append(backCard);
cardContainer.append(faceCard);
 
  
  
}

cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("back-card")) {
  
  }
});