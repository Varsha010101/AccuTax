import React, { useState } from 'react';
import { User, Lock, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    contact: '',
    password: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine the endpoint based on login/signup
      const endpoint = isLogin ? 'http://localhost:8000/login' : 'http://localhost:8000/signup';
      
      // Set payload for either login or signup
      const payload = isLogin
        ? { fname: formData.fname, password: formData.password }
        : {
            fname: formData.fname,
            lname: formData.lname,
            contact: formData.contact,
            password: formData.password
          };

      // Send API request to the backend
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok) {
        setIsSubmitted(true); // Set the submitted state to true after successful form submission

        if (isLogin) {
          // Store token in local storage for later authentication
          localStorage.setItem('token', result.access_token);

          // After a delay, redirect to the dashboard
          setTimeout(() => {
            navigate('/dash'); // React Router-based redirect to the dashboard
          }, 1000);
        } else {
          // If signup, reset form and switch to login
          setTimeout(() => {
            setIsSubmitted(false);
            toggleForm();
          }, 2000);
        }
      } else {
        // Show error message if the response is not successful
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup form
    setIsSubmitted(false); // Reset the form submission state
    setFormData({
      fname: '',
      lname: '',
      contact: '',
      password: ''
    });
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
                          name="fname"
                          value={formData.fname}
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
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default AuthPage;
