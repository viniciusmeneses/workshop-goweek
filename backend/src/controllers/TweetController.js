const Tweet = require('../models/Tweet');

module.exports = {
  // Retorna todos tweets em ordem decrecente por data
  async index(req, res) {
    // -createdAt significa decrecente
    const tweets = await Tweet.find({}).sort('-createdAt');
    return res.json(tweets);
  },

  // Salva um novo tweet no banco de dados
  async store(req, res) {
    // Cria um novo tweet e emite um evento tweet com o socket.io que será ouvido no front-end para funcionar e atualizar o realtime
    const tweet = await Tweet.create(req.body);

    req.io.emit('tweet', tweet);

    return res.json(tweet);
  },
};
