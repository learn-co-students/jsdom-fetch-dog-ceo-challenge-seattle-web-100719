console.log('%c HI', 'color: firebrick');
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

function stuffToDoAfterLoad() {
   getDogPictures();
   getDogBreeds();
   filterByBreed();
}

function getDogPictures() {
   fetch(imgUrl)
      .then(function(response) {
         return response.json();
      })
      .then(function(json) {
         console.log(json);
         for (let i = 0; i < json.message.length; i++) {
            createImgNode(json.message[i]);
         }
      });
}

function createImgNode(imgSrc) {
   let docImg = document.createElement('img');
   docImg.src = imgSrc;
   document.querySelector('#dog-image-container').appendChild(docImg);
}

function getDogBreeds() {
   fetch(breedUrl)
      .then(function(response) {
         return response.json();
      })
      .then(function(json) {
         console.log(json);
         createBreedLi(json.message);
      });
}

function createBreedLi(jsonObj) {
   for (const breed in jsonObj) {
      if (jsonObj[breed].length > 0) {
         for (const element of jsonObj[breed]) {
            let dog = document.createElement('li');
            dog.textContent = `${element} ${breed}`;
            addClickToDogs(dog);
            document.querySelector('#dog-breeds').append(dog);
         }
      } else {
         let dog = document.createElement('li');
         dog.textContent = breed;
         addClickToDogs(dog);
         document.querySelector('#dog-breeds').append(dog);
      }
   }
}

function addClickToDogs(dog) {
   dog.addEventListener('click', function() {
      dog.style.color = 'green';
   });
}

function filterByBreed() {
   select = document.querySelector('#breed-dropdown');
   select.addEventListener('change', function() {
      filterDogList(select.options[select.selectedIndex].text);
   });
}

function filterDogList(letter) {
   dogBreeds = document.querySelectorAll('li');
   let filteredBreeds = [];
   for (let i = 0; i < dogBreeds.length; i++) {
      if (dogBreeds[i].textContent[0] === letter) {
         filteredBreeds.push(dogBreeds[i].textContent);
      }
   }
   updateBreeds(filteredBreeds);
}

function updateBreeds(breeds) {
   allBreeds = document.querySelector('#dog-breeds');
   allBreeds.innerText = '';
   for (const breed of breeds) {
      let dog = document.createElement('li');
      dog.textContent = breed;
      document.querySelector('#dog-breeds').append(dog);
   }
}

document.addEventListener('DOMContentLoaded', stuffToDoAfterLoad);
