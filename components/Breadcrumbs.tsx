import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap: Record<string, string> = {
    dashboard: 'Dashboard',
    association: 'Associação',
    news: 'Notícias',
    careers: 'Carreiras',
    contact: 'Contactos',
    resources: 'Recursos Públicos',
    notams: 'NOTAMs',
    documents: 'Documentos',
    login: 'Login',
    register: 'Registo'
  };

  return (
    <nav className="flex text-gray-500 text-sm mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-cv-blue transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Início
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = routeNameMap[value] || value;

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="ml-1 md:ml-2 font-medium text-gray-700 capitalize">{name}</span>
                ) : (
                  <Link to={to} className="ml-1 md:ml-2 hover:text-cv-blue transition-colors capitalize">
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;