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
  if (timeElapsedSeconds <= 0 || !typedText) {
    return {
      grossWpm: 0,
      netWpm: 0,
      accuracy: 100,
      cpm: 0,
      uncorrectedErrors: 0,
      totalTypedChars: typedText.length,
    };
  }

  const timeInMinutes = timeElapsedSeconds / 60;
  const totalTypedChars = typedText.length;

  let uncorrectedErrors = 0;
  const compareLength = Math.min(targetText.length, typedText.length);

  for (let i = 0; i < compareLength; i++) {
    if (typedText[i] !== targetText[i]) {
      uncorrectedErrors++;
    }
  }

  // Extra characters typed past target text length are counted as errors
  if (typedText.length > targetText.length) {
    uncorrectedErrors += typedText.length - targetText.length;
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
