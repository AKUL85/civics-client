import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "আমি কীভাবে এই প্ল্যাটফর্ম ব্যবহার করতে পারি?",
    answer:
      "আপনি হোমপেজ থেকে আইন বিষয়ক গাইড পড়তে পারবেন, এআই সহায়ক ব্যবহার করতে পারবেন এবং আইনজীবীদের খুঁজে বের করতে পারবেন।",
  },
  {
    question: "এখানে দেওয়া তথ্য কি ১০০% সঠিক?",
    answer:
      "আমরা তথ্য সর্বোচ্চভাবে নির্ভুল রাখার চেষ্টা করি। তবে এটি আইনজীবীর পরামর্শের বিকল্প নয়। প্রয়োজন হলে অবশ্যই একজন আইনজীবীর সাথে পরামর্শ করুন।",
  },
  {
    question: "আমি কি সরাসরি আইনজীবীর সাথে যোগাযোগ করতে পারব?",
    answer:
      "হ্যাঁ, আমাদের 'আইনজীবী খুঁজুন' সেকশনে গিয়ে আপনি আইনজীবীদের তালিকা দেখতে ও যোগাযোগ করতে পারবেন।",
  },
  {
    question: "এআই সহায়ক কি বাংলায় প্রশ্ন বুঝতে পারে?",
    answer:
      "হ্যাঁ, এআই সহায়ক বাংলা এবং ইংরেজি – উভয় ভাষায় প্রশ্ন বুঝে উত্তর দিতে পারে।",
  },
  {
    question: "এই প্ল্যাটফর্ম কি বিনামূল্যে ব্যবহার করা যাবে?",
    answer:
      "হ্যাঁ, প্রাথমিকভাবে এটি সম্পূর্ণ বিনামূল্যে। ভবিষ্যতে কিছু প্রিমিয়াম সার্ভিস যুক্ত হতে পারে।",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl shadow-lg">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            প্রশ্নোত্তর (FAQ)
          </h1>
          <p className="text-lg text-gray-600">
            সাধারণ জিজ্ঞাসা এবং তাদের উত্তর
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-medium focus:outline-none"
              >
                <span>{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
