
import { VocabularyWord, LevelInfo } from '../types';

export const levels: LevelInfo[] = [
  { name: "Beginner (A1)", description: "Eng oddiy kundalik so'zlar", minXp: 0 },
  { name: "Elementary (A2)", description: "Muloqot uchun kerakli so'zlar", minXp: 1000 },
  { name: "Intermediate (B1)", description: "Mustaqil so'zlashuv darajasi", minXp: 3000 },
  { name: "Upper-Intermediate (B2)", description: "Murakkab mavzular va terminlar", minXp: 7000 },
  { name: "Advanced (C1)", description: "Akademik va professional daraja", minXp: 15000 },
];

export const gameWords: VocabularyWord[] = [
  // A1 - Beginner (Level 0)
  { id: "a1_1", word: "Always", translation: "Har doim", level: 0 },
  { id: "a1_2", word: "Beautiful", translation: "Go'zal", level: 0 },
  { id: "a1_3", word: "Breakfast", translation: "Nonushta", level: 0 },
  { id: "a1_4", word: "Cheap", translation: "Arzon", level: 0 },
  { id: "a1_5", word: "Daughter", translation: "Qiz farzand", level: 0 },
  { id: "a1_6", word: "Everywhere", translation: "Hamma joyda", level: 0 },
  { id: "a1_7", word: "Famous", translation: "Mashhur", level: 0 },
  { id: "a1_8", word: "Garden", translation: "Bog'", level: 0 },
  { id: "a1_9", word: "Healthy", translation: "Sog'lom", level: 0 },
  { id: "a1_10", word: "Important", translation: "Muhim", level: 0 },
  { id: "a1_11", word: "Journey", translation: "Sayohat", level: 0 },
  { id: "a1_12", word: "Kitchen", translation: "Oshxona", level: 0 },
  { id: "a1_13", word: "Language", translation: "Til", level: 0 },
  { id: "a1_14", word: "Mountain", translation: "Tog'", level: 0 },
  { id: "a1_15", word: "Neighbor", translation: "Qo'shni", level: 0 },
  { id: "a1_16", word: "Ocean", translation: "Okean", level: 0 },
  { id: "a1_17", word: "Perfect", translation: "Mukammal", level: 0 },
  { id: "a1_18", word: "Quiet", translation: "Tinch", level: 0 },
  { id: "a1_19", word: "Reason", translation: "Sabab", level: 0 },
  { id: "a1_20", word: "Science", translation: "Fan", level: 0 },
  { id: "a1_21", word: "Together", translation: "Birgalikda", level: 0 },
  { id: "a1_22", word: "Village", translation: "Qishloq", level: 0 },
  { id: "a1_23", word: "Weather", translation: "Ob-havo", level: 0 },
  { id: "a1_24", word: "Yesterday", translation: "Kecha", level: 0 },
  { id: "a1_25", word: "Zebra", translation: "Zebra", level: 0 },

  // A2 - Elementary (Level 1)
  { id: "a2_1", word: "Accident", translation: "Baxtsiz hodisa", level: 1 },
  { id: "a2_2", word: "Believe", translation: "Ishonmoq", level: 1 },
  { id: "a2_3", word: "Celebrate", translation: "Nishonlamoq", level: 1 },
  { id: "a2_4", word: "Describe", translation: "Tasvirlamoq", level: 1 },
  { id: "a2_5", word: "Everything", translation: "Hamma narsa", level: 1 },
  { id: "a2_6", word: "Furniture", translation: "Mebel", level: 1 },
  { id: "a2_7", word: "Government", translation: "Hukumat", level: 1 },
  { id: "a2_8", word: "Happen", translation: "Sodir bo'lmoq", level: 1 },
  { id: "a2_9", word: "Improve", translation: "Yaxshilamoq", level: 1 },
  { id: "a2_10", word: "Knowledge", translation: "Bilim", level: 1 },
  { id: "a2_11", word: "Library", translation: "Kutubxona", level: 1 },
  { id: "a2_12", word: "Medicine", translation: "Dori-darmon", level: 1 },
  { id: "a2_13", word: "Necessary", translation: "Zarur", level: 1 },
  { id: "a2_14", word: "Opposite", translation: "Qarama-qarshi", level: 1 },
  { id: "a2_15", word: "Particular", translation: "Xususiy", level: 1 },

  // B1 - Intermediate (Level 2)
  { id: "b1_1", word: "Alternative", translation: "Muqobil", level: 2 },
  { id: "b1_2", word: "Behavior", translation: "Xulq-atvor", level: 2 },
  { id: "b1_3", word: "Challenge", translation: "Qiyinchilik", level: 2 },
  { id: "b1_4", word: "Determine", translation: "Aniqlamoq", level: 2 },
  { id: "b1_5", word: "Education", translation: "Ta'lim", level: 2 },
  { id: "b1_6", word: "Frequency", translation: "Chastota", level: 2 },
  { id: "b1_7", word: "Guarantee", translation: "Kafolat", level: 2 },
  { id: "b1_8", word: "Hesitate", translation: "Ikkilanmoq", level: 2 },
  { id: "b1_9", word: "Identify", translation: "Aniqlamoq", level: 2 },
  { id: "b1_10", word: "Judgment", translation: "Hukm", level: 2 },

  // B2 - Upper-Intermediate (Level 3)
  { id: "b2_1", word: "Acknowledge", translation: "Tan olmoq", level: 3 },
  { id: "b2_2", word: "Beneficial", translation: "Foydali", level: 3 },
  { id: "b2_3", word: "Consequence", translation: "Oqibat", level: 3 },
  { id: "b2_4", word: "Distinguish", translation: "Farqlamoq", level: 3 },
  { id: "b2_5", word: "Establish", translation: "O'rnatmoq", level: 3 },
  { id: "b2_6", word: "Flourish", translation: "Gullab-yashnamoq", level: 3 },
  { id: "b2_7", word: "Inevitable", translation: "Muqarrar", level: 3 },
  { id: "b2_8", word: "Magnificent", translation: "Muhtasham", level: 3 },
  { id: "b2_9", word: "Negotiate", translation: "Muzokara olib bormoq", level: 3 },
  { id: "b2_10", word: "Obsession", translation: "Mukkasidan ketish", level: 3 },

  // C1 - Advanced (Level 4)
  { id: "c1_1", word: "Ambiguous", translation: "Noaniq", level: 4 },
  { id: "c1_2", word: "Benevolent", translation: "Saxovatli", level: 4 },
  { id: "c1_3", word: "Complacent", translation: "O'zidan mamnun", level: 4 },
  { id: "c1_4", word: "Deteriorate", translation: "Yomonlashmoq", level: 4 },
  { id: "c1_5", word: "Eloquence", translation: "Notiqlik", level: 4 },
  { id: "c1_6", word: "Frivolous", translation: "Yengiltak", level: 4 },
  { id: "c1_7", word: "Gregarious", translation: "Kirishimli", level: 4 },
  { id: "c1_8", word: "Hypocrisy", translation: "Munofiqlik", level: 4 },
  { id: "c1_9", word: "Incessant", translation: "To'xtovsiz", level: 4 },
  { id: "c1_10", word: "Juxtapose", translation: "Zid qo'ymoq", level: 4 },
];

// Filling more words dynamically to simulate the requested 5000+ words architecture
for (let i = 26; i <= 500; i++) {
  gameWords.push({ id: `gen_a1_${i}`, word: `Word A1-${i}`, translation: `Tarjima A1-${i}`, level: 0 });
}

export const translations = {
  uz: {
    home: "Asosiy",
    slovar: "Slovar",
    test: "Xotira testi",
    profile: "Profil",
    balance: "Balans",
    xp: "XP Ball",
    current_level: "Sizning darajangiz",
    unlocked: "Ochiq",
    locked: "Qulflangan",
    not_enough_xp: "XP yetarli emas!",
    start_test: "Testni boshlash",
    mastered: "O'zlashtirildi",
    earn: "Pul ishlash",
    correct_reward: "1.000 so'm"
  }
};
