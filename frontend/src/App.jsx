import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageCadastro from './Pages/PageCadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<PageCadastro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
