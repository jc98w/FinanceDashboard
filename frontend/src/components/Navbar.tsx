import { Link } from 'react-router-dom'

export default function Navbar() {
  return(
      <nav className="bg-emerald-700 py-4 px-4 text-white mx-auto" >
        <ul className="uppercase text-sm tracking-wider flex gap-x-5 gap-y-1 flex-wrap">
          <li className="mr-auto"><Link to="/" className="hover:bg-emerald-500 p-4 rounded-sm">Home</Link></li>
          <li><Link to="/accounts" className="hover:bg-emerald-500 p-4 rounded-sm">Accounts</Link></li>
          <li><Link to="login" className="hover:bg-emerald-500 p-4 rounded-sm">Sign In</Link></li>
        </ul>
      </nav>
  )
}