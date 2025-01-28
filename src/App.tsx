import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, CheckCircle, ArrowRight, Sparkles, Brain, Zap, Mail, Phone, MapPin, Mic, MicOff, Sun, Moon, Code, Laptop, MessageSquare, Calendar, FileSearch, Notebook as Robot, Database, Workflow, Globe, Lock, Cloud, Cpu } from 'lucide-react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ChatMessage {
  text: string;
  isBot: boolean;
}

interface WaitlistData {
  firstName: string;
  email: string;
  phone: string;
  useCase: string;
}

const features = [
  {
    icon: Code,
    title: "Instant Code Generation",
    description: "Generate production-ready code with simple voice commands"
  },
  {
    icon: Brain,
    title: "AI-Powered Development",
    description: "Complete applications built and deployed with natural language"
  },
  {
    icon: Robot,
    title: "Intelligent Assistant",
    description: "24/7 AI companion for all your development needs"
  },
  {
    icon: Database,
    title: "Smart Data Management",
    description: "Automated database design and optimization"
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate repetitive tasks and complex processes"
  },
  {
    icon: Globe,
    title: "Multi-Platform Support",
    description: "Deploy to any platform with zero configuration"
  },
  {
    icon: Lock,
    title: "Security First",
    description: "Built-in security best practices and compliance"
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless integration with major cloud providers"
  },
  {
    icon: Cpu,
    title: "Performance Optimization",
    description: "Automatic code optimization and performance tuning"
  }
];

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Hi! I'm your AI Buddy. I can help you with development, automation, and much more! Want to learn about our features or join the waitlist?", isBot: true }
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [waitlistStep, setWaitlistStep] = useState(0);
  const [waitlistData, setWaitlistData] = useState<WaitlistData>({
    firstName: '',
    email: '',
    phone: '',
    useCase: ''
  });

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleVoiceCommand = () => {
    if (!listening) {
      setIsListening(true);
      SpeechRecognition.startListening();
    } else {
      setIsListening(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  const demoFeatures = [
    "🚀 One-command deployments - 'Deploy my React app to production'",
    "💻 Code generation - 'Create a login form with validation'",
    "🎨 UI/UX automation - 'Design a responsive dashboard'",
    "📊 Data analysis - 'Analyze my user engagement data'",
    "📝 Content creation - 'Write a technical blog post about React hooks'",
    "📅 Calendar management - 'Schedule team meetings for next week'",
    "🤖 Task automation - 'Set up CI/CD pipeline for my project'",
    "🔍 Research assistance - 'Find best practices for API security'",
    "📱 Mobile development - 'Create a React Native app template'",
    "🔧 Debug assistance - 'Help me fix this memory leak'",
    "📚 Documentation - 'Generate API documentation from my code'",
    "🌐 SEO optimization - 'Optimize my website for search engines'"
  ];

  const handleWaitlistChat = (userInput: string) => {
    switch (waitlistStep) {
      case 0:
        setWaitlistData({ ...waitlistData, firstName: userInput });
        setChatMessages(prev => [...prev, 
          { text: "Great! What's your email address?", isBot: true }
        ]);
        setWaitlistStep(1);
        break;
      case 1:
        if (!userInput.includes('@')) {
          setChatMessages(prev => [...prev, 
            { text: "Please enter a valid email address.", isBot: true }
          ]);
          return;
        }
        setWaitlistData({ ...waitlistData, email: userInput });
        setChatMessages(prev => [...prev, 
          { text: "Perfect! What's your phone number?", isBot: true }
        ]);
        setWaitlistStep(2);
        break;
      case 2:
        setWaitlistData({ ...waitlistData, phone: userInput });
        setChatMessages(prev => [...prev, 
          { text: "Almost done! What's your primary use case for AI Buddy? (e.g., development, automation, content creation)", isBot: true }
        ]);
        setWaitlistStep(3);
        break;
      case 3:
        setWaitlistData({ ...waitlistData, useCase: userInput });
        setChatMessages(prev => [...prev, 
          { text: "Thank you for joining our waitlist! 🚀\n\nWe're excited to have you on board. Here's what you can look forward to:\n\n" + 
                 demoFeatures.slice(0, 5).join('\n') + 
                 "\n\n...and much more! Stay tuned for our launch in December 2025! 🎉", isBot: true }
        ]);
        setWaitlistStep(4);
        break;
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setChatMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setMessage('');

    if (waitlistStep !== 4) {
      handleWaitlistChat(userMessage);
    } else {
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes('feature') || lowerMessage.includes('what') || lowerMessage.includes('can')) {
        setChatMessages(prev => [...prev, {
          text: "Here's what AI Buddy can do for you:\n\n" + 
                demoFeatures.join('\n') + 
                "\n\nWould you like to try any of these features or join our waitlist?",
          isBot: true
        }]);
      } else if (lowerMessage.includes('example') || lowerMessage.includes('demo')) {
        setChatMessages(prev => [...prev, {
          text: "Let me show you a quick demo! Try saying:\n\n" +
                "🗣 'Create a React component'\n" +
                "🗣 'Deploy my application'\n" +
                "🗣 'Optimize my code'\n" +
                "🗣 'Debug this error'\n\n" +
                "Just click the microphone icon or type your command!",
          isBot: true
        }]);
      } else if (lowerMessage.includes('waitlist') || lowerMessage.includes('join')) {
        setChatMessages(prev => [...prev, {
          text: "Great choice! Let's get you on the waitlist. What's your first name?",
          isBot: true
        }]);
        setWaitlistStep(0);
      } else {
        setChatMessages(prev => [...prev, {
          text: "I can help you explore our features, show you a demo, or help you join the waitlist. What would you like to know?",
          isBot: true
        }]);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-blue-50 via-white to-blue-50'}`}>
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full glass-effect"
      >
        {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-600" />}
      </motion.button>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-40 glass-effect shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold gradient-text">
              AI Buddy
            </span>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {['Features', 'Demo', 'Pricing', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-32 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block mb-4 px-4 py-1 bg-blue-100 dark:bg-blue-900 rounded-full"
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Launching December 2025
              </span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your Next-Gen AI Assistant
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              More than just code - your complete digital companion that thinks, creates, and works alongside you.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(true)}
                className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:shadow-lg flex items-center"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Try AI Buddy</h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="bg-blue-600 dark:bg-blue-700 p-4 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Bot className="h-6 w-6 mr-2" />
                  <span className="font-semibold">AI Buddy Demo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleVoiceCommand}
                    className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'}`}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </motion.button>
                </div>
              </div>
              <div className="h-96 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <AnimatePresence>
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-4`}
                    >
                      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        msg.isBot 
                          ? 'bg-white dark:bg-gray-800 shadow-md' 
                          : 'bg-blue-600 dark:bg-blue-500 text-white'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Try saying 'What can you do?' or 'Show me a demo'"
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <Send className="h-6 w-6" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50"
        >
          <div className="bg-blue-600 dark:bg-blue-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <span className="font-semibold">AI Buddy Assistant</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowChat(false)} 
              className="text-white hover:text-gray-200"
            >
              ✕
            </motion.button>
          </div>
          <div className="h-96 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <AnimatePresence>
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-4`}
                >
                  <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.isBot 
                      ? 'bg-white dark:bg-gray-800 shadow-md' 
                      : 'bg-blue-600 dark:bg-blue-500 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleVoiceCommand}
                className={`p-2 rounded-full ${isListening ? 'text-red-600' : 'text-blue-600'} hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <Send className="h-6 w-6" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <Mail className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white">Email Us</h3>
              <p className="dark:text-gray-300">saswatdashai577@gmail.com</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <Phone className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white">Call Us</h3>
              <p className="dark:text-gray-300">8056198316</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
            >
              <MapPin className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white">Visit Us</h3>
              <p className="dark:text-gray-300">Gce Keonjhar Odisha 758002</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold gradient-text">AI Buddy</span>
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">© 2025 AI Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;