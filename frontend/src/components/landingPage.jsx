import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronRight, Shield, FileText, Clock, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: true,
    features: false,
    security: false,
    cta: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      setIsVisible({
        hero: true,
        features: window.scrollY > 100,
        security: window.scrollY > 300,
        cta: window.scrollY > 500
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center z-50 backdrop-blur-sm bg-opacity-90">
        <div className="flex items-center">
          <div className="text-blue-600 font-bold text-2xl">AccuTax</div>
          <div className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Beta</div>
        </div>
        
        <div className="hidden md:flex space-x-6 text-gray-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
        </div>
        
        <div className="flex space-x-4">
        <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors">Log In</Link>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transform transition hover:-translate-y-1">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-20 relative overflow-hidden">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            File Your Taxes with <span className="text-blue-600">Confidence</span> and <span className="text-blue-600">Ease</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            AccuTax streamlines your tax filing process with bank-level security and AI-powered accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transform transition hover:-translate-y-1 flex items-center">
              Start Filing Now <ChevronRight className="ml-2" size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-lg text-lg font-medium shadow hover:bg-blue-50 transform transition hover:-translate-y-1">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute right-0 top-40 w-1/3 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute left-10 bottom-10 w-1/4 h-64 bg-green-500 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-20 bg-white">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Smart Features for <span className="text-blue-600">Effortless</span> Filing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-2">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Document Scanning</h3>
              <p className="text-gray-600">Automatically extract data from your tax documents with precision.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-2 delay-100">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Bank-Level Security</h3>
              <p className="text-gray-600">Your data is protected with end-to-end encryption and secure storage.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-2 delay-200">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Clock className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Processing</h3>
              <p className="text-gray-600">Complete your taxes in minutes, not hours. Receive refunds quickly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-6 md:px-20 bg-gray-50">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible.security ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            <span className="text-blue-600">Security</span> You Can Trust
          </h2>
          
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">We Take Security Seriously</h3>
                <ul className="space-y-4">
                  {[
                    "256-bit encryption for all data transfers",
                    "Multi-factor authentication",
                    "Regular security audits and compliance checks",
                    "Secure data storage with automatic backups"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 bg-green-100 p-1 rounded-full">
                        <Check className="text-green-600" size={16} />
                      </div>
                      <span className="ml-3 text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-blue-600 rounded-full opacity-5 animate-ping"></div>
                <div className="absolute w-32 h-32 bg-blue-600 rounded-full opacity-10 animate-pulse"></div>
                <Shield className="text-blue-600 relative z-10" size={100} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify your tax filing?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands who have already discovered the easiest way to file taxes.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-50 transform transition hover:-translate-y-1 flex items-center mx-auto">
            Get Started Today <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-10">
            <div className="mb-8 md:mb-0">
              <div className="text-white font-bold text-2xl mb-4">AccuTax</div>
              <p className="max-w-xs">Automated tax filing with security and accuracy you can trust.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-sm text-center">
            &copy; {new Date().getFullYear()} AccuTax. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;