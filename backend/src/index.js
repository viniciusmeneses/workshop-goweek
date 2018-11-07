const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Inicializando o socket.io para funcionar o realtime
// Passando o servidor http do express para funcionar nesse protocolo também
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Conectando com o MongoDB
mongoose.connect(
  'mongodb://goweek:goweek123@ds155243.mlab.com:55243/backend-goweek',
  {
    useNewUrlParser: true,
  },
);

// Adicionando uma propriedade .io na requisição com middleware e prosseguindo para a rota desejada
app.use((req, res, next) => {
  req.io = io;
  return next();
});

// Habilitando cors, passando as rotas e habilitando JSON para todas as requisições
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

// Usar o server http criado!!!
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
