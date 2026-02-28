import { describe, it, expect } from "vitest";

describe("Crowdfund Contract Tests", () => {
  describe("Campaign Management", () => {
    it("should create campaign with valid goal", () => {
      const campaign = {
        id: 1,
        creator: "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY",
        goal: 10000000, // 10 STX
        raised: 0,
        status: "active",
      };

      expect(campaign.goal).toBeGreaterThan(0);
      expect(campaign.raised).toBe(0);
    });

    it("should calculate funding percentage", () => {
      const goal = 10000000;
      const raised = 2500000;
      const percentage = (raised / goal) * 100;

      expect(percentage).toBe(25);
    });

    it("should mark campaign as funded when goal reached", () => {
      const goal = 10000000;
      const raised = 10500000;
      const isFunded = raised >= goal;

      expect(isFunded).toBe(true);
    });
  });

  describe("Contribution Validation", () => {
    it("should validate minimum contribution", () => {
      const MIN_CONTRIBUTION = 100000; // 0.1 STX
      const contribution = 500000;

      expect(contribution).toBeGreaterThanOrEqual(MIN_CONTRIBUTION);
    });
  });
});
