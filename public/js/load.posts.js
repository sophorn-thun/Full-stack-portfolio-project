export const loadPostsFromDatabase = async () => {
  try {
    const res = await fetch('https://intense-ravine-84337-b26da14fff11.herokuapp.com/posts');

    if (!res.ok) {
      throw new Error('Network response error');
    }
    const posts = await res.json();
    const portfolio = document.querySelector('.recent-project');
    portfolio.innerHTML = '';

    posts.forEach(post => {
      const projectElement = document.createElement('div');
      projectElement.innerHTML = `
      <i class="fa-solid fa-laptop-code"></i>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <a href="https://github.com/sophorn-thun">To source codes...</a>
      `;

      portfolio.prepend(projectElement);
    });
  } catch (error) {
    console.error('Fetch error: ', error);
    alert('Error fetching all posts!')
  }
}