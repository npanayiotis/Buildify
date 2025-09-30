import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  MessageCircle,
  Zap,
  Brain,
  Star,
  ArrowRight,
  CheckCircle,
  Crown,
  Rocket,
  Send,
  X,
} from "lucide-react";
import Head from "next/head";

const MondernaPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
    }
  }, [isChatOpen]);

  const handleStartChatting = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const knowledgeBase = {
    greetings: [
      "Hello! I'm Monderna, your AI website assistant. How can I help you create amazing websites today?",
      "Hi there! Welcome to Elevare. I'm here to help you build stunning websites. What would you like to know?",
      "Hey! I'm Monderna, your personal AI assistant for website creation. How can I assist you?",
    ],
    website_help: {
      "templates": "We have amazing templates for blogs, restaurants, gyms, law offices, real estate, medical practices, photography studios, and more! Each template is professionally designed and fully customizable. You can browse them in our Templates section.",
      "customization": "Customizing your website is easy! You can change colors, fonts, layouts, add your own content, images, and more. Our drag-and-drop builder makes it simple.",
      "pricing": "We offer flexible pricing options. Some templates are free, while premium templates start at $149. We also have enhanced versions with more features.",
      "features": "Our websites include responsive design, SEO optimization, contact forms, social media integration, analytics, and much more!",
      "support": "We provide excellent support through our help center, documentation, and community forums. I'm also here to help you 24/7!",
    },
    self_promotion: [
      "I'm Monderna, your AI website assistant! I can help you choose the perfect template, customize your design, and guide you through the entire website creation process.",
      "Did you know I'm powered by advanced AI? I can answer questions about website building, suggest improvements, and help you create amazing websites with Elevare!",
      "I'm always learning and improving to better serve you. Ask me anything about website creation, and I'll do my best to help you succeed!",
    ],
    quickSuggestions: [
      "What templates do you have?",
      "How do I customize my website?",
      "Tell me about your pricing",
      "What features are included?",
    ],
    default_responses: [
      "I'm here to help you with website creation! You can ask me about our templates, customization options, pricing, or any other website-related questions.",
      "That's a great question! Let me help you with that. You can ask me about our templates, features, or how to get started with building your website.",
      "I'd be happy to assist you! Feel free to ask me about our website templates, customization tools, or any other questions you might have.",
    ],
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    }
    
    // Check for website help keywords
    for (const [keyword, response] of Object.entries(knowledgeBase.website_help)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Check for self-promotion keywords
    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you") || lowerMessage.includes("about you")) {
      return knowledgeBase.self_promotion[Math.floor(Math.random() * knowledgeBase.self_promotion.length)];
    }
    
    // Default response
    return knowledgeBase.default_responses[Math.floor(Math.random() * knowledgeBase.default_responses.length)];
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const botResponse = getBotResponse(messageText);
    const newBotMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: botResponse,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newBotMessage]);
    setIsTyping(false);
  };

  const handleQuickSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description:
        "Advanced AI that understands your questions and provides helpful responses about website building.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Responses",
      description:
        "Get immediate answers to your questions about templates, customization, and website features.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 Availability",
      description:
        "Monderna is always online and ready to help you whenever you need assistance.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Personalized Help",
      description:
        "Tailored guidance based on your specific needs and questions about Elevare.",
    },
  ];

  const capabilities = [
    "Help you choose the perfect template",
    "Guide you through customization options",
    "Explain website building features",
    "Provide pricing information",
    "Assist with technical questions",
    "Share tips and best practices",
  ];

  return (
    <>
      <Head>
        <title>Meet Monderna - Your AI Assistant | Elevare</title>
        <meta
          name="description"
          content="Meet Monderna, your intelligent AI assistant that helps you create amazing websites with Elevare. Get instant help and guidance 24/7."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  background: `hsl(${Math.random() * 60 + 200}, 70%, 70%)`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Monderna Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-32 h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl"
              >
                <Bot className="w-16 h-16 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Monderna
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-2xl md:text-3xl text-white mb-4 font-light"
              >
                Your AI Website Assistant
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
              >
                Meet Monderna, your intelligent AI companion that helps you
                create stunning websites with Elevare. Get instant help,
                guidance, and personalized assistance 24/7.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button
                  onClick={handleStartChatting}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white text-lg font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <MessageCircle className="w-6 h-6" />
                    <span>Start Chatting with Monderna</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <div className="flex items-center gap-2 text-white/70">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online Now</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Monderna?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Powered by advanced AI technology, Monderna provides intelligent
              assistance for all your website needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <div className="text-center mb-12">
                <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">
                  What Can Monderna Do?
                </h2>
                <p className="text-xl text-white/70">
                  Your comprehensive AI assistant for website creation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white">{capability}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button
                  onClick={handleStartChatting}
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white text-lg font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <Rocket className="w-6 h-6" />
                    <span>Try Monderna Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Section */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-2xl text-white mb-8 italic">
                &ldquo;Monderna has been incredibly helpful! It guided me
                through creating my first website in just minutes. The AI
                understands exactly what I need and provides clear, actionable
                advice.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">JS</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Jane Smith</p>
                  <p className="text-white/70">Business Owner</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Meet Your AI Assistant?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Click the chat button in the bottom right corner to start chatting
              with Monderna right now!
            </p>
            <div className="flex items-center justify-center gap-4 text-white/70">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Monderna is online and ready to help</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Inline Chat Section */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 container mx-auto px-6 py-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Monderna AI</h3>
                      <p className="text-white/80 text-sm">Your Website Assistant</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseChat}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                          : "bg-white/80 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === "user" ? "text-white/70" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/80 text-gray-800 rounded-2xl rounded-bl-md p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {knowledgeBase.quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSuggestionClick(suggestion)}
                      className="px-4 py-2 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-white/20">
                <div className="flex gap-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                    placeholder="Ask Monderna anything..."
                    className="flex-1 px-4 py-3 bg-white/80 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleSendMessage(inputMessage)}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default MondernaPage;
