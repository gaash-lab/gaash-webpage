import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import NewsForm from './pages/NewsForm';
import Team from './pages/Team';
import TeamForm from './pages/TeamForm';
import Publications from './pages/Publications';
import PublicationForm from './pages/PublicationForm';
import Settings from './pages/Settings';
import AuditLogs from './pages/AuditLogs';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        
                        {/* News Routes */}
                        <Route path="/news" element={<News />} />
                        <Route path="/news/new" element={<NewsForm />} />
                        <Route path="/news/edit/:id" element={<NewsForm />} />
                        
                        {/* Team Routes */}
                        <Route path="/team" element={<Team />} />
                        <Route path="/team/new" element={<TeamForm />} />
                        <Route path="/team/edit/:id" element={<TeamForm />} />
                        
                        {/* Publications Routes */}
                        <Route path="/publications" element={<Publications />} />
                        <Route path="/publications/new" element={<PublicationForm />} />
                        <Route path="/publications/edit/:id" element={<PublicationForm />} />
                        
                        {/* Settings & Logs */}
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/audit-logs" element={<AuditLogs />} />
                        
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;