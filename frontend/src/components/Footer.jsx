import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A React Component that displays a simple footer conditionally if the page isn't the landing page
 * @returns The rendered component.
 */
const Footer = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div
      className={`text-white text-xl bg-[#222] text-center py-8 mt-auto ${
        isLandingPage ? 'hidden' : ''
      }`}
    >
      2025 &copy; Garrett Designs
    </div>
  );
};

export default Footer;
