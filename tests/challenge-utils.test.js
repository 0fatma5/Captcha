import test from 'node:test';
import assert from 'node:assert/strict';
import {
  IMAGE_FILES, CORRECT_IDS, shuffle, evaluateSelection,
  toggleSelection, createTextChallenge, checkTextAnswer
} from '../challenge-utils.js';

test('image library includes all expected files without duplicates', () => {
  assert.equal(IMAGE_FILES.length, 12);
  assert.equal(new Set(IMAGE_FILES).size, IMAGE_FILES.length);
  assert.ok(CORRECT_IDS.every(id => IMAGE_FILES.includes(id)));
});

test('shuffle returns a permutation without modifying its input', () => {
  const before = ['a', 'b', 'c', 'd'];
  const shuffled = shuffle(before, () => 0);
  assert.deepEqual(before, ['a', 'b', 'c', 'd']);
  assert.deepEqual(shuffled, ['b', 'c', 'd', 'a']);
  assert.deepEqual(new Set(shuffled), new Set(before));
});

test('shuffle rejects random values outside the supported range', () => {
  assert.throws(() => shuffle([1, 2], () => 1), RangeError);
  assert.throws(() => shuffle([1, 2], () => -1), RangeError);
});

test('verification requires exactly the target images', () => {
  assert.equal(evaluateSelection([...CORRECT_IDS]), true);
  assert.equal(evaluateSelection([...CORRECT_IDS].reverse()), true);
  assert.equal(evaluateSelection(CORRECT_IDS.slice(0, 5)), false);
  assert.equal(evaluateSelection([...CORRECT_IDS, 'img1.jpeg']), false);
  assert.equal(evaluateSelection([...CORRECT_IDS, CORRECT_IDS[0]]), false);
  assert.equal(evaluateSelection([]), false);
});

test('selection toggles without mutating the old set', () => {
  const original = new Set(['a']);
  const selected = toggleSelection(original, 'b');
  assert.deepEqual([...original], ['a']);
  assert.deepEqual([...selected], ['a', 'b']);
  assert.deepEqual([...toggleSelection(selected, 'a')], ['b']);
});

test('text alternative produces an answerable addition problem', () => {
  const question = createTextChallenge(() => 0);
  assert.deepEqual(question, { question: 'What is 3 + 3?', answer: 6 });
  assert.equal(checkTextAnswer(' 6 ', question.answer), true);
  assert.equal(checkTextAnswer('6xyz', question.answer), false);
  assert.equal(checkTextAnswer('', question.answer), false);
  assert.equal(checkTextAnswer('7', question.answer), false);
});
