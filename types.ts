
export enum Category {
  ROYAL = 'royal',
  TECH = 'tech',
  BUSINESS = 'business'
}

export interface PremiumContact {
  id: string;
  name: string;
  title: string;
  country: string;
  bio: string;
  avatarUrl: string;
  category: Category;
  isOnline: boolean;
  interests: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: 'text' | 'image' | 'video' | 'voice';
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export type Language = 'en' | 'ar' | 'fr' | 'da' | 'no' | 'de' | 'sv' | 'zh' | 'he' | 'ja' | 'es' | 'nl';

export interface AppSettings {
  language: Language;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  biometricLock: boolean;
  encryptionKey: string;
}
