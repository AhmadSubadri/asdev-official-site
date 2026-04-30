'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
      document.documentElement.classList.toggle('dark', isDark);
    } catch {
      // noop
    }
  }, []);

  return null;
}
