console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", fetchJson("https://dog.ceo/api/breeds/image/random/4", renderImages))
document.addEventListener("DOMContentLoaded", fetchJson('https://dog.ceo/api/breeds/list/all', renderBreeds))
document.addEventListener("DOMContentLoaded", filterDogs)

function fetchJson(path, funct, filter) {
    fetch(path)
        .then(resp => resp.json())
        .then(json => funct(json, filter))
}

function renderBreeds(json, filterKey = '') {
    for (const dogBreed in json.message) {
        if (json.message[dogBreed].length < 1) {
            if (filterKey === '' || filterKey === dogBreed[0]) {
                createDog(dogBreed)
            }
        } else {
            for (let i = 1; i < json.message[dogBreed].length; i++) {
                if (filterKey === '' || filterKey === json.message[dogBreed][i][0]) {
                    createDog(`${json.message[dogBreed][i]} ${dogBreed}`)
                }
            }
        }
    }
}

function createDog(name) {
    const dogBreeds = document.getElementById("dog-breeds")
    const colors = ['red', 'white', 'blue', 'orange', 'black']
    const item = document.createElement("li")
    item.textContent = name
    item.addEventListener('click', function(e) {
        e.toElement.style.color = colors[Math.floor(Math.random() * colors.length)]
    })
    dogBreeds.appendChild(item)
}

function renderImages(json) {
    const dogImages = document.getElementById("dog-image-container")
    json.message.forEach(dogImage => {
        const img = document.createElement("img")
        img.src = dogImage
        dogImages.appendChild(img)
    })
}


function filterDogs() {
    const dropDown = document.getElementById("breed-dropdown")
    dropDown.addEventListener("change", (e) => {
        removeChildren(document.getElementById("dog-breeds"))
        fetchJson('https://dog.ceo/api/breeds/list/all', renderBreeds, e.target.value)
    })
}

function removeChildren(node) {
    while (node.children[0]) {
        node.removeChild(node.firstChild);
    }
}