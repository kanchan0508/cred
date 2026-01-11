import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '16px 0' }}>
      <div className="page-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="heading-gradient" style={{ fontSize: '1.5rem', margin: 0 }}>NebulaTasks</h1>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <User size={18} />
                <span style={{ fontWeight: 500 }}>{user.username}</span>
              </div>
              <button 
                onClick={logout} 
                className="btn btn-glass"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
             <div style={{ color: 'var(--text-muted)' }}>Welcome Guest</div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
