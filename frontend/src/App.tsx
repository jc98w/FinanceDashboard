import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import Navbar from './components/Navbar.tsx'
import LandingPage from './pages/LandingPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import AccountsPage from './pages/AccountsPage.tsx'

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider>
          <Navbar/>

          <div className="max-w-3xl text-center mx-auto space-y-10">
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<SignInPage />} />
              <Route path='/accounts' element={<AccountsPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
