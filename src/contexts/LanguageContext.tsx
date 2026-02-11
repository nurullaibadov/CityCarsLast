import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru' | 'az' | 'tr';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
    az: string;
    tr: string;
  };
}

const translations: Translations = {
  findPerfectRide: {
    en: 'Find Your Perfect Ride in Azerbaijan',
    ru: 'Найдите идеальный автомобиль в Азербайджане',
    az: 'Azərbaycanda Mükəmməl Səyahətinizi Tapın',
    tr: 'Azerbaycan\'da Mükemmel Aracınızı Bulun',
  },
  home: {
    en: 'Home',
    ru: 'Главная',
    az: 'Ana Səhifə',
    tr: 'Ana Sayfa',
  },
  cars: {
    en: 'Cars',
    ru: 'Автомобили',
    az: 'Avtomobillər',
    tr: 'Arabalar',
  },
  drivers: {
    en: 'Driver Services',
    ru: 'Услуги водителя',
    az: 'Sürücü Xidmətləri',
    tr: 'Sürücü Hizmetleri',
  },
  transfer: {
    en: 'Transfer',
    ru: 'Трансфер',
    az: 'Transfer',
    tr: 'Transfer',
  },
  tracking: {
    en: 'Tracking',
    ru: 'Отслеживание',
    az: 'İzləmə',
    tr: 'Takip',
  },
  news: {
    en: 'News',
    ru: 'Новости',
    az: 'Xəbərlər',
    tr: 'Haberler',
  },
  contact: {
    en: 'Contact',
    ru: 'Контакты',
    az: 'Əlaqə',
    tr: 'İletişim',
  },
  login: {
    en: 'Login',
    ru: 'Вход',
    az: 'Giriş',
    tr: 'Giriş',
  },
  signUp: {
    en: 'Sign Up',
    ru: 'Регистрация',
    az: 'Qeydiyyat',
    tr: 'Kayıt Ol',
  },
  email: {
    en: 'Email',
    ru: 'Электронная почта',
    az: 'E-poçt',
    tr: 'E-posta',
  },
  password: {
    en: 'Password',
    ru: 'Пароль',
    az: 'Şifrə',
    tr: 'Şifre',
  },
  forgotPassword: {
    en: 'Forgot Password?',
    ru: 'Забыли пароль?',
    az: 'Şifrəni unutdunuz?',
    tr: 'Şifrenizi mi unuttunuz?',
  },
  resetPassword: {
    en: 'Reset Password',
    ru: 'Сбросить пароль',
    az: 'Şifrəni sıfırla',
    tr: 'Şifreyi Sıfırla',
  },
  searchCars: {
    en: 'Search Cars',
    ru: 'Поиск автомобилей',
    az: 'Avtomobil axtar',
    tr: 'Araba Ara',
  },
  pickupLocation: {
    en: 'Pickup Location',
    ru: 'Место получения',
    az: 'Götürmə yeri',
    tr: 'Alış Yeri',
  },
  returnLocation: {
    en: 'Return Location',
    ru: 'Место возврата',
    az: 'Qaytarma yeri',
    tr: 'İade Yeri',
  },
  pickupDate: {
    en: 'Pickup Date',
    ru: 'Дата получения',
    az: 'Götürmə tarixi',
    tr: 'Alış Tarihi',
  },
  returnDate: {
    en: 'Return Date',
    ru: 'Дата возврата',
    az: 'Qaytarma tarixi',
    tr: 'İade Tarihi',
  },
  featuredCars: {
    en: 'Featured Cars',
    ru: 'Рекомендуемые автомобили',
    az: 'Seçilmiş avtomobillər',
    tr: 'Öne Çıkan Arabalar',
  },
  perDay: {
    en: 'per day',
    ru: 'в день',
    az: 'gündə',
    tr: 'günlük',
  },
  bookNow: {
    en: 'Book Now',
    ru: 'Забронировать',
    az: 'İndi sifariş et',
    tr: 'Şimdi Rezerve Et',
  },
  whyChooseUs: {
    en: 'Why Choose CityCars?',
    ru: 'Почему выбирают CityCars?',
    az: 'Niyə CityCars seçməlisiniz?',
    tr: 'Neden CityCars?',
  },
  premiumFleet: {
    en: 'Premium Fleet',
    ru: 'Премиум автопарк',
    az: 'Premium avtomobil parkı',
    tr: 'Premium Filo',
  },
  premiumFleetDesc: {
    en: 'Choose from our extensive collection of luxury and economy vehicles',
    ru: 'Выбирайте из нашей обширной коллекции люксовых и экономичных автомобилей',
    az: 'Geniş lüks və iqtisadi avtomobil kolleksiyamızdan seçin',
    tr: 'Geniş lüks ve ekonomik araç koleksiyonumuzdan seçin',
  },
  support247: {
    en: '24/7 Support',
    ru: 'Поддержка 24/7',
    az: '24/7 Dəstək',
    tr: '7/24 Destek',
  },
  support247Desc: {
    en: 'Our team is available around the clock to assist you',
    ru: 'Наша команда доступна круглосуточно для помощи',
    az: 'Komandamız sizə kömək etmək üçün günün hər saatı mövcuddur',
    tr: 'Ekibimiz size yardımcı olmak için her zaman hazır',
  },
  bestPrices: {
    en: 'Best Prices',
    ru: 'Лучшие цены',
    az: 'Ən yaxşı qiymətlər',
    tr: 'En İyi Fiyatlar',
  },
  bestPricesDesc: {
    en: 'Competitive rates with no hidden fees',
    ru: 'Конкурентные цены без скрытых платежей',
    az: 'Gizli ödənişlər olmadan rəqabətli qiymətlər',
    tr: 'Gizli ücretler olmadan rekabetçi fiyatlar',
  },
  allRightsReserved: {
    en: '© 2026 CityCars. All rights reserved.',
    ru: '© 2026 CityCars. Все права защищены.',
    az: '© 2026 CityCars. Bütün hüquqlar qorunur.',
    tr: '© 2026 CityCars. Tüm hakları saklıdır.',
  },
  professionalDrivers: {
    en: 'Professional Drivers',
    ru: 'Профессиональные водители',
    az: 'Peşəkar sürücülər',
    tr: 'Profesyonel Sürücüler',
  },
  professionalDriversDesc: {
    en: 'Experienced, multilingual drivers for your comfort and safety',
    ru: 'Опытные многоязычные водители для вашего комфорта и безопасности',
    az: 'Rahatlığınız və təhlükəsizliyiniz üçün təcrübəli, çoxdilli sürücülər',
    tr: 'Konforunuz ve güvenliğiniz için deneyimli, çok dilli sürücüler',
  },
  airportTransfer: {
    en: 'Airport Transfer',
    ru: 'Трансфер в аэропорт',
    az: 'Hava limanı transferi',
    tr: 'Havalimanı Transferi',
  },
  cityTour: {
    en: 'City Tours',
    ru: 'Городские туры',
    az: 'Şəhər turları',
    tr: 'Şehir Turları',
  },
  corporateService: {
    en: 'Corporate Service',
    ru: 'Корпоративные услуги',
    az: 'Korporativ xidmət',
    tr: 'Kurumsal Hizmet',
  },
  trackYourRide: {
    en: 'Track Your Ride',
    ru: 'Отследите поездку',
    az: 'Səyahətinizi izləyin',
    tr: 'Seyahatinizi Takip Edin',
  },
  trackingId: {
    en: 'Tracking ID',
    ru: 'ID отслеживания',
    az: 'İzləmə ID',
    tr: 'Takip ID',
  },
  track: {
    en: 'Track',
    ru: 'Отследить',
    az: 'İzlə',
    tr: 'Takip Et',
  },
  name: {
    en: 'Full Name',
    ru: 'Полное имя',
    az: 'Tam ad',
    tr: 'Tam Ad',
  },
  confirmPassword: {
    en: 'Confirm Password',
    ru: 'Подтвердите пароль',
    az: 'Şifrəni təsdiqləyin',
    tr: 'Şifreyi Onayla',
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    ru: 'Уже есть аккаунт?',
    az: 'Artıq hesabınız var?',
    tr: 'Zaten hesabınız var mı?',
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    ru: 'Нет аккаунта?',
    az: 'Hesabınız yoxdur?',
    tr: 'Hesabınız yok mu?',
  },
  rememberPassword: {
    en: 'Remember your password?',
    ru: 'Помните пароль?',
    az: 'Şifrənizi xatırlayırsınız?',
    tr: 'Şifrenizi hatırlıyor musunuz?',
  },
  sendResetLink: {
    en: 'Send Reset Link',
    ru: 'Отправить ссылку',
    az: 'Sıfırlama linkini göndər',
    tr: 'Sıfırlama Bağlantısı Gönder',
  },
  enterEmailReset: {
    en: 'Enter your email to receive a password reset link',
    ru: 'Введите email для получения ссылки сброса пароля',
    az: 'Şifrə sıfırlama linki almaq üçün e-poçtunuzu daxil edin',
    tr: 'Şifre sıfırlama bağlantısı almak için e-postanızı girin',
  },
  bookTransfer: {
    en: 'Book Transfer',
    ru: 'Забронировать трансфер',
    az: 'Transfer sifariş et',
    tr: 'Transfer Rezervasyonu',
  },
  from: {
    en: 'From',
    ru: 'Откуда',
    az: 'Haradan',
    tr: 'Nereden',
  },
  to: {
    en: 'To',
    ru: 'Куда',
    az: 'Haraya',
    tr: 'Nereye',
  },
  passengers: {
    en: 'Passengers',
    ru: 'Пассажиры',
    az: 'Sərnişinlər',
    tr: 'Yolcular',
  },
  hireDriver: {
    en: 'Hire a Driver',
    ru: 'Нанять водителя',
    az: 'Sürücü kirayələ',
    tr: 'Sürücü Kirala',
  },
  selectVehicle: {
    en: 'Select Vehicle Type',
    ru: 'Выберите тип автомобиля',
    az: 'Avtomobil növünü seçin',
    tr: 'Araç Türünü Seçin',
  },
  sedan: {
    en: 'Sedan',
    ru: 'Седан',
    az: 'Sedan',
    tr: 'Sedan',
  },
  suv: {
    en: 'SUV',
    ru: 'Внедорожник',
    az: 'SUV',
    tr: 'SUV',
  },
  van: {
    en: 'Van',
    ru: 'Микроавтобус',
    az: 'Mikroavtobus',
    tr: 'Minibüs',
  },
  luxury: {
    en: 'Luxury',
    ru: 'Люкс',
    az: 'Lüks',
    tr: 'Lüks',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
