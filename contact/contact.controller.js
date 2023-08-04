import getConnection from '../utils/connection.js';

// visitors send comments to admin - POST
export const sendMessages = async (req, res) => {
  const { name, email, message } = req.body;
  const connection = await getConnection();

  try {
    const [results] = await connection.query('INSERT INTO visitorsForm (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    if (results.affectedRows > 0) {
      const [newMessage] = await connection.query('SELECT * FROM visitorsForm where id=?', [results.insertId]);
      res.status(201).json({
        status: 'success',
        message: newMessage[0]});
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Failed to send message!'
      })
    }
  } catch (error) {
    console.error('Error occurred while sending message: ', error.message);;
    res.status(500).json({
      status: 'error',
      message: 'Error occurred while sending message.'
    })
  } finally {
    connection.release();
  }
}

// Get all messages 
export const getAllMessages = async (req, res) => {
  const connection = await getConnection();
  try {
    const [results] = await connection.query('SELECT * FROM visitorsForm');
    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving messages.'
    });
  } finally {
    connection.release();
  }
}