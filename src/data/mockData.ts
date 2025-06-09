import { Transaction } from '../types/Transaction';

// Generate a random risk score between min and max
const randomRiskScore = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Get a random element from an array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a random transaction status based on risk score
const getStatusFromRiskScore = (riskScore: number): 'Approved' | 'Declined' | 'Flagged' | 'Pending' => {
  if (riskScore >= 85) return 'Declined';
  if (riskScore >= 70) return 'Flagged';
  if (riskScore >= 60 && Math.random() > 0.7) return 'Flagged';
  return 'Approved';
};

// Mock data for merchants with risk categories
const merchants = [
  // Low risk
  'Amazon', 'Walmart', 'Target', 'Apple Store', 'Best Buy', 'Home Depot', 'Costco', 'Starbucks',
  // Medium risk
  'Netflix', 'Uber', 'DoorDash', 'Airbnb', 'Spotify', 'Digital Ocean', 'eBay', 'Shopify Store',
  // High risk
  'Online Electronics Store', 'Gaming Platform', 'Travel Booking', 'Digital Downloads',
  'Crypto Exchange', 'Online Casino', 'Gift Card Store', 'Virtual Goods'
];

// Mock data for locations with risk levels
const locations = [
  // Low risk
  { country: 'United States', city: 'New York', risk: 'low' },
  { country: 'United States', city: 'San Francisco', risk: 'low' },
  { country: 'United States', city: 'Los Angeles', risk: 'low' },
  { country: 'Canada', city: 'Toronto', risk: 'low' },
  { country: 'United Kingdom', city: 'London', risk: 'low' },
  { country: 'Germany', city: 'Berlin', risk: 'low' },
  { country: 'Australia', city: 'Sydney', risk: 'low' },
  { country: 'Japan', city: 'Tokyo', risk: 'low' },
  // Medium risk
  { country: 'Brazil', city: 'Sao Paulo', risk: 'medium' },
  { country: 'India', city: 'Mumbai', risk: 'medium' },
  { country: 'Mexico', city: 'Mexico City', risk: 'medium' },
  { country: 'Turkey', city: 'Istanbul', risk: 'medium' },
  // High risk
  { country: 'Nigeria', city: 'Lagos', risk: 'high' },
  { country: 'Romania', city: 'Bucharest', risk: 'high' },
  { country: 'Ghana', city: 'Accra', risk: 'high' },
  { country: 'Indonesia', city: 'Jakarta', risk: 'high' }
];

// Mock data for card types
const cardTypes: Array<'Visa' | 'Mastercard' | 'Amex' | 'Discover'> = ['Visa', 'Mastercard', 'Amex', 'Discover'];

// Mock data for devices
const devices = [
  'iPhone 14', 'iPhone 13', 'Samsung Galaxy S22', 'Samsung Galaxy S21', 'MacBook Pro', 
  'Windows PC', 'iPad Pro', 'Android Tablet', 'Chrome Browser', 'Firefox Browser',
  'Unknown Device', 'Linux Desktop', 'MacBook Air'
];

// Generate a random card number based on card type
const generateCardNumber = (cardType: 'Visa' | 'Mastercard' | 'Amex' | 'Discover'): string => {
  let prefix = '';
  let length = 16;
  
  switch (cardType) {
    case 'Visa':
      prefix = '4';
      break;
    case 'Mastercard':
      prefix = '5';
      break;
    case 'Amex':
      prefix = '3';
      length = 15;
      break;
    case 'Discover':
      prefix = '6';
      break;
  }
  
  let cardNumber = prefix;
  for (let i = prefix.length; i < length; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }
  
  return cardNumber;
};

// Generate a random IP address
const generateIPAddress = (): string => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

// Generate risk factors based on risk score and transaction details
const generateRiskFactors = (riskScore: number, amount: number, merchant: string, location: any): string[] => {
  const factors: string[] = [];
  
  if (riskScore < 30) return factors;
  
  // Amount-based factors
  if (amount > 5000) {
    factors.push('High transaction amount');
  }
  if (amount % 100 === 0 && amount > 1000) {
    factors.push('Round number transaction');
  }
  
  // Location-based factors
  if (location.risk === 'high') {
    factors.push('High-risk geographic location');
  } else if (location.risk === 'medium') {
    factors.push('Elevated-risk geographic location');
  }
  
  // Merchant-based factors
  const highRiskMerchants = ['Crypto Exchange', 'Online Casino', 'Gift Card Store', 'Virtual Goods'];
  const mediumRiskMerchants = ['Gaming Platform', 'Travel Booking', 'Digital Downloads'];
  
  if (highRiskMerchants.some(hrm => merchant.includes(hrm))) {
    factors.push('High-risk merchant category');
  } else if (mediumRiskMerchants.some(mrm => merchant.includes(mrm))) {
    factors.push('Medium-risk merchant category');
  }
  
  // Time-based factors
  const hour = new Date().getHours();
  if (hour >= 2 && hour <= 6) {
    factors.push('Unusual transaction time');
  }
  
  // Additional factors based on risk score
  if (riskScore >= 70) {
    factors.push('Multiple risk indicators detected');
  }
  if (riskScore >= 60) {
    factors.push('Behavioral pattern anomaly');
  }
  if (riskScore >= 50) {
    factors.push('Device fingerprint mismatch');
  }
  
  return factors.slice(0, Math.min(5, Math.floor(riskScore / 15)));
};

// Generate an array of mock transactions with more realistic risk distribution
export const generateMockTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const cardType = getRandomElement(cardTypes);
    const cardNumber = generateCardNumber(cardType);
    const location = getRandomElement(locations);
    const merchant = getRandomElement(merchants);
    
    // Generate more realistic risk scores based on various factors
    let baseRiskScore = Math.random() * 30; // Base low risk
    
    // Increase risk based on location
    if (location.risk === 'high') baseRiskScore += 30;
    else if (location.risk === 'medium') baseRiskScore += 15;
    
    // Increase risk based on merchant
    const highRiskMerchants = ['Crypto Exchange', 'Online Casino', 'Gift Card Store', 'Virtual Goods'];
    const mediumRiskMerchants = ['Gaming Platform', 'Travel Booking', 'Digital Downloads'];
    
    if (highRiskMerchants.some(hrm => merchant.includes(hrm))) {
      baseRiskScore += 25;
    } else if (mediumRiskMerchants.some(mrm => merchant.includes(mrm))) {
      baseRiskScore += 15;
    }
    
    // Generate amount with some high-value transactions
    let amount: number;
    if (Math.random() < 0.1) {
      // 10% chance of high-value transaction
      amount = parseFloat((Math.random() * 5000 + 1000).toFixed(2));
      baseRiskScore += 20;
    } else {
      amount = parseFloat((Math.random() * 500 + 5).toFixed(2));
    }
    
    // Round number transactions are more suspicious
    if (amount % 100 === 0 && amount > 500) {
      baseRiskScore += 15;
    }
    
    const riskScore = Math.min(Math.round(baseRiskScore), 100);
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString();
    
    transactions.push({
      id: 100000 + i,
      timestamp,
      cardNumber,
      cardType,
      amount,
      merchant,
      location: { country: location.country, city: location.city },
      device: getRandomElement(devices),
      ipAddress: generateIPAddress(),
      riskScore,
      status: getStatusFromRiskScore(riskScore),
      riskFactors: generateRiskFactors(riskScore, amount, merchant, location)
    });
  }
  
  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Export a fixed set of mock transactions with better distribution
export const mockTransactions: Transaction[] = generateMockTransactions(50);