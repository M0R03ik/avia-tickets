import { Provider } from 'react-redux'
import './App.scss'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { store } from './store/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
    </>
  )
}

export default App
