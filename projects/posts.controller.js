import getConnection from '../utils/connection.js';

// Get all project posts
export const getAllPosts = async (req, res) => {
  const connection = await getConnection();
  try {
    const [results] = await connection.query('SELECT * FROM projectPosts');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving posts.'
    });
  } finally {
    connection.release(); 
  }
}

// Get post by id
export const getPostById = async (req, res) => {
  const connection = await getConnection();
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM projectPosts WHERE id = ?', [id]);
    const [post] = rows;
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving the post by id.'
    });
  } finally {
    connection.release();
  }
}

// Update project post
export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const connection = await getConnection();
  try {
    const [existingPost] = await connection.query('SELECT * FROM projectPosts WHERE id = ?', [id]);
    if (existingPost.length > 0) {
      const [results] = await connection.query('UPDATE projectPosts SET title = ?, description = ? WHERE id = ?', [title, description, id]);
      if (results.affectedRows > 0) {
        const [updatedPost] = await connection.query('SELECT * FROM projectPosts WHERE id = ?', [id]);
        res.json(updatedPost[0]);
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Failed to update the post.'
        });
      } 
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Post not found!'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the post.'
    });
  } finally {
    connection.release();
  }
} 

// Create project post
export const createPost = async (req, res) => {
  const { title, description } = req.body;
  const connection = await getConnection();

  try {
    const [results] = await connection.query('INSERT INTO projectPosts (title, description) VALUES (?, ?)', [title, description]);
    if (results.affectedRows > 0) {
      const [newPost] = await connection.query('SELECT * FROM projectPosts WHERE id = ?', [results.insertId]);
      res.status(201).json(newPost[0]);
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Failed to create new post!'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error occurred while creating the post!'
    });
  } finally {
    connection.release();
  }
}

// Delete project post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();

  try {
    const [deletePost] = await connection.query('SELECT * FROM projectPosts WHERE id = ?', [id]);
    if (deletePost.length > 0) {
      const [results] = await connection.query('DELETE FROM projectPosts WHERE id = ?', [id]);
      res.status(200).json({
        status: 'success',
        message: `Post with id ${id} deleted successfully!`
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Post not found!'
      });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error occurred while deleting the post!'
    });
  } finally {
    connection.release();
  }
}



