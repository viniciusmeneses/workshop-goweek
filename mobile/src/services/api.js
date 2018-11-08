import axios from 'axios'
// Para referenciar o localhost no emulador do android studio:
// 10.0.2.2

// Para o genymotion:
// 10.0.3.2

// No iOS:
// localhost

const api = axios.create({
  baseURL: 'http://10.0.3.2:3000'
})

export default api
