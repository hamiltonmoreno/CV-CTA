
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import OperationalHeader from './components/OperationalHeader';
import Home from './pages/Home';
import NotamsPage from './pages/Notams.tsx';
import DocumentsPage from './pages/Documents.tsx';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import News from './pages/News';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import { OperationalStatus } from './types';

const App: React.FC = () => {
  // Simple state simulation for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.hash = '#/';
  };

  return (
    <HashRouter>
      <Routes>
        {/* Routes with Navbar/Header Layout */}
        <Route element={
          <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 relative">
            <OperationalHeader 
              status={OperationalStatus.NORMAL} 
              date="14 OUT 2025"
            />
            <Navbar 
              isLoggedIn={isLoggedIn} 
              onLogoutClick={handleLogout}
            />
            <main className="flex-grow">
               <Home />
            </main>
            <Chatbot />
            <Footer />
          </div>
        } path="/" />

        {/* Define explicit routes that need layout wrapper if we want them separate from Home */}
        {/* For simplicity in this structure, I will wrap individual pages with a layout component or render them directly if they include nav */}
      </Routes>

      <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 relative">
        {/* Conditionally render Header/Navbar unless on Login page */}
        <Routes>
          <Route path="/login" element={null} />
          <Route path="*" element={
            <>
              <OperationalHeader 
                status={OperationalStatus.NORMAL} 
                date="14 OUT 2025"
              />
              <Navbar 
                isLoggedIn={isLoggedIn} 
                onLogoutClick={handleLogout}
              />
            </>
          } />
        </Routes>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notams" element={<NotamsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Login Page */}
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => setIsLoggedIn(true)} />} 
            />
            
            {/* Protected Route */}
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>

        {/* Footer and Chatbot only on non-login pages */}
        <Routes>
           <Route path="/login" element={null} />
           <Route path="*" element={
             <>
               <Chatbot />
               <Footer />
             </>
           } />
        </Routes>
      </div>
    </HashRouter>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
       <div>
          <h4 className="font-bold text-lg mb-4">CV-CTA</h4>
          <p className="text-gray-400 text-sm">
            Portal oficial para profissionais de controlo de tráfego aéreo em Cabo Verde.
          </p>
       </div>
       <div>
          <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-400">
             <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
             <li><a href="#" className="hover:text-white">Privacidade</a></li>
             <li><a href="#" className="hover:text-white">Reportar Erro</a></li>
          </ul>
       </div>
       <div>
          <h4 className="font-bold text-lg mb-4">Emergência</h4>
          <p className="text-gray-400 text-sm mb-2">Supervisor ACC: +238 123 4567</p>
          <p className="text-gray-400 text-sm">Tech Support: +238 987 6543</p>
       </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
       &copy; 2025 Cabo Verde CTA. Todos os direitos reservados.
    </div>
  </footer>
);

export default App;
