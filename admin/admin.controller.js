import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getConnection from '../utils/connection.js';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const connection = await getConnection();
  try {
    const [results] = await connection.query('SELECT * FROM adminUsers WHERE email = ?', [email]);

    if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        const token = jwt.sign({
          email: email,
          id: results[0].id,
        }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.status(200).json({
          status: 'success',
          token: token,
          message: results[0]
        });
      } else {
        res.status(401).json({
          status: 'error',
          message: 'Email/Password does not match!'
        });
      }
    } else {
      res.status(404).json({
        status: 'error',
        message: 'No admin user with provided email found!'
      })
    }
  } catch (error) {
    console.log('An error occurred while processing your request.', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request.'
    });
  } finally {
    connection.release(); 
  }
}
