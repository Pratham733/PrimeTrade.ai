import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { NavbarMinimalColored } from './components/NavbarMinimalColored';
import { useAuth } from './context/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import './index.css';
import { MantineProvider } from '@mantine/core';

const AppContent = () => {
  const { user, loading } = useAuth();

  // while auth is initializing, show a minimal loading state
  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        {user && <NavbarMinimalColored />}
        <main style={{ marginLeft: user ? 80 : 0, flexGrow: 1 }}>
          <Routes>
            {/* default: if authenticated -> dashboard, else -> login */}
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<div className="p-6">Not found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const App = () => (
  <MantineProvider>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </MantineProvider>
);

export default App;