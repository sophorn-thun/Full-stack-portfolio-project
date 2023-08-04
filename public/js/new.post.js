export const newPost = async (title, description) => {
  try {
    const token = sessionStorage.getItem('jwt');
    if (!token) throw new Error('No authorization token found!');

    const body = JSON.stringify({
      title,
      description
    });

    const res = await fetch('http://127.0.0.1:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: body
    });

    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(`Error ${errorData.status}: ${errorData.message}`);
    }

    const data = await res.json();
    alert('Congratulation! New project is successfully posted');
    return data;
  } catch (error) {
    console.error('Fetch operation error: ', error);
    alert('Error creating new post');
  }
}

export const updatePortfolio = (newPostData) => {
  const portfolio = document.querySelector('.recent-project');

  const projectElement = document.createElement('div');
  projectElement.innerHTML = `
  <i class="fa-brands fa-code"></i>
  <h3>${newPostData.title}</h3>
  <p>${newPostData.description}</p>
  <a href="https://github.com/sophorn-thun">To see source code...</a>`;

  portfolio.prepend(projectElement);
};
