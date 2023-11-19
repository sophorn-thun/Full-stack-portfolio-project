import cors from 'cors';
import express from 'express';
import { router } from './api.routes.js';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use(express.static(join(__dirname, 'public')));

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
