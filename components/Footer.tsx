import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900 bg-background">
      <p>&copy; {new Date().getFullYear()} Alex Chen. All rights reserved.</p>
      <p className="mt-2">Built with React, Tailwind & TypeScript.</p>
    </footer>
  );
};

export default Footer;