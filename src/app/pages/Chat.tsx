import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'coach' | 'parent';
  senderName: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Good morning everyone! Just a reminder that this Saturday's practice will start at 10:00 AM sharp. Please arrive 15 minutes early for warm-ups.",
    sender: 'coach',
    senderName: 'Coach Messy',
    time: '9:30 AM',
  },
  {
    id: '2',
    text: 'Thank you Coach! Will Emma need her competition skates or practice ones?',
    sender: 'parent',
    senderName: 'Sarah M.',
    time: '9:45 AM',
  },
  {
    id: '3',
    text: "Practice skates are fine for Saturday. We'll be working on fundamentals and edge work.",
    sender: 'coach',
    senderName: 'Coach Messy',
    time: '9:47 AM',
  },
  {
    id: '4',
    text: "Perfect, thanks! She's been practicing at home and is really excited.",
    sender: 'parent',
    senderName: 'Sarah M.',
    time: '9:50 AM',
  },
  {
    id: '5',
    text: "That's wonderful to hear! Her dedication really shows in her progress. Keep up the great work! 🎉",
    sender: 'coach',
    senderName: 'Coach Messy',
    time: '10:05 AM',
  },
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'parent',
      senderName: 'Sarah M.',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <PageLayout title="Beginner Group Chat">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${message.sender === 'coach' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] ${
                  message.sender === 'coach'
                    ? 'bg-[#1C2D8C] text-white rounded-[20px] rounded-tr-sm'
                    : 'bg-white text-[#111827] rounded-[20px] rounded-tl-sm shadow-sm'
                } p-4`}
              >
                <p className={`text-xs mb-1 ${message.sender === 'coach' ? 'text-white/80' : 'text-[#6B7280]'}`}>
                  {message.senderName}
                </p>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${message.sender === 'coach' ? 'text-white/60' : 'text-[#6B7280]'}`}>
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 h-11 px-4 bg-[#F6F8FC] rounded-full text-sm placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
            />
            <button
              onClick={handleSend}
              className="w-11 h-11 bg-[#00C2FF] rounded-full flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
              disabled={!inputValue.trim()}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}