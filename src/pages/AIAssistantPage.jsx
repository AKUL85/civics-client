import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Globe,
  Trash2,
  MessageCircle,
  ArrowDown
} from 'lucide-react';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import GlassCard from '../components/ui/GlassCard';

const AIAssistantPage = () => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const { 
    messages, 
    isTyping, 
    language, 
    addMessage, 
    setIsTyping, 
    setLanguage, 
    clearMessages 
  } = useAIAssistant();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
    };

    const container = chatContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: language === 'bn' 
          ? 'আপনার প্রশ্নের উত্তর প্রস্তুত করা হচ্ছে। আইনি পরামর্শের জন্য একজন আইনজীবীর সাথে যোগাযোগ করুন।'
          : 'I understand your question. For specific legal advice, please consult with a qualified lawyer.',
        sender: 'ai',
        timestamp: new Date(),
        validated: false,
      };
      addMessage(aiResponse);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl shadow-lg">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            এআই আইনি সহায়ক
          </h1>
          <p className="text-lg text-gray-600">
            আপনার আইনি প্রশ্নের তাৎক্ষণিক উত্তর পান
          </p>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-3 mt-4">
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors shadow-sm ${
                language === 'bn' 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === 'bn' ? 'বাংলা' : 'English'}</span>
            </motion.button>

            <motion.button
              onClick={clearMessages}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-colors shadow-sm"
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-sm">Clear</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <GlassCard className="flex-1 flex flex-col relative overflow-hidden">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-1">
                    আইনি প্রশ্ন করুন
                  </h3>
                  <p className="text-gray-500">
                    যেকোনো আইনি বিষয়ে প্রশ্ন করুন এবং তাৎক্ষণিক সহায়তা পান
                  </p>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/80 text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString('bn-BD')}
                        </span>
                      </div>
                      <p className="leading-relaxed">{message.text}</p>

                      {message.sender === 'ai' && !message.validated && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-amber-600">
                            ⚠️ এই উত্তরটি আইনজীবী দ্বারা যাচাই করা হয়নি
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/80 border border-gray-200 px-4 py-3 rounded-xl max-w-xs shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">লিখছে...</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Scroll-to-Bottom Button */}
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                onClick={scrollToBottom}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-24 right-6 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
              >
                <ArrowDown className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="p-6 border-t border-white/20">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'bn' ? 'আপনার আইনি প্রশ্ন লিখুন...' : 'Type your legal question...'}
                  rows="2"
                  className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  disabled={isTyping}
                />
              </div>

              <button
                onClick={toggleVoiceRecording}
                className={`p-3 rounded-xl transition-colors ${
                  isRecording
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              <motion.button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AIAssistantPage;
