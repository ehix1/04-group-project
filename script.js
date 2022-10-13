"use strict";
const cardContainer = document.querySelector(".card-container");

for (let i = 0; i < 8; i++) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.backgroundImage = "url(/assets/Tarot-back.webp)";
  cardContainer.append(newCard);
  
  
}
