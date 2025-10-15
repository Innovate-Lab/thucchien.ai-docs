import React, { useEffect } from 'react';
import { createRoot, Root as ReactRoot } from 'react-dom/client';
import OtpGenerator from '../components/OtpGenerator';

// Store root instance to prevent creating multiple roots
let rootInstance: ReactRoot | null = null;

export default function Root({ children }) {
  useEffect(() => {
    const initOtpGenerator = () => {
      const container = document.getElementById('navbar-otp-generator');
      
      if (container) {
        // If container is empty or changed, render the component
        if (!container.hasChildNodes() || !container.querySelector('[class*="otpContainer"]')) {
          // Clean up old root if exists
          if (rootInstance && container.hasChildNodes()) {
            try {
              rootInstance.unmount();
            } catch (e) {
              // Ignore unmount errors
            }
          }
          
          // Create new root and render
          rootInstance = createRoot(container);
          rootInstance.render(<OtpGenerator />);
        }
      }
    };

    // Initial render with slight delay to ensure DOM is ready
    const timer = setTimeout(initOtpGenerator, 100);

    // Watch for route changes and navbar updates
    const observer = new MutationObserver((mutations) => {
      // Check if navbar or container changed
      const hasNavbarChange = mutations.some(mutation => 
        mutation.target instanceof Element && 
        (mutation.target.classList.contains('navbar') || 
         mutation.target.closest('.navbar'))
      );
      
      if (hasNavbarChange) {
        initOtpGenerator();
      }
    });

    // Observe the entire document for navbar changes
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // Also listen for route changes
    const handleRouteChange = () => {
      setTimeout(initOtpGenerator, 150);
    };
    
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
}
