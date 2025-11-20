
import React, { useState } from 'react';
import { MOCK_NEWS } from '../constants';
import { Calendar, ChevronRight, Tag, Search, X, Share2, Clock, Filter } from 'lucide-react';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | 'Operacional' | 'Formação' | 'Institucional'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({ start: '', end: '' });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Todas', 'Operacional', 'Formação', 'Institucional'];

  // Filter logic
  const filteredNews = MOCK_NEWS.filter(news => {
    // Category Filter
    const matchesCategory = selectedCategory === 'Todas' || news.category === selectedCategory;
    
    // Search Filter
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date Filter
    const newsDate = new Date(news.date);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    const matchesStart = !startDate || newsDate >= startDate;
    const matchesEnd = !endDate || newsDate <= endDate;

    return matchesCategory && matchesSearch && matchesStart && matchesEnd;
  });

  // Separate featured item (the first one) if filter is 'Todas', no search, and no date filter
  const isDefaultView = selectedCategory === 'Todas' && !searchQuery && !dateRange.start && !dateRange.end;
  const featuredNews = isDefaultView ? filteredNews[0] : null;
  const gridNews = featuredNews ? filteredNews.slice(1) : filteredNews;

  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article);
  };

  const clearFilters = () => {
    setSelectedCategory('Todas');
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sala de Imprensa</h1>
          <p className="text-gray-600 text-lg">Atualizações operacionais, comunicados oficiais e notícias da comunidade CTA.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Search and Filters Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Top Row: Categories & Mobile Filter Toggle */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-cv-blue text-white shadow-md shadow-blue-200'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden ml-auto p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Filters & Search Section */}
            <div className={`w-full lg:w-auto flex flex-col lg:flex-row gap-4 items-stretch lg:items-center ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
              
              {/* Date Range Inputs */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="bg-transparent text-sm text-gray-600 outline-none w-32"
                  placeholder="De"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="bg-transparent text-sm text-gray-600 outline-none w-32"
                  placeholder="Até"
                />
                {(dateRange.start || dateRange.end) && (
                  <button onClick={() => setDateRange({start: '', end: ''})} className="text-gray-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Pesquisar notícias..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none text-sm bg-white"
                />
                {searchQuery && (
                   <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                     <X className="w-3 h-3" />
                   </button>
                )}
              </div>

              {/* Clear All Button */}
              {!isDefaultView && (
                 <button 
                   onClick={clearFilters}
                   className="text-sm text-red-600 hover:text-red-800 font-medium px-2 whitespace-nowrap"
                 >
                   Limpar Filtros
                 </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Article Section */}
        {featuredNews && (
          <div 
            onClick={() => handleArticleClick(featuredNews)}
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12 cursor-pointer group"
          >
            <img 
              src={featuredNews.imageUrl} 
              alt={featuredNews.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
              <span className="inline-block bg-cv-blue text-white text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wider">
                {featuredNews.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                {featuredNews.title}
              </h2>
              <p className="text-gray-200 text-lg mb-6 line-clamp-2">
                {featuredNews.summary}
              </p>
              <div className="flex items-center gap-2 text-white font-medium">
                 Ler artigo completo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {gridNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridNews.map((news) => (
              <article 
                key={news.id} 
                onClick={() => handleArticleClick(news)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                     <span className={`
                       text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shadow-sm
                       ${news.category === 'Operacional' ? 'bg-red-100 text-red-800' : 
                         news.category === 'Formação' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}
                     `}>
                       {news.category}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3 h-3" /> {news.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-cv-blue transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {news.summary}
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-cv-blue text-sm font-medium group-hover:underline">Ler Mais</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cv-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
           <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                 <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nenhuma notícia encontrada</h3>
              <p className="text-gray-500">
                {dateRange.start || dateRange.end 
                  ? "Nenhum resultado neste intervalo de datas." 
                  : "Tente ajustar os filtros ou a pesquisa."}
              </p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-cv-blue font-medium hover:underline"
              >
                Limpar todos os filtros
              </button>
           </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div 
             className="bg-white w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto relative flex flex-col"
             onClick={(e) => e.stopPropagation()}
           >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur hover:bg-white p-2 rounded-full text-gray-800 hover:text-red-600 transition shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div className="h-64 md:h-80 w-full shrink-0 relative">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                   <span className="inline-block bg-cv-blue text-white text-xs font-bold px-2 py-1 rounded mb-2 uppercase">
                     {selectedArticle.category}
                   </span>
                   <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                     {selectedArticle.title}
                   </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10">
                 <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                       <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedArticle.date}</span>
                       <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> Notícia Oficial</span>
                       <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 3 min de leitura</span>
                    </div>
                    <button className="text-gray-500 hover:text-cv-blue flex items-center gap-2 text-sm font-medium">
                       <Share2 className="w-4 h-4" /> Partilhar
                    </button>
                 </div>

                 <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="font-medium text-xl text-gray-900 mb-6">
                       {selectedArticle.summary}
                    </p>
                    <p className="mb-4">
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="mb-4">
                       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <h4 className="font-bold text-gray-900 text-xl mt-8 mb-4">Impacto Operacional</h4>
                    <p className="mb-4">
                       Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <blockquote className="border-l-4 border-cv-blue pl-4 italic text-gray-900 my-8 bg-blue-50 p-4 rounded-r-lg">
                       "Esta iniciativa representa um passo fundamental na modernização contínua do espaço aéreo de Cabo Verde."
                       <span className="block text-sm font-bold text-gray-500 mt-2 not-italic">— Direção de Operações</span>
                    </blockquote>
                    <p>
                       Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                 </div>

                 <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                    >
                       Voltar para Notícias
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default News;