// createStackNavigator - navegação por clique/botões - se fosse por abas, seria outra
import { createStackNavigator } from 'react-navigation'

import Login from './pages/Login'
import Timeline from './pages/Timeline'
import New from './pages/New'

// Cria a navegação passando os componentes que serão as rotas e exporta-a
const Routes = createStackNavigator({
  Login,
  Timeline,
  New
})

export default Routes
