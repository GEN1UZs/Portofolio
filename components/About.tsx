'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

export default function About() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-2xl bg-gray-100 dark:bg-dark-800 overflow-hidden">
                <Image
                  src={theme === 'dark' ? '/light_theme.png' : '/light_theme.png'}
                  alt="Portfolio Website Preview"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold gradient-text">
              {t('about.heading')}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {t('about.description1')}
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {t('about.description2')}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 glass rounded-lg card-hover">
                <p className="text-3xl sm:text-4xl font-bold gradient-text">1+</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">{t('about.years')}</p>
              </div>
              <div className="text-center p-4 glass rounded-lg card-hover">
                <p className="text-3xl sm:text-4xl font-bold gradient-text">2+</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">{t('about.projects')}</p>
              </div>
              <div className="text-center p-4 glass rounded-lg card-hover">
                <p className="text-3xl sm:text-4xl font-bold gradient-text">2+</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">{t('about.clients')}</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/CV_Raffi_Fa'iq_Firjatullah.pdf"
                download="CV_Raffi_Faiq_Firjatullah.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('about.download')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
