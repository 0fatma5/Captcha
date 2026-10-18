# Spot the Signal — JavaScript Image Selection Challenge

A responsive **vanilla JavaScript** mini project about selecting images that match a visual prompt. This project evolved from a 2024 CAPTCHA classroom exercise into a more complete portfolio demo with reusable game logic, keyboard-friendly controls and an alternative text challenge.

> **Not a real CAPTCHA security solution.** All answers are stored and checked in the browser. Automated programs can read or bypass this logic. **Do not use it to secure forms, registrations, accounts, or other production services.**

## Features

- Select matching pictures in a responsive grid.
- Random order on each round using the Fisher–Yates shuffle.
- Click, Tab, Space and Enter support through native buttons.
- Count selected photos and receive inline success/error feedback.
- Clear selections or restart the challenge.
- Switch to an alternative arithmetic challenge without requiring image recognition.
- Pure JavaScript helper functions with automated tests.
- Local operation with no registration, analytics, or uploads.

## Run the project

You can run the static frontend without a JavaScript framework or build tool.

1. Clone the repository.
2. Start a local HTTP server from its root directory:

```bash
python -m http.server 8000
```

3. Visit **http://localhost:8000/**.

A local web server is recommended because the application imports `challenge-utils.js` as an ES module. VS Code Live Server is also fine.

## Run automated checks

Requires **Node.js 18 or newer**.

```bash
npm run check
npm test
```

The tests verify the image inventory, correct/incorrect answers, shuffle behavior, immutable selection toggling and the arithmetic alternative. GitHub Actions performs the same checks and verifies that the JPEG assets exist.

**Manual browser testing is still required** for loading the actual photos, keyboard navigation, mobile layout, and screen-reader announcements. A passing Node test suite is not proof of complete accessibility.

## Project structure

```text
index.html                    New accessible challenge interface
app.css                       Responsive styling
app.js                        Event handlers, state and rendering
challenge-utils.js            Pure game logic
tests/                        Node unit tests
img1.jpeg ... img6.jpeg       Original distractor photographs
rimg1.jpeg ... rimg6.jpeg     Original matching photographs
captcha.css                   Original stylesheet (retained)
html with embedded script.txt Original learning exercise (retained)
```

## Accessibility

Image tiles are proper toggle buttons with `aria-pressed` and visible focus outlines. Live feedback is announced using `role=status`. The visual recognition round **is not usable for every visitor**, so an optional arithmetic question is available as an alternative. The arithmetic task is also entirely client-side and is **not security verification**.

## Limitations

- All answer-checking logic is exposed in the frontend; this is a game/demo, not human verification.
- It uses the existing image assets; check their reuse rights before commercial redistribution.
- No backend, accounts, database, or real authentication exists.
- Do not collect or send personal information through this sample.

## Portfolio details

**Suggested description:** *Accessible JavaScript image-selection mini game with randomized tiles, keyboard controls, a text alternative and Node.js unit tests.*

**Suggested topics:** `javascript`, `frontend`, `dom-manipulation`, `accessibility`, `css-grid`, `unit-testing`.

After manually testing the UI, GitHub Pages can host the static site with `index.html` at the repository root. Add a real screen recording only after capturing the working project in a browser; **no simulated demo is provided**.
