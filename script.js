"use strict";
const cardContainer = document.querySelector(".card-container");

for (let i = 0; i < 8; i++) {
  const newCard = document.createElement("div");
  cardContainer.append(newCard);
  newCard.classList.add("card");
}
