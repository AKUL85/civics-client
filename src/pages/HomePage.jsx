import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  MessageCircle, 
  Users, 
  Scale, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'আইনি গাইড',
      titleEn: 'Legal Guides',
      description: 'বিভিন্ন আইনি বিষয়ে সহজ বাংলায় গাইড',
      href: '/guides',
    },
    {
      icon: MessageCircle,
      title: 'এআই সহায়ক',
      titleEn: 'AI Assistant',
      description: 'আপনার আইনি প্রশ্নের তাৎক্ষণিক উত্তর',
      href: '/ai-assistant',
    },
    {
      icon: Users,
      title: 'আইনজীবী খুঁজুন',
      titleEn: 'Find Lawyers',
      description: 'যাচাইকৃত আইনজীবীদের সাথে যোগাযোগ',
      href: '/lawyers',
    },
  ];

  const stats = [
    { number: '১০০+', label: 'যাচাইকৃত আইনজীবী' },
    { number: '৫০০+', label: 'সমাধানকৃত মামলা' },
    { number: '২৪/৭', label: 'সেবা প্রদান' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              আইনি সহায়তা এখন
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {' '}সবার জন্য
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              বাংলাদেশের প্রথম ডিজিটাল আইনি প্ল্যাটফর্ম। সাশ্রয়ী মূল্যে পেশাদার আইনি সেবা ও পরামর্শ।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/ai-assistant"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                এআই সহায়ক শুরু করুন
              </Link>
              <Link
                to="/lawyers"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg"
              >
                আইনজীবী খুঁজুন
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              আমাদের সেবাসমূহ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              আধুনিক প্রযুক্তি ব্যবহার করে আইনি সেবা প্রদানের নতুন মাত্রা
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={feature.href}>
                  <GlassCard className="p-8 text-center group" hover>
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ArrowRight className="h-5 w-5 text-blue-600 mx-auto group-hover:translate-x-2 transition-transform duration-200" />
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              কেন আমাদের বেছে নিবেন?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'নিরাপদ ও গোপনীয়',
                description: 'আপনার তথ্য সম্পূর্ণ নিরাপদ',
              },
              {
                icon: Clock,
                title: '২৪/৭ সেবা',
                description: 'যেকোনো সময় সহায়তা পান',
              },
              {
                icon: CheckCircle,
                title: 'যাচাইকৃত আইনজীবী',
                description: 'শুধুমাত্র দক্ষ ও অভিজ্ঞ আইনজীবী',
              },
              {
                icon: Scale,
                title: 'সাশ্রয়ী মূল্য',
                description: 'সবার সাধ্যের মধ্যে আইনি সেবা',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center h-full">
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              আজই শুরু করুন আইনি যাত্রা
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              বিনামূল্যে নিবন্ধন করুন এবং আইনি সহায়তা পান
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              বিনামূল্যে শুরু করুন
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;