import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { LawyersProvider } from './contexts/LawyersContext';
import { GuidesProvider } from './contexts/GuidesContext';
import { AIAssistantProvider } from './contexts/AIAssistantContext';

// Pages
import HomePage from './pages/HomePage';
import LegalGuidesPage from './pages/LegalGuidesPage';
import AIAssistantPage from './pages/AIAssistantPage';
import LawyersPage from './pages/LawyersPage';
import CommunityPage from './pages/CommunityPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <LawyersProvider>
          <GuidesProvider>
            <AIAssistantProvider>
              <Router>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  
                  <main className="flex-grow">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/guides" element={<LegalGuidesPage />} />
                        <Route path="/ai-assistant" element={<AIAssistantPage />} />
                        <Route path="/lawyers" element={<LawyersPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                      </Routes>
                    </motion.div>
                  </main>
                  
                  <Footer />
                </div>
              </Router>
            </AIAssistantProvider>
          </GuidesProvider>
        </LawyersProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;