import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, FileText, ChevronRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useNavigate } from "react-router-dom";

const LegalGuidesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const categories = [
    { id: 'all', name: 'সব ক্যাটাগরি', nameEn: 'All Categories' },
    { id: 'marriage', name: 'বিবাহ', nameEn: 'Marriage' },
    { id: 'divorce', name: 'তালাক', nameEn: 'Divorce' },
    { id: 'land', name: 'ভূমি', nameEn: 'Land' },
    { id: 'inheritance', name: 'উত্তরাধিকার', nameEn: 'Inheritance' },
    { id: 'labor', name: 'শ্রম', nameEn: 'Labor' },
    { id: 'consumer', name: 'ভোক্তা অধিকার', nameEn: 'Consumer Rights' },
    { id: 'cybercrime', name: 'সাইবার অপরাধ', nameEn: 'Cybercrime' },
    { id: 'criminal', name: 'ফৌজদারি আইন', nameEn: 'Criminal Law' },
    { id: 'business', name: 'ব্যবসা আইন', nameEn: 'Business Law' },
    { id: 'child', name: 'শিশু অধিকার', nameEn: 'Child Rights' },
  ];

  const mockGuides = [
    // Marriage Category
    {
      id: 1,
      title: 'বিবাহ নিবন্ধন প্রক্রিয়া',
      titleEn: 'Marriage Registration Process',
      category: 'marriage',
      excerpt: 'বাংলাদেশে বিবাহ নিবন্ধনের সম্পূর্ণ প্রক্রিয়া ও প্রয়োজনীয় কাগজপত্র',
      readTime: '৮ মিনিট',
      difficulty: 'সহজ',
      views: 2340,
    },
    {
      id: 2,
      title: 'বিয়ে চুক্তির শর্তাবলী',
      titleEn: 'Marriage Contract Conditions',
      category: 'marriage',
      excerpt: 'বিবাহ চুক্তিতে কী কী শর্ত অন্তর্ভুক্ত করা যায় এবং এর আইনি বৈধতা',
      readTime: '১০ মিনিট',
      difficulty: 'মধ্যম',
      views: 1560,
    },
    {
      id: 3,
      title: 'বহুবিবাহের আইনি শর্ত',
      titleEn: 'Legal Conditions for Polygamy',
      category: 'marriage',
      excerpt: 'মুসলিম পারিবারিক আইনে বহুবিবাহের অনুমতি ও শর্তাবলী',
      readTime: '৭ মিনিট',
      difficulty: 'সহজ',
      views: 1890,
    },

    // Divorce Category
    {
      id: 4,
      title: 'তালাকের আইনি প্রক্রিয়া',
      titleEn: 'Legal Process of Divorce',
      category: 'divorce',
      excerpt: 'মুসলিম ও অমুসলিম পারিবারিক আইন অনুযায়ী তালাকের নিয়মাবলী',
      readTime: '১২ মিনিট',
      difficulty: 'মধ্যম',
      views: 1890,
    },
    {
      id: 5,
      title: 'খুলা তালাক প্রক্রিয়া',
      titleEn: 'Khula Divorce Process',
      category: 'divorce',
      excerpt: 'স্ত্রীর উদ্যোগে তালাক (খুলা) এর আইনি প্রক্রিয়া ও শর্তাবলী',
      readTime: '৯ মিনিট',
      difficulty: 'মধ্যম',
      views: 1670,
    },
    {
      id: 6,
      title: 'তালাক পরবর্তী ভরণপোষণ',
      titleEn: 'Post-Divorce Maintenance',
      category: 'divorce',
      excerpt: 'তালাকের পর স্ত্রী ও সন্তানের ভরণপোষণের আইনি অধিকার',
      readTime: '১১ মিনিট',
      difficulty: 'মধ্যম',
      views: 1450,
    },

    // Land Category
    {
      id: 7,
      title: 'ভূমি রেজিস্ট্রেশন গাইড',
      titleEn: 'Land Registration Guide',
      category: 'land',
      excerpt: 'জমি-জমার রেজিস্ট্রেশন প্রক্রিয়া ও সাবরেজিস্ট্রি অফিসের কাজ',
      readTime: '১৫ মিনিট',
      difficulty: 'কঠিন',
      views: 3120,
    },
    {
      id: 8,
      title: 'সম্পত্তি বিরোধ মীমাংসা',
      titleEn: 'Property Dispute Settlement',
      category: 'land',
      excerpt: 'আদালত ও বিকল্প বিরোধ নিষ্পত্তি প্রক্রিয়া',
      readTime: '১০ মিনিট',
      difficulty: 'মধ্যম',
      views: 2460,
    },
    {
      id: 9,
      title: 'জমি ক্রয়-বিক্রয় চুক্তি',
      titleEn: 'Land Sale-Purchase Agreement',
      category: 'land',
      excerpt: 'সঠিকভাবে জমি ক্রয়-বিক্রয় চুক্তি প্রস্তুত করার গাইড',
      readTime: '১৩ মিনিট',
      difficulty: 'মধ্যম',
      views: 2780,
    },

    // Inheritance Category
    {
      id: 10,
      title: 'উত্তরাধিকার সম্পত্তি বণ্টন',
      titleEn: 'Inheritance Property Distribution',
      category: 'inheritance',
      excerpt: 'ইসলামী আইন ও অন্যান্য ধর্মের উত্তরাধিকার নিয়মাবলী',
      readTime: '১০ মিনিট',
      difficulty: 'মধ্যম',
      views: 1560,
    },
    {
      id: 11,
      title: 'উইল প্রস্তুত করার নিয়ম',
      titleEn: 'How to Prepare a Will',
      category: 'inheritance',
      excerpt: 'সঠিকভাবে উইল প্রস্তুত করা ও নিবন্ধনের প্রক্রিয়া',
      readTime: '৮ মিনিট',
      difficulty: 'সহজ',
      views: 1340,
    },
    {
      id: 12,
      title: 'বিনা উইলে সম্পত্তি বণ্টন',
      titleEn: 'Property Distribution Without Will',
      category: 'inheritance',
      excerpt: 'উইল ছাড়াই ইসলামী ও অন্যান্য আইনে সম্পত্তি বণ্টন প্রক্রিয়া',
      readTime: '৯ মিনিট',
      difficulty: 'মধ্যম',
      views: 1670,
    },

    // Labor Category
    {
      id: 13,
      title: 'শ্রমিক অধিকার ও বেতন',
      titleEn: 'Worker Rights & Salary',
      category: 'labor',
      excerpt: 'শ্রম আইন অনুযায়ী কর্মীর অধিকার, ওভারটাইম ও বোনাস',
      readTime: '৬ মিনিট',
      difficulty: 'সহজ',
      views: 2890,
    },
    {
      id: 14,
      title: 'চাকরি থেকে বরখাস্তের নিয়ম',
      titleEn: 'Rules of Job Termination',
      category: 'labor',
      excerpt: 'সঠিকভাবে চাকরি থেকে বরখাস্ত প্রক্রিয়া ও ক্ষতিপূরণ',
      readTime: '৭ মিনিট',
      difficulty: 'সহজ',
      views: 2230,
    },
    {
      id: 15,
      title: 'মাতৃত্বকালীন ছুটির অধিকার',
      titleEn: 'Maternity Leave Rights',
      category: 'labor',
      excerpt: 'গর্ভবতী কর্মীদের মাতৃত্বকালীন ছুটি ও অন্যান্য সুযোগ-সুবিধা',
      readTime: '৫ মিনিট',
      difficulty: 'সহজ',
      views: 1980,
    },

    // Consumer Rights Category
    {
      id: 16,
      title: 'ভোক্তা অধিকার লঙ্ঘিত হলে করণীয়',
      titleEn: 'Consumer Rights Violation Remedies',
      category: 'consumer',
      excerpt: 'প্রতারণা বা নিম্নমানের পণ্য পেলে অভিযোগ করার প্রক্রিয়া',
      readTime: '৬ মিনিট',
      difficulty: 'সহজ',
      views: 2850,
    },
    {
      id: 17,
      title: 'ই-কমার্স কেনাকাটায় প্রতিকার',
      titleEn: 'E-commerce Shopping Remedies',
      category: 'consumer',
      excerpt: 'অনলাইন শপিংয়ে প্রতারণার শিকার হলে আইনি প্রতিকার',
      readTime: '৫ মিনিট',
      difficulty: 'সহজ',
      views: 3120,
    },
    {
      id: 18,
      title: 'ভোক্তা অধিকার সংরক্ষণ আইন',
      titleEn: 'Consumer Rights Protection Act',
      category: 'consumer',
      excerpt: 'ভোক্তা অধিকার সংরক্ষণ আইনের মূল ধারা ও প্রয়োগ',
      readTime: '৮ মিনিট',
      difficulty: 'মধ্যম',
      views: 1780,
    },

    // Cybercrime Category
    {
      id: 19,
      title: 'সাইবার অপরাধ থেকে সুরক্ষা',
      titleEn: 'Cybercrime Protection',
      category: 'cybercrime',
      excerpt: 'অনলাইন প্রতারণা, হ্যাকিং ও সাইবার বুলিং থেকে সুরক্ষার উপায়',
      readTime: '৭ মিনিট',
      difficulty: 'সহজ',
      views: 4230,
    },
    {
      id: 20,
      title: 'অনলাইন প্রতারণা হলে কী করবেন',
      titleEn: 'What to Do in Case of Online Fraud',
      category: 'cybercrime',
      excerpt: 'ই-কমার্স বা মোবাইল ব্যাংকিং প্রতারণার ক্ষেত্রে করণীয় পদক্ষেপ',
      readTime: '৫ মিনিট',
      difficulty: 'সহজ',
      views: 3650,
    },
    {
      id: 21,
      title: 'ডিজিটাল সিকিউরিটি গাইড',
      titleEn: 'Digital Security Guide',
      category: 'cybercrime',
      excerpt: 'ডিজিটাল নিরাপত্তা ও ব্যক্তিগত তথ্য সুরক্ষার উপায়',
      readTime: '৬ মিনিট',
      difficulty: 'সহজ',
      views: 2890,
    },

    // Criminal Law Category
    {
      id: 22,
      title: 'পুলিশের কাছে অভিযোগ দায়ের করার নিয়ম',
      titleEn: 'How to File a Police Complaint',
      category: 'criminal',
      excerpt: 'সঠিকভাবে অভিযোগ (FIR) দায়ের করার ধাপ ও করণীয়',
      readTime: '৯ মিনিট',
      difficulty: 'সহজ',
      views: 3340,
    },
    {
      id: 23,
      title: 'জামিন প্রাপ্তির আইনি প্রক্রিয়া',
      titleEn: 'Legal Process of Getting Bail',
      category: 'criminal',
      excerpt: 'জামিনের ধরন, আবেদন প্রক্রিয়া ও আদালতের ভূমিকা',
      readTime: '১১ মিনিট',
      difficulty: 'মধ্যম',
      views: 2980,
    },
    {
      id: 24,
      title: 'যৌন হয়রানির বিরুদ্ধে করণীয়',
      titleEn: 'What to Do Against Sexual Harassment',
      category: 'criminal',
      excerpt: 'কর্মক্ষেত্রে বা জনসমক্ষে হয়রানি হলে আইন অনুযায়ী করণীয়',
      readTime: '৭ মিনিট',
      difficulty: 'সহজ',
      views: 4100,
    },

    // Business Law Category
    {
      id: 25,
      title: 'ব্যবসা নিবন্ধনের প্রক্রিয়া',
      titleEn: 'Business Registration Process in Bangladesh',
      category: 'business',
      excerpt: 'ট্রেড লাইসেন্স, TIN ও VAT রেজিস্ট্রেশনের ধাপসমূহ',
      readTime: '১২ মিনিট',
      difficulty: 'মধ্যম',
      views: 3310,
    },
    {
      id: 26,
      title: 'স্টার্টআপ আইন ও আইপি সুরক্ষা',
      titleEn: 'Startup Law & Intellectual Property',
      category: 'business',
      excerpt: 'ট্রেডমার্ক, কপিরাইট ও পেটেন্ট নিবন্ধনের আইনি গাইড',
      readTime: '১৪ মিনিট',
      difficulty: 'কঠিন',
      views: 1880,
    },
    {
      id: 27,
      title: 'কোম্পানি আইন ও গঠন প্রক্রিয়া',
      titleEn: 'Company Law & Formation Process',
      category: 'business',
      excerpt: 'প্রাইভেট ও পাবলিক লিমিটেড কোম্পানি গঠনের আইনি প্রক্রিয়া',
      readTime: '১৫ মিনিট',
      difficulty: 'কঠিন',
      views: 1560,
    },

    // Child Rights Category
    {
      id: 28,
      title: 'শিশুর হেফাজতের অধিকার',
      titleEn: 'Child Custody Rights',
      category: 'child',
      excerpt: 'বিচ্ছেদের পর শিশু কার কাছে থাকবে— আইন কী বলে',
      readTime: '৮ মিনিট',
      difficulty: 'মধ্যম',
      views: 2120,
    },
    {
      id: 29,
      title: 'শিশু শ্রম আইন ও নিষেধাজ্ঞা',
      titleEn: 'Child Labor Laws & Prohibitions',
      category: 'child',
      excerpt: 'বাংলাদেশে শিশু শ্রম সম্পর্কিত আইন ও শাস্তির বিধান',
      readTime: '৬ মিনিট',
      difficulty: 'সহজ',
      views: 1890,
    },
    {
      id: 30,
      title: 'শিশু অধিকার সুরক্ষা কমিশন',
      titleEn: 'Child Rights Protection Commission',
      category: 'child',
      excerpt: 'জাতীয় শিশু অধিকার সুরক্ষা কমিশনের ভূমিকা ও কার্যক্রম',
      readTime: '৭ মিনিট',
      difficulty: 'সহজ',
      views: 1340,
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setGuides(mockGuides);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'সহজ': return 'bg-green-100 text-green-800';
      case 'মধ্যম': return 'bg-yellow-100 text-yellow-800';
      case 'কঠিন': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            আইনি গাইড
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            সহজ বাংলায় আইনি বিষয়ের পূর্ণাঙ্গ গাইড। আপনার অধিকার ও দায়িত্ব সম্পর্কে জানুন।
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="আইনি বিষয় খুঁজুন..."
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                }`}
              >
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.nameEn}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Guides Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="গাইড লোড হচ্ছে..." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard 
                  className="p-6 h-full group cursor-pointer" 
                  hover 
                  onClick={() => navigate(`/guides/${guide.id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{guide.views.toLocaleString()} দেখা</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {guide.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{guide.readTime}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredGuides.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              কোন গাইড পাওয়া যায়নি
            </h3>
            <p className="text-gray-500">
              অন্য কোন বিষয় খুঁজে দেখুন বা ফিল্টার পরিবর্তন করুন
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LegalGuidesPage;