import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Heart, 
  Share2, 
  Clock,
  User,
  Plus,
  TrendingUp
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SearchBar from '../components/ui/SearchBar';

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: 'জমি কেনাবেচার সময় কী কী সাবধানতা অবলম্বন করব?',
      author: 'রহিম উদ্দিন',
      category: 'ভূমি আইন',
      replies: 23,
      likes: 45,
      time: '২ ঘন্টা আগে',
      excerpt: 'আমি একটি জমি কিনতে চাই কিন্তু জানি না কী কী কাগজপত্র যাচাই করতে হবে...',
      solved: false,
    },
    {
      id: 2,
      title: 'কর্মক্ষেত্রে হয়রানির বিরুদ্ধে কী ব্যবস্থা নিতে পারি?',
      author: 'নাসরিন আক্তার',
      category: 'শ্রম আইন',
      replies: 18,
      likes: 67,
      time: '৪ ঘন্টা আগে',
      excerpt: 'অফিসে সিনিয়র কলিগের দ্বারা হয়রানির শিকার হচ্ছি। আইনি ব্যবস্থা নিতে চাই...',
      solved: true,
    },
    {
      id: 3,
      title: 'সাইবার ক্রাইমের শিকার হলে কোথায় অভিযোগ করব?',
      author: 'তানভীর আহমেদ',
      category: 'সাইবার আইন',
      replies: 31,
      likes: 89,
      time: '১ দিন আগে',
      excerpt: 'আমার ফেসবুক একাউন্ট হ্যাক হয়েছে এবং ভুয়া পোস্ট দেওয়া হচ্ছে...',
      solved: false,
    },
  ];

  const supportGroups = [
    {
      id: 1,
      name: 'নারী অধিকার সহায়তা',
      members: 1250,
      description: 'নারীদের আইনি অধিকার ও সহায়তার জন্য',
      category: 'women',
    },
    {
      id: 2,
      name: 'শ্রমিক অধিকার ফোরাম',
      members: 890,
      description: 'শ্রমিকদের ন্যায্য অধিকার আদায়ের জন্য',
      category: 'labor',
    },
    {
      id: 3,
      name: 'সাইবার সিকিউরিটি সচেতনতা',
      members: 567,
      description: 'ডিজিটাল নিরাপত্তা ও সাইবার অপরাধ প্রতিরোধ',
      category: 'cyber',
    },
  ];

  const tabs = [
    { id: 'discussions', name: 'আলোচনা', icon: MessageSquare },
    { id: 'groups', name: 'সাহায্য গ্রুপ', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            কমিউনিটি
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আইনি সমস্যা নিয়ে আলোচনা করুন এবং একে অপরকে সহায়তা করুন
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="আলোচনা খুঁজুন..."
          />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/60 backdrop-blur-md p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'discussions' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* New Discussion Button */}
            <div className="text-center mb-8">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <Plus className="h-5 w-5 mr-2" />
                নতুন আলোচনা শুরু করুন
              </button>
            </div>

            {/* Discussions List */}
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 hover:scale-102 transition-transform" hover>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-100 to-green-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {discussion.title}
                        </h3>
                        {discussion.solved && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            সমাধান হয়েছে
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{discussion.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>দ্বারা {discussion.author}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{discussion.time}</span>
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {supportGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full group" hover>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {group.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{group.members.toLocaleString()} সদস্য</span>
                      </span>
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      গ্রুপে যোগ দিন
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;