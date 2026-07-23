"use client";

import React, { useState } from "react";
import { CheckCircle2, CreditCard, ShieldCheck, X, Zap } from "lucide-react";
import { submitPaymentRequest, getPaymentRequests, PaymentRequestRecord } from "@/lib/firestoreService";
import { Clock, AlertTriangle } from "lucide-react";

interface CertificateTopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  payerType: "institute" | "individual";
  instituteId?: string;
  instituteName?: string;
  userId?: string;
  onSuccess?: () => void;
}

export function CertificateTopUpModal({
  isOpen,
  onClose,
  payerType,
  instituteId,
  instituteName,
  userId,
  onSuccess,
}: CertificateTopUpModalProps) {
  const isInstitute = payerType === "institute";
  const pricePerCert = isInstitute ? 20 : 50;

  const defaultCount = isInstitute ? 25 : 10;
  const [certCount, setCertCount] = useState<number>(defaultCount);
  const [paymentMethod, setPaymentMethod] = useState<"bKash" | "Nagad">("bKash");
  const [senderPhone, setSenderPhone] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [lastRequest, setLastRequest] = useState<PaymentRequestRecord | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const loadLastRequest = async () => {
      try {
        const all = await getPaymentRequests();
        const relevant = all.filter((r) =>
          isInstitute
            ? r.instituteName === instituteName || r.instituteId === instituteId
            : r.userId === userId
        );
        if (relevant.length > 0) {
          setLastRequest(relevant[0]);
        }
      } catch (e) {}
    };
    loadLastRequest();
  }, [isOpen, isInstitute, instituteId, instituteName, userId]);

  if (!isOpen) return null;

  const totalAmount = certCount * pricePerCert;
  const presetCounts = isInstitute ? [10, 25, 50, 100] : [5, 10, 20, 50];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!senderPhone.trim() || senderPhone.trim().length < 11) {
      setErrorMsg("Please enter a valid 11-digit sender phone number.");
      return;
    }

    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setErrorMsg("Please enter a valid bKash/Nagad Transaction ID (TxID).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitPaymentRequest({
        userId: userId || "anonymous",
        instituteId: instituteId || undefined,
        instituteName: instituteName || undefined,
        payerType,
        paymentMethod,
        senderPhone: senderPhone.trim(),
        transactionId: transactionId.trim().toUpperCase(),
        certificateCount: certCount,
        pricePerCertBDT: pricePerCert,
        totalAmountBDT: totalAmount,
      });

      if (res) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg("Failed to submit request. Please try again or contact support.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setErrorMsg("");
    setSenderPhone("");
    setTransactionId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in">
      <div className="relative w-full max-w-lg bg-card text-card-foreground border border-border rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-foreground">
              {isInstitute ? "Institute Certificate Credits" : "Certificate Top-Up"}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xl text-foreground">Payment Submitted Successfully!</h4>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Your transaction ID <span className="font-mono font-bold text-foreground">{transactionId}</span> has been logged for review.
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl border border-border text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate Quantity:</span>
                  <span className="font-bold text-foreground">{certCount} Certificates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Paid:</span>
                  <span className="font-bold text-emerald-500">{totalAmount} BDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-amber-500">Pending Admin Verification</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Credits will be added to your account as soon as our admin verifies the bKash/Nagad transaction.
              </p>

              <button
                onClick={resetAndClose}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Previous Request Status Banners */}
              {lastRequest?.status === "rejected" && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Previous Payment Declined (TxID: {lastRequest.transactionId})</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    Your previous request for {lastRequest.certificateCount} certs was declined. Please verify your bKash/Nagad TxID and submit a new request below.
                  </p>
                </div>
              )}

              {lastRequest?.status === "pending" && !isSubmitted && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Payment Verification Pending (TxID: {lastRequest.transactionId})</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    Your request for {lastRequest.certificateCount} certificates is awaiting admin review. You can also submit another transaction ID if needed.
                  </p>
                </div>
              )}

              {/* Pricing Tag */}
              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                    {isInstitute ? "Institute Partner Rate" : "Standard Student Rate"}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {pricePerCert} BDT / Certificate
                  </span>
                </div>
                {isInstitute && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> 60% Bulk Discount
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Select Certificate Quantity
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {presetCounts.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setCertCount(count)}
                      className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                        certCount === count
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/40 text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      {count} Certs
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-muted-foreground">Custom:</span>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={certCount}
                    onChange={(e) => setCertCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-2.5 py-1 rounded-md border border-border bg-background text-foreground text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-foreground ml-auto">
                    Total: <span className="text-emerald-500 text-sm font-extrabold">{totalAmount} BDT</span>
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bKash")}
                    className={`p-3 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === "bKash"
                        ? "bg-pink-500/10 border-pink-500 text-pink-600 dark:text-pink-400"
                        : "bg-secondary/30 border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>bKash (Send Money)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Nagad")}
                    className={`p-3 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === "Nagad"
                        ? "bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400"
                        : "bg-secondary/30 border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>Nagad (Send Money)</span>
                  </button>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="p-3.5 rounded-xl bg-secondary/50 border border-border text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Send {totalAmount} BDT to Official Account:</span>
                </div>
                <div className="font-mono text-sm font-bold text-foreground bg-background px-3 py-1.5 rounded-lg border border-border flex items-center justify-between">
                  <span>01700-000000</span>
                  <span className="text-xs font-sans text-muted-foreground font-medium">Personal / Send Money</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Your {paymentMethod} Phone Number (Sender)
                  </label>
                  <input
                    type="text"
                    placeholder="017XXXXXXXX"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Transaction ID (TxID)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BK9X82A7L1"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Request..." : `Submit ${totalAmount} BDT Payment Request`}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
