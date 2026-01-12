
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import { AppTab, UserData, VocabularyWord } from './types';
import { translations, gameWords, levels } from './services/translations';
import { 
  User, 
  ChevronRight, 
  Lock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Award,
  Coins,
  Zap,
  Gamepad2,
  Trophy,
  Camera,
  Search,
  BookOpen,
  Brain
} from 'lucide-react';

const WORD_REWARD = 1000;

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(() => localStorage.getItem('isRegistered') === 'true');
  const [userData, setUserData] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Test State
  const [isTesting, setIsTesting] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResult, setTestResult] = useState<'pass' | 'fail' | null>(null);
  const [gameQueue, setGameQueue] = useState<VocabularyWord[]>([]);
  const [gameChoices, setGameChoices] = useState<string[]>([]);
  const [sessionReward, setSessionReward] = useState(0);

  const [regForm, setRegForm] = useState({ firstName: '', lastName: '', phone: '', course: 'en' as 'ru' | 'en' });

  const t = translations.uz;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.firstName || !regForm.phone) return;

    const finalUserData: UserData = {
      ...regForm,
      progress: {},
      purchasedLessons: [],
      rewardedWords: [],
      activeLevelIndex: 0,
      balance: 0,
      xp: 0,
      rank: 'Bronze',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${regForm.firstName}`
    };

    localStorage.setItem('userData', JSON.stringify(finalUserData));
    localStorage.setItem('isRegistered', 'true');
    setUserData(finalUserData);
    setIsRegistered(true);
  };

  const currentLevelWords = useMemo(() => {
    return gameWords.filter(w => w.level === (userData?.activeLevelIndex || 0));
  }, [userData?.activeLevelIndex]);

  const filteredWords = useMemo(() => {
    return currentLevelWords.filter(w => 
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currentLevelWords, searchTerm]);

  // --- Test Logic ---
  const startTest = () => {
    if (!userData) return;
    const shuffled = [...currentLevelWords].sort(() => Math.random() - 0.5).slice(0, 10);
    setGameQueue(shuffled);
    setIsTesting(true);
    setCurrentQuestionIndex(0);
    setTestScore(0);
    setSessionReward(0);
    setTestResult(null);
    generateRound(shuffled, 0);
  };

  const generateRound = (queue: VocabularyWord[], idx: number) => {
    const correct = queue[idx].translation;
    const others = gameWords
      .filter(w => w.translation !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.translation);
    setGameChoices([correct, ...others].sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (choice: string) => {
    if (!userData) return;
    const current = gameQueue[currentQuestionIndex];
    const isCorrect = choice === current.translation;
    
    let newBalance = userData.balance;
    let newRewarded = [...userData.rewardedWords];
    let newXp = userData.xp;

    if (isCorrect) {
      setTestScore(prev => prev + 1);
      if (!userData.rewardedWords.includes(current.id)) {
        setSessionReward(prev => prev + WORD_REWARD);
        newBalance += WORD_REWARD;
        newRewarded.push(current.id);
        newXp += 10;
      } else {
        newXp += 2;
      }
      
      const updated = { ...userData, balance: newBalance, rewardedWords: newRewarded, xp: newXp };
      setUserData(updated);
      localStorage.setItem('userData', JSON.stringify(updated));
    }

    if (currentQuestionIndex < gameQueue.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      generateRound(gameQueue, currentQuestionIndex + 1);
    } else {
      setTestResult(testScore + (isCorrect ? 1 : 0) >= 7 ? 'pass' : 'fail');
    }
  };

  const selectLevel = (idx: number) => {
    if (!userData) return;
    if (userData.xp < levels[idx].minXp) {
      alert(t.not_enough_xp);
      return;
    }
    const updated = { ...userData, activeLevelIndex: idx };
    setUserData(updated);
    localStorage.setItem('userData', JSON.stringify(updated));
  };

  const renderHome = () => (
    <div className="p-5 space-y-6 animate-slideUp">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-6 text-white shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            <Coins size={14} className="text-yellow-400" />
            <span className="text-xs font-black">{userData?.balance.toLocaleString()} so'm</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            <Zap size={14} className="text-orange-400" />
            <span className="text-xs font-black">{userData?.xp} XP</span>
          </div>
        </div>
        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t.current_level}</p>
        <h2 className="text-2xl font-black mb-4">{levels[userData?.activeLevelIndex || 0].name}</h2>
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-6">
           <div className="bg-white h-full transition-all duration-1000" style={{width: `${Math.min(100, (userData?.xp || 0) / 200)}%`}} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setActiveTab(AppTab.SLOVAR)} className="bg-white text-indigo-600 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg">
            <BookOpen size={16} /> Slovar
          </button>
          <button onClick={() => setActiveTab(AppTab.TEST)} className="bg-indigo-500/30 text-white py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border border-white/20 backdrop-blur-sm">
            <Brain size={16} /> Test
          </button>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="font-black text-gray-800 px-1 text-lg">Darajalar</h3>
        {levels.map((lvl, idx) => {
          const isUnlocked = (userData?.xp || 0) >= lvl.minXp;
          const isActive = userData?.activeLevelIndex === idx;
          
          return (
            <button 
              key={idx}
              onClick={() => selectLevel(idx)}
              className={`w-full p-5 rounded-[24px] border transition-all flex items-center justify-between ${
                isActive ? 'bg-indigo-50 border-indigo-200 shadow-sm' : (isUnlocked ? 'bg-white border-gray-100' : 'bg-gray-50 border-transparent opacity-60')
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {isUnlocked ? <Award size={24} /> : <Lock size={20} />}
                </div>
                <div>
                  <h4 className="font-black text-sm text-gray-800">{lvl.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{lvl.description}</p>
                </div>
              </div>
              {isActive && <CheckCircle size={20} className="text-indigo-600" />}
              {!isUnlocked && <span className="text-[10px] font-black text-red-400 uppercase">{lvl.minXp} XP</span>}
            </button>
          );
        })}
      </section>
    </div>
  );

  const renderSlovar = () => (
    <div className="p-5 space-y-6 animate-slideUp">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 shadow-sm focus:border-indigo-500 transition-all"
          placeholder="So'zlarni qidirish..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1 mb-2">
           <h3 className="font-black text-gray-800 text-lg">So'zlar ro'yxati</h3>
           <span className="text-[10px] font-black text-gray-400 uppercase">{filteredWords.length} ta so'z</span>
        </div>
        {filteredWords.slice(0, 50).map((word) => (
          <div key={word.id} className="bg-white p-5 rounded-2xl border border-gray-50 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-lg font-black text-gray-800">{word.word}</span>
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{word.translation}</span>
            </div>
            {userData?.rewardedWords.includes(word.id) && <CheckCircle size={18} className="text-green-500" />}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTest = () => {
    if (!isTesting) {
      return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6 animate-fadeIn">
          <div className="w-32 h-32 bg-indigo-100 text-indigo-600 rounded-[40px] flex items-center justify-center shadow-lg animate-pulse">
            <Brain size={64} />
          </div>
          <h2 className="text-3xl font-black text-gray-800">Xotira testi</h2>
          <p className="text-gray-500 font-medium leading-relaxed px-4">
            Hozirgi darajangizdagi so'zlar bo'yicha test topshiring va har bir yangi so'z uchun <b>1.000 so'm</b> ishlang!
          </p>
          <div className="bg-indigo-50 p-6 rounded-[32px] w-full border border-indigo-100">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-indigo-400 font-black uppercase">O'zlashtirildi</span>
                <span className="text-xs font-black text-indigo-600">{userData?.rewardedWords.filter(id => id.startsWith(userData?.activeLevelIndex === 0 ? 'a1' : 'gen')).length} / {currentLevelWords.length}</span>
             </div>
             <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full transition-all duration-1000" style={{width: `${(userData?.rewardedWords.length || 0) / 10}%`}} />
             </div>
          </div>
          <button onClick={startTest} className="w-full py-5 bg-indigo-600 text-white font-black rounded-[24px] shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all">Testni boshlash</button>
        </div>
      );
    }

    if (testResult) {
      return (
        <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6 animate-fadeIn">
          <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center ${testResult === 'pass' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {testResult === 'pass' ? <CheckCircle size={64} /> : <XCircle size={64} />}
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800">{testResult === 'pass' ? 'Ajoyib!' : 'Yana urinib ko\'ring'}</h2>
            <p className="text-gray-500 mt-2 font-medium">Siz 10 dan {testScore} ball to'pladingiz.</p>
            <p className="text-indigo-600 font-black text-xl mt-4">+{sessionReward.toLocaleString()} so'm</p>
          </div>
          <button onClick={() => setIsTesting(false)} className="w-full py-5 bg-indigo-600 text-white font-black rounded-[24px] shadow-lg shadow-indigo-100">Orqaga qaytish</button>
        </div>
      );
    }

    const currentWord = gameQueue[currentQuestionIndex];
    return (
      <div className="p-6 space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Savol {currentQuestionIndex + 1}/10</span>
           <div className="flex gap-2 items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <Coins size={14} className="text-yellow-500" />
              <span className="text-xs font-black">{sessionReward.toLocaleString()} so'm</span>
           </div>
        </div>
        <div className="text-center py-10">
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Inglizcha:</p>
          <h3 className="text-5xl font-black text-gray-800 leading-tight">{currentWord.word}</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {gameChoices.map((choice, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(choice)}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-[24px] text-center font-bold text-gray-700 hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-[0.97] shadow-sm"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white mb-8 shadow-2xl rotate-3">
          <span className="text-4xl font-black">FT</span>
        </div>
        <h1 className="text-3xl font-black text-gray-800 mb-2">Feruza Teacher</h1>
        <p className="text-gray-400 mb-10 font-medium italic">So'z yodlang va bilimingiz orqali pul ishlang!</p>
        <form onSubmit={handleRegister} className="w-full space-y-4">
          <input required className="w-full bg-gray-50 rounded-2xl py-4 px-5 font-bold text-gray-700 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all shadow-inner" placeholder="Ismingiz" value={regForm.firstName} onChange={e => setRegForm({...regForm, firstName: e.target.value})} />
          <input required type="tel" className="w-full bg-gray-50 rounded-2xl py-4 px-5 font-bold text-gray-700 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all shadow-inner" placeholder="+998 90 123 45 67" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} />
          <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-[24px] shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all">Boshlash</button>
        </form>
      </div>
    );
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} labels={{ home: t.home, slovar: t.slovar, test: t.test, profile: t.profile }}>
      {activeTab === AppTab.HOME && renderHome()}
      {activeTab === AppTab.SLOVAR && renderSlovar()}
      {activeTab === AppTab.TEST && renderTest()}
      {activeTab === AppTab.PROFILE && (
        <div className="p-6 space-y-6 animate-slideUp">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm flex flex-col items-center">
            <img src={userData?.avatar} className="w-24 h-24 rounded-full border-4 border-indigo-50 shadow-md mb-4" />
            <h2 className="text-2xl font-black text-gray-800">{userData?.firstName}</h2>
            <p className="text-gray-400 font-bold text-sm">{userData?.phone}</p>
            <div className="grid grid-cols-2 w-full gap-4 mt-8">
              <div className="bg-gray-50 p-4 rounded-3xl text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1">XP</p>
                <p className="text-xl font-black text-indigo-600">{userData?.xp}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-3xl text-center border border-gray-100">
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Balans</p>
                <p className="text-xl font-black text-green-600">{userData?.balance.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-5 text-red-500 font-black bg-red-50 rounded-[24px]">Chiqish</button>
        </div>
      )}
    </Layout>
  );
};

export default App;
