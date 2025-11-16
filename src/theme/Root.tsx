import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import OtpGenerator from '../components/OtpGenerator';

export default function Root({ children }) {
  useEffect(() => {
    const initOtpGenerator = () => {
      const container = document.getElementById('navbar-otp-generator');
      if (container && !container.hasChildNodes()) {
        const root = createRoot(container);
        root.render(<OtpGenerator />);
      }
    };

    // Initial render
    const timer = setTimeout(initOtpGenerator, 100);

    // Observe for navbar changes
    const observer = new MutationObserver(initOtpGenerator);
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
      observer.observe(navbar, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
