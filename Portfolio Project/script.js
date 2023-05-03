/*----------------Single Page Application--------------*/
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const target = this.dataset.target;
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(target);
    targetSection.classList.add('active');
  
  });
});

/*----------------Event handling header section-------------*/
let sideMenu = document.querySelector(".side-menu");
function openMenu() {
  sideMenu.style.right = "0";
}

function closeMenu() {
  sideMenu.style.right = "-180px";
}

/*--------------Fetch Data - Get---------------*/
let btn = document.querySelector('.buttonClick');
let image = document.getElementById('image');

btn.addEventListener('click', function () {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(result => {
      console.log(result)
      image.src = result.message
    })
    .catch(err => console.log(err))
})

/*-----------Fetch Data - Post----------------*/
let form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let dataCollected = new FormData(form);
  sendData(dataCollected);
}
);

function sendData(dataCollected) {
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      name: dataCollected.get('Name'),
      email: dataCollected.get('Email'),
      message: dataCollected.get('Message')
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => {
    if (response.ok) {
    } else {
      throw new Error('Error sending contact form data');
    }
  })
  .catch(error => {
  });
}
