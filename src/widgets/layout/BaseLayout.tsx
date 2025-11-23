import React from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { BottomNav } from '@/widgets/bottom-nav';
import { Outlet } from 'react-router-dom';

export const BaseLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};
