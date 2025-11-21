
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import OperationalHeader from './components/OperationalHeader';
import Home from './pages/Home';
import NotamsPage from './pages/Notams';
import DocumentsPage from './pages/Documents';
import Dashboard from './pages/Dashboard';
import Association from './pages/Association';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import News from './pages/News';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicResources from './pages/PublicResources';
import AdminPanel from './pages/AdminPanel';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile'; // New Page
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import { OperationalStatus, UserRole, KnowledgeItem, MemberProfile } from './types';
import { INITIAL_KNOWLEDGE_BASE, MOCK_MEMBER_PROFILE } from './constants';

// Layout Wrapper for standard pages (Header + Nav + Content + Footer)
const MainLayout: React.FC<{isLoggedIn: boolean, userRole?: UserRole, onLogout: () => void, knowledgeBase: KnowledgeItem[], userProfile?: MemberProfile}> = ({ isLoggedIn, userRole, onLogout, knowledgeBase, userProfile }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 relative">
      <OperationalHeader 
        status={OperationalStatus.NORMAL} 
        date="14 OUT 2025"
      />
      <Navbar 
        isLoggedIn={isLoggedIn}
        userRole={userRole} 
        onLogoutClick={onLogout}
        userProfile={userProfile}
      />
      <main className="flex-grow">
         <Outlet />
      </main>
      <Chatbot knowledgeBase={knowledgeBase} />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PUBLIC);
  
  // Centralized State for AI Knowledge Base
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>(INITIAL_KNOWLEDGE_BASE);

  // Centralized State for User Profile (Single Source of Truth)
  const [userProfile, setUserProfile] = useState<MemberProfile>(MOCK_MEMBER_PROFILE);

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(UserRole.PUBLIC);
    window.location.hash = '#/';
  };

  const handleUpdateProfile = (updatedData: Partial<MemberProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes (No Layout) */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? (
              <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 relative">
                 <OperationalHeader status={OperationalStatus.NORMAL} date="14 OUT 2025" />
                 <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogoutClick={handleLogout} userProfile={userProfile} />
                 <main className="flex-grow">
                    <Dashboard userRole={userRole} userProfile={userProfile} />
                 </main>
                 <Chatbot knowledgeBase={knowledgeBase} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/association" 
          element={
            isLoggedIn ? (
              <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 relative">
                 <OperationalHeader status={OperationalStatus.NORMAL} date="14 OUT 2025" />
                 <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogoutClick={handleLogout} userProfile={userProfile} />
                 <main className="flex-grow">
                    <Association userRole={userRole} userProfile={userProfile} />
                 </main>
                 <Chatbot knowledgeBase={knowledgeBase} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/profile" 
          element={
            isLoggedIn ? (
              <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 relative">
                 <OperationalHeader status={OperationalStatus.NORMAL} date="14 OUT 2025" />
                 <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogoutClick={handleLogout} userProfile={userProfile} />
                 <main className="flex-grow">
                    <Profile userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
                 </main>
                 <Chatbot knowledgeBase={knowledgeBase} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route 
          path="/admin" 
          element={
            isLoggedIn && userRole === UserRole.ADMIN ? (
              <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 relative">
                 <OperationalHeader status={OperationalStatus.NORMAL} date="14 OUT 2025" />
                 <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogoutClick={handleLogout} userProfile={userProfile} />
                 <main className="flex-grow">
                    <AdminPanel knowledgeBase={knowledgeBase} onUpdateKnowledgeBase={setKnowledgeBase} />
                 </main>
                 <Chatbot knowledgeBase={knowledgeBase} />
              </div>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />

        {/* Public Routes (Wrapped in MainLayout) */}
        <Route element={<MainLayout isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} knowledgeBase={knowledgeBase} userProfile={userProfile} />}>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<PublicResources />} />
          <Route path="/notams" element={<NotamsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>

        {/* Catch all - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
