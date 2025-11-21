
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, FileText, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_DOCS, DOC_CONTENTS } from '../constants';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: string[]; // Used to show which docs were used
}

// System instruction defines Persona and Constraints
const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual Inteligente do Portal CV-CTA (Controladores de Tráfego Aéreo de Cabo Verde).
A sua função é responder a perguntas baseando-se ESTRITAMENTE no contexto dos documentos fornecidos na mensagem.

REGRAS:
1. Analise profundamente o "CONTEXTO RECUPERADO".
2. Se a resposta estiver no contexto, cite o nome do documento ou a versão se disponível.
3. Se a resposta NÃO estiver no contexto, diga: "Desculpe, não encontrei essa informação nos documentos disponíveis (Manuais TWR, Fraseologia ou Regulamentos)."
4. Não invente procedimentos que não estejam no contexto.
5. Mantenha um tom profissional, técnico e direto.
`;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'model', text: 'Olá! Sou o assistente virtual do CV-CTA. Posso consultar os manuais de operações, fraseologia e regulamentos da FIR Sal. Como posso ajudar?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Simple RAG Retrieval Logic (Client-Side)
  const retrieveContext = (query: string): { contextText: string, sourceTitles: string[] } => {
    const queryLower = query.toLowerCase();
    const relevantChunks: string[] = [];
    const sources: Set<string> = new Set();

    // Search through Document Metadata and Content
    MOCK_DOCS.forEach(doc => {
      const content = DOC_CONTENTS[doc.id];
      const titleMatch = doc.title.toLowerCase().includes(queryLower);
      const contentMatch = content ? content.toLowerCase().includes(queryLower) : false;

      // If the user asks about a specific doc title, or the content matches keywords
      if (titleMatch || contentMatch) {
        sources.add(doc.title);
        relevantChunks.push(`
--- INÍCIO DOCUMENTO ---
ID: ${doc.id}
TÍTULO: ${doc.title}
VERSÃO: ${doc.version}
CATEGORIA: ${doc.category}
CONTEÚDO:
${content || "Conteúdo não indexado."}
--- FIM DOCUMENTO ---
        `);
      }
    });

    // If no specific matches found, but query is generic, we might return a default subset 
    // or return empty to force the "I don't know" response.
    // For this demo, if empty, we try to be helpful by returning everything if query contains "manual" or "documento"
    if (relevantChunks.length === 0 && (queryLower.includes('manual') || queryLower.includes('regra'))) {
       MOCK_DOCS.forEach(doc => {
         if (DOC_CONTENTS[doc.id]) {
           relevantChunks.push(`RESUMO ${doc.title}: ${DOC_CONTENTS[doc.id].substring(0, 200)}...`);
           sources.add(doc.title + " (Resumo)");
         }
       });
    }

    return {
      contextText: relevantChunks.join('\n\n'),
      sourceTitles: Array.from(sources)
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. RETRIEVE (RAG)
      const { contextText, sourceTitles } = retrieveContext(input);

      // 2. AUGMENT PROMPT
      const prompt = `
PERGUNTA DO USUÁRIO: ${input}

CONTEXTO RECUPERADO DOS DOCUMENTOS:
${contextText || "Nenhum documento relevante encontrado para os termos pesquisados."}

Responda à pergunta do usuário utilizando apenas o contexto acima. Pense passo a passo antes de responder para garantir precisão técnica.
`;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 3. GENERATE WITH THINKING MODE
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 32768 }, // Max budget for deep reasoning
        },
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "Desculpe, não consegui processar a sua resposta.",
        sources: sourceTitles.length > 0 ? sourceTitles : undefined
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erro no chat:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Erro de conexão. Verifique a sua chave API ou tente novamente."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-gray-200 text-gray-800 rotate-90' : 'bg-cv-blue text-white'
        }`}
        title="Abrir Assistente IA"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden font-sans">
          
          {/* Header */}
          <div className="bg-cv-blue text-white p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Assistente CV-CTA</h3>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Gemini 3 Pro (Thinking)
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-cv-blue text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Source Citations */}
                {msg.role === 'model' && msg.sources && (
                  <div className="mt-1 ml-1 max-w-[85%] flex flex-wrap gap-1">
                    {msg.sources.map((source, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                        <FileText className="w-3 h-3" /> {source}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cv-blue" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-700 font-medium">Analisando documentação...</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                       <BrainCircuit className="w-3 h-3" /> Thinking Mode Active
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-cv-blue transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ex: Qual a separação mínima RVSM?"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`p-1.5 rounded-full transition-colors ${
                  input.trim() && !isLoading
                    ? 'bg-cv-blue text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400">
                As respostas são geradas com base nos manuais disponíveis na Biblioteca.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
