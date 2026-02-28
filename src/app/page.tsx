"use client";
import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, uintCV, PostConditionMode } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });
const CONTRACT_ADDRESS = "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY";
const CONTRACT_NAME = "crowdfund";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setAddress(userSession.loadUserData().profile.stxAddress.mainnet);
    }
  }, []);

  const connect = () => {
    showConnect({
      appDetails: { name: "Stacks Crowdfund", icon: "/icon.png" },
      onFinish: () => setAddress(userSession.loadUserData().profile.stxAddress.mainnet),
      userSession,
    });
  };

  const createCampaign = async () => {
    if (!title || !goal) return;
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "create-campaign",
      functionArgs: [stringUtf8CV(title), uintCV(parseInt(goal) * 1000000), uintCV(1000)], // 1000 blocks
      network: STACKS_MAINNET,
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => alert(`Campaign created! TX: ${data.txId}`),
    });
  };

  const contribute = async () => {
    if (!campaignId || !amount) return;
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "contribute",
      functionArgs: [uintCV(parseInt(campaignId)), uintCV(parseInt(amount) * 1000000)],
      network: STACKS_MAINNET,
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => alert(`Contributed! TX: ${data.txId}`),
    });
  };

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 600, margin: "0 auto" }}>
      <h1>💰 Stacks Crowdfunding</h1>
      <p>Decentralized fundraising on Stacks Mainnet</p>

      {!address ? (
        <button onClick={connect} style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {address.slice(0, 8)}...{address.slice(-4)}</p>

          <div style={{ marginTop: 30, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
            <h3>Create Campaign (0.1 STX fee)</h3>
            <input type="text" placeholder="Campaign title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }} />
            <input type="number" placeholder="Goal (STX)" value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }} />
            <button onClick={createCampaign} style={{ padding: "10px 20px" }}>Create Campaign</button>
          </div>

          <div style={{ marginTop: 20, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
            <h3>Contribute to Campaign</h3>
            <input type="number" placeholder="Campaign ID" value={campaignId} onChange={(e) => setCampaignId(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }} />
            <input type="number" placeholder="Amount (STX)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }} />
            <button onClick={contribute} style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none" }}>Contribute</button>
          </div>
        </div>
      )}

      <footer style={{ marginTop: 40, color: "#666", fontSize: 14 }}>
        <p>Contract: {CONTRACT_ADDRESS}.{CONTRACT_NAME}</p>
        <p>Built with @stacks/connect and @stacks/transactions</p>
      </footer>
    </main>
  );
}
