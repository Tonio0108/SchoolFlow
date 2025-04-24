import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Classes from './pages/Classes'
function App() {

  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
