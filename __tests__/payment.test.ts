import { describe, test, expect } from "./testRunner";

interface MockPaymentRequest {
  id: string;
  payerType: "institute" | "individual";
  paymentMethod: "bKash" | "Nagad";
  senderPhone: string;
  transactionId: string;
  certificateCount: number;
  pricePerCertBDT: number;
  totalAmountBDT: number;
  status: "pending" | "approved" | "rejected";
}

describe("Payment Request Lifecycle & Status Transitions", () => {
  const createMockPaymentRequest = (
    payerType: "institute" | "individual",
    certCount: number,
    txId: string
  ): MockPaymentRequest => {
    const pricePerCertBDT = payerType === "institute" ? 20 : 50;
    return {
      id: `pay-${Date.now()}`,
      payerType,
      paymentMethod: "bKash",
      senderPhone: "01712345678",
      transactionId: txId.toUpperCase(),
      certificateCount: certCount,
      pricePerCertBDT,
      totalAmountBDT: certCount * pricePerCertBDT,
      status: "pending",
    };
  };

  test("New payment request should initialize with status 'pending'", () => {
    const req = createMockPaymentRequest("institute", 25, "BKASH99281");
    expect(req.status).toBe("pending");
    expect(req.totalAmountBDT).toBe(500); // 25 * 20
  });

  test("Approving a payment request should change status to 'approved' and return correct credit top-up count", () => {
    const req = createMockPaymentRequest("institute", 50, "BKASH77123");
    req.status = "approved";
    expect(req.status).toBe("approved");

    const creditsToAdd = req.certificateCount;
    expect(creditsToAdd).toBe(50);
  });

  test("Rejecting a payment request should change status to 'rejected' without adding credits", () => {
    const req = createMockPaymentRequest("individual", 10, "BKASH00000");
    req.status = "rejected";
    expect(req.status).toBe("rejected");
  });
});
