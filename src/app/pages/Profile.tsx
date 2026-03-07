import { PageLayout } from '../components/PageLayout';
import {
  User,
  Settings,
  Bell,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit2,
  UserPlus,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import avikaImage from '../../assets/avika.PNG';
import { useState, useEffect } from 'react';

export function Profile() {
  const [user, setUser] = useState<{ parentName: string; studentName?: string; role?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ltsUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const parentName = user?.parentName || 'Parent';
  const studentName = user?.studentName || '';
  const isCoach = user?.role === 'coach';

  const menuItems = [
    { icon: User, label: 'Edit Profile', color: 'text-[#1C2D8C]', path: '#' },
    { icon: Settings, label: 'App Settings', color: 'text-[#1C2D8C]', path: '#' },
    { icon: Bell, label: 'Notifications', color: 'text-[#1C2D8C]', path: '#' },
    { icon: FileText, label: 'Documents & Forms', color: 'text-[#1C2D8C]', path: '#' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-[#1C2D8C]', path: '#' },
  ];

  return (
    <PageLayout title="Profile">
      <div className="p-4 space-y-6">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#1C2D8C] to-[#2A3FA8] rounded-[20px] p-6 text-white shadow-lg shadow-blue-900/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={
                  user?.avatarUrl ||
                  `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(
                    parentName
                  )}`
                }
                alt={parentName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">{parentName}</h2>
              <p className="text-white/80 text-sm mb-3">
                {isCoach ? 'Coach / Trainer' : `Parent of ${studentName}`}
              </p>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                  <span className="text-xs">Beginner Group</span>
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                  <span className="text-xs">Member Since 2024</span>
                </div>
              </div>
            </div>
            <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Student Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-[20px] p-5 shadow-sm"
        >
          <h3 className="font-semibold text-foreground mb-4">Student Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Student Name</span>
              <span className="text-sm font-medium text-foreground">{studentName || '—'}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Age</span>
              <span className="text-sm font-medium text-foreground">3 years old</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Skill Level</span>
              <span className="text-sm font-medium text-foreground">Beginner</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Enrollment Date</span>
              <span className="text-sm font-medium text-foreground">January 15, 2024</span>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-[20px] shadow-sm overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center justify-between p-4 active:bg-muted transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex items-center justify-center gap-2 p-4 bg-card rounded-[20px] shadow-sm active:bg-muted transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium text-red-500">Log Out</span>
        </motion.button>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">LTS Academy v1.0.0</p>
        </div>
      </div>
    </PageLayout>
  );
}