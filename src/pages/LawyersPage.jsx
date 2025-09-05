import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Calendar,
  Award,
  Languages,
  DollarSign,
  Filter,
  Search
} from 'lucide-react';
import { useLawyers } from '../contexts/LawyersContext';
import GlassCard from '../components/ui/GlassCard';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LawyersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { lawyers, filteredLawyers, filters, setLawyers, updateFilters, clearFilters } = useLawyers();

  const specializations = [
    { id: 'family', name: 'পারিবারিক আইন', nameEn: 'Family Law' },
    { id: 'criminal', name: 'ফৌজদারি আইন', nameEn: 'Criminal Law' },
    { id: 'civil', name: 'দেওয়ানি আইন', nameEn: 'Civil Law' },
    { id: 'corporate', name: 'কর্পোরেট আইন', nameEn: 'Corporate Law' },
    { id: 'land', name: 'ভূমি আইন', nameEn: 'Land Law' },
    { id: 'labor', name: 'শ্রম আইন', nameEn: 'Labor Law' },
  ];

  const mockLawyers = [
    {
      id: 1,
      name: 'আব্দুর রহমান খান',
      nameEn: 'Abdur Rahman Khan',
      specialization: 'family',
      experience: 15,
      rating: 4.8,
      reviews: 156,
      location: 'ঢাকা',
      languages: ['বাংলা', 'English'],
      consultationFee: 800,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, ঢাকা বিশ্ববিদ্যালয়',
      cases: 450,
    },
    {
      id: 2,
      name: 'ড. ফাতেমা খাতুন',
      nameEn: 'Dr. Fatema Khatun',
      specialization: 'criminal',
      experience: 12,
      rating: 4.9,
      reviews: 203,
      location: 'চট্টগ্রাম',
      languages: ['বাংলা', 'English', 'উর্দু'],
      consultationFee: 1200,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলএম, চট্টগ্রাম বিশ্ববিদ্যালয়',
      cases: 380,
    },
    {
      id: 3,
      name: 'মোহাম্মদ করিম উল্লাহ',
      nameEn: 'Mohammad Karim Ullah',
      specialization: 'land',
      experience: 20,
      rating: 4.7,
      reviews: 89,
      location: 'সিলেট',
      languages: ['বাংলা'],
      consultationFee: 600,
      availability: 'Busy',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, রাজশাহী বিশ্ববিদ্যালয়',
      cases: 620,
    },
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLawyers(mockLawyers);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getSpecializationName = (id) => {
    const spec = specializations.find(s => s.id === id);
    return spec ? spec.name : id;
  };

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
            আইনজীবী খুঁজুন
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            যাচাইকৃত এবং অভিজ্ঞ আইনজীবীদের সাথে যোগাযোগ করুন
          </p>
        </motion.div>

        {/* Search and Filters */}
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
              placeholder="আইনজীবীর নাম বা বিশেষত্ব খুঁজুন..."
            />
          </div>

          {/* Specialization Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {specializations.map((spec) => (
              <button
                key={spec.id}
                onClick={() => updateFilters({ specialization: spec.id })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filters.specialization === spec.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                }`}
              >
                <span className="hidden sm:inline">{spec.name}</span>
                <span className="sm:hidden">{spec.nameEn}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lawyers Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="আইনজীবী খুঁজে আনা হচ্ছে..." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full group" hover>
                  {/* Lawyer Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {lawyer.verified && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                          <Award className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {lawyer.name}
                      </h3>
                      <p className="text-blue-600 text-sm font-medium">
                        {getSpecializationName(lawyer.specialization)}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStarRating(lawyer.rating)}
                        <span className="text-sm text-gray-500 ml-1">
                          ({lawyer.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lawyer Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {lawyer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2" />
                      {lawyer.experience} বছর অভিজ্ঞতা • {lawyer.cases} মামলা
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Languages className="h-4 w-4 mr-2" />
                      {lawyer.languages.join(', ')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ৳{lawyer.consultationFee} / পরামর্শ
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        lawyer.availability === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {lawyer.availability === 'Available' ? 'উপলব্ধ' : 'ব্যস্ত'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      disabled={lawyer.availability === 'Busy'}
                    >
                      <Calendar className="inline h-4 w-4 mr-2" />
                      পরামর্শ বুক করুন
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                      <Phone className="inline h-4 w-4 mr-2" />
                      প্রোফাইল দেখুন
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredLawyers.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">কোন আইনজীবী পাওয়া যায়নি</h3>
            <p className="text-gray-500">অন্য কোন বিষয় খুঁজে দেখুন বা ফিল্টার পরিবর্তন করুন</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LawyersPage;