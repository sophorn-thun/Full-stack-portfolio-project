import { postMessageHandler } from "./js/send.message.js";
import { login } from './js/login.js';
import { logout } from './js/logout.js';
import { viewAllMessages } from "./js/view.messages.js";
import { newPost, updatePortfolio } from './js/new.post.js';
import { loadPostsFromDatabase } from "./js/load.posts.js";
import { viewAllPosts } from "./js/view.posts.js";

const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page');
const sideMenu = document.querySelector(".side-menu");
const openMenuButton = document.querySelector(".fa-solid.fa-bars");
const closeMenuButton = document.querySelector(".fa-solid.fa-xmark");
const formMessage = document.querySelector('#form');
const adminLogin = document.querySelector('#admin-login-form');
const logoutButton = document.querySelector('#logout');
const adminWelcomePage = document.querySelector('#admin-welcome');
const confirmLogoutPage = document.querySelector('#log-out');
const goBackButton = document.querySelector('#not-logout');
const confirmLogoutButton = document.querySelector('#confirm-logout');
const allMessagesButton = document.querySelector('#all-messages-button');
const viewAllMessagePage = document.querySelector('#show-all-messages');
const allMessagesBackButton = document.querySelector('#all-messages-back-button');
const createNewPostButton = document.querySelector('#new-post-button');
const createNewPostPage = document.querySelector('#create-new-post');
const submitNewPostButton = document.querySelector('#submit-new-post-button');
const titleInput = document.querySelector('#new-post-title');
const contentInput = document.querySelector('#new-post-content');
const newPostBackButton = document.querySelector('#new-post-back-button');
const viewAllPostsButton = document.querySelector('#all-posts-button');
const allPostsPage = document.querySelector('#show-all-posts');

// Handle navigation bar
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const target = this.dataset.target;
    pageSections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(target);
    targetSection.classList.add('active');
  });
});

function openMenu() {
  sideMenu.style.right = "0";
}

function closeMenu() {
  sideMenu.style.right = "-360px";
}

openMenuButton.addEventListener('click', openMenu);
closeMenuButton.addEventListener('click', closeMenu);

// Handle sending data message to database
formMessage.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const messageData = {
      name: formMessage.elements.name.value,
      email: formMessage.elements.email.value,
      message: formMessage.elements.message.value
    };

    await postMessageHandler(messageData.name, messageData.email, messageData.message);

  } catch (error) {
    console.log('An error occurred while submitting the form: ', error)
  }
});

// Handle admin user's login & logout
adminLogin.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const loginData = {
      email: adminLogin.elements.email.value,
      password: adminLogin.elements.password.value
    };

    await login(loginData.email, loginData.password)

  } catch (error) {
    console.log('An error occurred while logging in!', error)
  }
});

logoutButton.addEventListener('click', function (event) {
  event.preventDefault();
  adminWelcomePage.style.display = 'none';
  confirmLogoutPage.style.display = 'block';
});

if (goBackButton) {
  goBackButton.addEventListener('click', (event) => {
    event.preventDefault();
    confirmLogoutPage.style.display = 'none';
    adminWelcomePage.style.display = 'block'
  })
}

if (confirmLogoutButton) {
  confirmLogoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
    location.reload();
  })
}

// Events on admin page
allMessagesButton.addEventListener('click', (event) => {
  event.preventDefault();
  adminWelcomePage.style.display = 'none';
  viewAllMessagePage.style.display = 'block';
  viewAllMessages();
})

allMessagesBackButton.addEventListener('click', (event) => {
  event.preventDefault();
  viewAllMessagePage.style.display = 'none';
  adminWelcomePage.style.display = 'block';
})

createNewPostButton.addEventListener('click', (event) => {
  event.preventDefault();
  adminWelcomePage.style.display = 'none';
  createNewPostPage.style.display = 'block';
});

submitNewPostButton.addEventListener('click', async event => {
  event.preventDefault();

  titleInput.innerHTML = '';
  contentInput.innerHTML = '';

  const title = titleInput.value;
  const description = contentInput.value;

  try {
    const newPostData = await newPost(title, description);
    updatePortfolio(newPostData);

    titleInput.value = '';
    contentInput.value = '';
    
    createNewPostPage.style.display = 'none';
    adminWelcomePage.style.display = 'block';
  } catch (error) {
    console.error('Error creating new post: ', error)
  }
});

newPostBackButton.addEventListener('click', (event) => {
  event.preventDefault();
  createNewPostPage.style.display = 'none';
  adminWelcomePage.style.display = 'block';
})

loadPostsFromDatabase();

viewAllPostsButton.addEventListener('click', async event => {
  event.preventDefault();
  adminWelcomePage.style.display = 'none';
  allPostsPage.style.display = 'block';
  viewAllPosts();
});
