import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Transaction } from '../types/Transaction';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [sortField, setSortField] = useState<keyof Transaction>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    minRiskScore: '',
    maxRiskScore: '',
  });

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Transaction) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const { minAmount, maxAmount, minRiskScore, maxRiskScore } = filters;
    
    if (minAmount && transaction.amount < parseFloat(minAmount)) return false;
    if (maxAmount && transaction.amount > parseFloat(maxAmount)) return false;
    if (minRiskScore && transaction.riskScore < parseFloat(minRiskScore)) return false;
    if (maxRiskScore && transaction.riskScore > parseFloat(maxRiskScore)) return false;
    
    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getRiskBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-red-500/20 text-red-500 border-red-500';
    if (score >= 60) return 'bg-orange-500/20 text-orange-500 border-orange-500';
    if (score >= 40) return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
    return 'bg-green-500/20 text-green-500 border-green-500';
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-medium">Recent Transactions</h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm text-gray-400 hover:text-white"
        >
          <Filter size={16} className="mr-1" />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="p-4 bg-gray-800 border-b border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Min Amount</label>
            <input
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-gray-700 border-gray-600 text-sm p-2"
              placeholder="Min $"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Max Amount</label>
            <input
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-gray-700 border-gray-600 text-sm p-2"
              placeholder="Max $"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Min Risk Score</label>
            <input
              type="number"
              name="minRiskScore"
              value={filters.minRiskScore}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-gray-700 border-gray-600 text-sm p-2"
              placeholder="Min %"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Max Risk Score</label>
            <input
              type="number"
              name="maxRiskScore"
              value={filters.maxRiskScore}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-gray-700 border-gray-600 text-sm p-2"
              placeholder="Max %"
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID {getSortIcon('id')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center">
                  Date {getSortIcon('timestamp')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('cardNumber')}
              >
                <div className="flex items-center">
                  Card {getSortIcon('cardNumber')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  Amount {getSortIcon('amount')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('merchant')}
              >
                <div className="flex items-center">
                  Merchant {getSortIcon('merchant')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('riskScore')}
              >
                <div className="flex items-center">
                  Risk Score {getSortIcon('riskScore')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  #{transaction.id.toString().padStart(6, '0')}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {new Date(transaction.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  **** {transaction.cardNumber.slice(-4)}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm">
                  {transaction.merchant}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeColor(transaction.riskScore)}`}>
                    {transaction.riskScore}%
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'Approved' ? 'bg-green-500/20 text-green-500' :
                    transaction.status === 'Flagged' ? 'bg-yellow-500/20 text-yellow-500' :
                    transaction.status === 'Declined' ? 'bg-red-500/20 text-red-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;