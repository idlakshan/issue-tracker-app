import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/register'
import Login from './pages/login'

function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
