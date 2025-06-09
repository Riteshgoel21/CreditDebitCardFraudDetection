import React from 'react';
import { Brain, TrendingUp, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AIInsightsProps {
  riskScore: number;
  confidence: number;
  modelVersion: string;
  processingTime: number;
  recommendation: 'APPROVE' | 'FLAG' | 'DECLINE' | 'MANUAL_REVIEW';
}

const AIInsights: React.FC<AIInsightsProps> = ({
  riskScore,
  confidence,
  modelVersion,
  processingTime,
  recommendation
}) => {
  const getRecommendationColor = () => {
    switch (recommendation) {
      case 'APPROVE': return 'text-green-500';
      case 'FLAG': return 'text-yellow-500';
      case 'DECLINE': return 'text-red-500';
      case 'MANUAL_REVIEW': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case 'APPROVE': return <CheckCircle size={20} className="text-green-500" />;
      case 'FLAG': return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'DECLINE': return <Shield size={20} className="text-red-500" />;
      case 'MANUAL_REVIEW': return <Brain size={20} className="text-orange-500" />;
      default: return <AlertTriangle size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center mb-4">
        <Brain className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">AI Analysis Results</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Risk Score</span>
            <span className={`text-lg font-bold ${
              riskScore >= 70 ? 'text-red-500' :
              riskScore >= 40 ? 'text-yellow-500' :
              'text-green-500'
            }`}>
              {riskScore}%
            </span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                riskScore >= 70 ? 'bg-red-500' :
                riskScore >= 40 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Confidence</span>
            <span className="text-lg font-bold text-blue-500">
              {(confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${confidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getRecommendationIcon()}
            <span className="ml-2 font-medium">Recommendation</span>
          </div>
          <span className={`font-bold ${getRecommendationColor()}`}>
            {recommendation.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center text-gray-400">
          <TrendingUp size={16} className="mr-2" />
          Model: {modelVersion}
        </div>
        <div className="flex items-center text-gray-400">
          <Clock size={16} className="mr-2" />
          {processingTime}ms
        </div>
      </div>
    </div>
  );
};

export default AIInsights;