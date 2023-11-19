export const deletePost = async (id) => {
  try {
    const token = sessionStorage.getItem('jwt');
    if (!token) throw new Error('No authorization token found!');

    const res = await fetch(`http://127.0.0.1:3000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      alert('Post deleted successfully!');
    }
  } catch (error) {
    console.error('Error occurred while deleting the post: ', error);
    alert('Error while deleting post!')
  }
}