"use strict";

// run initApp on load //
window.addEventListener("load", initApp);

let charactersData;

// show characters on main //
function initApp() {
  charactersData = fetch("https://raw.githubusercontent.com/Frederik0111/Lord_of_the_rings_database/main/characters.json")
    .then((response) => response.json())
    .then((data) => data);

  charactersData.then((characters) => {
    const charactersContainer = document.querySelector("#characters");
    characters.forEach((character) => {
      const characterElement = document.createElement("article");
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

  document
    .querySelector("#characters")
    .addEventListener("click", characterClicked);
}

function characterClicked(event) {
  const characterName = event.target.dataset.name;
  showCharacterModal(characterName);
}

function showCharacterModal(characterName) {
  charactersData.then((characters) => {
    const character = characters.find((c) => c.name === characterName);
    //image, name and birthPlace //
    document.querySelector("#dialog-image").src = character.image;
    document.querySelector("#dialog-name").textContent = character.name;
    document.querySelector("#dialog-birth-place").textContent =
      character.birthPlace;
    // description //
    document.querySelector("#dialog-gender").textContent = character.gender;
    document.querySelector("#dialog-age").textContent = character.age;
    document.querySelector("#dialog-eye-colour").textContent =
      character.eyeColour;
    document.querySelector("#dialog-hair-colour").textContent =
      character.hairColour;
    document.querySelector("#dialog-species").textContent = character.species;
    
    document.querySelector("#dialog-name").textContent = character.name;
    document.querySelector("#dialog-actor-name").textContent = character.actor;

    let descriptionFellowship = generateFellowship(character);
    document.querySelector("#dialog-character-description-fellowship").textContent =
      descriptionFellowship;
    
    let descriptionAlive = generateAlive(character);
    document.querySelector("#dialog-character-description-alive").textContent =
      descriptionAlive;

    // show dialog //
    document.querySelector("#dialog-character").showModal();
  });
}

// generate fellowship status //
function generateFellowship(character) {
  if (character.fellowship === "true") {
    return `${character.name} is part of the Fellowship of the Ring.`;
  } else {
    return `${character.name} is not part of the Fellowship of the Ring.`;
  }
}

// generate alive status //
function generateAlive(character) {
  if (character.alive === "true") {
    return `${character.name} is alive at the end.`;
  } else {
    return `${character.name} is not alive at the end`;
  }
}