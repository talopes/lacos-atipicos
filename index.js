require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const IntentForm = require('./models/IntentForm'); // seu schema Mongoose
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON (necessário para o fetch do frontend funcionar)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

// Rota GET para servir index.html diretamente (caso não use ejs)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota POST para receber o formulário
app.post('/form', async (req, res) => {
  try {
    const novoForm = new IntentForm(req.body);
    await novoForm.save();
    res.status(200).json({ message: 'Intenção registrada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar intenção' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
