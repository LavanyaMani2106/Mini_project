import React from 'react';

const LungsIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
    <path d="M7 3c0 2-1 3-2 4s-2 3-2 6 1 6 4 6 4-2 4-4v-1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 3c0 2 1 3 2 4s2 3 2 6-1 6-4 6-4-2-4-4v-1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default LungsIcon;
