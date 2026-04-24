import { Link, useLocation } from 'react-router-dom';
import { Users, Moon, Sun, BarChart3 } from 'lucide-react';

const Navbar = ({ darkMode, onToggleDarkMode }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-brand">
          <Users size={28} />
          <span>TeamSync</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <BarChart3 size={16} /> Dashboard
          </Link>
          <Link 
            to="/members" 
            className={`nav-link ${location.pathname === '/members' ? 'active' : ''}`}
          >
            View Members
          </Link>
          <Link 
            to="/add-member" 
            className="btn btn-primary"
          >
            Add Member
          </Link>
          <button 
            onClick={onToggleDarkMode}
            className="btn btn-outline"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ padding: '0.625rem', minWidth: 'auto' }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
