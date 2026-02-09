
import { Category, PremiumContact, Language } from './types';

export const LANGUAGES: { code: Language; name: string; native: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'French', native: 'Français', dir: 'ltr' },
  { code: 'da', name: 'Danish', native: 'Dansk', dir: 'ltr' },
  { code: 'no', name: 'Norwegian', native: 'Norsk', dir: 'ltr' },
  { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', native: '简体中文', dir: 'ltr' },
  { code: 'he', name: 'Hebrew', native: 'עברית', dir: 'rtl' },
  { code: 'ja', name: 'Japanese', native: '日本語', dir: 'ltr' },
  { code: 'es', name: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', dir: 'ltr' },
];

export const PREMIUM_CONTACTS: PremiumContact[] = [
  {
    id: 'mohammed-vi',
    name: 'King Mohammed VI',
    title: 'King of Morocco',
    country: 'Morocco',
    bio: 'Leading North African modernization and economic development since 1999.',
    avatarUrl: 'https://picsum.photos/seed/m6/200/200',
    category: Category.ROYAL,
    isOnline: true,
    interests: ['Economic Development', 'Renewable Energy', 'African Union']
  },
  {
    id: 'salman-saud',
    name: 'King Salman bin Abdulaziz',
    title: 'King of Saudi Arabia',
    country: 'Saudi Arabia',
    bio: 'Custodian of the Two Holy Mosques, leading Vision 2030.',
    avatarUrl: 'https://picsum.photos/seed/salman/200/200',
    category: Category.ROYAL,
    isOnline: true,
    interests: ['Vision 2030', 'Heritage', 'Energy']
  },
  {
    id: 'elon-musk',
    name: 'Elon Musk',
    title: 'CEO of Tesla & SpaceX',
    country: 'USA',
    bio: 'Entrepreneur revolutionizing transportation and space exploration.',
    avatarUrl: 'https://picsum.photos/seed/elon/200/200',
    category: Category.TECH,
    isOnline: true,
    interests: ['Mars', 'AI', 'EVs']
  },
  {
    id: 'sam-altman',
    name: 'Sam Altman',
    title: 'CEO of OpenAI',
    country: 'USA',
    bio: 'Leading the development of AGI and ChatGPT.',
    avatarUrl: 'https://picsum.photos/seed/sam/200/200',
    category: Category.TECH,
    isOnline: true,
    interests: ['AGI', 'Startups', 'Computing']
  },
  {
    id: 'larry-fink',
    name: 'Larry Fink',
    title: 'CEO of BlackRock',
    country: 'USA',
    bio: 'Chairman and CEO of the worlds largest asset manager.',
    avatarUrl: 'https://picsum.photos/seed/larry/200/200',
    category: Category.BUSINESS,
    isOnline: true,
    interests: ['Asset Management', 'Global Economy', 'Investment']
  },
  {
    id: 'klaus-schwab',
    name: 'Klaus Schwab',
    title: 'Founder of WEF',
    country: 'Germany',
    bio: 'Executive Chairman of the World Economic Forum.',
    avatarUrl: 'https://picsum.photos/seed/klaus/200/200',
    category: Category.BUSINESS,
    isOnline: true,
    interests: ['The Great Reset', 'Global Governance', 'Societal Change']
  }
];

export const RINGTONES = [
  { id: 'golden', name: 'Golden Majesty', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'royal', name: 'Royal Chime', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'modern', name: 'Tech Pulse', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'zen', name: 'Diamond Zen', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];
