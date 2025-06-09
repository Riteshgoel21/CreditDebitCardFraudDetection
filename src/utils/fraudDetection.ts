export interface FraudAnalysisResult {
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  riskFactors: RiskFactor[];
  recommendation: 'APPROVE' | 'FLAG' | 'DECLINE' | 'MANUAL_REVIEW';
  modelVersion: string;
  processingTime: number;
}

export interface RiskFactor {
  factor: string;
  weight: number;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
}

export interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  amount: number;
  merchant: string;
  location?: {
    country: string;
    city: string;
    coordinates?: { lat: number; lng: number };
  };
  timestamp?: Date;
  deviceFingerprint?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface TransactionPattern {
  userId: string;
  avgTransactionAmount: number;
  frequentMerchants: string[];
  usualLocations: string[];
  typicalTransactionTimes: number[];
  cardUsageHistory: {
    totalTransactions: number;
    declinedTransactions: number;
    flaggedTransactions: number;
  };
}

class AdvancedFraudDetectionEngine {
  private modelVersion = "v2.1.0";
  private featureWeights = {
    amountAnomaly: 0.25,
    locationAnomaly: 0.20,
    timeAnomaly: 0.15,
    merchantRisk: 0.15,
    velocityCheck: 0.10,
    deviceFingerprint: 0.08,
    behavioralPattern: 0.07
  };

  // Luhn algorithm for card validation
  private validateCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  // Advanced amount anomaly detection using statistical analysis
  private analyzeAmountAnomaly(amount: number, userPattern?: TransactionPattern): { score: number; factors: RiskFactor[] } {
    const factors: RiskFactor[] = [];
    let score = 0;

    // High amount threshold
    if (amount > 10000) {
      score += 40;
      factors.push({
        factor: 'Extremely High Transaction Amount',
        weight: 0.4,
        impact: 'HIGH',
        description: `Transaction amount $${amount.toLocaleString()} exceeds normal limits`
      });
    } else if (amount > 5000) {
      score += 25;
      factors.push({
        factor: 'High Transaction Amount',
        weight: 0.25,
        impact: 'MEDIUM',
        description: `Transaction amount $${amount.toLocaleString()} is above average`
      });
    }

    // Round number detection (common in fraud)
    if (amount % 100 === 0 && amount > 1000) {
      score += 15;
      factors.push({
        factor: 'Round Number Transaction',
        weight: 0.15,
        impact: 'MEDIUM',
        description: 'Round number amounts are statistically more likely to be fraudulent'
      });
    }

    // User pattern analysis
    if (userPattern) {
      const deviation = Math.abs(amount - userPattern.avgTransactionAmount) / userPattern.avgTransactionAmount;
      if (deviation > 5) {
        score += 30;
        factors.push({
          factor: 'Significant Deviation from User Pattern',
          weight: 0.3,
          impact: 'HIGH',
          description: `Amount deviates ${(deviation * 100).toFixed(1)}% from user's average`
        });
      } else if (deviation > 2) {
        score += 15;
        factors.push({
          factor: 'Moderate Deviation from User Pattern',
          weight: 0.15,
          impact: 'MEDIUM',
          description: `Amount deviates ${(deviation * 100).toFixed(1)}% from user's average`
        });
      }
    }

    return { score: Math.min(score, 100), factors };
  }

  // Geolocation risk analysis
  private analyzeLocationRisk(location?: { country: string; city: string }): { score: number; factors: RiskFactor[] } {
    const factors: RiskFactor[] = [];
    let score = 0;

    if (!location) {
      score += 20;
      factors.push({
        factor: 'Unknown Location',
        weight: 0.2,
        impact: 'MEDIUM',
        description: 'Transaction location could not be determined'
      });
      return { score, factors };
    }

    // High-risk countries (simplified list)
    const highRiskCountries = ['Nigeria', 'Romania', 'Ghana', 'Indonesia'];
    const mediumRiskCountries = ['Brazil', 'India', 'Philippines', 'Turkey'];

    if (highRiskCountries.includes(location.country)) {
      score += 35;
      factors.push({
        factor: 'High-Risk Country',
        weight: 0.35,
        impact: 'HIGH',
        description: `Transaction from ${location.country} - elevated fraud risk region`
      });
    } else if (mediumRiskCountries.includes(location.country)) {
      score += 20;
      factors.push({
        factor: 'Medium-Risk Country',
        weight: 0.2,
        impact: 'MEDIUM',
        description: `Transaction from ${location.country} - moderate fraud risk region`
      });
    }

    return { score, factors };
  }

  // Time-based anomaly detection
  private analyzeTimeAnomaly(timestamp: Date = new Date()): { score: number; factors: RiskFactor[] } {
    const factors: RiskFactor[] = [];
    let score = 0;
    const hour = timestamp.getHours();
    const day = timestamp.getDay();

    // Unusual hours (2 AM - 6 AM)
    if (hour >= 2 && hour <= 6) {
      score += 25;
      factors.push({
        factor: 'Unusual Transaction Time',
        weight: 0.25,
        impact: 'MEDIUM',
        description: `Transaction at ${hour}:00 is outside normal business hours`
      });
    }

    // Weekend transactions for business cards
    if (day === 0 || day === 6) {
      score += 10;
      factors.push({
        factor: 'Weekend Transaction',
        weight: 0.1,
        impact: 'LOW',
        description: 'Weekend transactions have slightly higher fraud rates'
      });
    }

    return { score, factors };
  }

  // Merchant risk assessment
  private analyzeMerchantRisk(merchant: string): { score: number; factors: RiskFactor[] } {
    const factors: RiskFactor[] = [];
    let score = 0;

    const highRiskKeywords = ['crypto', 'bitcoin', 'gambling', 'casino', 'adult', 'escort'];
    const mediumRiskKeywords = ['online', 'digital', 'virtual', 'gaming', 'gift card'];

    const merchantLower = merchant.toLowerCase();

    for (const keyword of highRiskKeywords) {
      if (merchantLower.includes(keyword)) {
        score += 40;
        factors.push({
          factor: 'High-Risk Merchant Category',
          weight: 0.4,
          impact: 'HIGH',
          description: `Merchant "${merchant}" operates in high-risk category`
        });
        break;
      }
    }

    for (const keyword of mediumRiskKeywords) {
      if (merchantLower.includes(keyword)) {
        score += 20;
        factors.push({
          factor: 'Medium-Risk Merchant Category',
          weight: 0.2,
          impact: 'MEDIUM',
          description: `Merchant "${merchant}" operates in elevated-risk category`
        });
        break;
      }
    }

    // New/unknown merchant
    if (merchant.length < 3 || /^[A-Z0-9\s]+$/.test(merchant)) {
      score += 15;
      factors.push({
        factor: 'Unknown or Suspicious Merchant',
        weight: 0.15,
        impact: 'MEDIUM',
        description: 'Merchant name appears suspicious or incomplete'
      });
    }

    return { score, factors };
  }

  // Velocity checking (multiple transactions in short time)
  private analyzeVelocity(userPattern?: TransactionPattern): { score: number; factors: RiskFactor[] } {
    const factors: RiskFactor[] = [];
    let score = 0;

    if (userPattern) {
      const recentTransactionRate = userPattern.cardUsageHistory.totalTransactions / 30; // per day
      
      if (recentTransactionRate > 10) {
        score += 30;
        factors.push({
          factor: 'High Transaction Velocity',
          weight: 0.3,
          impact: 'HIGH',
          description: `Unusually high transaction frequency: ${recentTransactionRate.toFixed(1)} per day`
        });
      } else if (recentTransactionRate > 5) {
        score += 15;
        factors.push({
          factor: 'Elevated Transaction Velocity',
          weight: 0.15,
          impact: 'MEDIUM',
          description: `Above-average transaction frequency: ${recentTransactionRate.toFixed(1)} per day`
        });
      }

      // Declined transaction ratio
      const declineRate = userPattern.cardUsageHistory.declinedTransactions / userPattern.cardUsageHistory.totalTransactions;
      if (declineRate > 0.1) {
        score += 25;
        factors.push({
          factor: 'High Decline Rate',
          weight: 0.25,
          impact: 'HIGH',
          description: `${(declineRate * 100).toFixed(1)}% of recent transactions were declined`
        });
      }
    }

    return { score, factors };
  }

  // Device fingerprinting analysis
  private analyzeDeviceFingerprint(deviceFingerprint?: string, userAgent?: string): { score: number; factors: RiskFactor[] } {
    const factors: RiskFactor[] = [];
    let score = 0;

    if (!deviceFingerprint) {
      score += 15;
      factors.push({
        factor: 'Missing Device Fingerprint',
        weight: 0.15,
        impact: 'MEDIUM',
        description: 'Device fingerprint unavailable - potential privacy tools or fraud'
      });
    }

    if (userAgent) {
      // Check for suspicious user agents
      if (userAgent.includes('bot') || userAgent.includes('crawler') || userAgent.length < 20) {
        score += 25;
        factors.push({
          factor: 'Suspicious User Agent',
          weight: 0.25,
          impact: 'HIGH',
          description: 'User agent suggests automated or suspicious activity'
        });
      }

      // Check for outdated browsers (potential security risk)
      if (userAgent.includes('MSIE') || userAgent.includes('Chrome/5')) {
        score += 10;
        factors.push({
          factor: 'Outdated Browser',
          weight: 0.1,
          impact: 'LOW',
          description: 'Outdated browser may indicate compromised system'
        });
      }
    }

    return { score, factors };
  }

  // Main fraud analysis engine
  public async analyzeFraud(cardDetails: CardDetails, userPattern?: TransactionPattern): Promise<FraudAnalysisResult> {
    const startTime = performance.now();
    const allFactors: RiskFactor[] = [];
    let totalScore = 0;

    // Card validation
    if (!this.validateCardNumber(cardDetails.number)) {
      allFactors.push({
        factor: 'Invalid Card Number',
        weight: 0.5,
        impact: 'HIGH',
        description: 'Card number fails Luhn algorithm validation'
      });
      totalScore += 50;
    }

    // Amount analysis
    const amountAnalysis = this.analyzeAmountAnomaly(cardDetails.amount, userPattern);
    totalScore += amountAnalysis.score * this.featureWeights.amountAnomaly;
    allFactors.push(...amountAnalysis.factors);

    // Location analysis
    const locationAnalysis = this.analyzeLocationRisk(cardDetails.location);
    totalScore += locationAnalysis.score * this.featureWeights.locationAnomaly;
    allFactors.push(...locationAnalysis.factors);

    // Time analysis
    const timeAnalysis = this.analyzeTimeAnomaly(cardDetails.timestamp);
    totalScore += timeAnalysis.score * this.featureWeights.timeAnomaly;
    allFactors.push(...timeAnalysis.factors);

    // Merchant analysis
    const merchantAnalysis = this.analyzeMerchantRisk(cardDetails.merchant);
    totalScore += merchantAnalysis.score * this.featureWeights.merchantRisk;
    allFactors.push(...merchantAnalysis.factors);

    // Velocity analysis
    const velocityAnalysis = this.analyzeVelocity(userPattern);
    totalScore += velocityAnalysis.score * this.featureWeights.velocityCheck;
    allFactors.push(...velocityAnalysis.factors);

    // Device analysis
    const deviceAnalysis = this.analyzeDeviceFingerprint(cardDetails.deviceFingerprint, cardDetails.userAgent);
    totalScore += deviceAnalysis.score * this.featureWeights.deviceFingerprint;
    allFactors.push(...deviceAnalysis.factors);

    // Normalize score
    const finalScore = Math.min(Math.round(totalScore), 100);
    
    // Determine risk level and recommendation
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    let recommendation: 'APPROVE' | 'FLAG' | 'DECLINE' | 'MANUAL_REVIEW';
    let confidence = 0.85; // Base confidence

    if (finalScore >= 85) {
      riskLevel = 'CRITICAL';
      recommendation = 'DECLINE';
      confidence = 0.95;
    } else if (finalScore >= 70) {
      riskLevel = 'HIGH';
      recommendation = 'MANUAL_REVIEW';
      confidence = 0.90;
    } else if (finalScore >= 40) {
      riskLevel = 'MEDIUM';
      recommendation = 'FLAG';
      confidence = 0.80;
    } else {
      riskLevel = 'LOW';
      recommendation = 'APPROVE';
      confidence = 0.75;
    }

    const processingTime = performance.now() - startTime;

    return {
      riskScore: finalScore,
      riskLevel,
      confidence,
      riskFactors: allFactors,
      recommendation,
      modelVersion: this.modelVersion,
      processingTime: Math.round(processingTime * 100) / 100
    };
  }

  // Generate synthetic user pattern for demo
  public generateUserPattern(cardNumber: string): TransactionPattern {
    const hash = cardNumber.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    const random = Math.abs(hash) / 2147483647;

    return {
      userId: cardNumber.slice(-4),
      avgTransactionAmount: 150 + (random * 500),
      frequentMerchants: ['Amazon', 'Walmart', 'Target', 'Starbucks'],
      usualLocations: ['United States', 'Canada'],
      typicalTransactionTimes: [9, 12, 15, 18, 21],
      cardUsageHistory: {
        totalTransactions: Math.floor(50 + (random * 200)),
        declinedTransactions: Math.floor(random * 5),
        flaggedTransactions: Math.floor(random * 3)
      }
    };
  }
}

export const fraudDetectionEngine = new AdvancedFraudDetectionEngine();