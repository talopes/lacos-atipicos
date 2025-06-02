require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const IntentForm = require('./models/IntentForm');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

// Rota principal
app.get('/', (req, res) => {
  res.render('index'); // Isso espera um arquivo views/index.ejs
});

// Rota POST do formulário
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
