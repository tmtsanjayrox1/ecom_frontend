import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>PhoneStore</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/cart" style={styles.link}>Cart</Link>
        {isLoggedIn ? (
          <>
            <span style={{ color: '#666' }}>Hi, {user.userName}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Log Out</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Log In</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid #ddd',
    marginBottom: '24px',
  },
  brand: { fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: '#222' },
  link: { textDecoration: 'none', color: '#222', fontWeight: 500 },
  logoutBtn: { background: 'none', border: '1px solid #ccc', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' },
};

export default Navbar;
