import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px' }}>
        <h2 className="heading-gradient" style={{ marginBottom: '24px', textAlign: 'center' }}>Welcome Back</h2>
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" style={{ width: '100%', marginTop: '8px' }}>Login</Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
