import React, { Component } from 'react'

import twitterLogo from '../twitter.svg'
import './Login.css'

export default class Login extends Component {
  state = {
    username: ''
  }

  // Sempre que criamos uma função que não é do escopo padrão
  // da classe Component, criamos ela com arrow function para o
  // this continuar apontando sempre para o componente
  handleInputChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { username } = this.state

    if (!username.length) return

    localStorage.setItem('@GoTwitter:username', username)

    // Propriedade disponível porque estamos usando react-router-dom
    // Redireciona para a URL
    this.props.history.push('/timeline')
  }

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form onSubmit={this.handleSubmit}>
           <input value={this.state.username} onChange={this.handleInputChange} placeholder="Nome de usuário" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}
