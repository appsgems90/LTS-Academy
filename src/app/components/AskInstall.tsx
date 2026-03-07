import { useState, useEffect } from 'react';

export function AskInstall() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferred] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // on iOS we can also encourage manually by showing the banner
    const isIos = /iphone|ipad/i.test(navigator.userAgent) && !window.MSStream;
    const isInStandalone = 'standalone' in window && (window as any).standalone;
    if (isIos && !isInStandalone) {
      setVisible(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setVisible(false));
    } else {
      alert('Tap the Share button and choose "Add to Home Screen" to install this app.');
      setVisible(false);
    }
  };

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 w-full bg-card p-4 flex justify-between items-center z-50">
      <span className="text-sm">Install the LTS app for quick access</span>
      <button
        onClick={install}
        className="text-sm text-primary font-medium"
      >
        Install
      </button>
    </div>
  );
}
