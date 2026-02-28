export const CONTRACT_ADDRESS = "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY";

export const CONTRACTS = {
  CROWDFUND: { address: CONTRACT_ADDRESS, name: "crowdfund" },
} as const;

export const EXPLORER_URL = "https://explorer.hiro.so";

export function getContractUrl(contractName: string) {
  return `${EXPLORER_URL}/txid/${CONTRACT_ADDRESS}.${contractName}?chain=mainnet`;
}

export function getTxUrl(txId: string) {
  return `${EXPLORER_URL}/txid/${txId}?chain=mainnet`;
}

export function formatSTX(microSTX: number): string {
  return (microSTX / 1_000_000).toFixed(6) + " STX";
}

export function parseSTX(stx: number): number {
  return stx * 1_000_000;
}

export const MIN_CONTRIBUTION = 100000; // 0.1 STX
export const MAX_CAMPAIGN_DURATION = 86400 * 30; // 30 days in seconds
