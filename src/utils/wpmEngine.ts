/**
 * Pure Typing Engine Metrics Calculation Module
 * Adheres strictly to Volume 5 & Volume 8 specification specifications.
 */

export interface TypingMetrics {
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  cpm: number;
  uncorrectedErrors: number;
  totalTypedChars: number;
}

export function calculateMetrics(
  targetText: string,
  typedText: string,
  timeElapsedSeconds: number
): TypingMetrics {
  const safeTyped = typedText || "";
  const safeTarget = targetText || "";

  if (timeElapsedSeconds <= 0 || !safeTyped) {
    return {
      grossWpm: 0,
      netWpm: 0,
      accuracy: 100,
      cpm: 0,
      uncorrectedErrors: 0,
      totalTypedChars: safeTyped.length,
    };
  }

  const timeInMinutes = timeElapsedSeconds / 60;
  const totalTypedChars = safeTyped.length;

  let uncorrectedErrors = 0;
  const compareLength = Math.min(safeTarget.length, safeTyped.length);

  for (let i = 0; i < compareLength; i++) {
    if (safeTyped[i] !== safeTarget[i]) {
      uncorrectedErrors++;
    }
  }

  // Extra characters typed past target text length are counted as errors
  if (safeTyped.length > safeTarget.length) {
    uncorrectedErrors += safeTyped.length - safeTarget.length;
  }

  // Standard typing WPM formula (5 characters = 1 word)
  const grossWpm = Math.round((totalTypedChars / 5) / timeInMinutes);
  const netWpm = Math.max(0, Math.round(((totalTypedChars / 5) - uncorrectedErrors) / timeInMinutes));
  const cpm = Math.round(totalTypedChars / timeInMinutes);

  const correctChars = totalTypedChars - uncorrectedErrors;
  const accuracy = totalTypedChars > 0 ? Math.max(0, Math.round((correctChars / totalTypedChars) * 100)) : 100;

  return {
    grossWpm,
    netWpm,
    accuracy,
    cpm,
    uncorrectedErrors,
    totalTypedChars,
  };
}
