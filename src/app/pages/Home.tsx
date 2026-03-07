import { PageLayout } from '../components/PageLayout';
import { Calendar, MapPin, TrendingUp, Bell, Palette, UserPlus, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { ref, onValue } from 'firebase/database';

export function Home() {
  const [user, setUser] = useState<{ parentName: string; studentName?: string; role?: string } | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ltsUser');
    if (stored) setUser(JSON.parse(stored));
    const unread = localStorage.getItem('unreadChat');
    setHasUnread(unread === '1');

    // listen for chat changes while we're on home and mark unread
    let first = true;
    const chatRef = ref(db, 'chatRooms/general');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      if (first) {
        first = false; // skip initial load
        return;
      }
      // a change happened; set indicator and persist
      setHasUnread(true);
      localStorage.setItem('unreadChat', '1');
    });

    return () => unsubscribe();
  }, []);

  if (user === null) {
    // wait for guard to redirect or for localStorage read
    return <div className="p-4">Loading…</div>;
  }

  const parentName = user.parentName;
  const studentName = user.studentName || '';
  const avatarUrl =
    user.avatarUrl ||
    `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(parentName)}`;

  return (
    <PageLayout title="LTS Academy">
      <div className="p-4 space-y-6">
        {/* avatar displayed in corner */}
        <div className="flex justify-end">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome back, {parentName}! 👋
          </h2>
          <p className="text-muted-foreground">
            Let's keep up the great progress
          </p>
        </motion.div>

        {/* Next Practice Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-[#1C2D8C] to-[#2A3FA8] rounded-[20px] p-6 text-white shadow-lg shadow-blue-900/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Next Practice</p>
              <h3 className="text-xl font-semibold">Beginner Group Session</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm">Saturday, February 22, 2026</p>
                <p className="text-xs text-white/80">10:00 AM - 11:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm">Ice Arena Downtown</p>
                <p className="text-xs text-white/80">Rink A</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 h-11 bg-card text-primary rounded-full font-medium active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </button>
            <button className="flex-1 h-11 bg-white text-[#1C2D8C] rounded-full font-medium active:scale-95 transition-transform flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Pay for Session
            </button>
          </div>
        </motion.div>

        {/* Announcements Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-[20px] p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Announcements</h3>
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {hasUnread && (
                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-[#00C2FF] rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground mb-1">
                  <span className="font-medium">Winter Competition Registration Open</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Sign up for the annual winter showcase by March 1st
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground mb-1">
                  <span className="font-medium">Schedule Update</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Tuesday practice moved to 4:00 PM this week only
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground mb-1">
                  <span className="font-medium">New Equipment Available</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Check out our pro shop for the latest skating gear
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Student Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-[20px] p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              {studentName ? `${studentName}'s Progress` : "Progress"}
            </h3>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Forward Skating</span>
                <span className="text-sm font-medium text-foreground">90%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '90%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#1C2D8C] to-[#00C2FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Backward Skating</span>
                <span className="text-sm font-medium text-foreground">75%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-[#1C2D8C] to-[#00C2FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Balance & Edges</span>
                <span className="text-sm font-medium text-foreground">85%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-[#1C2D8C] to-[#00C2FF]"
                />
              </div>
            </div>
          </div>

          <button className="w-full h-11 mt-4 border border-border text-foreground rounded-full font-medium active:bg-muted transition-colors">
            View Full Report
          </button>
        </motion.div>
      </div>
    </PageLayout>
  );
}