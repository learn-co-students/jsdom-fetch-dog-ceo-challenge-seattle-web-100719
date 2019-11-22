console.log('%c HI', 'color: firebrick')

fetch("https://dog.ceo/api/breeds/image/random/4")
.then(response => response.json())
.then(json => {
    addPhotosToDom(json); 
})

// json.message[0] --> returns first image url 
// html photo --> <img src="url"></img>

function addPhotosToDom(json) {
    const dogPhotoContainer = document.querySelector('#dog-image-container');

    for (let i = 0; i < json.message.length; i++) {
        const dogPic = document.createElement('img');
        dogPic.src = json.message[i]; 
        dogPhotoContainer.appendChild(dogPic) 
    }
} 