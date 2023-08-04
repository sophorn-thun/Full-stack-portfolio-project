import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authorization failed',
    })
   }
}
