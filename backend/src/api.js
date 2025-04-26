import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { validateRegistration } from './validations/registrationValidation.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
}));

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.post('/registration', (req, res) => {
	const errors = validateRegistration(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      errors
    });
  }

  try {
    res.json({ 
      success: true,
      message: 'Cadastro realizado com sucesso!',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro!',
      error: error.message
    });
  }
});

app.listen(process.env.PORT, () => {
	console.log('Servidor rodando');
});