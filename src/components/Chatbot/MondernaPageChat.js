import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  X,
  Minimize2,
  Maximize2,
  MessageCircle,
} from "lucide-react";

const MondernaPageChat = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm Monderna, your AI website assistant. How can I help you create amazing websites today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const knowledgeBase = {
    greetings: [
      "Hello! I'm Monderna, your AI website assistant. How can I help you create amazing websites today?",
      "Hi there! Welcome to Monderna. I'm here to help you build stunning websites. What would you like to know?",
      "Hey! I'm Monderna, your personal AI assistant for website creation. How can I assist you?",
    ],
    website_help: {
      "templates": "We have amazing templates for blogs, restaurants, gyms, and more! Each template is professionally designed and fully customizable. You can browse them in our Templates section.",
      "customization": "Customizing your website is easy! You can change colors, fonts, layouts, add your own content, images, and more. Our drag-and-drop builder makes it simple.",
      "pricing": "We offer flexible pricing options. Some templates are free, while premium templates start at $39. We also have enhanced versions with more features.",
      "features": "Our websites include SEO optimization, mobile responsiveness, fast loading speeds, contact forms, social media integration, and much more!",
      "how to start": "Getting started is simple! 1) Choose a template 2) Customize it to your needs 3) Add your content 4) Publish your website. I'm here to guide you through each step!",
      "support": "I'm available 24/7 to help you! You can also reach our support team through the contact form on our website.",
    },
    self_promotion: [
      "I'm Monderna, your AI assistant here at Monderna! I help users create beautiful websites every day. What kind of website are you looking to build?",
      "I love helping people create amazing websites! Whether you need a blog, business site, or portfolio, I can guide you to the perfect template and features.",
      "As your AI assistant, I'm here to make website creation easy and fun! What questions do you have about building your website?",
    ],
    default_responses: [
      "That's a great question! Let me help you with that. Could you be more specific about what you'd like to know?",
      "I'd be happy to help you with that! Can you tell me more about what you're trying to achieve?",
      "Interesting! I can definitely assist you with website-related questions. What specific aspect would you like to explore?",
    ],
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Check for greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    }

    // Check for specific help topics
    for (const [key, response] of Object.entries(knowledgeBase.website_help)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Check for self-promotion keywords
    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you") || lowerMessage.includes("monderna")) {
      return knowledgeBase.self_promotion[Math.floor(Math.random() * knowledgeBase.self_promotion.length)];
    }

    // Default responses
    return knowledgeBase.default_responses[Math.floor(Math.random() * knowledgeBase.default_responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: getResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    onMinimize(!isMinimized);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed bottom-6 right-6 z-50 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
        } bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Monderna</h3>
              <p className="text-white/80 text-xs">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMinimize}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 h-[380px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Monderna anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MondernaPageChat;
