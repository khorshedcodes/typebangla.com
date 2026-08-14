"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Award, Download, X, UserCheck, Printer, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { saveCertificateRecord } from "../lib/firestoreService";
import { drawQrCodeOnCanvas } from "../utils/qrCode";
import { useInstitute } from "../context/InstituteContext";
import { CertificateTopUpModal } from "./CertificateTopUpModal";

interface ExamCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    wpm: number;
    accuracy: number;
    layout: string;
    duration: number;
    errors: number;
    language: string;
    date?: string;
    candidateName?: string;
    instituteName?: string;
    mode?: "ranked" | "practice" | "institute";
  };
}

export function ExamCertificateModal({ isOpen, onClose, result }: ExamCertificateModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [candidateName, setCandidateName] = useState(result?.candidateName || "TypeMaster Speed Candidate");
  const [certId] = useState(() => `TM-${Math.floor(100000 + Math.random() * 900000)}`);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { quota, deductInstituteQuota } = useInstitute();
  const isInstitute = Boolean(result?.instituteName);
  const isRanked = result?.mode === "ranked";
  const isIndividualCourseCert = !isInstitute && !isRanked;

  const checkQuotaAndProceed = (action: () => void) => {
    // 1. National Ranked Competition Certificates are 100% FREE!
    if (isRanked) {
      action();
      return;
    }

    // 2. Institute V2 Partner Certificates (Quota Based)
    if (isInstitute) {
      if (quota.remaining <= 0) {
        setShowTopUpModal(true);
        return;
      }
      deductInstituteQuota();
      action();
      return;
    }

    // 3. Individual Course Certificates Require 50 BDT Payment
    if (isIndividualCourseCert) {
      const paidKey = `typemaster_cert_paid_${result?.language || "all"}_${result?.layout || "all"}`;
      const isPaid = typeof window !== "undefined" && localStorage.getItem(paidKey) === "true";
      if (!isPaid) {
        setShowTopUpModal(true);
        return;
      }
    }

    action();
  };

  const drawCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ultra High-Resolution 2400 x 1700 Canvas for 300 DPI Sharpness
    canvas.width = 2400;
    canvas.height = 1700;

    // 1. Luxury Off-White Parchment Background
    const bgGradient = ctx.createRadialGradient(1200, 850, 200, 1200, 850, 1400);
    bgGradient.addColorStop(0, "#fdfcf9");
    bgGradient.addColorStop(1, "#f5f0e6");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 2400, 1700);

    // 2. Luxury Double Frame: Outer Gold Filament + Inner Deep Slate Border
    ctx.strokeStyle = "#ca8a04"; // Gold Metallic
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 2320, 1620);

    ctx.strokeStyle = "#18181b"; // Deep Slate
    ctx.lineWidth = 6;
    ctx.strokeRect(64, 64, 2272, 1572);

    ctx.strokeStyle = "#ca8a04"; // Inner Gold Hairline
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 80, 2240, 1540);

    // Corner Ornaments (Gold Diamonds & Squares)
    const drawCornerDiamond = (x: number, y: number) => {
      ctx.save();
      ctx.fillStyle = "#ca8a04";
      ctx.beginPath();
      ctx.moveTo(x, y - 24);
      ctx.lineTo(x + 24, y);
      ctx.lineTo(x, y + 24);
      ctx.lineTo(x - 24, y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#18181b";
      ctx.fillRect(x - 8, y - 8, 16, 16);
      ctx.restore();
    };

    drawCornerDiamond(92, 92);
    drawCornerDiamond(2308, 92);
    drawCornerDiamond(92, 1608);
    drawCornerDiamond(2308, 1608);

    // 3. Logo Image (Full High-Contrast Emblem Badge)
    ctx.save();
    ctx.fillStyle = "#18181b";
    ctx.roundRect?.(120, 105, 310, 70, 14);
    ctx.fill();

    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 2;
    ctx.roundRect?.(120, 105, 310, 70, 14);
    ctx.stroke();

    const logoImg = new window.Image();
    logoImg.src = "/images/logo/blackbg.png";
    logoImg.onload = () => {
      ctx.drawImage(logoImg, 132, 115, 50, 50);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("typebangla.com", 192, 148);
    };
    logoImg.onerror = () => {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("typebangla.com", 140, 148);
    };
    ctx.restore();

    // 4. Header Badge / Title
    const currentMonthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();

    if (result.mode === "ranked") {
      ctx.fillStyle = "#ca8a04";
      ctx.roundRect?.(600, 110, 1200, 56, 12);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`🏆 3-MINUTE NATIONAL SPEED COMPETITION — ${currentMonthYear} CYCLE`, 1200, 146);

      ctx.fillStyle = "#18181b";
      ctx.font = "bold 36px sans-serif";
      ctx.fillText("TYPEBANGLA VERIFIED COMPETITION CREDENTIAL", 1200, 225);
    } else {
      ctx.fillStyle = "#ca8a04";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✦ TYPEBANGLA OFFICIAL VERIFIED CERTIFICATION ✦", 1200, 150);
    }

    // Main Certificate Heading
    ctx.fillStyle = "#09090b";
    ctx.font = "extrabold 82px serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Typing Proficiency", 1200, 320);

    ctx.fillStyle = "#71717a";
    ctx.font = "32px sans-serif";
    ctx.fillText("This is to officially certify that", 1200, 420);

    // Candidate Name (Regal Display)
    ctx.fillStyle = "#09090b";
    ctx.font = "bold 76px sans-serif";
    ctx.fillText(candidateName, 1200, 540);

    // Gold Accent Underline Bar
    const textWidth = ctx.measureText(candidateName).width;
    const barWidth = Math.max(700, textWidth + 80);
    const barX = 1200 - barWidth / 2;

    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(barX, 580);
    ctx.lineTo(barX + barWidth, 580);
    ctx.stroke();

    // Qualification Statement
    ctx.fillStyle = "#3f3f46";
    ctx.font = "36px sans-serif";
    ctx.fillText(
      `has successfully completed the official [ ${result.language.toUpperCase()} ] typing proficiency examination`,
      1200,
      670
    );

    if (result.instituteName) {
      ctx.fillStyle = "#ca8a04";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText(
        `Issued by: ${result.instituteName} in partnership with TypeBangla`,
        1200,
        730
      );
    }

    // 5. Score Container Card (Dark Slate with Gold Border)
    const cardX = 350;
    const cardY = 780;
    const cardW = 1700;
    const cardH = 300;

    const boxGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    boxGradient.addColorStop(0, "#18181b");
    boxGradient.addColorStop(1, "#09090b");
    ctx.fillStyle = boxGradient;
    ctx.roundRect?.(cardX, cardY, cardW, cardH, 28);
    ctx.fill();

    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 4;
    ctx.roundRect?.(cardX, cardY, cardW, cardH, 28);
    ctx.stroke();

    // Column 1: WPM
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 96px sans-serif";
    ctx.fillText(`${result.wpm}`, cardX + 300, cardY + 140);
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("WORDS PER MINUTE (WPM)", cardX + 300, cardY + 210);

    // Separator 1
    ctx.strokeStyle = "rgba(202, 138, 4, 0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cardX + 570, cardY + 40);
    ctx.lineTo(cardX + 570, cardY + 260);
    ctx.stroke();

    // Column 2: Accuracy
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 96px sans-serif";
    ctx.fillText(`${result.accuracy}%`, cardX + 850, cardY + 140);
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("TYPING ACCURACY", cardX + 850, cardY + 210);

    // Separator 2
    ctx.beginPath();
    ctx.moveTo(cardX + 1130, cardY + 40);
    ctx.lineTo(cardX + 1130, cardY + 260);
    ctx.stroke();

    // Column 3: Layout Name
    ctx.fillStyle = "#ca8a04";
    ctx.font = "bold 64px sans-serif";
    ctx.fillText(result.layout.toUpperCase(), cardX + 1410, cardY + 140);
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("KEYBOARD LAYOUT", cardX + 1410, cardY + 210);

    // 6. Metadata Footer (Issued Date, Certificate ID, Verification URL)
    const issueDate = result.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillStyle = "#52525b";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Issued Date: ${issueDate}`, 240, 1340);
    ctx.fillText(`Certificate ID: ${certId}`, 240, 1390);
    ctx.fillText(`Verification URL: typebangla.com/verify/${certId}`, 240, 1440);

    // 7. Signature & Verification Block
    const sigImg = new window.Image();
    sigImg.src = "/images/logo/signature.png";

    const drawSignatures = (hasImg: boolean) => {
      const isInst = Boolean(result.instituteName);

      if (isInst) {
        // Dual Signature Block: CEO (Left) + Institute Instructor (Right)
        
        // 1. CEO Signature
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(920, 1420);
        ctx.lineTo(1320, 1420);
        ctx.stroke();

        if (hasImg) {
          ctx.drawImage(sigImg, 990, 1300, 260, 100);
        } else {
          ctx.font = "italic bold 44px 'Brush Script MT', cursive, serif";
          ctx.fillStyle = "#18181b";
          ctx.textAlign = "center";
          ctx.fillText("Khorshed Alam", 1120, 1400);
        }

        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.fillText("Khorshed Alam", 1120, 1455);
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#71717a";
        ctx.fillText("CEO, TypeBangla", 1120, 1485);

        // 2. Institute Director Signature
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(1400, 1420);
        ctx.lineTo(1800, 1420);
        ctx.stroke();

        ctx.font = "italic bold 40px 'Brush Script MT', cursive, serif";
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.fillText("Authorized Director", 1600, 1400);

        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#18181b";
        ctx.fillText(result.instituteName || "Institute Admin", 1600, 1455);
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#71717a";
        ctx.fillText("Certified Trainer / Director", 1600, 1485);

      } else {
        // Single CEO Signature Block (Center)
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(1120, 1420);
        ctx.lineTo(1620, 1420);
        ctx.stroke();

        if (hasImg) {
          ctx.drawImage(sigImg, 1230, 1300, 280, 105);
        } else {
          ctx.font = "italic bold 48px 'Brush Script MT', cursive, serif";
          ctx.fillStyle = "#18181b";
          ctx.textAlign = "center";
          ctx.fillText("Khorshed Alam", 1370, 1400);
        }

        ctx.font = "bold 26px sans-serif";
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.fillText("Khorshed Alam", 1370, 1458);

        ctx.font = "22px sans-serif";
        ctx.fillStyle = "#71717a";
        ctx.fillText("Chief Executive Officer, TypeBangla", 1370, 1490);
      }
    };

    sigImg.onload = () => drawSignatures(true);
    sigImg.onerror = () => drawSignatures(false);

    // 8. Draw Dynamic Scannable QR Code
    const verifyUrl = `https://typebangla.com/verify/${certId}`;
    drawQrCodeOnCanvas(ctx, verifyUrl, 1880, 1260, 240);

    ctx.fillStyle = "#71717a";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCAN TO VERIFY", 2000, 1530);
  }, [candidateName, result, certId]);

  useEffect(() => {
    if (!isOpen) return;
    drawCertificate();
    const certPayload = {
      certificateId: certId,
      candidateName,
      wpm: result.wpm,
      accuracy: result.accuracy,
      layout: result.layout,
      language: result.language,
      issuedAt: new Date().toLocaleDateString("bn-BD"),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("typemaster_earned_certificates") || "[]");
      const updated = [certPayload, ...prev.filter((c: { certificateId?: string }) => c.certificateId !== certId)];
      localStorage.setItem("typemaster_earned_certificates", JSON.stringify(updated));
    } catch (_e) {
      console.error("Failed to save local cert:", _e);
    }
    saveCertificateRecord({
      certificateId: certId,
      candidateName,
      wpm: result.wpm,
      accuracy: result.accuracy,
      layout: result.layout,
      language: result.language,
      instituteName: result.instituteName,
      mode: result.mode,
    }).catch(console.error);
  }, [isOpen, drawCertificate, certId, candidateName, result]);

  // High-Res PNG Download Handler
  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    saveCertificateRecord({
      certificateId: certId,
      candidateName,
      wpm: result.wpm,
      accuracy: result.accuracy,
      layout: result.layout,
      language: result.language,
      instituteName: result.instituteName,
      mode: result.mode,
    }).catch(console.error);

    const link = document.createElement("a");
    link.download = `TypeBangla_Official_Certificate_${candidateName.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Direct PDF Download Handler (Using jsPDF)
  const handleDownloadPdf = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGeneratingPdf(true);

    try {
      saveCertificateRecord({
        certificateId: certId,
        candidateName,
        wpm: result.wpm,
        accuracy: result.accuracy,
        layout: result.layout,
        language: result.language,
        instituteName: result.instituteName,
        mode: result.mode,
      }).catch(console.error);

      const dataUrl = canvas.toDataURL("image/png");
      const { jsPDF } = await import("jspdf");

      // Create A4 Landscape PDF Document (297mm x 210mm)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, 297, 210);
      pdf.save(`TypeBangla_Official_Certificate_${candidateName.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      // Fallback to PNG download if PDF generation fails
      handleDownloadPng();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Printable A4 Document Handler
  const handlePrintDocument = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      // If popup blocker blocked window.open, trigger direct PDF download
      handleDownloadPdf();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>TypeBangla Official Certificate - ${candidateName}</title>
          <style>
            @page { size: A4 landscape; margin: 0; }
            html, body { width: 100%; height: 100%; margin: 0; padding: 0; background: #ffffff; overflow: hidden; }
            .container { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
            img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${dataUrl}" onload="setTimeout(function(){ window.print(); window.close(); }, 300);" />
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-popover border border-border rounded-3xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] space-y-4 my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5 text-foreground">
            <Award size={22} className="text-amber-500" />
            <div>
              <h2 className="text-lg font-black tracking-tight text-foreground">
                Official Typing Proficiency Certificate
              </h2>
              <p className="text-xs text-muted-foreground">TypeBangla National Verified Credential</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X size={18} />
          </Button>
        </div>

        {/* Candidate Name Input */}
        <div className="flex items-center gap-3 bg-secondary/60 p-3 rounded-xl border border-border">
          <UserCheck size={18} className="text-primary flex-shrink-0" />
          <label className="text-xs font-bold text-foreground flex-shrink-0">
            Candidate Name on Certificate:
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter your full name..."
            className="flex-1 bg-background border border-input rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Canvas Display Container */}
        <div className="border border-border rounded-xl overflow-hidden bg-muted/40 flex items-center justify-center p-3 shadow-inner">
          <canvas ref={canvasRef} className="w-full h-auto max-h-[520px] object-contain rounded-lg shadow-md" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-muted-foreground">
            Certificate ID: <span className="font-mono font-bold text-foreground">{certId}</span> • 300 DPI Verified Document
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => checkQuotaAndProceed(handlePrintDocument)}
              className="font-bold text-xs gap-1.5 h-10 border-border"
            >
              <Printer size={15} />
              <span>Print A4 Document</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => checkQuotaAndProceed(handleDownloadPng)}
              className="font-bold text-xs gap-1.5 h-10 border-border"
            >
              <Download size={15} />
              <span>Download PNG</span>
            </Button>

            <Button
              onClick={() => checkQuotaAndProceed(handleDownloadPdf)}
              disabled={isGeneratingPdf}
              className="font-bold text-xs gap-2 h-10 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
            >
              <FileText size={15} />
              <span>{isGeneratingPdf ? "Generating PDF..." : "Download Official PDF"}</span>
            </Button>
          </div>
        </div>
      </div>

      <CertificateTopUpModal
        isOpen={showTopUpModal}
        onClose={() => setShowTopUpModal(false)}
        payerType={isInstitute ? "institute" : "individual"}
        instituteName={result?.instituteName}
      />
    </div>
  );
}
