'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleSmoothScroll } from '@/utils/smoothScroll';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScroll(e, href, 80, 1000);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center group-hover:animate-logo-wiggle">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Portfolio
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => smoothScroll(e, item.href)}
                  className={`transition-colors duration-300 relative group ${
                    isActive
                      ? 'text-primary-500 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 transition-colors duration-300"
                aria-label="Toggle settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-900 rounded-lg shadow-xl border border-gray-200 dark:border-dark-700 py-4 px-4 z-50 animate-slide-down">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('theme')}</p>
                    <button
                      onClick={toggleTheme}
                      className="w-full relative h-10 bg-gray-200 dark:bg-dark-700 rounded-full p-1 transition-colors duration-300"
                    >
                      <div className={`absolute top-1 h-8 w-[calc(50%-4px)] bg-gradient-to-r from-primary-500 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                        theme === 'dark' ? 'left-1' : 'left-[calc(50%+2px)]'
                      }`}></div>
                      <div className="relative flex items-center justify-between px-3">
                        <div className={`flex items-center gap-1 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                          <span className="text-xs font-medium">{t('theme.dark.short')}</span>
                        </div>
                        <div className={`flex items-center gap-1 transition-colors duration-300 ${theme === 'light' ? 'text-white' : 'text-gray-600'}`}>
                          <span className="text-xs font-medium">{t('theme.light.short')}</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-dark-700 my-4"></div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('language')}</p>
                    <button
                      onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                      className="w-full relative h-10 bg-gray-200 dark:bg-dark-700 rounded-full p-1 transition-colors duration-300"
                    >
                      <div className={`absolute top-1 h-8 w-[calc(50%-4px)] bg-gradient-to-r from-primary-500 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                        language === 'id' ? 'left-1' : 'left-[calc(50%+2px)]'
                      }`}></div>
                      <div className="relative flex items-center justify-between px-3">
                        <div className={`flex items-center gap-1 transition-colors duration-300 ${language === 'id' ? 'text-white' : 'text-gray-600'}`}>
                          <span className="text-xs font-medium">🇮🇩 ID</span>
                        </div>
                        <div className={`flex items-center gap-1 transition-colors duration-300 ${language === 'en' ? 'text-white' : 'text-gray-600'}`}>
                          <span className="text-xs font-medium">🇬🇧 EN</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => smoothScroll(e, item.href)}
                    className={`transition-colors duration-300 px-4 py-2 rounded-lg ${
                      isActive
                        ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}

              {/* Mobile Settings */}
              <div className="pt-4 border-t border-gray-200 dark:border-dark-700 space-y-4">
                {/* Theme Toggle */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-4">{t('theme')}</p>
                  <button
                    onClick={toggleTheme}
                    className="w-full relative h-10 bg-gray-200 dark:bg-dark-700 rounded-full p-1 transition-colors duration-300"
                  >
                    <div className={`absolute top-1 h-8 w-[calc(50%-4px)] bg-gradient-to-r from-primary-500 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                      theme === 'dark' ? 'left-1' : 'left-[calc(50%+2px)]'
                    }`}></div>
                    <div className="relative flex items-center justify-between px-3">
                      <div className={`flex items-center gap-1 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        <span className="text-xs font-medium">{t('theme.dark.short')}</span>
                      </div>
                      <div className={`flex items-center gap-1 transition-colors duration-300 ${theme === 'light' ? 'text-white' : 'text-gray-600'}`}>
                        <span className="text-xs font-medium">{t('theme.light.short')}</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Language Toggle */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-4">{t('language')}</p>
                  <button
                    onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                    className="w-full relative h-10 bg-gray-200 dark:bg-dark-700 rounded-full p-1 transition-colors duration-300"
                  >
                    <div className={`absolute top-1 h-8 w-[calc(50%-4px)] bg-gradient-to-r from-primary-500 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                      language === 'id' ? 'left-1' : 'left-[calc(50%+2px)]'
                    }`}></div>
                    <div className="relative flex items-center justify-between px-3">
                      <div className={`flex items-center gap-1 transition-colors duration-300 ${language === 'id' ? 'text-white' : 'text-gray-600'}`}>
                        <span className="text-xs font-medium">🇮🇩 ID</span>
                      </div>
                      <div className={`flex items-center gap-1 transition-colors duration-300 ${language === 'en' ? 'text-white' : 'text-gray-600'}`}>
                        <span className="text-xs font-medium">🇬🇧 EN</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
