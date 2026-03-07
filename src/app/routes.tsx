import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { Gallery } from './pages/Gallery';
import { Trainers } from './pages/Trainers';
import { Profile } from './pages/Profile';
import { Registration } from './pages/Registration';
import { DesignSystem } from './pages/DesignSystem';
import ProtectedLayout from './components/ProtectedLayout';

export const router = createBrowserRouter([
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/', Component: Home },
      { path: '/chat', Component: Chat },
      { path: '/gallery', Component: Gallery },
      { path: '/trainers', Component: Trainers },
      { path: '/profile', Component: Profile },
      { path: '/design-system', Component: DesignSystem },
    ],
  },
  { path: '/registration', Component: Registration },
]);
