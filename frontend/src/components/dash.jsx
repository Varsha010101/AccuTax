import React from 'react';
import { useState, useEffect } from 'react';
import { 
  User, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  HelpCircle,
  LogOut,
  ChevronRight,
  DollarSign,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

// Dashboard component for AccuTax application
const Dashboard = () => {
  // State for user data and loading status
  const [userData, setUserData] = useState(null);
  const [taxData, setTaxData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulate fetching user data from backend
  useEffect(() => {
    // In a real app, replace with actual API calls
    const fetchUserData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUserData = {
          name: "Mira Johnson",
          email: "mira.johnson@example.com",
          profilePicture: "/api/placeholder/100/100",
          filingStatus: "Single",
          lastFiled: "April 10, 2025",
          accountCreated: "February 15, 2023"
        };
        
        // Mock tax data for last three years
        const mockTaxData = [
          { year: 2022, income: 68000, taxPaid: 12410, refund: 1200 },
          { year: 2023, income: 72500, taxPaid: 13680, refund: 950 },
          { year: 2024, income: 79800, taxPaid: 15120, refund: 1450 }
        ];
        
        setUserData(mockUserData);
        setTaxData(mockTaxData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Animation classes for elements as they load
  const fadeInUp = "animate-fadeIn transition-all duration-500 ease-in-out";
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-800 font-semibold">Loading your tax information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">AccuTax</div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Beta</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Security</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <img 
                src={userData.profilePicture} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="hidden md:inline font-medium">{userData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className={`bg-white rounded-lg shadow-md p-6 md:w-64 ${fadeInUp}`}>
          <div className="flex flex-col items-center mb-6">
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 mb-4"
            />
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('tax-returns')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'tax-returns' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText size={20} />
              <span>Tax Returns</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {/* Welcome Section */}
          <section className={`bg-white rounded-lg shadow-md p-6 mb-6 ${fadeInUp}`} style={{ animationDelay: "0.1s" }}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userData.name.split(' ')[0]}!</h1>
                <p className="text-gray-600 mt-1">Here's an overview of your tax filing history and status.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Start 2025 Filing
              </button>
            </div>
          </section>
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${fadeInUp}`} style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Tax Refund</p>
                  <p className="text-2xl font-bold">${taxData[2].refund.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    {Math.round((taxData[2].refund - taxData[1].refund) / taxData[1].refund * 100)}% from 2023
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${fadeInUp}`} style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calendar size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Filing Date</p>
                  <p className="text-2xl font-bold">{userData.lastFiled}</p>
                  <p className="text-xs text-gray-500">Tax Year 2024</p>
                </div>
              </div>
            </div>
            
            <div className={`bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${fadeInUp}`} style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <User size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Filing Status</p>
                  <p className="text-2xl font-bold">{userData.filingStatus}</p>
                  <button className="text-xs text-blue-600 flex items-center">
                    Update <ChevronRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tax History Chart */}
          <section className={`bg-white rounded-lg shadow-md p-6 mb-6 ${fadeInUp}`} style={{ animationDelay: "0.5s" }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">3-Year Tax History</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taxData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }} 
                  />
                  <Legend />
                  <Bar 
                    name="Annual Income" 
                    dataKey="income" 
                    fill="#3b82f6" 
                    animationDuration={1500}
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    name="Tax Paid" 
                    dataKey="taxPaid" 
                    fill="#ef4444" 
                    animationDuration={1500} 
                    animationDelay={300}
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          
          {/* Income Trend Chart */}
          <section className={`bg-white rounded-lg shadow-md p-6 ${fadeInUp}`} style={{ animationDelay: "0.6s" }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Income Growth Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taxData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    name="Annual Income" 
                    dataKey="income" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    name="Tax Paid" 
                    dataKey="taxPaid" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                    animationDelay={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-white shadow-inner mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © 2025 AccuTax. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;