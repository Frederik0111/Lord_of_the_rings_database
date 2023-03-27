"use strict";

const charactersData = fetch("characters.json")
  .then((response) => response.json())
  .then((data) => data)

charactersData.then((characters) => {
  const charactersContainer = document.querySelector("#characters");
  characters.forEach((character) => {
    const characterElement = document.createElement("article");
    characterElement.classList.add("card");
    characterElement.innerHTML = `
      <figure>
        <img src="${character.image}" alt="${character.name}">
        <figcaption>${character.name}</figcaption>
      </figure>
      <ul>
        <li><strong>Gender:</strong> ${character.gender}</li>
        <li><strong>Age:</strong> ${character.age}</li>
        <li><strong>Eye Colour:</strong> ${character.eyeColour}</li>
        <li><strong>Hair Colour:</strong> ${character.hairColour}</li>
        <li><strong>Birthplace:</strong> ${character.birthPlace}</li>
        <li><strong>Species:</strong> ${character.species}</li>
      </ul>
      <button class="dialog-button" data-name="${character.name}">More Info</button>
    `;
    charactersContainer.appendChild(characterElement);
  });
});

console.log(charactersData)