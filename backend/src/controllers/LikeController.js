const Tweet = require('../models/Tweet');

module.exports = {
  // Salva um novo like, buscando-o primeiro com o id recebido na url para adicionar mais 1 no tweet
  // e emite o evento
  async store(req, res) {
    const tweet = await Tweet.findById(req.params.id);
    tweet.set({
      likes: tweet.likes + 1,
    });
    await tweet.save();

    req.io.emit('like', tweet);

    return res.json(tweet);
  },
};
