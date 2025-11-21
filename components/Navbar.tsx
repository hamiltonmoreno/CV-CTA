
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Lock, User, Users, LogOut, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface Props {
  isLoggedIn: boolean;
  onLogoutClick: () => void;
  userRole?: UserRole;
}

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogoutClick, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Institucional', path: '/' },
    { name: 'Notícias', path: '/news' },
    { name: 'Profissão & Carreira', path: '/careers' },
    { name: 'Recursos Públicos', path: '/resources' },
    { name: 'Contactos', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  const closeMenu = () => setIsOpen(false);

  const isAdmin = userRole === UserRole.ADMIN;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3" onClick={closeMenu}>
              <div className="bg-cv-blue text-white p-2 rounded-lg shadow-sm">
                <Plane className="w-6 h-6 transform -rotate-45" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-cv-blue text-lg leading-none mb-0.5">CV-CTA</span>
                <span className="text-[0.65rem] text-gray-500 uppercase tracking-wider font-medium">Portal dos Controladores</span>
              </div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'border-cv-blue text-cv-blue'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-50 text-red-700 text-sm font-medium border border-red-100 hover:bg-red-100">
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                 <Link to="/dashboard" className="text-sm font-medium text-cv-blue hover:text-blue-800">
                  Dashboard Membro
                </Link>
                <button
                  onClick={onLogoutClick}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Sair
                </button>
                <div className="h-9 w-9 rounded-full bg-cv-blue flex items-center justify-center text-white shadow-sm ring-2 ring-offset-2 ring-blue-100">
                  <User size={18} />
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-all shadow-sm border border-transparent hover:shadow-md"
              >
                <Lock className="w-4 h-4 text-gray-300" />
                Área do Associado
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-50 animate-in slide-in-from-top-5 duration-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                  isActive(link.path)
                    ? 'border-cv-blue text-cv-blue bg-blue-50'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
             <div className="mt-4 pt-4 border-t border-gray-200 px-4 pb-4 space-y-3">
                {isLoggedIn ? (
                   <>
                     {isAdmin && (
                       <Link 
                         to="/admin" 
                         onClick={closeMenu}
                         className={`flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                           isActive('/admin') ? 'border-red-500 text-red-700 bg-red-50' : 'border-transparent text-gray-600 hover:bg-gray-50'
                         }`}
                       >
                          <ShieldCheck className="w-5 h-5" /> Painel Admin
                       </Link>
                     )}
                     <Link 
                       to="/dashboard" 
                       onClick={closeMenu}
                       className={`flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                         isActive('/dashboard') ? 'border-cv-blue text-cv-blue bg-blue-50' : 'border-transparent text-gray-600 hover:bg-gray-50'
                       }`}
                     >
                        <User className="w-5 h-5" /> Dashboard
                     </Link>
                     <Link 
                       to="/association" 
                       onClick={closeMenu}
                       className={`flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                         isActive('/association') ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-transparent text-gray-600 hover:bg-gray-50'
                       }`}
                     >
                        <Users className="w-5 h-5" /> Associação
                     </Link>
                     <button 
                       onClick={() => {onLogoutClick(); closeMenu();}} 
                       className="w-full text-left flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                     >
                        <LogOut className="w-5 h-5" /> Sair
                     </button>
                   </>
                ) : (
                  <Link to="/login" onClick={closeMenu} className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg font-medium shadow-sm hover:bg-gray-800 transition-colors">
                    <Lock className="w-4 h-4" /> Login Associado
                  </Link>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;