
import React, { useState, useEffect } from 'react';
import { MOCK_NEWS } from '../constants';
import { Calendar, ChevronRight, ChevronLeft, Tag, Search, X, Share2, Clock, Filter, User, Bookmark } from 'lucide-react';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | 'Operacional' | 'Formação' | 'Institucional'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({ start: '', end: '' });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const categories = ['Todas', 'Operacional', 'Formação', 'Institucional'];

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, dateRange]);

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

  // Pagination Logic
  const totalPages = Math.ceil(gridNews.length / ITEMS_PER_PAGE);
  const paginatedNews = gridNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article);
  };

  const clearFilters = () => {
    setSelectedCategory('Todas');
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
  };

  // Helper to estimate reading time
  const calculateReadingTime = (text: string) => {
    // Simulating full content length by multiplying summary
    const simulatedWordCount = text.split(' ').length * 5; 
    const wordsPerMinute = 200;
    const minutes = Math.ceil(simulatedWordCount / wordsPerMinute);
    return `${minutes} min de leitura`;
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
        {paginatedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.map((news) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
               <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-gray-200">
                   <button
                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                       disabled={currentPage === 1}
                       className="p-2 rounded-lg border border-gray-300 hover:bg-white hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white text-gray-600"
                   >
                       <ChevronLeft className="w-5 h-5" />
                   </button>
                   
                   {/* Page Numbers (Simplified) */}
                   <div className="flex gap-2">
                      {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors flex items-center justify-center ${
                                currentPage === page 
                                ? 'bg-cv-blue text-white shadow-md' 
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            {page}
                        </button>
                      ))}
                   </div>

                   <button
                       onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                       disabled={currentPage === totalPages}
                       className="p-2 rounded-lg border border-gray-300 hover:bg-white hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white text-gray-600"
                   >
                       <ChevronRight className="w-5 h-5" />
                   </button>
               </div>
            )}
          </>
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

              {/* Modal Image Header */}
              <div className="h-64 md:h-80 w-full shrink-0 relative">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                   <div className="flex items-center gap-3 mb-3">
                      <span className={`
                       text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide
                       ${selectedArticle.category === 'Operacional' ? 'bg-red-600 text-white' : 
                         selectedArticle.category === 'Formação' ? 'bg-amber-500 text-white' : 'bg-cv-blue text-white'}
                     `}>
                       {selectedArticle.category}
                     </span>
                     <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {selectedArticle.date}
                     </span>
                   </div>
                   <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
                     {selectedArticle.title}
                   </h2>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-6 md:p-10">
                 
                 {/* Metadata Row */}
                 <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                    <div className="flex items-center gap-4 md:gap-6 text-sm text-gray-500">
                       <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-cv-blue" /> 
                          {calculateReadingTime(selectedArticle.summary)}
                        </span>
                       <span className="hidden md:flex items-center gap-2">
                          <User className="w-4 h-4" /> Por Gabinete de Comunicação
                       </span>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-gray-500 hover:text-cv-blue p-2 rounded-full hover:bg-gray-50 transition" title="Guardar">
                          <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-cv-blue p-2 rounded-full hover:bg-gray-50 transition" title="Partilhar">
                          <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                 </div>

                 {/* Rich Text Content */}
                 <div className="prose prose-lg max-w-none text-gray-700">
                    {/* Lead Paragraph */}
                    <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-8 font-sans">
                       {selectedArticle.summary}
                    </p>

                    <div className="space-y-6 text-base md:text-lg leading-relaxed">
                        <p>
                           Para garantir a segurança contínua e a eficiência das operações aéreas na <span className="font-semibold text-gray-900">Região de Informação de Voo do Sal</span>, a CV-CTA continua a implementar melhorias estratégicas alinhadas com as normas internacionais da ICAO. Esta atualização reflete o nosso compromisso inabalável com a excelência operacional.
                        </p>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Pontos Chave da Atualização</h3>
                        <ul className="list-disc pl-6 space-y-2 marker:text-cv-blue">
                          <li>Reforço dos protocolos de segurança e contingência.</li>
                          <li>Alinhamento com novos requisitos de sustentabilidade ambiental.</li>
                          <li>Otimização de fluxos de tráfego para reduzir atrasos.</li>
                        </ul>

                        <p>
                           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        {/* Styled Blockquote */}
                        <blockquote className="my-10 p-6 md:p-8 bg-blue-50 border-l-4 border-cv-blue rounded-r-xl relative">
                           <svg className="absolute top-4 left-4 w-8 h-8 text-blue-200 -z-10 transform -translate-x-2 -translate-y-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                             <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                           </svg>
                           <p className="text-lg md:text-xl italic text-gray-800 font-serif relative z-10">
                             "Esta iniciativa representa um passo fundamental na modernização contínua do espaço aéreo de Cabo Verde, garantindo que permanecemos na vanguarda da aviação civil no Atlântico."
                           </p>
                           <footer className="mt-4 flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                             <div>
                               <div className="text-sm font-bold text-gray-900">Direção de Operações</div>
                               <div className="text-xs text-gray-500">CV-CTA Board</div>
                             </div>
                           </footer>
                        </blockquote>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Próximos Passos</h3>
                        <p>
                           As equipas técnicas iniciarão a fase de implementação nas próximas semanas. Solicita-se a todos os colaboradores que consultem a documentação técnica detalhada disponível na Área do Associado.
                        </p>
                    </div>
                 </div>

                 <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                    >
                       Voltar para a Lista de Notícias
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
