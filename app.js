import cors from 'cors';
import mysql from 'mysql2/promise'
import express from 'express';
import { router } from './api.routes.js';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import getConnection from './utils/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/static', express.static(join(__dirname, 'public')))
app.use('/', router);

const connectionPool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  })
})

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`)
});


