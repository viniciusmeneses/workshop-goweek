import axios from 'axios'

// Cria uma nova configuração no axios e exporta-a com uma baseURL definida para todas as requisições
const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export default api
