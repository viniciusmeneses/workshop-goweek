import React, { Component } from 'react'

// Importa os componentes do react-native que serão usados nesse componente (não usa HTML)
// View é como se fosse uma div
// TouchableOpacity é um botão sem estilo
// KeyboardAvoidingView é um componente para o teclado não tampar a tela quando for aberto nos inputs
// AsyncStogare é como o localStorage da web só que é assíncrono
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native'

import { StackActions, NavigationActions } from 'react-navigation'

// Pacote de icones em forma te vetor
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
  // Sobrescreve a variável navigationOptions onde o react-navigation vai lê-la
  // header: null retira o header padrão
  static navigationOptions = {
    header: null
  }

  state = {
    username: ''
  }

  async componentDidMount() {
    // Se o usuário já existir no AsyncStorage
    const username = await AsyncStorage.getItem('@GoTwitter:username')

    //Navega para a timeline
    if (username) {
      this.navigateToTimeline()
    }
  }

  handleInputChange = username => {
    this.setState({
      username
    })
  }

  handleLogin = async () => {
    const { username } = this.state

    if (!username.length) return

    await AsyncStorage.setItem('@GoTwitter:username', username)

    this.navigateToTimeline()
  }

  // Reseta o histórico de páginas e passa uma nova ação
  // para navegar para a Timeline
  navigateToTimeline = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Timeline'
        })
      ]
    })

    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

// Os estilos no react-native são parecidos com CSS (em formato camelCase) e os filhos não herdam os estilos dos pais
// O estilo deve ser criado com StyleShett.create() e acessado através do objeto styles criado
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
})
