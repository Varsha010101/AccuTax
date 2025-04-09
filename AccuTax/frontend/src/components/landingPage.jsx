import React from 'react';
import { useState, useEffect } from 'react';
import { Shield, CheckCircle, FileText, Clock, ArrowRight } from 'lucide-react';

export default function AccuTaxLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    security: false,
    cta: false
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Set visibility based on scroll position
      setIsVisible({
        hero: window.scrollY > 10,
        features: window.scrollY > 200,
        security: window.scrollY > 400,
        cta: window.scrollY > 600
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set initial visibility for hero section
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 300);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Features data
  const features = [
    {
      icon: <FileText className="text-blue-600" size={28} />,
      title: "Simple Filing",
      description: "Complete your taxes in minutes with our guided process."
    },
    {
      icon: <Shield className="text-blue-600" size={28} />,
      title: "Secure & Protected",
      description: "Bank-level encryption for all your sensitive information."
    },
    {
      icon: <Clock className="text-blue-600" size={28} />,
      title: "Fast Returns",
      description: "Get your refund faster with our expedited processing."
    }
  ];

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed w-full py-4 transition-all duration-300 z-10 ${scrollY > 20 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="text-blue-600 mr-2" size={28} />
            <span className="font-bold text-2xl text-blue-900">AccuTax</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors shadow-md">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className={`max-w-3xl transition-all duration-1000 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Taxes Made Simple, Secure, and Accurate</h1>
            <p className="text-xl text-gray-600 mb-8">AccuTax automates your tax filing process with enterprise-grade security and accuracy guarantees.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center">
                Start Filing Now <ArrowRight className="ml-2" size={18} />
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded hover:bg-blue-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Security Badge */}
      <div className="container mx-auto px-6 relative">
        <div className="absolute right-10 -top-16 bg-white rounded-lg shadow-xl p-6 max-w-xs flex items-center gap-4 border-l-4 border-blue-600">
          <div className="bg-blue-100 p-3 rounded-full animate-pulse">
            <Shield className="text-blue-600" size={28} />
          </div>
          <div>
            <h3 className="font-bold text-blue-900">256-bit Encryption</h3>
            <p className="text-sm text-gray-600">Your data is always protected</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-16 text-blue-900 transition-all duration-1000 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Streamlined for Your Peace of Mind
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-all duration-300 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${isVisible.security ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl font-bold mb-8 text-blue-900">Bank-Level Security for Your Data</h2>
            <p className="text-gray-600 mb-12">Your financial information deserves the highest level of protection. AccuTax employs industry-leading security measures.</p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 transform ${isVisible.security ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { text: "256-bit Encryption", delay: 0 },
              { text: "SOC 2 Compliant", delay: 200 },
              { text: "Data Protection", delay: 400 },
              { text: "Secure Servers", delay: 600 },
              { text: "Regular Audits", delay: 800 },
              { text: "Privacy Guarantee", delay: 1000 }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white p-4 rounded shadow-md"
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <CheckCircle className="text-green-500 mr-2" size={20} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className={`bg-blue-600 rounded-2xl p-10 text-white text-center max-w-4xl mx-auto transition-all duration-1000 transform ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl font-bold mb-6">Ready to File with Confidence?</h2>
            <p className="mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who have simplified their tax filing process with AccuTax.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-md">
              Start Your Tax Return Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shield className="text-blue-400 mr-2" size={24} />
              <span className="font-bold text-xl">AccuTax</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AccuTax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}