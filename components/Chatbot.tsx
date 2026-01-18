import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChatCircle, X, PaperPlaneTilt, Robot } from 'phosphor-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Akshya's AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(buttonRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, delay: 2, ease: "back.out(1.7)" }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatboxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isOpen) {
      gsap.to(chatboxRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');

    setTimeout(() => {
      const userInput = message.toLowerCase();

      let reply = "Thanks for reaching out! Akshya specializes in Full Stack MERN, Cloud Engineering (AWS/Docker), and AI/ML. How can he assist?";

      if (userInput.includes("services") || userInput.includes("projects")) {
        reply = "Akshya builds scalable web apps with React/Node/MongoDB, cloud-native systems (AWS/Docker), and AI analytics (Trident Watchtower, PolyglotAI). View portfolio above!";
      } else if (userInput.includes("contact") || userInput.includes("email")) {
        reply = "Contact Akshya at akshyaku.11@gmail.com or LinkedIn: linkedin.com/in/akshyakp. Use the contact form for fastest response!";
      } else if (userInput.includes("react") || userInput.includes("mern")) {
        reply = "Akshya excels in React/TypeScript + Node/Express + MongoDB stacks. 1+ year at AiroboSoft Labs with JWT auth & CI/CD pipelines.";
      } else if (userInput.includes("cloud") || userInput.includes("aws")) {
        reply = "Full Cloud Engineer: AWS, Docker, Linux, CI/CD, microservices. Reduced workflows 60% through automation at AiroboSoft.";
      } else if (userInput.includes("ai") || userInput.includes("ml")) {
        reply = "AI/ML specialist: Built ML pipelines (89% accuracy), Trident Watchtower (AI threat intelligence), PolyglotAI (NLP platform).";
      } else if (userInput.includes("hire") || userInput.includes("job")) {
        reply = "Akshya's available for Full Stack/Cloud roles. Download CV above or email akshyaku.11@gmail.com. NIST B.Tech CSE (8.00 CGPA, Top 10).";
      } else if (userInput.includes("experience")) {
        reply = "1+ year Full Stack at AiroboSoft + Data Science/ML intern. Strong DSA, System Design, Distributed Systems from NIST coursework.";
      }

      const botResponse = {
        id: messages.length + 2,
        text: reply,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div ref={chatboxRef} className="mb-4 w-80 h-96 glass-card overflow-hidden flex flex-col bg-black border-1 border-gray-200">
          <div className="p-4 border-b border-glass-border ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-full">
                  <Robot size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Akshya's Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.isBot
                    ? 'bg-muted/20 text-foreground'
                    : 'bg-gradient-primary text-foreground'
                    }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={handleKeyPress} 
                placeholder="Ask about MERN, AWS, AI projects..." 
                className="flex-1 px-3 py-2 bg-glass border border-glass-border rounded-lg text-sm focus:outline-none focus:border-primary" 
              />
              <button onClick={handleSendMessage} className="p-2 w-8 h-8 bg-gradient-primary rounded-lg hover:scale-105 transition-transform">
                <PaperPlaneTilt size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        ref={buttonRef} 
        onClick={toggleChat} 
        className="chatbot w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform"
        title="Chat with Akshya's AI Assistant"
      >
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <ChatCircle size={24} className="text-foreground" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
