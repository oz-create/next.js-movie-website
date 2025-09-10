import { RootState } from '@/store/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ThemeWrapper({ children }: { children: React.ReactNode }) {

  const { mode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return <>{children}</>;
}

export default ThemeWrapper