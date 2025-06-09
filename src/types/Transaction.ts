export interface Transaction {
  id: number;
  timestamp: string;
  cardNumber: string;
  cardType: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  amount: number;
  merchant: string;
  location: {
    country: string;
    city: string;
  };
  device: string;
  ipAddress: string;
  riskScore: number;
  status: 'Approved' | 'Declined' | 'Flagged' | 'Pending';
  riskFactors?: string[];
}