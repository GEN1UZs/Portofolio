'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleSmoothScroll } from '@/utils/smoothScroll';

export default function Hero() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'Creative Coder'];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden particle-bg pt-16 md:pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="animate-fade-in">
          <p className="text-primary-500 dark:text-primary-400 text-lg sm:text-xl font-medium mb-4 animate-slide-down">
            {t('hero.greeting')}
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text">Raffi Fa'iq Firjatullah</span>
          </h1>

          <div className="h-16 sm:h-20 flex items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 dark:text-gray-300">
              <span className="gradient-text">{text}</span>
              <span className="border-r-2 border-primary-500 animate-pulse ml-1"></span>
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, '#projects', 80, 1000)}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50 cursor-pointer"
            >
              <span className="relative z-10">{t('hero.cta.projects')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact', 80, 1000)}
              className="group px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-lg font-medium transition-all duration-300 hover:bg-primary-500 hover:text-white hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {t('hero.cta.contact')}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-20">
        <a
          href="#about"
          onClick={(e) => handleSmoothScroll(e, '#about', 80, 1000)}
          className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          <span className="text-sm">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
