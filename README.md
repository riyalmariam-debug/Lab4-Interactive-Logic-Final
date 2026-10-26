# My Next Move

An interactive real-estate home-search planner for Mariam Riyal. Built on the original one-question class-progress prototype using HTML, CSS, and JavaScript.

## Personalized paths

| Timeline | Wish list | Outcome |
| --- | --- | --- |
| More than 3 months or unsure | Either answer | Explore: find your direction |
| Within 3 months | Not yet | Prepare: define your priorities |
| Within 3 months | Priorities defined | Plan: turn clarity into action |

The suggestions concern home-search planning, not financial readiness or eligibility.

## Variables, conditional logic, and state

- searchState tracks the current path, beginning at not-started.
- state stores submitted answers, the previous outcome, the number of submissions, and completed tasks for each path.
- decidePath uses if, else if, logical OR, and logical AND to choose one of three outcomes.
- checkNextStep reads and validates user input before changing state.
- showResult updates the DOM with a personalized explanation, answer summary, and checklist.
- updateProgress uses conditional logic to respond differently to zero, some, or all completed tasks.
- Revising answers compares the previous outcome with the new one. Checked tasks remain available when returning to an earlier path.
- Start fresh clears all answers and progress.

State lives in JavaScript memory only. Refreshing or closing the page clears it. No answers are sent or saved externally.

## Features

Responsive layout, native form validation, keyboard-accessible controls, labeled fields, focus management, checklist progress, and a live progress message. No external dependencies, fonts, images, or media files are required.

## Project files

- index.html: page structure and form
- style.css: responsive visual styling
- script.js: conditional decisions, state, and interface updates
- README.md: project description
