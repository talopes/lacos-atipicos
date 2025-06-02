require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const IntentForm = require('./models/IntentForm');

const app = express();

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/form', async (req, res) => {
  try {
    const novoForm = new IntentForm(req.body);
    await novoForm.save();
    res.send(`<h2>Obrigado pelo seu apoio!</h2><p>Entraremos em contato em breve.</p><a href=\"/\">Voltar</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar formulário.');
  }
});

module.exports = app;
