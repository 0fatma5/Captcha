/**
 * Pure logic for the frontend image-selection challenge.
 * This is a learning demo, never a substitute for server-side anti-bot checks.
 */
export const IMAGE_FILES = Object.freeze([
  'img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'img5.jpeg', 'img6.jpeg',
  'rimg1.jpeg', 'rimg2.jpeg', 'rimg3.jpeg', 'rimg4.jpeg', 'rimg5.jpeg', 'rimg6.jpeg',
]);

export const CORRECT_IDS = Object.freeze([
  'rimg1.jpeg', 'rimg2.jpeg', 'rimg3.jpeg',
  'rimg4.jpeg', 'rimg5.jpeg', 'rimg6.jpeg',
]);

/** Unbiased Fisher–Yates shuffle; never mutates the original input. */
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    if (!Number.isInteger(j) || j < 0 || j > i) {
      throw new RangeError('Random source must return values in [0, 1).');
    }
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Require *exactly* the target set, with no duplicates or extra images. */
export function evaluateSelection(selected, correct = CORRECT_IDS) {
  if (!Array.isArray(selected) || !Array.isArray(correct)) {
    throw new TypeError('Expected arrays of image identifiers.');
  }
  const selectedSet = new Set(selected);
  const correctSet = new Set(correct);
  return selected.length === selectedSet.size
    && correct.length === correctSet.size
    && selectedSet.size === correctSet.size
    && [...correctSet].every(id => selectedSet.has(id));
}

/** Toggle a value in a new Set without mutating the previous Set. */
export function toggleSelection(selection, id) {
  const next = new Set(selection);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

/** Arithmetic alternative for users who cannot complete an image challenge. */
export function createTextChallenge(random = Math.random) {
  const a = Math.floor(random() * 12) + 3;
  const b = Math.floor(random() * 12) + 3;
  return { question: `What is ${a} + ${b}?`, answer: a + b };
}

export function checkTextAnswer(value, expected) {
  return typeof value === 'string' && /^\d+$/.test(value.trim())
    && Number(value.trim()) === expected;
}
