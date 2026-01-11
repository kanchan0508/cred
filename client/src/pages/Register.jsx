import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(username, email, password);
    if (res.success) {
      navigate('/login');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px' }}>
        <h2 className="heading-gradient" style={{ marginBottom: '24px', textAlign: 'center' }}>Create Account</h2>
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" style={{ width: '100%', marginTop: '8px' }}>Sign Up</Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
