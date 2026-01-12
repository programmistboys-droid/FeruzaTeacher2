
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  course: 'ru' | 'en';
  progress: Record<string, number>; // levelIndex -> masteredWordsCount
  purchasedLessons: string[]; // for levels
  rewardedWords: string[]; // word IDs
  activeLevelIndex: number; // 0: A1, 1: A2, etc.
  balance: number;
  xp: number;
  rank: string;
  avatar: string;
}

export enum AppTab {
  HOME = 'home',
  SLOVAR = 'slovar',
  TEST = 'test',
  PROFILE = 'profile'
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  level: number;
}

export interface LevelInfo {
  name: string;
  description: string;
  minXp: number;
}
