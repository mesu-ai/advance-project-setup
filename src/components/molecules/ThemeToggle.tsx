import DarkIcon from '@/assets/svg/DarkIcon';
import LightIcon from '@/assets/svg/LightIcon';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={handleTheme}
      type="button"
      aria-label="theme-toggle-button"
      className="text-neutral-300 hover:text-primary-500 cursor-pointer bg-background hover:bg-primary-50 p-[8px] rounded-full"
    >
      {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
    </button>
  );
};

export default ThemeToggle;
