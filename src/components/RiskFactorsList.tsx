import React from 'react';
import { AlertTriangle, Info, Shield } from 'lucide-react';
import { RiskFactor } from '../utils/fraudDetection';

interface RiskFactorsListProps {
  riskFactors: RiskFactor[];
}

const RiskFactorsList: React.FC<RiskFactorsListProps> = ({ riskFactors }) => {
  const getImpactColor = (impact: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (impact) {
      case 'HIGH': return 'text-red-500 bg-red-500/20 border-red-500';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500';
      case 'LOW': return 'text-blue-500 bg-blue-500/20 border-blue-500';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500';
    }
  };

  const getImpactIcon = (impact: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (impact) {
      case 'HIGH': return <AlertTriangle size={16} />;
      case 'MEDIUM': return <Info size={16} />;
      case 'LOW': return <Shield size={16} />;
      default: return <Info size={16} />;
    }
  };

  if (riskFactors.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-green-500 mr-2" />
          <h3 className="text-lg font-semibold">Risk Analysis</h3>
        </div>
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-green-500 font-medium">No Risk Factors Detected</p>
          <p className="text-gray-400 text-sm mt-2">This transaction appears to be legitimate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
        <h3 className="text-lg font-semibold">Risk Factors Detected</h3>
        <span className="ml-2 bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full text-xs">
          {riskFactors.length} factor{riskFactors.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {riskFactors.map((factor, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border-l-4 border-l-gray-600 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <div className={`p-1 rounded-full mr-3 ${getImpactColor(factor.impact)}`}>
                  {getImpactIcon(factor.impact)}
                </div>
                <div>
                  <h4 className="font-medium text-white">{factor.factor}</h4>
                  <p className="text-sm text-gray-400 mt-1">{factor.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getImpactColor(factor.impact)}`}>
                  {factor.impact} IMPACT
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Weight: {(factor.weight * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Risk Contribution</span>
                <span>{(factor.weight * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 h-1.5 rounded-full">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    factor.impact === 'HIGH' ? 'bg-red-500' :
                    factor.impact === 'MEDIUM' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${factor.weight * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskFactorsList;