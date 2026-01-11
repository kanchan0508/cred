import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return !user ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* Public Routes (only if not logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
