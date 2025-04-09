import { useState } from 'react';
import { User, Lock, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    fname: '',
    lname: '',
    contact: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">AccuTax</h1>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-md">Beta</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Security</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800 transition-colors">Log In</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Container */}
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className={`bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md transition-all duration-500 ease-in-out transform ${isSubmitted ? 'scale-105' : ''}`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="mt-2 opacity-90">
              {isLogin 
                ? 'File your taxes with confidence and ease' 
                : 'Join AccuTax for secure, AI-powered tax filing'}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {isLogin ? 'Login Successful!' : 'Account Created!'}
                </h3>
                <p className="text-gray-600 mt-2 text-center">
                  {isLogin ? 'Redirecting to your dashboard...' : 'Please check your email to verify your account.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {isLogin ? (
                  <>
                    <div className="space-y-2">
                      <label className="block text-gray-700">Username</label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <User size={18} className="text-gray-400 mr-2" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="flex-1 outline-none"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700">Password</label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <Lock size={18} className="text-gray-400 mr-2" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="flex-1 outline-none"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-gray-700">First Name</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <User size={18} className="text-gray-400 mr-2" />
                          <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            className="flex-1 outline-none"
                            placeholder="First name"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-gray-700">Last Name</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <User size={18} className="text-gray-400 mr-2" />
                          <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            className="flex-1 outline-none"
                            placeholder="Last name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700">Contact</label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <Phone size={18} className="text-gray-400 mr-2" />
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          className="flex-1 outline-none"
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700">Email</label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <Mail size={18} className="text-gray-400 mr-2" />
                        <input
                          type="email"
                          name="email"
                          className="flex-1 outline-none"
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700">Password</label>
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <Lock size={18} className="text-gray-400 mr-2" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="flex-1 outline-none"
                          placeholder="Create a password"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="ml-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animations */}
      <div className="fixed top-20 left-20 w-16 h-16 bg-blue-500 opacity-10 rounded-full animate-float1"></div>
      <div className="fixed bottom-20 right-20 w-24 h-24 bg-blue-400 opacity-10 rounded-full animate-float2"></div>
      <div className="fixed top-1/3 right-1/4 w-12 h-12 bg-blue-600 opacity-10 rounded-full animate-float3"></div>
      
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-20px) translateY(20px); }
        }
        .animate-float1 {
          animation: float1 7s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 8s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AuthPage;