

let garbage = fetch("https://dog.ceo/api/breeds/image/random/4")
.then(function(response) {
    return response.json();
})
.then(function(json){
    for (img_url of json["message"])
    {
        const dogContainer = document.getElementById("dog-image-container");
        let myImage = document.createElement('IMG');
        myImage.src = img_url;
        dogContainer.appendChild(myImage);
    }
})