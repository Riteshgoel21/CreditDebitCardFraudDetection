import React from 'react';
import { ShieldAlert, CreditCard, AlertTriangle, Percent } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import FraudRiskChart from '../components/FraudRiskChart';
import TransactionTable from '../components/TransactionTable';
import AnomalyCard from '../components/AnomalyCard';
import { mockTransactions } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Latest 7 days risk score data for chart
  const riskData = [32, 28, 45, 62, 58, 43, 35];
  const riskLabels = ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Today'];
  
  // Recent transactions (last 10)
  const recentTransactions = mockTransactions.slice(0, 10);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fraud Detection Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Flagged Transactions"
          value="18"
          icon={<ShieldAlert className="h-6 w-6 text-red-500" />}
          change={{ value: 12, isPositive: false }}
        />
        <DashboardCard
          title="Total Transactions"
          value="1,243"
          icon={<CreditCard className="h-6 w-6 text-blue-500" />}
          change={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Anomalies Detected"
          value="26"
          icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
          change={{ value: 5, isPositive: false }}
        />
        <DashboardCard
          title="Average Risk Score"
          value="32%"
          icon={<Percent className="h-6 w-6 text-green-500" />}
          change={{ value: 3, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FraudRiskChart 
            data={riskData} 
            labels={riskLabels} 
            title="Fraud Risk Trend (Last 7 Days)" 
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Recent Anomalies</h2>
          <AnomalyCard
            title="Unusual Transaction Location"
            description="Transaction from a new country (Germany) for this card."
            severity="high"
            timestamp="15 minutes ago"
            transactionId={458932}
          />
          <AnomalyCard
            title="Multiple Failed Attempts"
            description="3 failed transactions before success."
            severity="medium"
            timestamp="42 minutes ago"
            transactionId={458901}
          />
          <AnomalyCard
            title="Rapid Succession Purchases"
            description="5 transactions within 3 minutes."
            severity="high"
            timestamp="1 hour ago"
            transactionId={458890}
          />
        </div>
      </div>
      
      <TransactionTable transactions={recentTransactions} />
    </div>
  );
};

export default Dashboard;