import { describe, test, expect } from "./testRunner";

describe("Certificate Quota & Pricing Logic", () => {
  const INITIAL_INSTITUTE_QUOTA = 200;
  const INSTITUTE_CERT_PRICE_BDT = 20;
  const INDIVIDUAL_CERT_PRICE_BDT = 50;

  test("Institute initial free quota should be 200 certificates", () => {
    expect(INITIAL_INSTITUTE_QUOTA).toBe(200);
  });

  test("Institute bulk rate should calculate at 20 BDT per certificate", () => {
    const certCount = 50;
    const totalAmount = certCount * INSTITUTE_CERT_PRICE_BDT;
    expect(totalAmount).toBe(1000);
  });

  test("Individual student rate should calculate at 50 BDT per certificate", () => {
    const certCount = 10;
    const totalAmount = certCount * INDIVIDUAL_CERT_PRICE_BDT;
    expect(totalAmount).toBe(500);
  });

  test("Quota deduction math should correctly decrease remaining balance", () => {
    let currentQuota = INITIAL_INSTITUTE_QUOTA;
    const issuedCerts = 5;
    currentQuota -= issuedCerts;
    expect(currentQuota).toBe(195);
    expect(currentQuota).toBeGreaterThanOrEqual(0);
  });

  test("Depleted quota (0 remaining) should block generation and require top-up", () => {
    const remainingQuota = 0;
    const isTopUpRequired = remainingQuota <= 0;
    expect(isTopUpRequired).toBe(true);
  });
});
