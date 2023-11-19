import { deletePost } from "./delete.post.js";
import { updatePost } from "./update.post.js";
import { loadPostsFromDatabase } from "./load.posts.js";

const singlePostPage = document.querySelector('#single-post');
const allPostsPage = document.querySelector('#show-all-posts');

export const viewAllPosts = async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/posts');
    if (!res.ok) {
      throw new Error('Network response error!')
    }
    const posts = await res.json();

    allPostsPage.innerHTML = '';

    const header = document.createElement('h1');
    header.textContent = 'Project posts (Click to update/delete)';
    header.classList.add('all-posts-header');
    allPostsPage.append(header);

    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post-block');
      postDiv.id = `post-${post.id}`;

      postDiv.innerHTML = `
      <a href="#" data-id="${post.id}">
        <h2>${post.title}</h2>
        <p>${post.description}</p>
      </a>
      `;

      allPostsPage.append(postDiv);

      const link = postDiv.querySelector('a');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        allPostsPage.style.display = 'none';
        singlePostPage.style.display = 'block';
        const postId = event.currentTarget.getAttribute('data-id');
        showPost(postId);
      })
    });
    const allPostsBackButton = document.createElement('button');
    allPostsBackButton.id = 'all-posts-back-button';
    allPostsBackButton.textContent = 'Back to main page';
    allPostsPage.append(allPostsBackButton);

    allPostsBackButton.addEventListener('click', (event) => {
      event.preventDefault();

      const adminWelcomePage = document.querySelector('#admin-welcome');
      allPostsPage.style.display = 'none';
      adminWelcomePage.style.display = 'block';
    })


  } catch (error) {
    console.error('Error viewing all posts: ', error);
    alert('Error viewing all posts!')
  }
};

const showPost = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/posts/${id}`);
    if (!res.ok) {
      throw new Error('Network response error!')
    }
    const postData = await res.json();

    console.log(postData);

    singlePostPage.innerHTML = `
    <h2 contenteditable="false">${postData.title}</h2>
    <p contenteditable="false">${postData.description}</p>
    <button data-id="${postData.id}" class="update-button" style="display:none">Update</button>
    <button data-id="${postData.id}" class="edit-button">Edit</button>
    <button data-id="${postData.id}" class="delete-button">Delete</button>
    <button id="single-post-back-button">Back to all posts</button>
    `;

    const editButton = singlePostPage.querySelector('.edit-button');
    const updateButton = singlePostPage.querySelector('.update-button');
    const deleteButton = singlePostPage.querySelector('.delete-button')
    const titleElement = singlePostPage.querySelector('h2');
    const descriptionElement = singlePostPage.querySelector('p');
    const backButton = singlePostPage.querySelector('#single-post-back-button')

    editButton.addEventListener('click', (event) => {
      event.preventDefault();

      titleElement.contentEditable = true;
      descriptionElement.contentEditable = true;
      editButton.style.display = 'none';
      deleteButton.style.display = 'none';
      updateButton.style.display = 'block';
    })

    updateButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const newTitle = titleElement.innerText;
      const newDescription = descriptionElement.innerText;
      await updatePost(id, newTitle, newDescription);

      titleElement.contentEditable = false;
      descriptionElement.contentEditable = false;
      editButton.style.display = 'inline';
      deleteButton.style.display = 'inline';
      updateButton.style.display = 'none';
      await loadPostsFromDatabase();
      alert('Post updated successfully!');
        
    });

    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const confirmDelete = confirm('Are you sure you want to delete this post?')
      if (confirmDelete) {
        await deletePost(id);
        allPostsPage.style.display = 'block';
        singlePostPage.style.display = 'none';
        await loadPostsFromDatabase();
        await viewAllPosts();
      }
    });
    backButton.addEventListener('click', (event) => {
      event.preventDefault();

      singlePostPage.style.display = 'none';
      allPostsPage.style.display = 'block';
      viewAllPosts();
    });
  } catch (error) {
    console.error(`Error fetching post with id ${id}: `, error);
    alert('Error fetching post!')
  }
};