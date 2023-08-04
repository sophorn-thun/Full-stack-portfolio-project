export const updatePost = async (id, title, description) => {
  try {
    const token = sessionStorage.getItem('jwt');
    if (!token) throw new Error('No authorization token found!');

    const res = await fetch(`https://intense-ravine-84337-b26da14fff11.herokuapp.com/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title, description })
    });
    
    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(`Error ${errorData.status}: ${errorData.error}`);
    }

    const post = await res.json();
  } catch (error) {
    console.error(`Error updating post with id ${id}: `, error)
    alert('Error updating post');
  }
}
