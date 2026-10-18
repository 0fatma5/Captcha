import {
  IMAGE_FILES, CORRECT_IDS, shuffle, evaluateSelection,
  toggleSelection, createTextChallenge, checkTextAnswer
} from './challenge-utils.js';

const element = id => document.getElementById(id);
const grid = element('image-grid');
const counter = element('selection-counter');
const feedback = element('feedback');
const imageSection = element('image-challenge');
const textSection = element('text-challenge');
const answerField = element('math-answer');
const modeLabel = element('mode-label');

let mode = 'images';
let selected = new Set();
let completed = false;
let mathQuestion = createTextChallenge();

function setFeedback(message, kind = '') {
  feedback.textContent = message;
  feedback.className = 'feedback' + (kind ? ' ' + kind : '');
}

function updateCount() {
  counter.textContent = `${selected.size} selected`;
}

function resetImages() {
  selected = new Set();
  completed = false;
  grid.replaceChildren();

  for (const [index, filename] of shuffle(IMAGE_FILES).entries()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tile';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', `Select photo ${index + 1}`);
    button.title = `Photo ${index + 1}`;

    const picture = document.createElement('img');
    picture.src = './' + filename;
    picture.alt = '';
    picture.loading = 'lazy';
    picture.decoding = 'async';

    const mark = document.createElement('span');
    mark.className = 'check';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = '✓';

    button.append(picture, mark);
    button.addEventListener('click', () => {
      if (completed) return;
      selected = toggleSelection(selected, filename);
      button.setAttribute('aria-pressed', String(selected.has(filename)));
      updateCount();
      setFeedback('');
    });
    grid.append(button);
  }

  updateCount();
}

function reset() {
  setFeedback('');
  mathQuestion = createTextChallenge();
  element('math-question').textContent = mathQuestion.question;
  answerField.value = '';
  resetImages();
  element('verify').disabled = false;
  if (mode === 'text') answerField.focus();
}

function switchMode() {
  mode = mode === 'images' ? 'text' : 'images';
  const isText = mode === 'text';
  imageSection.classList.toggle('hidden', isText);
  textSection.classList.toggle('hidden', !isText);
  element('switch-mode').textContent =
    isText ? 'Return to the image challenge ↗' : 'Use a text-based alternative ↗';
  modeLabel.textContent = isText ? 'Text mode' : 'Image mode';
  reset();
}

function verify() {
  if (completed) return;
  if (mode === 'images' && selected.size === 0) {
    setFeedback('Select the photos that match the prompt first.', 'error');
    return;
  }
  if (mode === 'text' && answerField.value.trim() === '') {
    setFeedback('Enter your answer to the question first.', 'error');
    answerField.focus();
    return;
  }

  const correct = mode === 'images'
    ? evaluateSelection([...selected], CORRECT_IDS)
    : checkTextAnswer(answerField.value, mathQuestion.answer);

  if (correct) {
    completed = true;
    element('verify').disabled = true;
    setFeedback('Correct! Nice work. Choose Try again to play another round.', 'success');
  } else {
    setFeedback('Not quite. Review your answer and try again.', 'error');
  }
}

element('verify').addEventListener('click', verify);
element('clear').addEventListener('click', () => {
  selected.clear();
  completed = false;
  element('verify').disabled = false;
  for (const button of grid.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', 'false');
  }
  updateCount();
  setFeedback('Selection cleared.');
});
element('new-challenge').addEventListener('click', reset);
element('switch-mode').addEventListener('click', switchMode);
textSection.addEventListener('submit', event => {
  event.preventDefault();
  verify();
});

reset();
