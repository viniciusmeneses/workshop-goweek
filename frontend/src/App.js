import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Timeline from './pages/Timeline'

class App extends Component {
  render() {
    // BrowserRouter é o router que vai controlar as páginas a serem exibidas de acordo com a URL
    // Switch vai fazer com que só um componente (Route) por URL/Rota
    // Propriedade exact faz com que seja necessário a url ser exatamente / para carregar o componente Login
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline"component={Timeline} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
