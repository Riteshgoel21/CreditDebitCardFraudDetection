import React from 'react';
import { Brain, Database, Cpu, TrendingUp, Zap, Target } from 'lucide-react';

const MLModelStats: React.FC = () => {
  const modelMetrics = [
    {
      label: 'Model Accuracy',
      value: '97.8%',
      icon: <Target className="h-5 w-5 text-green-500" />,
      trend: '+2.1%',
      description: 'Overall fraud detection accuracy'
    },
    {
      label: 'False Positive Rate',
      value: '1.2%',
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      trend: '-0.3%',
      description: 'Legitimate transactions flagged as fraud'
    },
    {
      label: 'Processing Speed',
      value: '12ms',
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      trend: '-5ms',
      description: 'Average analysis time per transaction'
    },
    {
      label: 'Training Data',
      value: '2.4M',
      icon: <Database className="h-5 w-5 text-purple-500" />,
      trend: '+150K',
      description: 'Transactions used for model training'
    }
  ];

  const featureImportance = [
    { feature: 'Transaction Amount', importance: 28.5, color: 'bg-red-500' },
    { feature: 'Merchant Category', importance: 22.1, color: 'bg-orange-500' },
    { feature: 'Geographic Location', importance: 18.7, color: 'bg-yellow-500' },
    { feature: 'Transaction Velocity', importance: 15.3, color: 'bg-green-500' },
    { feature: 'Device Fingerprint', importance: 9.2, color: 'bg-blue-500' },
    { feature: 'Time Patterns', importance: 6.2, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">ML Model Performance</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modelMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                {metric.icon}
                <span className={`text-xs font-medium ${
                  metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>
              <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-6">
          <Cpu className="h-6 w-6 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold">Feature Importance Analysis</h3>
        </div>

        <div className="space-y-4">
          {featureImportance.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm text-gray-300">{item.feature}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${item.importance}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-400 text-right">
                {item.importance}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center mb-2">
            <Brain className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium">Model Insights</span>
          </div>
          <p className="text-xs text-gray-400">
            The current model uses an ensemble of Random Forest, Gradient Boosting, and Neural Network algorithms. 
            It's trained on over 2.4 million historical transactions and is updated daily with new fraud patterns.
            The model achieves 97.8% accuracy with a false positive rate of just 1.2%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLModelStats;