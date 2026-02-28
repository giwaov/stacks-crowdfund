export interface Campaign {
  creator: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  deadline: number;
  status: 'active' | 'successful' | 'failed' | 'refunded';
  contributorCount: number;
}

export interface Contribution {
  contributor: string;
  campaignId: number;
  amount: number;
  timestamp: number;
}

export interface CrowdfundStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  successfulCampaigns: number;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
  balance: number;
}

export interface TransactionResult {
  txId: string;
  success: boolean;
  error?: string;
}
