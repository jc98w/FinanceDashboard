import { Link } from 'react-router-dom'

export default function Navbar() {
  return(
      <nav className="bg-emerald-700 py-4 px-4 text-white mx-auto" >
        <ul className="flex gap-x-5 gap-y-1 flex-wrap">
          <li className="mr-auto"><Link to="/" className="btn-main">Home</Link></li>
          <li><Link to="/accounts" className="btn-main">Accounts</Link></li>
          <li><Link to="login" className="btn-main">Sign In</Link></li>
        </ul>
      </nav>
  )
}