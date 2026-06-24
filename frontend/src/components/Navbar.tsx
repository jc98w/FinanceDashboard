import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.tsx'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return(
      <nav className="bg-emerald-700 py-4 px-4 text-white mx-auto" >
        <ul className="flex gap-x-5 gap-y-1 flex-wrap">
          <li className="mr-auto"><Link to="/" className="btn-main"><i className='fa fa-home'></i> Home</Link></li>

          { isAuthenticated ? (
            <>
              {/* Navbar options when logged in */}
              <li><Link to="/accounts" className="btn-main">Accounts</Link></li>
              <li><Link to="/" className="btn-main" onClick={ logout }>Logout</Link></li>
            </>
          ) : (
            <>
              {/* Navbar options when logged out */}
              <li><Link to="/register" className="btn-main">Register</Link></li>
              <li><Link to="login" className="btn-main">Sign In</Link></li>
            </>
          )}
        </ul>
      </nav>
  )
}