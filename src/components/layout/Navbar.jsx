import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Scale, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'হোম', href: '/', nameEn: 'Home' },
    { name: 'আইনি গাইড', href: '/guides', nameEn: 'Legal Guides' },
    { name: 'এআই সহায়ক', href: '/ai-assistant', nameEn: 'AI Assistant' },
    { name: 'আইনজীবী খুঁজুন', href: '/lawyers', nameEn: 'Find Lawyers' },
    { name: 'কমিউনিটি', href: '/community', nameEn: 'Community' },
    { name: 'প্রশ্নোত্তর', href: '/faq', nameEn: 'FAQ' },
    { name: 'আমাদের সম্পর্কে', href: '/about', nameEn: 'About Us' }, 
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">আইনি সহায়তা</span>
              <span className="text-xs text-gray-600 block">Legal Access BD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden">{item.nameEn}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user?.name || 'ব্যবহারকারী'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    প্রোফাইল
                  </Link>
                  <Link to="/my-consultations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    আমার পরামর্শ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="inline h-4 w-4 mr-2" />
                    লগআউট
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  লগইন
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  নিবন্ধন
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-white/90 backdrop-blur-md"
      >
        <div className="px-4 py-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Auth */}
          <div className="pt-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50"
                >
                  লগইন
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  নিবন্ধন
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;