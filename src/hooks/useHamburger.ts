import { useEffect } from 'react';

export const useHamburger = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element)?.closest('#hamburger-trigger');
      if (target) {
        // Toggle active class on all elements with 'hamburger' class
        document.querySelectorAll('.hamburger').forEach((element) => {
          element.classList.toggle('active');
        });
        
        // Toggle active class on hamburger trigger
        const hamburgerTrigger = document.getElementById('hamburger-trigger');
        if (hamburgerTrigger) {
          hamburgerTrigger.classList.toggle('active');
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}; 