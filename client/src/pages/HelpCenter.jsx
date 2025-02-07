import React, { useState } from 'react';
import { Search, ChevronRight, Settings, CreditCard, Users, Home, FileText, User, ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const categories = [
  {
    id: 1,
    icon: <Settings className="w-6 h-6" />,
    title: 'General Help',
    description: 'Manage your accounts and learn how to edit them on the go.',
    articleCount: 12,
    author: 'Support Team'
  },
  {
    id: 2,
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Rent Payments',
    description: 'Guides on how to pay/collect rent online.',
    articleCount: 11,
    author: 'Support Team'
  },
  {
    id: 3,
    icon: <Users className="w-6 h-6" />,
    title: 'Tenant Help',
    description: 'We covered everything you may need to find your next home.',
    articleCount: 11,
    author: 'Support Team'
  },
  {
    id: 4,
    icon: <Home className="w-6 h-6" />,
    title: 'Landlord Help',
    description: 'Learn how to list your property and promote it to prospective tenants worldwide.',
    articleCount: 8,
    author: 'Support Team'
  },
  {
    id: 5,
    icon: <FileText className="w-6 h-6" />,
    title: 'Tenant Screening',
    description: 'Help articles on credit report and background check.',
    articleCount: 3,
    author: 'Support Team'
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <header className="bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-28">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-4 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Search our knowledge base or browse categories below to find answers
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-2xl bg-white shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-500 duration-200 text-base"
              />
              <Search className="absolute left-5 top-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" size={24} />
              <kbd className="absolute right-4 top-4 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">⌘K</kbd>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group relative bg-white rounded-2xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-6">
                  <div className={`p-3 rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 ${hoveredCategory === category.id ? 'bg-indigo-100' : ''}`}>
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {category.title}
                      </h2>
                      <ArrowRight className={`w-5 h-5 text-gray-400 transition-all duration-300 transform ${hoveredCategory === category.id ? 'translate-x-1 text-indigo-600' : ''}`} />
                    </div>
                    <p className="mt-2 text-gray-600">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        By {category.author} • {category.articleCount} articles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;