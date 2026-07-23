"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Award, Download, X, UserCheck, LayoutDashboard, Printer } from "lucide-react";
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

  const { quota, deductInstituteQuota } = useInstitute();
  const isInstitute = Boolean(result?.instituteName);

  const checkQuotaAndProceed = (action: () => void) => {
    if (isInstitute) {
      if (quota.remaining <= 0) {
        setShowTopUpModal(true);
        return;
      }
      deductInstituteQuota();
    }
    action();
  };

  const drawCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 850;

    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 850);
    bgGradient.addColorStop(0, "#fafafa");
    bgGradient.addColorStop(1, "#f4f4f5");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 850);

    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = 12;
    ctx.strokeRect(24, 24, 1152, 802);

    ctx.strokeStyle = "#e4e4e7";
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 1128, 778);

    ctx.fillStyle = "#18181b";
    ctx.fillRect(24, 24, 60, 60);
    ctx.fillRect(1116, 24, 60, 60);
    ctx.fillRect(24, 766, 60, 60);
    ctx.fillRect(1116, 766, 60, 60);

    const logoImg = new window.Image();
    logoImg.src = "/images/logo/blackbg.png";
    logoImg.onload = () => {
      ctx.drawImage(logoImg, 80, 80, 140, 40);
    };

    if (result.mode === "ranked") {
      ctx.fillStyle = "#ca8a04";
      ctx.fillRect(350, 65, 500, 32);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🏆 NATIONAL RANKING COMPETITION QUALIFIED", 600, 86);

      ctx.fillStyle = "#18181b";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("TYPEBANGLA VERIFIED CERTIFICATION", 600, 125);
    } else {
      ctx.fillStyle = "#18181b";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("TYPEBANGLA VERIFIED CERTIFICATION", 600, 110);
    }

    ctx.fillStyle = "#09090b";
    ctx.font = "extrabold 46px serif";
    ctx.fillText("Certificate of Typing Proficiency", 600, 175);

    ctx.fillStyle = "#71717a";
    ctx.font = "18px sans-serif";
    ctx.fillText("This is to officially certify that", 600, 230);

    ctx.fillStyle = "#09090b";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText(candidateName, 600, 300);

    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 320);
    ctx.lineTo(850, 320);
    ctx.stroke();

    ctx.fillStyle = "#3f3f46";
    ctx.font = "20px sans-serif";
    ctx.fillText(
      `has successfully completed the TypeBangla ${result.language.toUpperCase()} typing proficiency exam`,
      600,
      365
    );

    if (result.instituteName) {
      ctx.fillStyle = "#18181b";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(
        `Issued by: ${result.instituteName} in partnership with TypeBangla`,
        600,
        395
      );
    }

    const boxGradient = ctx.createLinearGradient(200, 420, 1000, 560);
    boxGradient.addColorStop(0, "#18181b");
    boxGradient.addColorStop(1, "#09090b");
    ctx.fillStyle = boxGradient;
    ctx.roundRect?.(200, 410, 800, 150, 16);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.font = "bold 52px sans-serif";
    ctx.fillText(`${result.wpm}`, 360, 485);
    ctx.font = "14px sans-serif";
    ctx.fillText("WORDS PER MINUTE (WPM)", 360, 520);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(520, 430);
    ctx.lineTo(520, 540);
    ctx.stroke();

    ctx.font = "bold 52px sans-serif";
    ctx.fillText(`${result.accuracy}%`, 600, 485);
    ctx.font = "14px sans-serif";
    ctx.fillText("TYPING ACCURACY", 600, 520);

    ctx.beginPath();
    ctx.moveTo(680, 430);
    ctx.lineTo(680, 540);
    ctx.stroke();

    ctx.font = "bold 32px sans-serif";
    ctx.fillText(result.layout.toUpperCase(), 840, 485);
    ctx.font = "14px sans-serif";
    ctx.fillText("KEYBOARD LAYOUT", 840, 520);

    const issueDate = result.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillStyle = "#71717a";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Issued Date: ${issueDate}`, 120, 680);
    ctx.fillText(`Certificate ID: ${certId}`, 120, 710);
    ctx.fillText(`Verification URL: typebangla.com/verify/${certId}`, 120, 740);

    // Signature & Verification Block
    const sigImg = new window.Image();
    sigImg.src = "/images/logo/signature.png";

    const drawSignatures = (hasImg: boolean) => {
      const isInst = Boolean(result.instituteName);

      if (isInst) {
        // Dual Signature Block: CEO (Left) + Institute Instructor (Right)
        
        // 1. CEO Signature
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(460, 710);
        ctx.lineTo(660, 710);
        ctx.stroke();

        if (hasImg) {
          ctx.drawImage(sigImg, 490, 650, 140, 50);
        } else {
          ctx.font = "italic bold 22px 'Brush Script MT', cursive, serif";
          ctx.fillStyle = "#18181b";
          ctx.textAlign = "center";
          ctx.fillText("Khorshed Alam", 560, 700);
        }

        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.fillText("Khorshed Alam", 560, 726);
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "#71717a";
        ctx.fillText("CEO, TypeBangla", 560, 740);

        // 2. Institute Director Signature
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(700, 710);
        ctx.lineTo(900, 710);
        ctx.stroke();

        ctx.font = "italic bold 20px 'Brush Script MT', cursive, serif";
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.fillText("Authorized Director", 800, 700);

        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#18181b";
        ctx.fillText(result.instituteName || "Institute Admin", 800, 726);
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "#71717a";
        ctx.fillText("Certified Trainer / Director", 800, 740);

      } else {
        // Single CEO Signature Block (Center)
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(560, 710);
        ctx.lineTo(800, 710);
        ctx.stroke();

        if (hasImg) {
          ctx.drawImage(sigImg, 610, 650, 140, 50);
        } else {
          ctx.font = "italic bold 24px 'Brush Script MT', cursive, serif";
          ctx.fillStyle = "#18181b";
          ctx.textAlign = "center";
          ctx.fillText("Khorshed Alam", 680, 700);
        }

        ctx.font = "bold 13px sans-serif";
        ctx.fillStyle = "#18181b";
        ctx.textAlign = "center";
        ctx.fillText("Khorshed Alam", 680, 728);

        ctx.font = "11px sans-serif";
        ctx.fillStyle = "#71717a";
        ctx.fillText("Chief Executive Officer, TypeBangla", 680, 744);
      }
    };

    sigImg.onload = () => drawSignatures(true);
    sigImg.onerror = () => drawSignatures(false);

    // Draw Dynamic Scannable QR Code
    const verifyUrl = `https://typebangla.com/verify/${certId}`;
    drawQrCodeOnCanvas(ctx, verifyUrl, 940, 630, 115);

    ctx.fillStyle = "#71717a";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCAN TO VERIFY", 995, 762);
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
      const updated = [certPayload, ...prev.filter((c: any) => c.certificateId !== certId)];
      localStorage.setItem("typemaster_earned_certificates", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save local cert:", e);
    }
    saveCertificateRecord(certPayload).catch(console.error);
  }, [isOpen, drawCertificate, certId, candidateName, result]);

  const handleDownload = () => {
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
    link.download = `TypeBangla_Certificate_${candidateName.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handlePrintPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>TypeBangla Official Certificate - ${candidateName}</title>
          <style>
            @page { size: A4 landscape; margin: 0; }
            body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: #ffffff; }
            img { width: 100vw; height: 100vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-popover border border-border rounded-xl max-w-4xl w-full p-6 shadow-xl space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 text-foreground">
            <Award size={22} />
            <h2 className="text-lg font-bold text-foreground">
              Official Typing Certificate
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-3 bg-secondary p-3 rounded-lg border border-border">
          <UserCheck size={18} className="text-foreground flex-shrink-0" />
          <label className="text-xs font-bold text-foreground flex-shrink-0">
            Candidate Name:
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter your full name..."
            className="flex-1 bg-background border border-input rounded-md px-3 py-1.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="border border-border rounded-xl overflow-hidden bg-secondary flex items-center justify-center p-2">
          <canvas ref={canvasRef} className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-xs" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-muted-foreground">
            ID: <span className="font-mono font-bold text-foreground">{certId}</span> • PNG &amp; Printable A4 PDF
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => checkQuotaAndProceed(handlePrintPdf)}
              className="font-bold text-xs gap-1.5 h-10 border-border"
            >
              <Printer size={15} />
              <span>Print A4 PDF</span>
            </Button>

            <Button
              onClick={() => checkQuotaAndProceed(handleDownload)}
              className="font-bold text-xs gap-2 h-10 shadow-xs"
            >
              <Download size={15} />
              <span>Download High-Res PNG</span>
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
