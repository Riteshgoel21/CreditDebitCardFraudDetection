import React, { useState } from 'react';
import { CreditCard, AlertTriangle, CheckCircle, X, Brain, Loader } from 'lucide-react';
import { fraudDetectionEngine, FraudAnalysisResult, CardDetails } from '../utils/fraudDetection';
import AIInsights from '../components/AIInsights';
import RiskFactorsList from '../components/RiskFactorsList';

const Verify: React.FC = () => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    amount: '',
    merchant: '',
    location: {
      country: 'United States',
      city: 'New York'
    }
  });
  
  const [verificationResult, setVerificationResult] = useState<FraudAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    if (name === 'country' || name === 'city') {
      setCardDetails(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }));
    } else {
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analysisData: CardDetails = {
        number: cardDetails.number.replace(/\s/g, ''),
        expiry: cardDetails.expiry,
        cvv: cardDetails.cvv,
        amount: parseFloat(cardDetails.amount),
        merchant: cardDetails.merchant,
        location: cardDetails.location,
        timestamp: new Date(),
        deviceFingerprint: 'fp_' + Math.random().toString(36).substr(2, 9),
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: navigator.userAgent
      };

      // Generate user pattern for demo
      const userPattern = fraudDetectionEngine.generateUserPattern(analysisData.number);
      
      const result = await fraudDetectionEngine.analyzeFraud(analysisData, userPattern);
      setVerificationResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCardDetails({
      number: '',
      expiry: '',
      cvv: '',
      amount: '',
      merchant: '',
      location: {
        country: 'United States',
        city: 'New York'
      }
    });
    setVerificationResult(null);
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan',
    'Australia', 'Brazil', 'India', 'China', 'Russia', 'Nigeria', 'Romania'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI-Powered Fraud Detection</h1>
        <p className="text-gray-400">Advanced machine learning analysis for real-time fraud prevention</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-700">
          <div className="flex items-center mb-6">
            <CreditCard className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Transaction Details</h2>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Transaction Amount ($) *
              </label>
              <input
                type="number"
                name="amount"
                value={cardDetails.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Merchant Name *
              </label>
              <input
                type="text"
                name="merchant"
                value={cardDetails.merchant}
                onChange={handleInputChange}
                placeholder="Enter merchant name"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={cardDetails.location.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={cardDetails.location.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Analyze with AI
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {verificationResult ? (
            <>
              <AIInsights
                riskScore={verificationResult.riskScore}
                confidence={verificationResult.confidence}
                modelVersion={verificationResult.modelVersion}
                processingTime={verificationResult.processingTime}
                recommendation={verificationResult.recommendation}
              />
              <RiskFactorsList riskFactors={verificationResult.riskFactors} />
            </>
          ) : (
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 text-center">
              <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">Ready for Analysis</h3>
              <p className="text-gray-500">
                Enter transaction details to get AI-powered fraud detection results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;