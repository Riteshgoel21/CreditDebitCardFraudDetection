import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import TransactionTable from '../components/TransactionTable';
import { mockTransactions } from '../data/mockData';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Search filter
    const searchMatch = 
      transaction.id.toString().includes(searchTerm) ||
      transaction.cardNumber.includes(searchTerm) ||
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    // Risk level filter
    let riskMatch = true;
    if (selectedRiskLevel === 'low') {
      riskMatch = transaction.riskScore < 40;
    } else if (selectedRiskLevel === 'medium') {
      riskMatch = transaction.riskScore >= 40 && transaction.riskScore < 70;
    } else if (selectedRiskLevel === 'high') {
      riskMatch = transaction.riskScore >= 70;
    }
    
    return searchMatch && statusMatch && riskMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>
      
      <div className="bg-gray-900 rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search by ID, card, or merchant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
              <option value="Flagged">Flagged</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 focus:outline-none focus:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk (&lt;40%)</option>
              <option value="medium">Medium Risk (40-70%)</option>
              <option value="high">High Risk (&gt;70%)</option>
            </select>
          </div>
        </div>
      </div>
      
      <TransactionTable transactions={filteredTransactions} />
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Showing {filteredTransactions.length} of {mockTransactions.length} transactions
        </div>
        <div className="flex space-x-1">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            1
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            2
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            3
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;