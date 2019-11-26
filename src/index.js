console.log("%c HI", "color: firebrick");

fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(json => {
    breedList(json);
  });

function breedList(json) {
  const breeds = Object.keys(json.message);
  for (const key in breeds) {
    const li = document.createElement("li");
    li.innerText = breeds[key];
    li.addEventListener("click", function() {
      li.style.color = "red";
    });
    document.querySelector("#dog-breeds").appendChild(li);
  }
}

fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(response => response.json())
  .then(json => {
    addPhotosToDom(json);
  });

// json.message[0] --> returns first image url
// html photo --> <img src="url"></img>

function addPhotosToDom(json) {
  const dogPhotoContainer = document.querySelector("#dog-image-container");
  for (let i = 0; i < json.message.length; i++) {
    const dogPic = document.createElement("img");
    dogPic.src = json.message[i];
    dogPhotoContainer.appendChild(dogPic);
  }
} 

function filterBreedsOnClick(json) {
    let dropdown = document.querySelector('#breed-dropdown')
    let breedList = document.querySelector('#dog-breeds');

    dropdown.addEventListener('change', function() {
        breedList.removeChild(breedList.childNodes);
        const breeds = Object.keys(json.message);

        for (const key in breeds) {
            if (key.startsWith('b')) {
                const li = document.createElement("li");
                li.innerText = breeds[key];
            } 
        }
    });
}   