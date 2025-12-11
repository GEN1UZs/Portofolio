'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold gradient-text">Portfolio</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Building exceptional digital experiences with passion and precision.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'home', label: t('nav.home') },
                { key: 'about', label: t('nav.about') },
                { key: 'skills', label: t('nav.skills') },
                { key: 'projects', label: t('nav.projects') },
                { key: 'contact', label: t('nav.contact') }
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href={`#${item.key}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Follow Me
            </h3>
            <div className="flex gap-4">
              {[
                { name: 'GitHub', link: 'https://github.com/GEN1UZs' },
                { name: 'LinkedIn', link: 'https://www.linkedin.com/in/raffi-firjatullah-57a311310/' },
                { name: 'Instagram', link: 'https://www.instagram.com/ch1llin_raffi/' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-500 hover:to-purple-600 hover:text-white transition-all duration-300 card-hover"
                  aria-label={social.name}
                >
                  <span className="text-sm font-medium">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-dark-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Portfolio. Built with{' '}
            <span className="text-red-500">❤</span> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
