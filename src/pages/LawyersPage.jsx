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
} from 'lucide-react';
import { useLawyers } from '../contexts/LawyersContext';
import GlassCard from '../components/ui/GlassCard';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LawyersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const { lawyers, filteredLawyers, filters, setLawyers, updateFilters } = useLawyers();

  const specializations = [
    { id: 'family', name: 'পারিবারিক আইন', nameEn: 'Family Law' },
    { id: 'criminal', name: 'ফৌজদারি আইন', nameEn: 'Criminal Law' },
    { id: 'civil', name: 'দেওয়ানি আইন', nameEn: 'Civil Law' },
    { id: 'corporate', name: 'কর্পোরেট আইন', nameEn: 'Corporate Law' },
    { id: 'land', name: 'ভূমি আইন', nameEn: 'Land Law' },
    { id: 'labor', name: 'শ্রম আইন', nameEn: 'Labor Law' },
  ];

  // ✅ Added mock data as before (no change)
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
    {
      id: 4,
      name: 'মাহমুদুল হাসান রানা',
      nameEn: 'Mahmudul Hasan Rana',
      specialization: 'corporate',
      experience: 10,
      rating: 4.6,
      reviews: 115,
      location: 'রাজশাহী',
      languages: ['বাংলা', 'English'],
      consultationFee: 1000,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668471/pexels-photo-5668471.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি (সম্মান), রাজশাহী বিশ্ববিদ্যালয়',
      cases: 340,
    },
    {
      id: 5,
      name: 'সাবিনা ইয়াসমিন',
      nameEn: 'Sabina Yasmin',
      specialization: 'civil',
      experience: 8,
      rating: 4.5,
      reviews: 97,
      location: 'খুলনা',
      languages: ['বাংলা', 'English', 'হিন্দি'],
      consultationFee: 700,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668856/pexels-photo-5668856.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
      education: 'এলএলবি, খুলনা বিশ্ববিদ্যালয়',
      cases: 290,
    },
    {
      id: 6,
      name: 'মোহাম্মদ রুবেল আহমেদ',
      nameEn: 'Mohammad Rubel Ahmed',
      specialization: 'labor',
      experience: 11,
      rating: 4.7,
      reviews: 142,
      location: 'নারায়ণগঞ্জ',
      languages: ['বাংলা', 'English'],
      consultationFee: 900,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668482/pexels-photo-5668482.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলএম, জগন্নাথ বিশ্ববিদ্যালয়',
      cases: 420,
    },
    {
      id: 7,
      name: 'আসিফ আহমেদ',
      nameEn: 'Asif Ahmed',
      specialization: 'criminal',
      experience: 14,
      rating: 4.9,
      reviews: 178,
      location: 'ঢাকা',
      languages: ['বাংলা', 'English'],
      consultationFee: 1300,
      availability: 'Busy',
      image: 'https://images.pexels.com/photos/5668474/pexels-photo-5668474.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলএম, নর্থ সাউথ ইউনিভার্সিটি',
      cases: 510,
    },
    {
      id: 8,
      name: 'রাশিদা পারভিন',
      nameEn: 'Rashida Parvin',
      specialization: 'family',
      experience: 9,
      rating: 4.6,
      reviews: 88,
      location: 'ময়মনসিংহ',
      languages: ['বাংলা', 'English'],
      consultationFee: 750,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, ময়মনসিংহ আইন কলেজ',
      cases: 310,
    },
    {
      id: 9,
      name: 'মো. আল-আমিন',
      nameEn: 'Md. Al-Amin',
      specialization: 'corporate',
      experience: 7,
      rating: 4.4,
      reviews: 65,
      location: 'বরিশাল',
      languages: ['বাংলা', 'English'],
      consultationFee: 850,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668481/pexels-photo-5668481.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
      education: 'এলএলবি, বরিশাল বিশ্ববিদ্যালয়',
      cases: 240,
    },
    // New lawyers added below
    {
      id: 10,
      name: 'শামীমা আক্তার',
      nameEn: 'Shamima Akter',
      specialization: 'family',
      experience: 6,
      rating: 4.3,
      reviews: 72,
      location: 'কুমিল্লা',
      languages: ['বাংলা', 'English'],
      consultationFee: 550,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668857/pexels-photo-5668857.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, কুমিল্লা বিশ্ববিদ্যালয়',
      cases: 180,
    },
    {
      id: 11,
      name: 'রফিকুল ইসলাম',
      nameEn: 'Rafiqul Islam',
      specialization: 'civil',
      experience: 18,
      rating: 4.8,
      reviews: 234,
      location: 'রংপুর',
      languages: ['বাংলা', 'English', 'হিন্দি'],
      consultationFee: 950,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668475/pexels-photo-5668475.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলএম, রংপুর কারমাইকেল কলেজ',
      cases: 580,
    },
    {
      id: 12,
      name: 'নুসরাত জাহান',
      nameEn: 'Nusrat Jahan',
      specialization: 'criminal',
      experience: 13,
      rating: 4.7,
      reviews: 167,
      location: 'গাজীপুর',
      languages: ['বাংলা', 'English'],
      consultationFee: 1100,
      availability: 'Busy',
      image: 'https://images.pexels.com/photos/5668860/pexels-photo-5668860.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, বাংলাদেশ ইউনিভার্সিটি',
      cases: 420,
    },
    {
      id: 13,
      name: 'ইমরান হোসেন',
      nameEn: 'Imran Hossain',
      specialization: 'land',
      experience: 16,
      rating: 4.9,
      reviews: 198,
      location: 'বগুড়া',
      languages: ['বাংলা'],
      consultationFee: 800,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668476/pexels-photo-5668476.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, বগুড়া আইন কলেজ',
      cases: 520,
    },
    {
      id: 14,
      name: 'তানজিলা আহমেদ',
      nameEn: 'Tanjila Ahmed',
      specialization: 'labor',
      experience: 5,
      rating: 4.2,
      reviews: 58,
      location: 'সাভার',
      languages: ['বাংলা', 'English'],
      consultationFee: 500,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668861/pexels-photo-5668861.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
      education: 'এলএলবি, ঢাকা কলেজ',
      cases: 150,
    },
    {
      id: 15,
      name: 'কামরুল হাসান',
      nameEn: 'Kamrul Hasan',
      specialization: 'corporate',
      experience: 22,
      rating: 4.9,
      reviews: 315,
      location: 'ঢাকা',
      languages: ['বাংলা', 'English', 'আরবি'],
      consultationFee: 1500,
      availability: 'Busy',
      image: 'https://images.pexels.com/photos/5668477/pexels-photo-5668477.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলএম, হার্ভার্ড ল স্কুল',
      cases: 780,
    },
    {
      id: 16,
      name: 'ফারহানা ইসলাম',
      nameEn: 'Farhana Islam',
      specialization: 'family',
      experience: 8,
      rating: 4.5,
      reviews: 94,
      location: 'নারায়ণগঞ্জ',
      languages: ['বাংলা', 'English'],
      consultationFee: 650,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, জগন্নাথ বিশ্ববিদ্যালয়',
      cases: 270,
    },
    {
      id: 17,
      name: 'সজীব সরকার',
      nameEn: 'Sajeeb Sarker',
      specialization: 'criminal',
      experience: 11,
      rating: 4.6,
      reviews: 126,
      location: 'খুলনা',
      languages: ['বাংলা', 'English'],
      consultationFee: 900,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668478/pexels-photo-5668478.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলবি, খুলনা বিশ্ববিদ্যালয়',
      cases: 340,
    },
    {
      id: 18,
      name: 'আয়েশা সিদ্দিকা',
      nameEn: 'Ayesha Siddika',
      specialization: 'civil',
      experience: 9,
      rating: 4.4,
      reviews: 81,
      location: 'চট্টগ্রাম',
      languages: ['বাংলা', 'English', 'উর্দু'],
      consultationFee: 700,
      availability: 'Available',
      image: 'https://images.pexels.com/photos/5668863/pexels-photo-5668863.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: false,
      education: 'এলএলবি, চট্টগ্রাম বিশ্ববিদ্যালয়',
      cases: 290,
    },
    {
      id: 19,
      name: 'জুবায়ের আহমেদ',
      nameEn: 'Zubayer Ahmed',
      specialization: 'land',
      experience: 25,
      rating: 4.9,
      reviews: 412,
      location: 'সিলেট',
      languages: ['বাংলা', 'English', 'হিন্দি'],
      consultationFee: 1200,
      availability: 'Busy',
      image: 'https://images.pexels.com/photos/5668479/pexels-photo-5668479.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      education: 'এলএলএম, সিলেট বিশ্ববিদ্যালয়',
      cases: 890,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLawyers(mockLawyers);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getSpecializationName = (id) => {
    const spec = specializations.find((s) => s.id === id);
    return spec ? spec.name : id;
  };

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleConfirmBooking = () => {
    if (!bookingDate) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ✅ Responsive Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            আইনজীবী খুঁজুন
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            যাচাইকৃত এবং অভিজ্ঞ আইনজীবীদের সাথে যোগাযোগ করুন
          </p>
        </motion.div>

        {/* ✅ Search + Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="max-w-xl mx-auto mb-4 sm:mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="আইনজীবীর নাম বা বিশেষত্ব খুঁজুন..."
            />
          </div>

          {/* ✅ Scrollable filter bar on small screens */}
          <div className="flex overflow-x-auto space-x-2 sm:flex-wrap sm:justify-center sm:space-x-0 sm:gap-2 pb-2 sm:pb-0 scrollbar-hide">
            {specializations.map((spec) => (
              <button
                key={spec.id}
                onClick={() => updateFilters({ specialization: spec.id })}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
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

        {/* ✅ Lawyers Grid */}
        {loading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <LoadingSpinner size="lg" text="আইনজীবী খুঁজে আনা হচ্ছে..." />
          </div>
        ) : filteredLawyers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-4 sm:p-6 h-full group hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-5">
                    <div className="relative mx-auto sm:mx-0 mb-3 sm:mb-0">
                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      {lawyer.verified && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                          <Award className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {lawyer.name}
                      </h3>
                      <p className="text-blue-600 text-sm font-medium">
                        {getSpecializationName(lawyer.specialization)}
                      </p>
                      <div className="flex justify-center sm:justify-start items-center space-x-1 mt-1">
                        {renderStarRating(lawyer.rating)}
                        <span className="text-sm text-gray-500 ml-1">({lawyer.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Info list */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" /> {lawyer.location}
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" /> {lawyer.experience} বছর অভিজ্ঞতা • {lawyer.cases} মামলা
                    </div>
                    <div className="flex items-center">
                      <Languages className="h-4 w-4 mr-2" /> {lawyer.languages.join(', ')}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" /> ৳{lawyer.consultationFee} / পরামর্শ
                    </div>
                  </div>

                  {/* ✅ Availability */}
                  <div className="mb-4 text-center sm:text-left">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        lawyer.availability === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {lawyer.availability === 'Available' ? 'উপলব্ধ' : 'ব্যস্ত'}
                    </span>
                  </div>

                  {/* ✅ Buttons */}
                  <div className="space-y-2">
                    <button
                      className={`w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200
                      hover:bg-blue-700 hover:scale-105 active:scale-95 ${
                        lawyer.availability === 'Busy'
                          ? 'opacity-50 cursor-not-allowed hover:scale-100'
                          : ''
                      }`}
                      disabled={lawyer.availability === 'Busy'}
                      onClick={() => {
                        setSelectedLawyer(lawyer);
                        setBookingDate('');
                        setBookingConfirmed(false);
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      পরামর্শ বুক করুন
                    </button>

                    <button className="w-full flex items-center justify-center border border-blue-600 text-blue-600 py-2 rounded-lg text-sm sm:text-base font-medium transition-all hover:bg-blue-50 hover:scale-105 active:scale-95">
                      <Phone className="h-4 w-4 mr-2" />
                      প্রোফাইল দেখুন
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Users className="h-14 w-14 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">কোন আইনজীবী পাওয়া যায়নি</h3>
            <p className="text-gray-500 text-sm sm:text-base">অন্য কোন বিষয় খুঁজে দেখুন বা ফিল্টার পরিবর্তন করুন</p>
          </motion.div>
        )}

        {/* ✅ Booking Modal (responsive) */}
        {selectedLawyer && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-sm sm:max-w-md relative"
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedLawyer(null)}
              >
                ✕
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {selectedLawyer.name} - পরামর্শ বুকিং
              </h2>

              {!bookingConfirmed ? (
                <div className="space-y-4">
                  <label className="block text-gray-700 text-sm sm:text-base">তারিখ নির্বাচন করুন:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
                  />
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-sm sm:text-base"
                    onClick={handleConfirmBooking}
                    disabled={!bookingDate}
                  >
                    বুকিং নিশ্চিত করুন
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-green-600 font-semibold text-sm sm:text-base">আপনার বুকিং সফল হয়েছে!</p>
                  <p className="text-sm sm:text-base">তারিখ: {bookingDate}</p>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                    onClick={() => setSelectedLawyer(null)}
                  >
                    বন্ধ করুন
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyersPage;
