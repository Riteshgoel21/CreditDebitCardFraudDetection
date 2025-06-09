import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface AnomalyCardProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  transactionId: number;
}

const AnomalyCard: React.FC<AnomalyCardProps> = ({ 
  title, 
  description, 
  severity, 
  timestamp,
  transactionId
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 border-red-500 text-red-500';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500 text-yellow-500';
      case 'low': return 'bg-blue-500/20 border-blue-500 text-blue-500';
      default: return 'bg-blue-500/20 border-blue-500 text-blue-500';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow-md border-l-4 hover:bg-gray-800 transition-colors cursor-pointer border-l-red-500">
      <div className="flex justify-between items-start">
        <div className="flex space-x-3">
          <div className={`p-2 rounded-full ${getSeverityColor()}`}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
            <div className="flex space-x-2 mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor()}`}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
              </span>
              <span className="text-xs text-gray-500">
                Transaction #{transactionId.toString().padStart(6, '0')}
              </span>
              <span className="text-xs text-gray-500">{timestamp}</span>
            </div>
          </div>
        </div>
        <button className="text-blue-500 hover:text-blue-400">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default AnomalyCard;