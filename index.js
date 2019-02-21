document.addEventListener('DOMContentLoaded', function() {
  let page = 1;
  gitForm()
  const subBtn = document.querySelector('#submit');
  const forBtn = document.querySelector('#forward');
  const backBtn = document.querySelector('#back');

  generatePage(page);

  subBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const monName = document.querySelector('#name').value;
    const monAge = document.querySelector('#age').value;
    const monBio = document.querySelector('#bio').value;
    fetch('http://localhost:3000/monsters/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${monName}`,
        "age": `${monAge}`,
        "description": `${monBio}`
      })
    })
      .then(function(response) {
        return response.json();
      })
  });

  forBtn.addEventListener('click', function(e) {
    page++
    clearDiv()
    generatePage(page)
  })

  backBtn.addEventListener('click', function(e) {
    page--
    clearDiv()
    generatePage(page)
  })



})

function gitForm() {
  const createMon = document.querySelector('#create-monster')
  createMon.innerHTML = `
  <form>
    <input type="text" id="name" placeholder="name">
    <input type="number" id="age" placeholder="age">
    <input type="text" id="bio" placeholder="description">
    <input type="submit" id="submit" value="Submit">
  </form>
  `
}

function showSingleMonster(monster) {
  const monsterBox = document.querySelector('#monster-container')
  monsterBox.innerHTML += `
  <div data-id="${monster.id}">
    <h2>Name: ${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
  </div>
  `;
}

function clearDiv() {
  const monsterBox = document.querySelector('#monster-container')
  monsterBox.innerHTML = ""
}

function generatePage(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const monsters = myJson;
      for (const monster of monsters) {
        // console.log(monster)
        showSingleMonster(monster);
      }
    });
}
