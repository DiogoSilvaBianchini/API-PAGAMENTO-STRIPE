import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header auth={false}/>
        <Routes>
          <Route to="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
