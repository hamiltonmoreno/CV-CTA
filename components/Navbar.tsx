
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Lock, User, Users, LogOut, ShieldCheck, Globe, UserCircle } from 'lucide-react';
import { UserRole, MemberProfile } from '../types';

interface Props {
  isLoggedIn: boolean;
  onLogoutClick: () => void;
  userRole?: UserRole;
  userProfile?: MemberProfile;
}

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogoutClick, userRole, userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
  const toggleLang = () => setLang(prev => prev === 'PT' ? 'EN' : 'PT');

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
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-cv-blue transition"
            >
              <Globe className="w-4 h-4" /> {lang}
            </button>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-50 text-red-700 text-sm font-medium border border-red-100 hover:bg-red-100">
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                 <Link to="/dashboard" className="text-sm font-medium text-cv-blue hover:text-blue-800">
                  Dashboard
                </Link>
                
                {/* User Dropdown / Links */}
                <div className="relative group">
                   <button className="h-9 w-9 rounded-full bg-cv-blue flex items-center justify-center text-white shadow-sm ring-2 ring-offset-2 ring-blue-100 cursor-pointer">
                      <User size={18} />
                   </button>
                   {/* Dropdown Menu */}
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all transform origin-top-right z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                         <p className="text-sm font-bold text-gray-900 truncate">{userProfile?.name || 'Utilizador'}</p>
                         <p className="text-xs text-gray-500 truncate">{userProfile?.email || 'user@cta.cv'}</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cv-blue">
                         Meu Perfil
                      </Link>
                      <Link to="/association" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-cv-blue">
                         Associação
                      </Link>
                      <button 
                        onClick={onLogoutClick}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sair
                      </button>
                   </div>
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

      {/* Mobile menu Overlay & Content */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="md:hidden fixed inset-y-0 right-0 w-3/4 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
               <span className="font-bold text-gray-900">Menu</span>
               <button onClick={closeMenu} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="pt-2 pb-3 px-2 space-y-1 overflow-y-auto flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-cv-blue bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
               
               <div className="mt-6 pt-6 border-t border-gray-100 px-2 space-y-3">
                  {isLoggedIn ? (
                     <>
                       <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-900">{userProfile?.name}</p>
                          <p className="text-xs text-gray-500">{userProfile?.license}</p>
                       </div>
                       {isAdmin && (
                         <Link 
                           to="/admin" 
                           onClick={closeMenu}
                           className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                             isActive('/admin') ? 'text-red-700 bg-red-50' : 'text-gray-600 hover:bg-gray-50'
                           }`}
                         >
                            <ShieldCheck className="w-5 h-5" /> Painel Admin
                         </Link>
                       )}
                       <Link 
                         to="/dashboard" 
                         onClick={closeMenu}
                         className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                           isActive('/dashboard') ? 'text-cv-blue bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                         }`}
                       >
                          <User className="w-5 h-5" /> Dashboard
                       </Link>
                       <Link 
                         to="/profile" 
                         onClick={closeMenu}
                         className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                           isActive('/profile') ? 'text-cv-blue bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                         }`}
                       >
                          <UserCircle className="w-5 h-5" /> Meu Perfil
                       </Link>
                       <Link 
                         to="/association" 
                         onClick={closeMenu}
                         className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                           isActive('/association') ? 'text-purple-700 bg-purple-50' : 'text-gray-600 hover:bg-gray-50'
                         }`}
                       >
                          <Users className="w-5 h-5" /> Associação
                       </Link>
                       <button 
                         onClick={() => {onLogoutClick(); closeMenu();}} 
                         className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                       >
                          <LogOut className="w-5 h-5" /> Sair
                       </button>
                     </>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={closeMenu} 
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
                    >
                      <Lock className="w-4 h-4 text-gray-400" /> Login Associado
                    </Link>
                  )}
               </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400">
               &copy; 2025 CV-CTA Portal
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
