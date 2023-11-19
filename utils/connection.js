import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connectionPool;

async function startConnectionPool() {
  if (!connectionPool) {
    try {
      const host = process.env.MYSQL_HOST || 'localhost'; 
      const user = process.env.MYSQL_USER;
      const password = process.env.MYSQL_PASSWORD;
      const database = process.env.MYSQL_DATABASE;

      if (! host || !user || !password || !database) {
        throw new Error('Missing required environment variables for MySQL connection');
      }

      connectionPool = mysql.createPool({
        host,
        user,
        password,
        database,
      });

      console.log('Connection pool created');
    } catch (error) {
      console.error('Error initializing the connection pool:', error);
      connectionPool = null; 
    }
  }
}

async function getConnection() {
  try {
    const connection = await connectionPool.getConnection();
    console.log('Connection acquired from the pool');
    return connection;
  } catch (error) {
    console.error('Errors occurred when acquiring a connection from the pool:', error);
    throw error;
  }
}

startConnectionPool();

export default getConnection;
