import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  showBack?: boolean;
  showNotifications?: boolean;
  hideBottomNav?: boolean;
}

export function PageLayout({ title, children, showBack, showNotifications, hideBottomNav }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar title={title} showBack={showBack} showNotifications={showNotifications} />
      <main className="max-w-md mx-auto pt-16 pb-20">
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
