'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}


const translations: Record<Language, Record<string, string>> = {
  id: {
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',

    'hero.greeting': 'Halo, Saya',
    'hero.role': 'Pengembang Web Full Stack',
    'hero.description': 'Saya membuat pengalaman digital yang luar biasa dengan kode yang bersih dan desain yang indah',
    'hero.cta.projects': 'Lihat Proyek Saya',
    'hero.cta.contact': 'Hubungi Saya',

    'about.title': 'Tentang',
    'about.me': 'Saya',
    'about.heading': 'Saya Developer yang Passionate',
    'about.description1': 'Saya adalah developer kreatif yang berspesialisasi dalam membangun pengalaman digital yang luar biasa. Saat ini, saya fokus pada pembuatan produk yang dapat diakses dan berpusat pada manusia menggunakan teknologi web modern.',
    'about.description2': 'Dengan fondasi yang kuat dalam pengembangan front-end dan back-end, saya mewujudkan ide melalui kode yang bersih dan desain yang thoughtful. Saya suka mempelajari teknologi baru dan memecahkan masalah yang kompleks.',
    'about.years': 'Tahun Pengalaman',
    'about.projects': 'Proyek Selesai',
    'about.clients': 'Klien Senang',
    'about.download': 'Unduh CV',

    'skills.title': 'Saya',
    'skills.my': 'Keahlian',
    'skills.subtitle': 'Teknologi dan alat yang saya gunakan untuk mewujudkan ide Anda',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools & Lainnya',
    'skills.technologies': 'Teknologi yang Saya Gunakan',

    'projects.title': 'Saya',
    'projects.featured': 'Proyek',
    'projects.subtitle': 'Berikut adalah beberapa karya terbaru saya',
    'projects.all': 'Semua',
    'projects.webapp': 'Aplikasi Web',
    'projects.dashboard': 'Dashboard',
    'projects.website': 'Website',
    'projects.mobileapp': 'Aplikasi Mobile',
    'projects.viewall': 'Lihat Semua Proyek',

    'project.webapp.title': 'Higher.id',
    'project.webapp.description': 'Aplikasi web modern yang dibangun dengan Next.js, menampilkan desain responsif dan integrasi API untuk konten dinamis.',
    'project.dashboard.title': 'Dashboard CCTV Wonosobo',
    'project.dashboard.description': 'Dashboard admin komprehensif yang dikembangkan dengan Laravel dan Tailwind CSS, berjalan di Laragon untuk pengembangan lokal.',

    'contact.title': 'Saya',
    'contact.getin': 'Kontak',
    'contact.subtitle': 'Punya proyek dalam pikiran? Mari bekerja sama untuk menciptakan sesuatu yang luar biasa!',
    'contact.letstalk': 'Mari Bicara',
    'contact.intro': 'Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau kesempatan untuk menjadi bagian dari visi Anda.',
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsapp.value': 'Hubungi via WhatsApp',
    'contact.location': 'Lokasi',
    'contact.location.value': 'Wonosobo, Jawa Tengah, Indonesia',
    'contact.connect': 'Sosial media saya',
    'contact.form.name': 'Nama Anda',
    'contact.form.name.placeholder': 'John Doe',
    'contact.form.email': 'Email Anda',
    'contact.form.email.placeholder': 'john@example.com',
    'contact.form.message': 'Pesan Anda',
    'contact.form.message.placeholder': 'Ceritakan tentang proyek Anda...',
    'contact.form.send': 'Kirim Pesan',
    'contact.form.success': 'Terima kasih atas pesan Anda! Saya akan segera menghubungi Anda.',

    'footer.rights': 'Hak Cipta Dilindungi',
    'footer.made': 'Dibuat dengan',
    'footer.by': 'oleh',

    'theme': 'Tema',
    'language': 'Bahasa',
    'theme.light': 'Terang',
    'theme.dark': 'Gelap',
    'theme.light.short': 'Terang',
    'theme.dark.short': 'Gelap',
    'language.id': 'Indonesia',
    'language.en': 'English',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.greeting': 'Hello, I\'m',
    'hero.role': 'Full Stack Web Developer',
    'hero.description': 'I craft exceptional digital experiences with clean code and beautiful design',
    'hero.cta.projects': 'View My Work',
    'hero.cta.contact': 'Get In Touch',

    'about.title': 'About',
    'about.me': 'Me',
    'about.heading': 'I\'m a Passionate Developer',
    'about.description1': 'I\'m a creative developer specializing in building exceptional digital experiences. Currently, I\'m focused on building accessible, human-centered products using modern web technologies.',
    'about.description2': 'With a strong foundation in both front-end and back-end development, I bring ideas to life through clean code and thoughtful design. I love learning new technologies and solving complex problems.',
    'about.years': 'Years Experience',
    'about.projects': 'Projects Done',
    'about.clients': 'Happy Clients',
    'about.download': 'Download CV',

    'skills.title': 'Skills',
    'skills.my': 'My',
    'skills.subtitle': 'Technologies and tools I use to bring your ideas to life',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools & Others',
    'skills.technologies': 'Technologies I Work With',

    'projects.title': 'Projects',
    'projects.featured': 'Featured',
    'projects.subtitle': 'Here are some of my recent works',
    'projects.all': 'All',
    'projects.webapp': 'Web App',
    'projects.dashboard': 'Dashboard',
    'projects.website': 'Website',
    'projects.mobileapp': 'Mobile App',
    'projects.viewall': 'View All Projects',

    'project.webapp.title': 'Higher.id',
    'project.webapp.description': 'Modern web application built with Next.js, featuring responsive design and API integration for dynamic content.',
    'project.dashboard.title': 'CCTV Dashboard Wonosobo',
    'project.dashboard.description': 'Comprehensive admin dashboard developed with Laravel and Tailwind CSS, running on Laragon for local development.',

    'contact.title': 'Touch',
    'contact.getin': 'Get In',
    'contact.subtitle': 'Have a project in mind? Let\'s work together to create something amazing!',
    'contact.letstalk': 'Let\'s Talk',
    'contact.intro': 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.',
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsapp.value': 'Contact via WhatsApp',
    'contact.location': 'Location',
    'contact.location.value': 'Wonosobo, Central Java, Indonesia',
    'contact.connect': 'Connect With Me',
    'contact.form.name': 'Your Name',
    'contact.form.name.placeholder': 'John Doe',
    'contact.form.email': 'Your Email',
    'contact.form.email.placeholder': 'john@example.com',
    'contact.form.message': 'Your Message',
    'contact.form.message.placeholder': 'Tell me about your project...',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Thank you for your message! I will get back to you soon.',

    'footer.rights': 'All rights reserved',
    'footer.made': 'Made with',
    'footer.by': 'by',

    'theme': 'Theme',
    'language': 'Language',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.light.short': 'Light',
    'theme.dark.short': 'Dark',
    'language.id': 'Indonesia',
    'language.en': 'English',
  },
};
