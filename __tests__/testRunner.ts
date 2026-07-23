export function describe(name: string, fn: () => void) {
  console.log(`\n=== ${name} ===`);
  fn();
}

export function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err: any) {
    console.error(`  ✕ ${name}: ${err.message}`);
    throw err;
  }
}

export function expect<T>(actual: T) {
  return {
    toBe(expected: T) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but received ${actual}`);
      }
    },
    toBeGreaterThanOrEqual(expected: number) {
      if (typeof actual !== "number" || actual < expected) {
        throw new Error(`Expected ${actual} >= ${expected}`);
      }
    },
    toContain(item: any) {
      if (typeof actual === "string") {
        if (!actual.includes(item)) {
          throw new Error(`Expected string "${actual}" to contain "${item}"`);
        }
      } else if (Array.isArray(actual)) {
        if (!actual.includes(item)) {
          throw new Error(`Expected array to contain ${item}`);
        }
      } else {
        throw new Error(`Cannot call toContain on type ${typeof actual}`);
      }
    },
    toMatch(regex: RegExp) {
      if (typeof actual !== "string" || !regex.test(actual)) {
        throw new Error(`Expected string ${actual} to match ${regex}`);
      }
    },
  };
}
