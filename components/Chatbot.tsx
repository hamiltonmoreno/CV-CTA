
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, FileText, BrainCircuit, Globe, Paperclip, Trash2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { KnowledgeItem } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: string[]; 
  grounding?: boolean;
}

interface Props {
  knowledgeBase: KnowledgeItem[];
}

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual Inteligente do Portal CV-CTA (Controladores de Tráfego Aéreo de Cabo Verde).

FONTES DE INFORMAÇÃO:
1. **Contexto Local**: Utilize prioritariamente os textos dos manuais e regulamentos nacionais (CV-CAR) fornecidos no prompt.
2. **Padrões Internacionais (ICAO)**: Você possui vasto conhecimento sobre os Anexos da ICAO (especialmente Anexos 2, 11 e Doc 4444). Utilize este conhecimento como "Standard" quando a regulamentação local for omissa ou quando o utilizador pedir esclarecimentos sobre normas internacionais.
3. **Busca Web**: Você tem permissão e DEVE utilizar a ferramenta de Busca (Google Search) para consultar informações atualizadas diretamente em:
   - site **www.aac.cv** (Agência de Aviação Civil)
   - site **www.asa.cv** (Aeroportos e Segurança Aérea)
   - sites internacionais relevantes (ICAO, IATA, EUROCONTROL, FAA) para confirmar padrões globais.

REGRAS DE RESPOSTA:
1. Se a resposta estiver no "CONTEXTO RECUPERADO" (Local), cite o documento local (ex: CV-CAR 11).
2. Se a resposta NÃO estiver no contexto local, utilize os Padrões ICAO (ex: "De acordo com o Doc 4444 da ICAO...").
3. Se precisar de dados vivos ou legislação muito recente, USE A BUSCA WEB e cite a fonte (ex: "Segundo o site da AAC...").
4. Não invente procedimentos.
5. Mantenha um tom profissional, técnico e direto (Fraseologia Padrão quando aplicável).
`;

const QUICK_QUESTIONS = [
  "Qual a separação mínima radar?",
  "Procedimentos de falha rádio?",
  "Requisitos para licença CTA?",
  "Limites de vento na Torre do Sal?"
];

const Chatbot: React.FC<Props> = ({ knowledgeBase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_cta_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing chat history", e);
      }
    } else {
      setMessages([
        { id: '0', role: 'model', text: 'Olá! Sou o assistente virtual do CV-CTA. Posso consultar manuais internos, regulamentos nacionais (AAC) e padrões internacionais (ICAO). Como posso ajudar?' }
      ]);
    }
  }, []);

  // Save chat history on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('cv_cta_chat_history', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearHistory = () => {
    localStorage.removeItem('cv_cta_chat_history');
    setMessages([
        { id: Date.now().toString(), role: 'model', text: 'Histórico limpo. Como posso ajudar agora?' }
    ]);
  };

  // Simple RAG Retrieval Logic (Client-Side)
  const retrieveContext = (query: string): { contextText: string, sourceTitles: string[], retrievedItems: KnowledgeItem[] } => {
    const queryLower = query.toLowerCase();
    const relevantChunks: string[] = [];
    const sources: Set<string> = new Set();
    const retrievedItems: KnowledgeItem[] = [];

    // Search through Knowledge Base (Metadata + Content)
    knowledgeBase.forEach(doc => {
      const titleMatch = doc.title.toLowerCase().includes(queryLower);
      const contentMatch = doc.content.toLowerCase().includes(queryLower);

      // If the user asks about a specific doc title, or the content matches keywords
      if (titleMatch || contentMatch) {
        sources.add(doc.title);
        retrievedItems.push(doc);
        relevantChunks.push(`
--- INÍCIO DOCUMENTO LOCAL ---
ID: ${doc.id}
TÍTULO: ${doc.title}
CATEGORIA: ${doc.category}
ATUALIZADO EM: ${doc.lastUpdated}
ANEXO: ${doc.mediaData ? 'Sim (Disponível para análise)' : 'Não'}
CONTEÚDO/DESCRIÇÃO:
${doc.content}
--- FIM DOCUMENTO LOCAL ---
        `);
      }
    });

    // Always add the generic ICAO pointer
    const icaoDoc = knowledgeBase.find(k => k.id === 'INTL-STD-ICAO');
    if (icaoDoc && !sources.has(icaoDoc.title)) {
        relevantChunks.push(`
--- CONTEXTO GERAL ---
${icaoDoc.content}
--- FIM CONTEXTO GERAL ---
        `);
    }

    return {
      contextText: relevantChunks.join('\n\n'),
      sourceTitles: Array.from(sources),
      retrievedItems
    };
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. RETRIEVE (RAG)
      const { contextText, sourceTitles, retrievedItems } = retrieveContext(textToSend);

      // 2. CONSTRUCT MULTIMODAL PAYLOAD
      const parts: any[] = [];

      // Text Prompt Part
      const prompt = `
PERGUNTA DO USUÁRIO: ${textToSend}

CONTEXTO RECUPERADO DOS DOCUMENTOS LOCAIS & DIRETIVAS:
${contextText || "Nenhum documento local específico encontrado. Baseie-se nos padrões ICAO e utilize o Google Search se necessário."}

Responda à pergunta do usuário. 
- Prioridade 1: Documentos Locais (CV-CAR) e Anexos visuais se fornecidos.
- Prioridade 2: Padrões ICAO (Anexos/Doc 4444).
- Prioridade 3: Web Search (AAC/ASA/ICAO).
`;
      parts.push({ text: prompt });

      // Media Parts (Images/PDFs)
      retrievedItems.forEach(item => {
        if (item.mediaData && item.mimeType) {
           parts.push({
             inlineData: {
               mimeType: item.mimeType,
               data: item.mediaData
             }
           });
        }
      });

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 3. GENERATE
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 32768 }, // Deep reasoning
          tools: [{ googleSearch: {} }] // Enable Web Search
        },
      });

      const hasGrounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.length ? true : false;
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "Desculpe, não consegui processar a sua resposta.",
        sources: sourceTitles.length > 0 ? sourceTitles.filter(t => !t.includes("Padrões Internacionais")) : undefined,
        grounding: hasGrounding
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-gray-200 text-gray-800 rotate-90' : 'bg-cv-blue text-white'
        }`}
        title="Abrir Assistente IA"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden font-sans">
          
          <div className="bg-cv-blue text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
                </div>
                <div>
                <h3 className="font-bold text-sm">Assistente CV-CTA</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Online (Docs + ICAO + Web)
                </p>
                </div>
            </div>
            <button onClick={clearHistory} className="p-1 hover:bg-white/10 rounded text-blue-200 hover:text-white" title="Limpar Histórico">
                <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 1 && (
                <div className="grid grid-cols-1 gap-2 mb-4">
                    {QUICK_QUESTIONS.map((q, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleSend(q)}
                            className="text-xs text-left bg-white border border-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

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
                
                {msg.role === 'model' && (
                  <div className="mt-1 ml-1 max-w-[85%] flex flex-wrap gap-1">
                    {msg.sources && msg.sources.map((source, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                        {source.includes('Anexo') || source.includes('File') ? <Paperclip className="w-3 h-3"/> : <FileText className="w-3 h-3" />} {source}
                      </span>
                    ))}
                    {msg.grounding && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        <Globe className="w-3 h-3" /> Web
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cv-blue" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-700 font-medium">Analisando Padrões...</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                       <BrainCircuit className="w-3 h-3" /> Thinking Mode
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-cv-blue transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite a sua questão..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
