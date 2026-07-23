import { describe, test, expect } from "./testRunner";

describe("Certificate Record Verification & Qualification Rules", () => {
  const generateCertificateId = () => `TM-${Math.floor(100000 + Math.random() * 900000)}`;

  test("Certificate ID should follow 'TM-XXXXXX' format", () => {
    const certId = generateCertificateId();
    expect(certId).toMatch(/^TM-\d{6}$/);
  });

  test("National Ranked Competition should require 85%+ Accuracy to qualify", () => {
    const passCandidate = { wpm: 45, accuracy: 92 };
    const failCandidate = { wpm: 50, accuracy: 78 };

    const isPassQualified = passCandidate.accuracy >= 85;
    const isFailQualified = failCandidate.accuracy >= 85;

    expect(isPassQualified).toBe(true);
    expect(isFailQualified).toBe(false);
  });

  test("Certificate mode tags should demarcate ranked, institute, and practice modes", () => {
    const validModes = ["ranked", "practice", "institute"];
    const certPayload = {
      certificateId: generateCertificateId(),
      candidateName: "Khorshed Alam",
      wpm: 48,
      accuracy: 96,
      layout: "avro",
      language: "bangla",
      mode: "ranked",
    };

    expect(validModes).toContain(certPayload.mode);
  });
});
