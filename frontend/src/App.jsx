import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageCadastro from './Pages/PageCadastro';
import PageLogin from './Pages/PageLogin';
import PagePainelContrato from './Pages/PagePainelContrato';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<PageCadastro />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/painel/contrato" element={<PagePainelContrato />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
