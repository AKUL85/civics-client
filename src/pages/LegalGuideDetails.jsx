import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Star, MapPin, BadgeCheck } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";

// Modal component for booking (simple version)
const BookingModal = ({ lawyer, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Book Consultation</h2>
        <p className="mb-4">
          You are booking a consultation with <strong>{lawyer.name}</strong>.
        </p>
        <p className="mb-4">Fee: ৳{lawyer.consultationFee}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
        >
          Close
        </button>
        <button
          onClick={() => alert("Consultation booked!")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

const LegalGuideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  // 🧠 Mock Legal Guides Data (10 laws)
  const mockGuides = [
    {
      id: 1,
      title: "বিবাহ নিবন্ধন প্রক্রিয়া",
      titleEn: "Marriage Registration Process",
      category: "marriage",
      excerpt: "বাংলাদেশে বিবাহ নিবন্ধনের সম্পূর্ণ প্রক্রিয়া ও প্রয়োজনীয় কাগজপত্র",
      content: `
বাংলাদেশে মুসলিম বিবাহ নিবন্ধনের জন্য কাজী অফিসে যোগাযোগ করতে হয়।
প্রয়োজনীয় কাগজপত্র: জাতীয় পরিচয়পত্র, জন্ম সনদ, দুই পক্ষের সম্মতি, সাক্ষীর স্বাক্ষর।
বিবাহ সম্পন্ন হলে কাজী ‘বিবাহ নিবন্ধন সনদ’ প্রদান করেন। এটি আইনগত প্রমাণ হিসেবে ব্যবহৃত হয়।
      `,
      readTime: "৮ মিনিট",
      difficulty: "সহজ",
      views: 2340,
    },
    {
      id: 2,
      title: "তালাকের আইনি প্রক্রিয়া",
      titleEn: "Legal Process of Divorce",
      category: "divorce",
      excerpt: "মুসলিম ও অমুসলিম পারিবারিক আইন অনুযায়ী তালাকের নিয়মাবলী",
      content: `
মুসলিম পারিবারিক আইনে তালাকের জন্য স্বামীকে লিখিতভাবে ঘোষণা দিতে হয় এবং সংশ্লিষ্ট ইউনিয়ন পরিষদে নোটিশ দিতে হয়।
৯০ দিনের মধ্যে পুনর্মিলনের সুযোগ থাকে। সময় শেষে তালাক কার্যকর হয়।
      `,
      readTime: "১২ মিনিট",
      difficulty: "মধ্যম",
      views: 1890,
    },
    {
      id: 3,
      title: "ভূমি রেজিস্ট্রেশন গাইড",
      titleEn: "Land Registration Guide",
      category: "land",
      excerpt: "জমি-জমার রেজিস্ট্রেশন প্রক্রিয়া ও সাবরেজিস্ট্রি অফিসের কাজ",
      content: `
জমি বিক্রয় বা হস্তান্তরের সময় সাব-রেজিস্ট্রার অফিসে রেজিস্ট্রেশন করতে হয়।
স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি এবং প্রয়োজনীয় কাগজপত্র জমা দিয়ে প্রক্রিয়া সম্পন্ন হয়।
      `,
      readTime: "১৫ মিনিট",
      difficulty: "কঠিন",
      views: 3120,
    },
    {
      id: 4,
      title: "উত্তরাধিকার সম্পত্তি বণ্টন",
      titleEn: "Inheritance Property Distribution",
      category: "inheritance",
      excerpt: "ইসলামী আইন ও অন্যান্য ধর্মের উত্তরাধিকার নিয়মাবলী",
      content: `
মৃত ব্যক্তির সম্পত্তি বণ্টন ইসলামী এবং অন্যান্য ধর্মীয় বিধি অনুযায়ী হতে পারে।
উত্তরাধিকারীদের তালিকা, অংশ বণ্টন ও প্রয়োজনীয় কাগজপত্র গুরুত্বপূর্ণ।
      `,
      readTime: "১০ মিনিট",
      difficulty: "মধ্যম",
      views: 1560,
    },
    {
      id: 5,
      title: "শ্রমিক অধিকার ও বেতন",
      titleEn: "Worker Rights & Salary",
      category: "labor",
      excerpt: "শ্রম আইন অনুযায়ী কর্মীর অধিকার, ওভারটাইম ও বোনাস",
      content: `
বাংলাদেশে শ্রমিকদের বেতন, ওভারটাইম, বোনাস এবং ছুটির অধিকার আইন দ্বারা সংরক্ষিত।
নির্দিষ্ট অভিযোগের জন্য উপজেলা বা জেলা শ্রম অফিসে যোগাযোগ করতে হয়।
      `,
      readTime: "৬ মিনিট",
      difficulty: "সহজ",
      views: 2890,
    },
    {
      id: 6,
      title: "সাইবার অপরাধ থেকে সুরক্ষা",
      titleEn: "Cybercrime Protection",
      category: "cybercrime",
      excerpt: "অনলাইন প্রতারণা, হ্যাকিং ও সাইবার বুলিং থেকে সুরক্ষার উপায়",
      content: `
সাইবার অপরাধ হলে ‘সাইবার ট্রাইব্যুনাল’ বা নিকটস্থ থানায় অভিযোগ করতে পারেন।
প্রমাণ হিসেবে স্ক্রিনশট, মেসেজ, বা লিঙ্ক সংরক্ষণ করা গুরুত্বপূর্ণ।
      `,
      readTime: "৭ মিনিট",
      difficulty: "সহজ",
      views: 4230,
    },
    {
      id: 7,
      title: "ভোক্তা অধিকার লঙ্ঘিত হলে করণীয়",
      titleEn: "Consumer Rights Violation Remedies",
      category: "consumer",
      excerpt: "প্রতারণা বা নিম্নমানের পণ্য পেলে অভিযোগ করার প্রক্রিয়া।",
      content: `
ভোক্তা অধিকার লঙ্ঘিত হলে জেলা ভোক্তা অধিকার সংস্থা বা অনলাইন প্ল্যাটফর্মে অভিযোগ করতে পারেন।
প্রমাণ হিসেবে রশিদ ও পণ্য ছবি সংরক্ষণ করা জরুরি।
      `,
      readTime: "৬ মিনিট",
      difficulty: "সহজ",
      views: 2850,
    },
    {
      id: 8,
      title: "পুলিশের কাছে অভিযোগ দায়ের করার নিয়ম",
      titleEn: "How to File a Police Complaint",
      category: "criminal",
      excerpt: "সঠিকভাবে অভিযোগ (FIR) দায়ের করার ধাপ ও করণীয়।",
      content: `
পুলিশে অভিযোগ দায়ের করতে FIR ফরম পূরণ করতে হয়।
অভিযোগের বিস্তারিত, প্রমাণ এবং সাক্ষীর তথ্য প্রদান করা আবশ্যক।
      `,
      readTime: "৯ মিনিট",
      difficulty: "সহজ",
      views: 3340,
    },
    {
      id: 9,
      title: "জামিন প্রাপ্তির আইনি প্রক্রিয়া",
      titleEn: "Legal Process of Getting Bail",
      category: "criminal",
      excerpt: "জামিনের ধরন, আবেদন প্রক্রিয়া ও আদালতের ভূমিকা।",
      content: `
আদালতে জামিনের জন্য আবেদন ফাইল করতে হয়।
জামিন প্রাপ্তির জন্য আদালত প্রয়োজনীয় শর্তাবলী নির্ধারণ করে।
      `,
      readTime: "১১ মিনিট",
      difficulty: "মধ্যম",
      views: 2980,
    },
    {
      id: 10,
      title: "শিশুর হেফাজতের অধিকার",
      titleEn: "Child Custody Rights",
      category: "child",
      excerpt: "বিচ্ছেদের পর শিশু কার কাছে থাকবে— আইন কী বলে।",
      content: `
বিচ্ছেদের পর শিশুর হেফাজতের সিদ্ধান্ত আদালত নেয়।
শিশু কাকে দেওয়া হবে তা শিশুর কল্যাণ ও পিতামাতার অধিকার অনুযায়ী নির্ধারিত হয়।
      `,
      readTime: "৮ মিনিট",
      difficulty: "মধ্যম",
      views: 2120,
    },
  ];

  // 🧠 Mock Lawyers Data
  const mockLawyers = [
    {
      id: 1,
      name: "আব্দুর রহমান খান",
      nameEn: "Abdur Rahman Khan",
      specialization: "family",
      experience: 15,
      rating: 4.8,
      reviews: 156,
      location: "ঢাকা",
      languages: ["বাংলা", "English"],
      consultationFee: 800,
      availability: "Available",
      image:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400",
      verified: true,
      education: "এলএলবি, ঢাকা বিশ্ববিদ্যালয়",
      cases: 450,
    },
    {
      id: 2,
      name: "ড. ফাতেমা খাতুন",
      nameEn: "Dr. Fatema Khatun",
      specialization: "criminal",
      experience: 12,
      rating: 4.9,
      reviews: 203,
      location: "চট্টগ্রাম",
      languages: ["বাংলা", "English", "উর্দু"],
      consultationFee: 1200,
      availability: "Available",
      image:
        "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
      verified: true,
      education: "এলএলএম, চট্টগ্রাম বিশ্ববিদ্যালয়",
      cases: 380,
    },
    {
      id: 3,
      name: "রাশিদা পারভিন",
      nameEn: "Rashida Parvin",
      specialization: "family",
      experience: 9,
      rating: 4.6,
      reviews: 88,
      location: "ময়মনসিংহ",
      languages: ["বাংলা", "English"],
      consultationFee: 750,
      availability: "Available",
      image:
        "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=400",
      verified: true,
      education: "এলএলবি, ময়মনসিংহ আইন কলেজ",
      cases: 310,
    },
  ];

  useEffect(() => {
    const found = mockGuides.find((g) => g.id === Number(id));
    setTimeout(() => {
      setGuide(found);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500">গাইড লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600">
          গাইড পাওয়া যায়নি
        </h2>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "সহজ":
        return "bg-green-100 text-green-800";
      case "মধ্যম":
        return "bg-yellow-100 text-yellow-800";
      case "কঠিন":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 🎯 Map guide category to lawyer specialization
  const categoryToSpecialization = {
    marriage: "family",
    divorce: "family",
    inheritance: "family",
    child: "family",
    criminal: "criminal",
    labor: "labor",
    cybercrime: "cybercrime",
    consumer: "consumer",
  };

  // 🎯 Filter lawyers
  const recommendedLawyers = mockLawyers.filter(
    (lawyer) => lawyer.specialization === categoryToSpecialization[guide.category]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform transition-transform duration-200 group-hover:-translate-x-1" />
          ফিরে যান
        </button>


        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">{guide.title}</h1>
            </div>
            <span className="text-gray-500 text-sm">{guide.readTime}</span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
            {guide.content}
          </p>

          <div className="flex flex-wrap justify-between items-center mb-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                guide.difficulty
              )}`}
            >
              {guide.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              {guide.views.toLocaleString()} বার দেখা হয়েছে
            </span>
          </div>

          {/* 🧑‍⚖️ Recommended Lawyers Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              প্রস্তাবিত আইনজীবী ({recommendedLawyers.length})
            </h2>

            {recommendedLawyers.length === 0 ? (
              <p className="text-gray-500">
                এই বিষয়ে কোন আইনজীবী পাওয়া যায়নি।
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedLawyers.map((lawyer) => (
                  <motion.div
                    key={lawyer.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                          {lawyer.name}
                          {lawyer.verified && (
                            <BadgeCheck className="text-blue-500 w-4 h-4" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">{lawyer.education}</p>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>অভিজ্ঞতা:</strong> {lawyer.experience} বছর
                      </p>
                      <p>
                        <strong>রেটিং:</strong>{" "}
                        <span className="inline-flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />{" "}
                          {lawyer.rating} ({lawyer.reviews} রিভিউ)
                        </span>
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />{" "}
                        {lawyer.location}
                      </p>
                      <p>
                        <strong>পরামর্শ ফি:</strong> ৳{lawyer.consultationFee}
                      </p>
                      <p>
                        <strong>অবস্থা:</strong>{" "}
                        <span
                          className={`font-semibold ${lawyer.availability === "Available"
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                        >
                          {lawyer.availability}
                        </span>
                      </p>

                      {/* Book Consultation */}
                      <button
                        onClick={() => setSelectedLawyer(lawyer)}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        পরামর্শ বুক করুন
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Booking Modal */}
      {selectedLawyer && (
        <BookingModal
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}
    </div>
  );
};

export default LegalGuideDetails;
