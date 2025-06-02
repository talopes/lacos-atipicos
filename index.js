require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const IntentForm = require('./models/IntentForm');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Rota de formulário
app.post('/form', async (req, res) => {
  try {
    const novoForm = new IntentForm(req.body);
    await novoForm.save();
    res.send(`
      <h2>Obrigado pelo seu apoio!</h2>
      <p>Entraremos em contato em breve.</p>
      <a href="/">Voltar para o site</a>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar formulário.');
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
