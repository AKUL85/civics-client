import React from 'react';
import { motion } from 'framer-motion';
import { Users, Scale, Heart, Target } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const AboutPage = () => {
  const sections = [
    {
      id: 1,
      icon: <Scale className="h-8 w-8 text-blue-600" />,
      title: 'আমাদের লক্ষ্য',
      description:
        'বাংলাদেশের সকল মানুষের জন্য সহজলভ্য ও সাশ্রয়ী আইনি সহায়তা নিশ্চিত করা আমাদের মূল লক্ষ্য।',
    },
    {
      id: 2,
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'আমাদের টিম',
      description:
        'আইনজীবী, প্রযুক্তিবিদ এবং গবেষক নিয়ে গঠিত আমাদের টিম সবসময় আপনার পাশে।',
    },
    {
      id: 3,
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: 'আমাদের প্রতিশ্রুতি',
      description:
        'মানুষের অধিকার রক্ষায় ও সচেতনতা বৃদ্ধিতে আমরা সর্বদা প্রতিশ্রুতিবদ্ধ।',
    },
    {
      id: 4,
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: 'ভবিষ্যৎ পরিকল্পনা',
      description:
        'এআই সহায়তা ও ডিজিটাল লিগ্যাল প্ল্যাটফর্ম আরও উন্নত করা আমাদের ভবিষ্যৎ পরিকল্পনা।',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            আমাদের সম্পর্কে
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আমরা প্রযুক্তির মাধ্যমে সহজলভ্য আইনি সহায়তা পৌঁছে দিচ্ছি বাংলাদেশের প্রতিটি মানুষের কাছে।
          </p>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <GlassCard className="p-6 h-full group text-center" hover>
                <div className="mb-4 flex justify-center">{section.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600">{section.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            আমাদের সাথে যোগাযোগ করুন
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
