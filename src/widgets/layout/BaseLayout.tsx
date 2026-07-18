import React from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { BottomNav } from '@/widgets/bottom-nav';
import { Outlet } from 'react-router-dom';

export const BaseLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5f0]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};
