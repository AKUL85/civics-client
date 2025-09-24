import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">আইনি সহায়তা</span>
                <span className="text-sm text-gray-400 block">Legal Access BD</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              বাংলাদেশের সবার জন্য সাশ্রয়ী ও সহজলভ্য আইনি সেবা। আপনার আইনি সমস্যার সমাধান এখন আপনার হাতের মুঠোয়।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guides" className="text-gray-300 hover:text-white transition-colors">
                  আইনি গাইড
                </Link>
              </li>
              <li>
                <Link to="/lawyers" className="text-gray-300 hover:text-white transition-colors">
                  আইনজীবী খুঁজুন
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-gray-300 hover:text-white transition-colors">
                  এআই সহায়ক
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white transition-colors">
                  কমিউনিটি
                </Link>
              </li>
               <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  প্রশ্নোত্তর
                </Link>
              </li>
               <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                 আমাদের সম্পর্কে
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+880 1820245355</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">legalaccess@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 আইনি সহায়তা (Legal Access BD). সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;