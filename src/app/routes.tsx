import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { Gallery } from './pages/Gallery';
import { Trainers } from './pages/Trainers';
import { Profile } from './pages/Profile';
import { Registration } from './pages/Registration';
import { DesignSystem } from './pages/DesignSystem';
export const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/chat', Component: Chat },
  { path: '/gallery', Component: Gallery },
  { path: '/trainers', Component: Trainers },
  { path: '/profile', Component: Profile },
  { path: '/registration', Component: Registration },
  { path: '/design-system', Component: DesignSystem },
]);
