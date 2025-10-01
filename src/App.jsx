import Sidebar from './SIdeBar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterUser from './RegisterUser'
import LoginPage from './LoginPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterUser />}></Route>
          <Route path="/admin-dashboard" element={<Sidebar />}></Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
