import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Classes from './pages/Classes';
import Salles from './pages/Salles';
import Professeurs from './pages/Professeurs';
import Matieres from './pages/Matieres';
import Edt from './pages/Edt';
function App() {

  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emploi_du_temps" element={<Edt />} />
        <Route path="/matieres" element={<Matieres />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/salles" element={<Salles />} />
        <Route path="/professeurs" element={<Professeurs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
