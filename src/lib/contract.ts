import { callReadOnlyFunction, cvToValue, uintCV, standardPrincipalCV } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";

const CONTRACT_ADDRESS = "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY";
const CONTRACT_NAME = "crowdfund";

export async function getCampaign(id: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-campaign",
    functionArgs: [uintCV(id)],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_ADDRESS,
  });
  return cvToValue(result);
}

export async function getCampaignCount() {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-campaign-count",
    functionArgs: [],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_ADDRESS,
  });
  return cvToValue(result);
}

export async function getContribution(campaignId: number, contributor: string) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-contribution",
    functionArgs: [uintCV(campaignId), standardPrincipalCV(contributor)],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_ADDRESS,
  });
  return cvToValue(result);
}
