import React, { useState } from 'react';
import { Save, RefreshCw, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    notifyOnHighRisk: true,
    notifyOnMediumRisk: true,
    notifyOnLowRisk: false,
    autoDeclineThreshold: 85,
    autoFlagThreshold: 65,
  });
  
  const [mlSettings, setMlSettings] = useState({
    modelUpdateFrequency: 'daily',
    sensitivityLevel: 'medium',
    featureWeighting: 'balanced',
    useBehavioralAnalysis: true,
    useGeolocationData: true,
    useDeviceFingerprinting: true,
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    });
  };
  
  const handleMLChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setMlSettings({
      ...mlSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    alert('Settings saved successfully!');
  };
  
  const handleRetrainModel = () => {
    // In a real app, this would trigger model retraining
    alert('Model retraining initiated. This may take several minutes.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button 
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Save size={16} className="mr-2" />
          Save All Settings
        </button>
      </div>
      
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Notification Settings</h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure how and when you want to be notified about potentially fraudulent transactions.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Notify on high-risk transactions</label>
              <p className="text-xs text-gray-400 mt-1">Get alerts for transactions with risk scores above 70%</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full">
              <input 
                type="checkbox" 
                name="notifyOnHighRisk"
                checked={generalSettings.notifyOnHighRisk}
                onChange={handleGeneralChange}
                className="sr-only"
                id="high-risk-toggle"
              />
              <label 
                htmlFor="high-risk-toggle"
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                  generalSettings.notifyOnHighRisk ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <span 
                  className={`absolute inset-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    generalSettings.notifyOnHighRisk ? 'translate-x-6' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Notify on medium-risk transactions</label>
              <p className="text-xs text-gray-400 mt-1">Get alerts for transactions with risk scores between 40-70%</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full">
              <input 
                type="checkbox" 
                name="notifyOnMediumRisk"
                checked={generalSettings.notifyOnMediumRisk}
                onChange={handleGeneralChange}
                className="sr-only"
                id="medium-risk-toggle"
              />
              <label 
                htmlFor="medium-risk-toggle"
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                  generalSettings.notifyOnMediumRisk ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <span 
                  className={`absolute inset-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    generalSettings.notifyOnMediumRisk ? 'translate-x-6' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Notify on low-risk transactions</label>
              <p className="text-xs text-gray-400 mt-1">Get alerts for transactions with risk scores below 40%</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full">
              <input 
                type="checkbox" 
                name="notifyOnLowRisk"
                checked={generalSettings.notifyOnLowRisk}
                onChange={handleGeneralChange}
                className="sr-only"
                id="low-risk-toggle"
              />
              <label 
                htmlFor="low-risk-toggle"
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                  generalSettings.notifyOnLowRisk ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <span 
                  className={`absolute inset-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    generalSettings.notifyOnLowRisk ? 'translate-x-6' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Fraud Detection Thresholds</h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure thresholds for automatic actions on suspicious transactions.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Auto-decline threshold ({generalSettings.autoDeclineThreshold}%)
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Transactions with risk scores above this threshold will be automatically declined.
            </p>
            <input
              type="range"
              name="autoDeclineThreshold"
              min="50"
              max="100"
              value={generalSettings.autoDeclineThreshold}
              onChange={handleGeneralChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Auto-flag threshold ({generalSettings.autoFlagThreshold}%)
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Transactions with risk scores above this threshold will be flagged for review.
            </p>
            <input
              type="range"
              name="autoFlagThreshold"
              min="30"
              max="90"
              value={generalSettings.autoFlagThreshold}
              onChange={handleGeneralChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>30%</span>
              <span>60%</span>
              <span>90%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Machine Learning Model Settings</h2>
            <p className="text-sm text-gray-400 mt-1">
              Configure how the AI model detects fraud patterns.
            </p>
          </div>
          <button 
            onClick={handleRetrainModel}
            className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 flex items-center"
          >
            <RefreshCw size={14} className="mr-2" />
            Retrain Model
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Model Update Frequency
              </label>
              <select
                name="modelUpdateFrequency"
                value={mlSettings.modelUpdateFrequency}
                onChange={handleMLChange}
                className="block w-full rounded-md bg-gray-800 border-gray-700 text-sm p-2.5"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Model Sensitivity Level
              </label>
              <select
                name="sensitivityLevel"
                value={mlSettings.sensitivityLevel}
                onChange={handleMLChange}
                className="block w-full rounded-md bg-gray-800 border-gray-700 text-sm p-2.5"
              >
                <option value="low">Low (Fewer false positives)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Catch more fraud)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Feature Weighting
              </label>
              <select
                name="featureWeighting"
                value={mlSettings.featureWeighting}
                onChange={handleMLChange}
                className="block w-full rounded-md bg-gray-800 border-gray-700 text-sm p-2.5"
              >
                <option value="balanced">Balanced</option>
                <option value="transaction-focused">Transaction-focused</option>
                <option value="behavior-focused">Behavior-focused</option>
                <option value="location-focused">Location-focused</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-medium mb-2">Data Sources</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Use behavioral analysis</label>
                <p className="text-xs text-gray-400 mt-1">Analyze patterns in user behavior over time</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full">
                <input 
                  type="checkbox" 
                  name="useBehavioralAnalysis"
                  checked={mlSettings.useBehavioralAnalysis}
                  onChange={handleMLChange}
                  className="sr-only"
                  id="behavioral-toggle"
                />
                <label 
                  htmlFor="behavioral-toggle"
                  className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                    mlSettings.useBehavioralAnalysis ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span 
                    className={`absolute inset-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      mlSettings.useBehavioralAnalysis ? 'translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Use geolocation data</label>
                <p className="text-xs text-gray-400 mt-1">Analyze transaction locations and patterns</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full">
                <input 
                  type="checkbox" 
                  name="useGeolocationData"
                  checked={mlSettings.useGeolocationData}
                  onChange={handleMLChange}
                  className="sr-only"
                  id="geolocation-toggle"
                />
                <label 
                  htmlFor="geolocation-toggle"
                  className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                    mlSettings.useGeolocationData ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span 
                    className={`absolute inset-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      mlSettings.useGeolocationData ? 'translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Use device fingerprinting</label>
                <p className="text-xs text-gray-400 mt-1">Identify suspicious devices and browsers</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full">
                <input 
                  type="checkbox" 
                  name="useDeviceFingerprinting"
                  checked={mlSettings.useDeviceFingerprinting}
                  onChange={handleMLChange}
                  className="sr-only"
                  id="device-toggle"
                />
                <label 
                  htmlFor="device-toggle"
                  className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                    mlSettings.useDeviceFingerprinting ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span 
                    className={`absolute inset-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      mlSettings.useDeviceFingerprinting ? 'translate-x-6' : ''
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;