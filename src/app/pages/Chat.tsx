import { useState, useEffect, useRef } from "react";
import { PageLayout } from "../components/PageLayout";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { db } from "../../../lib/firebase";
import { ref, push, onValue } from "firebase/database";

interface Message {
  id: string;
  text: string;
  sender: "coach" | "parent";
  senderName: string;
  time: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState<{
    parentName: string;
    studentName?: string;
    parentPhone?: string;
    role?: "parent" | "coach";
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Load registered user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("ltsUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // clear unread flag when entering chat
    localStorage.removeItem("unreadChat");
  }, []);

  // helper to consistently pick a background color for each parent
  const parentBgColor = (name: string) => {
    const colors = ["bg-white", "bg-gray-100"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  // ✅ Listen for chat messages from Firebase (always use general room)
  useEffect(() => {
    const chatRef = ref(db, "chatRooms/general");

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        return;
      }

      const msgs: Message[] = Object.keys(data).map((key) => ({
        id: key,
        text: data[key].text,
        sender: data[key].sender,
        senderName: data[key].senderName,
        time: data[key].time,
      }));

      setMessages(msgs);
      // clear flag whenever new messages arrive and user is viewing chat
      localStorage.removeItem("unreadChat");
    });

    return () => unsubscribe();
  }, []);

  // auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: user.role === "coach" ? "coach" : "parent",
      senderName: user.parentName,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };

    const chatRef = ref(db, "chatRooms/general");
    await push(chatRef, newMessage);
    setInputValue("");

    // since we are still in chat, clear any existing badge immediately
    localStorage.removeItem("unreadChat");
  };

  return (
    <PageLayout title="General Chat">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Messages */}
        <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message, index) => {
            const isCoach = message.sender === "coach";
            const parentBg = parentBgColor(message.senderName);
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex ${isCoach ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] ${
                    isCoach
                      ? "bg-[#1C2D8C] text-white rounded-[20px] rounded-tr-sm"
                      : `${parentBg} text-[#111827] rounded-[20px] rounded-tl-sm shadow-sm`
                  } p-4`}
                >
                  <p className={`text-xs mb-1 ${isCoach ? "text-white/80" : "text-[#6B7280]"}`}>
                    {message.senderName}
                  </p>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${isCoach ? "text-white/60" : "text-[#6B7280]"}`}>
                    {message.time}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 h-11 px-4 bg-[#F6F8FC] rounded-full text-[16px] text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#00C2FF] transition-shadow"
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