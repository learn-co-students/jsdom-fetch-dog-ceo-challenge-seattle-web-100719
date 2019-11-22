let breeds = [];

document.addEventListener("DOMContentLoaded", function() {
  loadImages();
  loadBreedOptions();
  addBreedSelectListener();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => getDogPics(json));
}

function loadBreedOptions() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => displayBreedsList(json));
}

function getDogPics(json) {
  const imgContainer = document.querySelector("#dog-image-container");
  for (const key in json.message) {
    const img = document.createElement("img");
    img.src = json.message[key];
    imgContainer.appendChild(img);
  }
}

function displayBreedsList(json) {
  breeds = Object.keys(json.message);
  updateBreedsList(breeds);
}

function updateBreedsList(breeds) {
  console.log(breeds);
  const list = document.querySelector("#dog-breeds");
  let child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }
  for (const key in breeds) {
    const li = document.createElement("li");
    li.className = "breed-item";
    li.innerText = breeds[key];
    li.style.cursor = "pointer";
    li.addEventListener("click", function() {
      li.style.color = "red";
    });
    list.appendChild(li);
  }
}

function addBreedSelectListener() {
  const breedDropdown = document.querySelector("#breed-dropdown");
  breedDropdown.addEventListener("change", function(e) {
    displayBreedsByLetter(e.target.value);
  });
}

function displayBreedsByLetter(letter) {
  updateBreedsList(breeds.filter(breed => breed.startsWith(letter)));
}
