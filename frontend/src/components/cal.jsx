import React, { useState, useEffect } from "react";
import {
  Check,
  ChevronDown,
  User,
  Bell,
  DollarSign,
  ChevronRight,
  FileText,
  Shield,
  Sparkles,
  CreditCard,
  Heart,
  Handshake
} from "lucide-react";

export default function AccuTaxForm() {
  const [formData, setFormData] = useState({
    annualIncome: "",
    prevYearIncome: "",
    secondLastYearIncome: "",
    section80C: "",
    section80D: "",
    section80E: "",
    section80G: ""
  });

  const [taxSummary, setTaxSummary] = useState({
    taxableIncome: 0,
    taxPayable: 0,
  });

  const [activeSection, setActiveSection] = useState(0);
  const [animateForm, setAnimateForm] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchTaxData();
  }, []);

  const fetchTaxData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Make the request to your backend API to fetch the data
      const response = await fetch('http://localhost:8000/api/tax-data');  // Adjust URL for your backend

      if (!response.ok) {
        throw new Error('Starting with a new form');
      }

      const data = await response.json();

      // Set the form data with the fetched data
      setFormData({
        annualIncome: data.annualIncome || "",
        prevYearIncome: data.prevYearIncome || "",
        secondLastYearIncome: data.secondLastYearIncome || "",
        section80C: data.section80C || "",
        section80D: data.section80D || "",
        section80E: data.section80E || "",
        section80G: data.section80G || ""
      });

      // Set tax summary data
      setTaxSummary({
        taxableIncome: data.taxableIncome || 0,
        taxPayable: data.taxPayable || 0
      });

    } catch (err) {
      console.error('Error fetching tax data:', err);
      setError('Failed to load your previous tax data. You can continue with a new form.');
    } finally {
      setIsLoading(false);
      setAnimateForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send the form data to the backend API to submit
      const response = await fetch('http://localhost:8000/submit_tax_form/', {  // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Sending form data
      });

      if (!response.ok) {
        throw new Error('Failed to submit tax data');
      }

      const result = await response.json();
      console.log('Tax form submitted successfully:', result);

      // Set tax summary from response
      setTaxSummary({
        taxableIncome: result.taxableIncome || 0,
        taxPayable: result.taxPayable || 0
      });

      setFormSubmitted(true);

    } catch (err) {
      console.error('Error submitting tax data:', err);
      setError('Failed to submit your tax data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const sections = [
    { title: "Income Details", icon: <DollarSign /> },
    { title: "Deductions", icon: <FileText /> },
    { title: "Tax Summary", icon: <Check /> }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                AccuTax <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Beta</span>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Security
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell size={20} />
              </button>
              <div className="ml-3 relative">
                <div>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex rounded-full bg-blue-100 text-blue-600 focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                  </button>
                </div>
                
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-700">Mira Johnson</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Status Notifications */}
      {isLoading && (
        <div className="fixed top-4 right-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-md shadow-md flex items-center">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          Processing...
        </div>
      )}
      
      {error && (
        <div className="fixed top-4 right-4 bg-red-50 text-red-700 px-4 py-2 rounded-md shadow-md flex items-center">
          <div className="mr-2"></div>
          {error}
        </div>
      )}
      
      {formSubmitted && (
  <div className="fixed top-4 right-4 bg-green-50 text-green-700 px-4 py-2 rounded-md shadow-md flex items-center">
    <div className="mr-2">✓</div>
    Tax form submitted successfully!
  </div>
)}


      {/* Main Content */}
      <div 
        className={`max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out ${animateForm ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"}`}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tax Filing Form 2025</h1>
        
        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`flex flex-col items-center w-full ${index !== sections.length - 1 ? 'border-r' : ''}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300 ${
                  index < activeSection ? 'bg-green-500 text-white' : 
                  index === activeSection ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {index < activeSection ? <Check size={20} /> : section.icon}
                </div>
                <span className={`text-sm font-medium ${
                  index <= activeSection ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {section.title}
                </span>
              </button>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${(activeSection / (sections.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-500">
          <form onSubmit={handleSubmit}>
            {/* Section 1: Income Details */}
            {activeSection === 0 && (
              <div className="space-y-6 transition-all duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <DollarSign className="mr-2 text-blue-500" size={20} />
                  Income Details
                </h2>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Income (Current Year)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous Year's Income
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="prevYearIncome"
                      value={formData.prevYearIncome}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Second-Last Year's Income
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="secondLastYearIncome"
                      value={formData.secondLastYearIncome}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveSection(1)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Next
                    <ChevronRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Section 2: Deductions */}
            {activeSection === 1 && (
              <div className="space-y-6 transition-all duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FileText className="mr-2 text-blue-500" size={20} />
                  Deductions
                </h2>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <CreditCard size={16} className="mr-2 text-blue-500" />
                    Section 80C - Investments
                    <span className="ml-2 text-xs text-gray-500">(PPF, EPF, Life Insurance)</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="section80C"
                      value={formData.section80C}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Heart size={16} className="mr-2 text-red-500" />
                    Section 80D - Health Insurance
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="section80D"
                      value={formData.section80D}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    Section 80E - Education Loans
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="section80E"
                      value={formData.section80E}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-md p-4 rounded-md bg-gray-50"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Handshake size={16} className="mr-2 text-green-500" />
                    Section 80G - Donations to Charities
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="section80G"
                      value={formData.section80G}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveSection(0)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection(2)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Next
                    <ChevronRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Section 3: Tax Summary */}
            {activeSection === 2 && (
              <div className="space-y-6 transition-all duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Shield className="mr-2 text-blue-500" size={20} />
                  Tax Summary
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Annual Income</div>
                    <div className="text-lg font-medium text-gray-900">
                      {formData.annualIncome ? formatCurrency(formData.annualIncome) : "₹0"}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Total Deductions</div>
                    <div className="text-lg font-medium text-green-600">
                      {formatCurrency(
                        (parseFloat(formData.section80C) || 0) +
                        (parseFloat(formData.section80D) || 0) +
                        (parseFloat(formData.section80E) || 0) +
                        (parseFloat(formData.section80G) || 0)
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-700">Taxable Income</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {formatCurrency(taxSummary.taxableIncome)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-700">Tax Payable</div>
                      <div className="text-xl font-semibold text-blue-600">
                        {formatCurrency(taxSummary.taxPayable)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Tax History</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Current Year (2025)</span>
                      </div>
                      <div className="text-sm font-medium">
                        Taxable Income: <span className="text-gray-900">{formatCurrency(taxSummary.taxableIncome)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Previous Year (2024)</span>
                      </div>
                      <div className="text-sm font-medium">
                        Taxable Income: <span className="text-gray-900">{formData.prevYearIncome ? formatCurrency(formData.prevYearIncome) : "₹0"}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Second-Last Year (2023)</span>
                      </div>
                      <div className="text-sm font-medium">
                        Taxable Income: <span className="text-gray-900">{formData.secondLastYearIncome ? formatCurrency(formData.secondLastYearIncome) : "₹0"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveSection(1)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isLoading ? 'bg-gray-400' : formSubmitted ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200`}
                    disabled={isLoading || formSubmitted}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : formSubmitted ? (
                      <>
                        <Check className="mr-2" size={16} />
                        Submitted
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2" size={16} />
                        Submit Tax Form
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}