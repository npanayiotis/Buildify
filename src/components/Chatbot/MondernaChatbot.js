import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  Star,
  Zap,
  Crown,
  ArrowRight,
} from "lucide-react";

const MondernaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Knowledge base for website questions and self-advertisement
  const knowledgeBase = {
    greetings: [
      "Hello! I'm Monderna, your AI assistant! 🤖✨",
      "Hi there! I'm Monderna, here to help you with anything about Monderna! 🚀",
      "Greetings! I'm Monderna, your smart website assistant! 💫",
    ],
    website_help: {
      "how to create website":
        "Creating a website with Monderna is super easy! Just go to Templates, choose your design, customize it with our drag-and-drop builder, and publish! It takes just minutes! 🎨",
      "create website":
        "Start by browsing our template library, pick one that fits your business, then customize it with our intuitive builder. No coding required! 🚀",
      templates:
        "We have amazing templates for restaurants, gyms, blogs, portfolios, e-commerce, and more! Each template is professionally designed and mobile-responsive. Check out our Templates page! 📱",
      "template categories":
        "We offer templates for restaurants, gyms, blogs, portfolios, e-commerce stores, consulting, photography, real estate, and many more industries! 🏢",
      customize:
        "Our customization panel lets you change colors, fonts, layouts, and content easily. Just click 'Customize' on any template to start! 🛠️",
      "customization options":
        "You can customize colors, fonts, layouts, images, text, buttons, forms, and more! Our visual editor makes it super easy! 🎨",
      pricing:
        "Monderna offers both free and premium templates! Free templates are perfect for getting started, while premium templates unlock advanced features and exclusive designs! 💎",
      "free vs premium":
        "Free templates include basic customization and hosting. Premium templates add advanced features like custom domains, priority support, and exclusive designs! ✨",
      features:
        "Monderna includes drag-and-drop builder, mobile-responsive designs, SEO optimization, analytics dashboard, and much more! ⚡",
      "what features":
        "Key features: Visual drag-and-drop builder, 100+ templates, mobile-responsive design, SEO optimization, analytics, custom domains, and 24/7 support! 🌟",
      builder:
        "Our drag-and-drop builder is incredibly intuitive! You can add widgets, customize layouts, change colors, and preview your site in real-time. It's like having a professional designer at your fingertips! 🎨",
      "drag and drop":
        "Simply drag widgets onto your page, customize them with our visual editor, and see changes instantly! No technical knowledge required! 🖱️",
      mobile:
        "All our templates are fully responsive and look amazing on mobile devices! Your website will automatically adapt to any screen size. 📱",
      "mobile responsive":
        "Every template automatically adjusts to phones, tablets, and desktops. Your site will look perfect on any device! 📲",
      seo: "Monderna includes built-in SEO optimization features to help your website rank better in search engines! We handle the technical stuff so you can focus on your content. 🚀",
      "search engine optimization":
        "We automatically optimize your site for Google, Bing, and other search engines. Includes meta tags, sitemaps, and fast loading speeds! 🔍",
      analytics:
        "Track your website's performance with our built-in analytics dashboard. See visitor stats, popular pages, and more insights! 📊",
      "website analytics":
        "Monitor visitors, page views, bounce rate, traffic sources, and more! Get insights to improve your website performance! 📈",
      publish:
        "Publishing your website is just one click away! Once you're happy with your design, simply hit the publish button and your site goes live instantly! ✨",
      "how to publish":
        "Click the 'Publish' button in the editor, and your website goes live immediately! You'll get a custom URL that you can share with the world! 🌍",
      support:
        "I'm here to help! You can also reach out to our support team for any technical issues. We're committed to making website creation as smooth as possible! 🤝",
      "get help":
        "You can ask me anything, check our help center, or contact our support team. We're here 24/7 to help you succeed! 💪",
      "help center":
        "Our help center has step-by-step guides, video tutorials, and FAQs to help you build the perfect website! 📚",
      "video tutorials":
        "We have comprehensive video tutorials covering everything from choosing templates to advanced customization! 🎬",
      "step by step":
        "Our guided tutorials will walk you through each step of creating your website, from start to finish! 👣",
      "getting started":
        "New to Monderna? Start by browsing templates, pick one you love, then use our visual editor to make it yours! It's that simple! 🎯",
      "beginner friendly":
        "Absolutely! Monderna is designed for everyone. No coding or design experience needed - just creativity and a few clicks! 😊",
      domain:
        "You can connect your own custom domain (like yourname.com) or use our free subdomain (yourname.monderna.com). Both options work great! 🌐",
      hosting:
        "We provide fast, reliable hosting for all websites built with Monderna. Your site will be secure and load quickly for visitors! ⚡",
      security:
        "All Monderna websites include SSL certificates, regular backups, and security monitoring to keep your site safe! 🔒",
      backup:
        "We automatically backup your website daily, so you never have to worry about losing your work! 💾",
      speed:
        "Monderna websites are optimized for speed with fast loading times and CDN delivery worldwide! 🏃‍♂️",
      ecommerce:
        "Yes! Our e-commerce templates include shopping cart, payment processing, inventory management, and more! 🛒",
      "online store":
        "Build a complete online store with product galleries, secure payments, order tracking, and customer management! 💳",
      blog: "Add a blog to any template! Perfect for sharing news, updates, or building your brand with regular content! ✍️",
      "contact form":
        "Every template includes contact forms that work instantly. Visitors can reach you directly through your website! 📧",
      "social media":
        "Easily connect your social media accounts and add social sharing buttons to boost your online presence! 📱",
      "google maps":
        "Add interactive maps to show your location, perfect for restaurants, stores, or service businesses! 🗺️",
      booking:
        "Restaurant and service templates include booking systems so customers can make reservations online! 📅",
      gallery:
        "Showcase your work with beautiful image galleries. Perfect for photographers, artists, and portfolios! 🖼️",
      testimonials:
        "Build trust with customer testimonials and reviews displayed beautifully on your website! ⭐",
      newsletter:
        "Collect email subscribers with built-in newsletter signup forms to grow your audience! 📬",
      multilingual:
        "Create websites in multiple languages to reach a global audience! 🌍",
      team: "Add team member profiles with photos and bios to personalize your business! 👥",
      services:
        "Showcase your services with dedicated sections, pricing tables, and detailed descriptions! 💼",
      portfolio:
        "Perfect for showcasing your work with stunning portfolio layouts and project galleries! 🎨",
      restaurant:
        "Restaurant templates include menus, online ordering, reservations, and location maps! 🍽️",
      gym: "Gym templates feature class schedules, trainer profiles, membership info, and booking systems! 💪",
      photography:
        "Photography templates showcase your work with beautiful galleries and client galleries! 📸",
      "real estate":
        "Real estate templates include property listings, virtual tours, and agent profiles! 🏠",
      consulting:
        "Professional consulting templates with service pages, case studies, and client testimonials! 💼",
      agency:
        "Creative agency templates with portfolio showcases and team introductions! 🎭",
      nonprofit:
        "Nonprofit templates with donation forms, event calendars, and volunteer signup! 🤝",
      church:
        "Church templates with event calendars, sermon archives, and community features! ⛪",
      wedding:
        "Beautiful wedding templates with photo galleries, RSVP forms, and registry links! 💒",
      fitness:
        "Fitness templates with workout plans, nutrition guides, and member portals! 🏋️‍♀️",
      beauty:
        "Beauty salon templates with service menus, appointment booking, and before/after galleries! 💅",
      medical:
        "Medical practice templates with appointment scheduling and patient information! 🏥",
      legal:
        "Law firm templates with attorney profiles, practice areas, and case studies! ⚖️",
      education:
        "Educational templates for schools, courses, and training programs! 🎓",
      technology:
        "Tech company templates showcasing products, services, and innovation! 💻",
    },
    self_promotion: [
      "I'm Monderna, your AI assistant! I can help you navigate Monderna, answer questions about website building, and guide you through our features! Just ask me anything! 🤖💫",
      "Did you know I'm powered by advanced AI? I'm here 24/7 to help you with Monderna! Try asking me about templates, customization, or any website questions! 🚀",
      "I'm Monderna, and I love helping users create amazing websites! I know everything about Monderna's features, templates, and tools. What would you like to know? ✨",
      "As your AI assistant Monderna, I can help you choose the perfect template, explain customization options, or guide you through our publishing process! Just ask! 🎨",
    ],
    default_responses: [
      "I'm Monderna, your AI assistant! I can help you with website creation, templates, customization, and more. Try asking me about our features! 🤖",
      "That's interesting! As Monderna, I'm here to help with anything about Monderna. You can ask me about templates, pricing, features, or how to get started! ✨",
      "I'd love to help! I'm Monderna, and I know everything about Monderna. Try asking about our templates, customization tools, or website building process! 🚀",
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "👋 Hi! I'm Monderna, your AI assistant! I'm here to help you with everything about Monderna - from choosing templates to customizing your website. What can I help you with today?",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Check for greetings
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return knowledgeBase.greetings[
        Math.floor(Math.random() * knowledgeBase.greetings.length)
      ];
    }

    // Check for website help
    for (const [key, response] of Object.entries(knowledgeBase.website_help)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Check for self-promotion triggers
    if (
      message.includes("who are you") ||
      message.includes("what are you") ||
      message.includes("introduce")
    ) {
      return knowledgeBase.self_promotion[
        Math.floor(Math.random() * knowledgeBase.self_promotion.length)
      ];
    }

    // Default responses
    return knowledgeBase.default_responses[
      Math.floor(Math.random() * knowledgeBase.default_responses.length)
    ];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
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

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center group"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </motion.div>

        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with Monderna
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9999] flex items-end justify-end p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Monderna</h3>
                      <p className="text-sm opacity-90">AI Assistant</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[280px] px-3 py-2 rounded-xl ${
                        message.isBot
                          ? "bg-white border border-gray-200"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      }`}
                    >
                      <p className="text-xs text-gray-800">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isBot ? "text-gray-500" : "text-white/70"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Monderna..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs text-gray-800 placeholder-gray-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick suggestions */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {[
                    "How to create a website?",
                    "Show me templates",
                    "What features do you have?",
                    "Tell me about pricing",
                    "Is it beginner friendly?",
                    "How do I publish?",
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(suggestion)}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors text-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MondernaChatbot;
