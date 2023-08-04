import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connectionPool;

// async function startConnectionPool() {
//   if (!connectionPool) {
//     connectionPool = mysql.createPool({
//       host: '127.0.0.1',
//       user: 'root',
//       password: 'Ilovemymom012@',
//       database: 'portfolio_website',
      
//     });
//     console.log('Connection pool created');
//   }
// }

async function startConnectionPool() {
  if (!connectionPool) {
    const dbUrl = new URL(process.env.CLEARDB_DATABASE_URL);
    
    const host = dbUrl.hostname;
    const user = dbUrl.username;
    const password = dbUrl.password;
    const database = dbUrl.pathname.substr(1);

    connectionPool = mysql.createPool({
      host,
      user,
      password,
      database,
    })
  }
}


async function getConnection() {
  try {
    const connection = await connectionPool.getConnection();
    console.log('Connection acquired from the pool');
    return connection;
  } catch (error) {
    console.log('Errors occurred when acquiring a connection from the pool:', error);
    throw error;
  }
}

startConnectionPool();

export default getConnection;