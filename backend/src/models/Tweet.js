const mongoose = require('mongoose');

// Cria um modelo de documento (schema) no banco de dados
// definindo o tipo das suas propriedades e o valor padrão
const TweetSchema = new mongoose.Schema({
  author: String,
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exportando...
module.exports = mongoose.model('Tweet', TweetSchema);
