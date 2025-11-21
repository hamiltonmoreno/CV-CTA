
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 left-6 z-40 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4"
      title="Voltar ao Topo"
    >
      <ArrowUp className="w-5 h-5 text-gray-600 group-hover:text-cv-blue transition-colors" />
    </button>
  );
};

export default BackToTopButton;
