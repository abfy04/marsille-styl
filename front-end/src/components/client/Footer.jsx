import React from 'react';
import { Store, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Store className="h-8 w-8 text-[#5ab8ee]" />
              <span className="text-xl font-bold">Marseille Style</span>
            </div>
            <p className="text-gray-400 text-sm">
              أحسن ستيل، أحسن جودة، أحسن ثمن.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">البرودويات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">من حنا</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الكاطيݣوريات</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">حوايج</a></li>
              <li><a href="#" className="hover:text-white transition-colors">صبات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ساعة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">عطر</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-[#5ab8ee]" />
                <span>info@marseillestyle.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-[#5ab8ee]" />
                <span>+33 4 91 00 00 00</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-[#5ab8ee]" />
                <span>مارسيليا، فرنسا</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-6">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-[#5ab8ee] cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-[#5ab8ee] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            موقع مدعوم من{' '}
            <a href="https://oramadev.com" target="_blank" rel="noopener noreferrer" className="underline text-[#5ab8ee] hover:text-white">Orama</a>
            {' '}| جميع الحقوق محفوظة لمارسيليا ستايل
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;