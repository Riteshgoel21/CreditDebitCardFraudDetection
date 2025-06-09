import React, { useState } from 'react';
import { ChevronDown, Info, Brain, TrendingUp, Shield } from 'lucide-react';
import FraudRiskChart from '../components/FraudRiskChart';
import MLModelStats from '../components/MLModelStats';
import { mockTransactions } from '../data/mockData';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Generate chart data based on selected time range
  const generateChartData = (range: string) => {
    switch(range) {
      case 'day':
        return {
          data: [25, 30, 28, 32, 35, 40, 38, 42, 45, 48, 46, 42, 40, 38, 36, 34, 32, 30, 28, 25, 22, 20, 18, 22],
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`)
        };
      case 'week':
        return {
          data: [32, 28, 45, 52, 38, 43, 35],
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        };
      case 'month':
        return {
          data: [32, 35, 38, 42, 45, 48, 52, 55, 48, 45, 42, 38, 35, 32, 30, 28, 32, 35, 38, 42, 45, 48, 45, 42, 38, 35, 32, 30, 28, 25],
          labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`)
        };
      default:
        return {
          data: [32, 28, 45, 52, 38, 43, 35],
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        };
    }
  };
  
  const chartData = generateChartData(timeRange);
  
  // Calculate metrics
  const flaggedTransactions = mockTransactions.filter(t => t.status === 'Flagged').length;
  const declinedTransactions = mockTransactions.filter(t => t.status === 'Declined').length;
  const totalTransactions = mockTransactions.length;
  const avgRiskScore = Math.round(mockTransactions.reduce((sum, t) => sum + t.riskScore, 0) / totalTransactions);
  
  // Advanced analytics data
  const fraudPatterns = [
    {
      pattern: 'Velocity Attacks',
      frequency: 23,
      trend: '+15%',
      severity: 'HIGH',
      description: 'Multiple rapid transactions from same card'
    },
    {
      pattern: 'Geographic Anomalies',
      frequency: 18,
      trend: '+8%',
      severity: 'MEDIUM',
      description: 'Transactions from unusual locations'
    },
    {
      pattern: 'Amount Clustering',
      frequency: 12,
      trend: '-5%',
      severity: 'MEDIUM',
      description: 'Suspicious round-number transactions'
    },
    {
      pattern: 'Device Spoofing',
      frequency: 8,
      trend: '+22%',
      severity: 'HIGH',
      description: 'Fake or manipulated device fingerprints'
    }
  ];

  const realTimeMetrics = [
    { label: 'Transactions/sec', value: '127', color: 'text-blue-500' },
    { label: 'Avg Response Time', value: '12ms', color: 'text-green-500' },
    { label: 'Model Accuracy', value: '97.8%', color: 'text-purple-500' },
    { label: 'Active Alerts', value: '3', color: 'text-red-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Advanced Fraud Analytics</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md text-sm ${timeRange === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setTimeRange('day')}
          >
            Day
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* Real-time metrics bar */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium">Real-time Monitoring</span>
          </div>
          <div className="flex space-x-6">
            {realTimeMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'patterns' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('patterns')}
          >
            Fraud Patterns
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'ml' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('ml')}
          >
            ML Performance
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FraudRiskChart 
                  data={chartData.data} 
                  labels={chartData.labels} 
                  title={`Fraud Risk Trend (${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})`} 
                />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    Key Metrics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Flagged Transactions</span>
                        <span>{flaggedTransactions} ({Math.round((flaggedTransactions/totalTransactions)*100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(flaggedTransactions/totalTransactions)*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Declined Transactions</span>
                        <span>{declinedTransactions} ({Math.round((declinedTransactions/totalTransactions)*100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(declinedTransactions/totalTransactions)*100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Average Risk Score</span>
                        <span>{avgRiskScore}%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${avgRiskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patterns' && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold">AI-Detected Fraud Patterns</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fraudPatterns.map((pattern, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{pattern.pattern}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        pattern.severity === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {pattern.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{pattern.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        <span className="font-medium">{pattern.frequency}</span> occurrences
                      </span>
                      <span className={`text-sm font-medium ${
                        pattern.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
                      }`}>
                        {pattern.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-medium mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  Pattern Evolution
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">-12%</div>
                    <div className="text-sm text-gray-400">Traditional Card Skimming</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">+34%</div>
                    <div className="text-sm text-gray-400">Account Takeover</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">+18%</div>
                    <div className="text-sm text-gray-400">Synthetic Identity</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ml' && (
            <MLModelStats />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;