const mongoose = require('mongoose');

const IntentFormSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  tipoApoio: String,
  valorEstimado: String,
  mensagem: String,
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IntentForm', IntentFormSchema);
