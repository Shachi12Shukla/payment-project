import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Signup from "./pages/Signup.jsx"
import Signin from "./pages/Signin.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import SendMoney from './pages/SendMoney.jsx'
import TransferSuccess from "./pages/TransferSuccess.jsx"
import "./styles/global.css"
import AppLayout from "./layouts/AppLayout.jsx"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"
import PublicRoutes from './components/PublicRoutes.jsx'
import HomeRedirect from './components/HomeRedirect.jsx'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route element={<PublicRoutes/>}>
            <Route path='/user/signup' element={<Signup/>} />
            <Route path='/user/signin' element={<Signin/>} />
          </Route>

        {/* {Authenticated App} */}
          <Route element={<ProtectedRoutes/>}>
            <Route element={<AppLayout/>}>
              <Route path='/user/dashboard' element={<Dashboard/>} />
              <Route path='/user/send-money' element={<SendMoney/>} />
            </Route>

            <Route path='/transfer-success' element={<TransferSuccess/>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
