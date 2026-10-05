import './global.css';
import React from 'react';

export const metadata = {
  title: 'Car Lease Management System Console',
  description: 'Enterprise Fleet Operational Systems',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='m-0 p-0' style={{ margin: 0, padding: 0, backgroundColor: '#f6f8fa', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}