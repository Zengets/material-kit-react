import 'src/global.css';

import { useEffect } from 'react';

import { HelmetProvider } from 'react-helmet-async';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';


// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();


  return (
    <HelmetProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </HelmetProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
