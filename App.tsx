
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Settings, 
  Users, 
  Shield, 
  Bell, 
  Globe, 
  Camera, 
  Mic, 
  MoreVertical, 
  Search, 
  Send, 
  ArrowLeft,
  Crown,
  Lock,
  Menu,
  X,
  Plus,
  Image as ImageIcon,
  Check,
  CheckCheck,
  Smartphone,
  Info
} from 'lucide-react';
import { 
  PremiumContact, 
  Message, 
  Language, 
  AppSettings, 
  Category 
} from './types';
import { 
  PREMIUM_CONTACTS, 
  LANGUAGES, 
  RINGTONES 
} from './constants';
import { getAIResponse } from './services/geminiService';

// --- Global State ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'calls' | 'contacts' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<PremiumContact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    fontSize: 'medium',
    notifications: true,
    biometricLock: false,
    encryptionKey: 'GOLDEN-SECRET-2025'
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'chat' | 'call'>('home');

  // Multi-language context
  const activeLang = useMemo(() => LANGUAGES.find(l => l.code === settings.language)!, [settings.language]);

  // Handle Send Message
  const handleSendMessage = async (text: string) => {
    if (!selectedChat || !text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text,
      timestamp: Date.now(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), userMsg]
    }));

    setIsTyping(true);
    const aiText = await getAIResponse(selectedChat, text);
    setIsTyping(false);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      senderId: selectedChat.id,
      text: aiText,
      timestamp: Date.now(),
      type: 'text',
      status: 'read'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), aiMsg]
    }));
  };

  return (
    <div className={`flex h-screen bg-black text-white font-roboto overflow-hidden ${activeLang.dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={activeLang.dir}>
      {/* Sidebar Navigation */}
      <div className="w-16 md:w-20 bg-[#0a0a0a] border-r border-[#B8860B]/30 flex flex-col items-center py-8 space-y-8 z-50">
        <div className="gold-bg p-2 rounded-xl mb-4 shadow-lg shadow-yellow-500/20">
          <Crown className="w-6 h-6 text-black" />
        </div>
        
        <NavIcon 
          icon={<MessageSquare className="w-6 h-6" />} 
          active={activeTab === 'chats'} 
          onClick={() => { setActiveTab('chats'); setCurrentScreen('home'); }} 
          label="Chats"
        />
        <NavIcon 
          icon={<Phone className="w-6 h-6" />} 
          active={activeTab === 'calls'} 
          onClick={() => { setActiveTab('calls'); setCurrentScreen('home'); }} 
          label="Calls"
        />
        <NavIcon 
          icon={<Users className="w-6 h-6" />} 
          active={activeTab === 'contacts'} 
          onClick={() => { setActiveTab('contacts'); setCurrentScreen('home'); }} 
          label="Royal"
        />
        
        <div className="mt-auto">
          <NavIcon 
            icon={<Settings className="w-6 h-6" />} 
            active={activeTab === 'settings'} 
            onClick={() => { setActiveTab('settings'); setCurrentScreen('home'); }} 
            label="Settings"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left List Pane */}
        <div className={`w-full md:w-96 bg-black flex-col border-r border-[#B8860B]/20 ${currentScreen !== 'home' ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-[#B8860B]/20">
            <h1 className="text-2xl font-cinzel gold-text tracking-widest uppercase">Golden Chat</h1>
            <div className="mt-4 relative">
              <input 
                type="text" 
                placeholder="Search royal records..." 
                className="w-full bg-[#1a1a1a] rounded-lg py-2 px-10 border border-[#B8860B]/20 focus:border-[#FFD700] outline-none text-sm transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#B8860B]/60" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'chats' && (
              <ChatList 
                contacts={PREMIUM_CONTACTS} 
                messages={messages} 
                onSelect={(c) => { setSelectedChat(c); setCurrentScreen('chat'); }} 
                selectedId={selectedChat?.id}
              />
            )}
            {activeTab === 'contacts' && (
              <ContactList 
                contacts={PREMIUM_CONTACTS} 
                onSelect={(c) => { setSelectedChat(c); setCurrentScreen('chat'); }} 
              />
            )}
            {activeTab === 'settings' && (
              <SettingsPanel settings={settings} setSettings={setSettings} />
            )}
            {activeTab === 'calls' && (
              <CallHistory contacts={PREMIUM_CONTACTS} onCall={(c) => { setSelectedChat(c); setCurrentScreen('call'); }} />
            )}
          </div>
        </div>

        {/* Chat / Detail View */}
        <div className={`flex-1 flex flex-col relative ${currentScreen === 'home' ? 'hidden md:flex bg-[#050505] items-center justify-center' : 'flex bg-black'}`}>
          {currentScreen === 'home' ? (
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#B8860B] to-[#FFD700] rounded-full flex items-center justify-center opacity-20">
                <Crown className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-cinzel text-[#B8860B]/50 uppercase tracking-widest">Select a Chat to begin</h2>
              <p className="text-[#B8860B]/30 mt-2 font-roboto tracking-widest">Encrypted communication is active.</p>
            </div>
          ) : currentScreen === 'chat' && selectedChat ? (
            <ChatWindow 
              contact={selectedChat} 
              messages={messages[selectedChat.id] || []} 
              onBack={() => setCurrentScreen('home')} 
              onSend={handleSendMessage}
              isTyping={isTyping}
            />
          ) : currentScreen === 'call' && selectedChat ? (
            <CallWindow 
              contact={selectedChat} 
              onEnd={() => setCurrentScreen('chat')} 
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const NavIcon: React.FC<{ icon: React.ReactNode; active: boolean; onClick: () => void; label: string }> = ({ icon, active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${active ? 'text-[#FFD700]' : 'text-[#B8860B]/40 hover:text-[#B8860B]'}`}
  >
    <div className={`p-3 rounded-full transition-all ${active ? 'bg-[#B8860B]/10' : 'group-hover:bg-[#B8860B]/5'}`}>
      {icon}
    </div>
    <span className="text-[10px] mt-1 uppercase font-cinzel tracking-tighter transition-opacity opacity-0 group-hover:opacity-100">{label}</span>
    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 gold-bg rounded-l-full shadow-lg shadow-yellow-500/50" />}
  </button>
);

const ChatList: React.FC<{ 
  contacts: PremiumContact[]; 
  messages: Record<string, Message[]>; 
  onSelect: (c: PremiumContact) => void;
  selectedId?: string;
}> = ({ contacts, messages, onSelect, selectedId }) => (
  <div className="space-y-1 py-2">
    {contacts.map(contact => {
      const lastMsg = messages[contact.id]?.slice(-1)[0];
      return (
        <div 
          key={contact.id}
          onClick={() => onSelect(contact)}
          className={`flex items-center px-6 py-4 cursor-pointer transition-all border-l-4 ${selectedId === contact.id ? 'bg-[#B8860B]/10 border-[#FFD700]' : 'border-transparent hover:bg-[#1a1a1a]'}`}
        >
          <div className="relative">
            <img src={contact.avatarUrl} alt={contact.name} className="w-14 h-14 rounded-full border border-[#B8860B]/40 p-0.5" />
            {contact.isOnline && <div className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black" />}
          </div>
          <div className="ml-4 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <h3 className="font-playfair font-semibold text-[#FFD700] truncate">{contact.name}</h3>
              <span className="text-[10px] text-[#B8860B]/60 uppercase">{lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>
            </div>
            <p className="text-xs text-[#B8860B]/60 truncate mt-1">
              {lastMsg ? lastMsg.text : contact.title}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

const ContactList: React.FC<{ 
  contacts: PremiumContact[]; 
  onSelect: (c: PremiumContact) => void;
}> = ({ contacts, onSelect }) => (
  <div className="p-4 space-y-6">
    {['ROYAL', 'TECH', 'BUSINESS'].map(cat => (
      <div key={cat}>
        <h4 className="text-[10px] font-cinzel text-[#B8860B]/50 tracking-[4px] uppercase mb-4 px-2">{cat}</h4>
        <div className="space-y-2">
          {contacts.filter(c => c.category === cat.toLowerCase()).map(contact => (
            <div 
              key={contact.id}
              onClick={() => onSelect(contact)}
              className="flex items-center p-3 rounded-lg hover:bg-[#1a1a1a] transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full border border-[#B8860B]/30 group-hover:border-[#FFD700] overflow-hidden transition-all">
                <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h5 className="font-playfair text-[#FFD700] text-sm">{contact.name}</h5>
                <p className="text-[10px] text-[#B8860B]/60 uppercase tracking-widest">{contact.country}</p>
              </div>
              <Crown className="ml-auto w-4 h-4 text-[#B8860B]/20 group-hover:text-[#FFD700] transition-all" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ChatWindow: React.FC<{ 
  contact: PremiumContact; 
  messages: Message[]; 
  onBack: () => void;
  onSend: (text: string) => void;
  isTyping: boolean;
}> = ({ contact, messages, onBack, onSend, isTyping }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Top Bar */}
      <div className="p-4 md:p-6 bg-[#0a0a0a] border-b border-[#B8860B]/20 flex items-center shadow-xl">
        <button onClick={onBack} className="md:hidden mr-4 text-[#B8860B]">
          <ArrowLeft />
        </button>
        <div className="relative">
          <img src={contact.avatarUrl} alt={contact.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#FFD700]/30 shadow-lg shadow-yellow-500/10" />
          <div className="absolute -bottom-1 -right-1 bg-black p-0.5 rounded-full">
            <Crown className="w-3 h-3 text-[#FFD700]" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="font-playfair text-[#FFD700] text-base md:text-lg leading-tight">{contact.name}</h2>
          <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Secure Line Active</p>
        </div>
        <div className="flex space-y-0 space-x-2 md:space-x-4">
          <button className="p-2 text-[#B8860B] hover:text-[#FFD700] transition-all bg-[#B8860B]/5 rounded-full"><Phone className="w-5 h-5" /></button>
          <button className="p-2 text-[#B8860B] hover:text-[#FFD700] transition-all bg-[#B8860B]/5 rounded-full"><Camera className="w-5 h-5" /></button>
          <button className="p-2 text-[#B8860B] hover:text-[#FFD700] transition-all bg-[#B8860B]/5 rounded-full"><Info className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
        <div className="flex justify-center mb-8">
          <div className="bg-[#1a1a1a] px-4 py-1 rounded-full text-[10px] text-[#B8860B]/60 uppercase tracking-[3px] border border-[#B8860B]/10">
            Encrypted End-to-End
          </div>
        </div>

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-lg relative group ${
              m.senderId === 'user' 
                ? 'bg-gradient-to-br from-[#B8860B] to-[#926200] text-black font-medium rounded-tr-none' 
                : 'bg-[#1a1a1a] border border-[#B8860B]/20 text-[#e5e5e5] rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
              <div className="flex items-center justify-end mt-2 space-x-1 opacity-60">
                <span className="text-[9px] uppercase">{new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                {m.senderId === 'user' && <CheckCheck className="w-3 h-3" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] border border-[#B8860B]/20 p-4 rounded-2xl rounded-tl-none flex space-x-1.5 items-center">
              <div className="w-1.5 h-1.5 gold-bg rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
              <div className="w-1.5 h-1.5 gold-bg rounded-full animate-bounce" style={{animationDelay: '200ms'}} />
              <div className="w-1.5 h-1.5 gold-bg rounded-full animate-bounce" style={{animationDelay: '400ms'}} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-[#0a0a0a] border-t border-[#B8860B]/20">
        <div className="max-w-4xl mx-auto flex items-center space-x-3 md:space-x-4">
          <button className="p-2 text-[#B8860B] hover:text-[#FFD700] transition-all"><Plus /></button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a royal decree..." 
              className="w-full bg-[#1a1a1a] rounded-full py-3 px-6 border border-[#B8860B]/20 focus:border-[#FFD700] outline-none text-sm shadow-inner transition-all"
            />
          </div>
          <button className="p-2 text-[#B8860B] hover:text-[#FFD700] transition-all"><Mic /></button>
          <button 
            onClick={handleSend}
            className={`p-3 rounded-full transition-all shadow-lg ${inputText.trim() ? 'gold-bg text-black scale-110' : 'bg-[#1a1a1a] text-[#B8860B]/40'}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsPanel: React.FC<{ settings: AppSettings; setSettings: (s: AppSettings) => void }> = ({ settings, setSettings }) => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div>
        <h4 className="text-[10px] font-cinzel text-[#B8860B]/50 tracking-[4px] uppercase mb-6 px-2">Account</h4>
        <div className="space-y-4">
          <SettingItem 
            icon={<Shield className="w-4 h-4" />} 
            label="Privacy" 
            value="Encrypted" 
          />
          <SettingItem 
            icon={<Smartphone className="w-4 h-4" />} 
            label="Devices" 
            value="1 Active" 
          />
          <SettingItem 
            icon={<Globe className="w-4 h-4" />} 
            label="Language" 
            value={LANGUAGES.find(l => l.code === settings.language)?.native || ''}
            onClick={() => {
              const next = LANGUAGES[(LANGUAGES.findIndex(l => l.code === settings.language) + 1) % LANGUAGES.length];
              setSettings({ ...settings, language: next.code });
            }}
          />
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-cinzel text-[#B8860B]/50 tracking-[4px] uppercase mb-6 px-2">Security</h4>
        <div className="space-y-4">
          <ToggleItem 
            icon={<Lock className="w-4 h-4" />} 
            label="Biometric Lock" 
            checked={settings.biometricLock} 
            onChange={(val) => setSettings({ ...settings, biometricLock: val })}
          />
          <ToggleItem 
            icon={<Bell className="w-4 h-4" />} 
            label="Golden Alerts" 
            checked={settings.notifications} 
            onChange={(val) => setSettings({ ...settings, notifications: val })}
          />
        </div>
      </div>

      <div className="pt-8">
        <button className="w-full py-3 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all">
          Exit Royal Protocol
        </button>
      </div>
    </div>
  );
};

const SettingItem: React.FC<{ icon: React.ReactNode; label: string; value: string; onClick?: () => void }> = ({ icon, label, value, onClick }) => (
  <div onClick={onClick} className="flex items-center p-3 rounded-lg bg-[#0a0a0a] border border-[#B8860B]/10 hover:border-[#B8860B]/30 cursor-pointer transition-all">
    <div className="text-[#B8860B]">{icon}</div>
    <span className="ml-3 text-sm text-[#e5e5e5]">{label}</span>
    <span className="ml-auto text-[10px] text-[#B8860B]/60 uppercase tracking-widest">{value}</span>
  </div>
);

const ToggleItem: React.FC<{ icon: React.ReactNode; label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ icon, label, checked, onChange }) => (
  <div className="flex items-center p-3 rounded-lg bg-[#0a0a0a] border border-[#B8860B]/10">
    <div className="text-[#B8860B]">{icon}</div>
    <span className="ml-3 text-sm text-[#e5e5e5]">{label}</span>
    <button 
      onClick={() => onChange(!checked)}
      className={`ml-auto w-10 h-5 rounded-full p-1 transition-all ${checked ? 'gold-bg' : 'bg-[#333]'}`}
    >
      <div className={`w-3 h-3 bg-white rounded-full transition-all ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

const CallHistory: React.FC<{ contacts: PremiumContact[]; onCall: (c: PremiumContact) => void }> = ({ contacts, onCall }) => (
  <div className="p-4 space-y-4">
    {contacts.slice(0, 5).map(c => (
      <div key={c.id} className="flex items-center p-4 bg-[#0a0a0a] rounded-xl border border-[#B8860B]/10">
        <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-full" />
        <div className="ml-4">
          <h5 className="font-playfair text-[#FFD700] text-sm">{c.name}</h5>
          <div className="flex items-center text-[10px] text-green-500 uppercase tracking-widest mt-0.5">
            <Check className="w-2 h-2 mr-1" /> Incoming • 14:20
          </div>
        </div>
        <button 
          onClick={() => onCall(c)}
          className="ml-auto p-2 text-[#B8860B] hover:text-[#FFD700] transition-all"
        >
          <Phone className="w-5 h-5" />
        </button>
      </div>
    ))}
  </div>
);

const CallWindow: React.FC<{ contact: PremiumContact; onEnd: () => void }> = ({ contact, onEnd }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const itv = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(itv);
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center p-8">
      <div className="relative mb-12">
        <div className="absolute inset-0 gold-bg rounded-full opacity-20 blur-3xl animate-pulse" />
        <img src={contact.avatarUrl} alt={contact.name} className="w-48 h-48 rounded-full border-4 border-[#FFD700] shadow-2xl relative z-10" />
      </div>
      
      <h2 className="text-3xl font-playfair text-[#FFD700] mb-2">{contact.name}</h2>
      <p className="text-[#B8860B] uppercase tracking-[6px] text-sm mb-12">Secure Call Active</p>
      
      <div className="text-2xl font-mono text-[#B8860B]/60 mb-16 tracking-widest">
        {formatTime(timer)}
      </div>

      <div className="flex items-center space-x-8">
        <button className="p-6 rounded-full bg-[#1a1a1a] text-[#B8860B] hover:text-[#FFD700] transition-all border border-[#B8860B]/20">
          <Mic className="w-8 h-8" />
        </button>
        <button 
          onClick={onEnd}
          className="p-8 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-2xl shadow-red-500/20"
        >
          <Phone className="w-10 h-10 rotate-[135deg]" />
        </button>
        <button className="p-6 rounded-full bg-[#1a1a1a] text-[#B8860B] hover:text-[#FFD700] transition-all border border-[#B8860B]/20">
          <Smartphone className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default App;
