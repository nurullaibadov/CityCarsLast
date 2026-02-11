import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, Heart, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavoritesStore } from '@/hooks/useFavoritesStore';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import logo from '@/assets/logo.png';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'az', label: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavoritesStore();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/cars', label: t('cars') },
    { path: '/drivers', label: t('drivers') },
    { path: '/transfer', label: t('transfer') },
    { path: '/tracking', label: t('tracking') },
    { path: '/news', label: t('news') },
    { path: '/contact', label: t('contact') },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 md:pt-6">
      <motion.div
        animate={{
          width: isScrolled ? 'auto' : '95%',
          y: isScrolled ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto relative flex items-center justify-between px-4 md:px-8 py-2 md:py-3 rounded-[2rem] md:rounded-[3rem] transition-all duration-500 ${isScrolled
          ? 'glass-card border border-white/10 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl'
          : 'bg-transparent'
          }`}
      >
        {/* Shine effect for scrolled state */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/5 opacity-50" />
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            />
          </motion.div>
        )}

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group mr-4 md:mr-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
            className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            <img src={logo} alt="CityCars Logo" className="w-full h-full object-contain relative z-10" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-display font-bold text-foreground leading-none tracking-tight">
              City<span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-4">Cars</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-full gap-1 border border-black/5 dark:border-white/5">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => setHoveredLink(link.path)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-5 py-2 group whitespace-nowrap"
            >
              {hoveredLink === link.path && (
                <motion.div
                  layoutId="nav-pill"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm rounded-full z-0"
                />
              )}
              <span className={`relative z-10 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${location.pathname === link.path ? 'text-accent' : 'text-foreground/70 group-hover:text-foreground'
                }`}>
                {link.label}
              </span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
            {/* Favorites */}
            <Link to="/favorites" className="relative">
              <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-white dark:hover:bg-white/10 transition-all">
                <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-all ${favorites.length > 0 ? 'fill-red-500 text-red-500 scale-110' : 'text-foreground/70'}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 md:h-4 md:w-4 flex items-center justify-center bg-red-500 text-white text-[8px] md:text-[10px] font-bold rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-white dark:hover:bg-white/10 text-foreground/70">
                  <Globe className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-white/10 mt-4 min-w-[160px] rounded-2xl p-2 shadow-2xl">
                {languages.map(lang => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'en' | 'ru' | 'az' | 'tr')}
                    className="flex items-center justify-between cursor-pointer p-3 rounded-xl focus:bg-accent/10 focus:text-accent font-bold text-xs uppercase tracking-widest transition-colors mb-1 last:mb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                    {language === lang.code && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-white dark:hover:bg-white/10 text-foreground/70 transition-all"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 md:w-5 md:h-5" /> : <Sun className="w-4 h-4 md:w-5 md:h-5" />}
            </Button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden xl:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 px-4 rounded-full font-bold text-xs uppercase tracking-wider gap-2 hover:bg-white dark:hover:bg-white/10">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" /> : <UserIcon className="w-4 h-4" />}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card border-white/10 mt-4 min-w-[200px] rounded-2xl p-2 shadow-2xl">
                  <DropdownMenuItem asChild className="p-3 rounded-xl cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                    <Link to="/profile" className="flex items-center gap-3 font-bold">
                      <UserIcon className="w-4 h-4 text-accent" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild className="p-3 rounded-xl cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                      <Link to="/admin/dashboard" className="flex items-center gap-3 font-bold">
                        <Sparkles className="w-4 h-4 text-accent" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="p-3 rounded-xl cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-500 font-bold">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="h-10 px-6 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground hover:bg-white dark:hover:bg-white/5 transition-all">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="h-10 px-6 rounded-full accent-gradient text-accent-foreground font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all">
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    {t('signUp')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-10 h-10 rounded-full hover:bg-white dark:hover:bg-white/10 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="absolute top-20 left-4 right-4 glass-card border border-white/10 p-6 rounded-[2.5rem] shadow-2xl z-40 lg:hidden overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[80px] -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 blur-[80px] -z-10" />

              <nav className="flex flex-col gap-2 mb-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-[0.2em] ${location.pathname === link.path
                        ? 'accent-gradient text-accent-foreground shadow-lg'
                        : 'hover:bg-accent/5 text-foreground/70'
                        }`}
                    >
                      {link.label}
                      {location.pathname === link.path && <ChevronDown className="w-4 h-4 -rotate-90" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="grid grid-cols-1 gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 font-bold uppercase tracking-widest text-xs">
                        Profile
                      </Button>
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 font-bold uppercase tracking-widest text-xs">
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full h-14 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold uppercase tracking-widest text-xs">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 font-bold uppercase tracking-widest text-xs">
                        {t('login')}
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full h-14 rounded-2xl accent-gradient text-accent-foreground font-bold uppercase tracking-widest text-xs premium-glow hover:scale-[1.02] active:scale-[0.98] transition-all">
                        {t('signUp')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
