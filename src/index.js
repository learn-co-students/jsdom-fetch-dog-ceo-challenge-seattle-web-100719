const newObj = {}
document.addEventListener('DOMContentLoaded', function () { 
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => {
        json["message"].forEach(img => createImage(img))
    })
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => {
        for (const breed in json["message"]) {
            createBreed(breed)
            if (newObj[breed[0]]){
                newObj[breed[0]].push(breed)
            } else {
                newObj[breed[0]] = []
            }
        }
    })
    const dropDown = document.getElementById("breed-dropdown")
    dropDown.addEventListener("change", function(e) {
        e.preventDefault()
        const breeds = newObj[e.target.value]
        let test = document.querySelector("#dog-breeds")
        test.innerHTML = "";
        for(const breed of breeds) {
            createBreed(breed)
        }
    })
})
function createBreed(breed) {
    let container = document.querySelector("#dog-breeds")
    let list = document.createElement("li")
    list.innerText = breed
    container.appendChild(list)
    list.addEventListener("click", function() {
        list.style.color = "red"
    })
}
function createImage(img) {
    let container = document.querySelector("#dog-image-container")
    let image = document.createElement("img")
    image.src = img
    container.appendChild(image)
}


// console.log("%c HI", "color: firebrick");

// fetch("https://dog.ceo/api/breeds/list/all")
//   .then(response => response.json())
//   .then(json => {
//     breedList(json);
//   });

// function breedList(json) {
//   const breeds = Object.keys(json.message);
//   for (const key in breeds) {
//     const li = document.createElement("li");
//     li.innerText = breeds[key];
//     li.addEventListener("click", function() {
//       li.style.color = "red";
//     });
//     document.querySelector("#dog-breeds").appendChild(li);
//   }
// }

// fetch("https://dog.ceo/api/breeds/image/random/4")
//   .then(response => response.json())
//   .then(json => {
//     addPhotosToDom(json);
//   });

// // json.message[0] --> returns first image url
// // html photo --> <img src="url"></img>

// function addPhotosToDom(json) {
//   const dogPhotoContainer = document.querySelector("#dog-image-container");
//   for (let i = 0; i < json.message.length; i++) {
//     const dogPic = document.createElement("img");
//     dogPic.src = json.message[i];
//     dogPhotoContainer.appendChild(dogPic);
//   }
// } 

// function filterBreedsOnClick(json) {
//     let dropdown = document.querySelector('#breed-dropdown')
//     let breedList = document.querySelector('#dog-breeds');

//     dropdown.addEventListener('change', function() {
//         breedList.removeChild(breedList.childNodes);
//         const breeds = Object.keys(json.message);

//         for (const key in breeds) {
//             if (key.startsWith('b')) {
//                 const li = document.createElement("li");
//                 li.innerText = breeds[key];
//             } 
//         }
//     });
// }   