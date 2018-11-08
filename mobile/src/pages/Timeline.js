import React, { Component } from 'react'
import api from '../services/api'
import socket from 'socket.io-client'

import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

import Tweet from '../components/Tweet'

import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Timeline extends Component {
  // A variável estática navigationOptions também pode receber uma função
  // onde o primeiro parametro é um objeto que vai ser desestruturado para somente pegarmos o navigation
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    // Do lado direito vai ser criado um botão no header, que vai navegar para o componente New quando clicado
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    )
  })

  state = {
    tweets: []
  }

  async componentDidMount() {
    this.subscribeToEvents()

    const response = await api.get('tweets')
    this.setState({
      tweets: response.data
    })
  }

  subscribeToEvents = () => {
    const io = socket('http://10.0.3.2:3000')

    io.on('tweet', data => {
      this.setState({
        tweets: [data, ...this.state.tweets]
      })
    })
    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet)
      })
    })
  }

  // FlatList é utilizada para dar mais performance a listas de componentes criadas com map no React
  // passamos para a propriedade data um array com os elementos
  // passamos uma função para extrair a key para cada componente gerado
  // e outra função para renderizar cada item
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})
