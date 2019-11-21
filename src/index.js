console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    fetchImage() 
    fetchbreeds()
  });


  function fetchbreeds() {
    fetch('https://dog.ceo/api/breeds/list')
    .then(function(response) {
      return response.json();
    }).then(function(json) {
     return renderBreeds(json);
      });
  }

  function renderBreeds(json){
      let dogsBreeds = json.message
      const dropfilter = document.getElementById('breed-dropdown');
      dropfilter.addEventListener('change', function(e){
        let filterdBreed = dogsBreeds.filter(breed => breed[0] === e.target.value)
         desplayBreeds(filterdBreed)   
     })
        desplayBreeds(dogsBreeds)
  }
 function desplayBreeds(dogsBreeds){
    const ul = document.getElementById('dog-breeds')
    ul.innerHTML=''

    dogsBreeds.forEach(breed => {
        const liBreed = document.createElement('li')
        liBreed.innerText= breed
        ul.appendChild(liBreed)
        liBreed.addEventListener('click', function(e){
            e.target.style.color = 'green'
        })
    })  
 }

  function fetchImage() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
      return response.json();
    }).then(function(json) {
     return renderImage(json);
      });
  }

  function renderImage(json){
      const div = document.getElementById('dog-image-container')
      dogImages = json.message
      dogImages.forEach(imageUrl => {
          const image = document.createElement('img')
          const li = document.createElement('li')
          image.src= imageUrl
          image.size = "150px"
          li.appendChild(image)
          div.appendChild(li)
      })   
}