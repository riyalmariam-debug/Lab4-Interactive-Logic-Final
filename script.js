'use strict';
// Builds on the starter's searchState variable and checkNextStep function.
let searchState = 'not-started';
const state = {
  timeline: '', wishList: '', previousOutcome: null, submissions: 0,
  completed: { explore: [], prepare: [], plan: [] }
};
const outcomes = {
  explore: {
    number: '01', label: 'YOUR PATH / EXPLORE', title: 'Find your direction.',
    description: 'Give yourself room to explore. Start by noticing which neighbourhoods and everyday routines feel right for you.',
    tasks: ['Choose two neighbourhoods to learn about.', 'Write down three things you enjoy about your current home.', 'Note one question you still have about moving.']
  },
  prepare: {
    number: '02', label: 'YOUR PATH / PREPARE', title: 'Define your priorities.',
    description: 'You’re thinking about searching soon. A clear wish list can help you decide which spaces are worth a closer look.',
    tasks: ['List three must-haves for your next home.', 'Separate your must-haves from nice-to-haves.', 'Write down the locations and travel times that suit your routine.']
  },
  plan: {
    number: '03', label: 'YOUR PATH / PLAN', title: 'Turn clarity into action.',
    description: 'Your timeline and wish list give you a starting point. Use them to make your next conversation or showing more focused.',
    tasks: ['Pick a few example listings to compare against your wish list.', 'Prepare three questions to ask at a showing.', 'Set aside time to review your options and next steps.']
  }
};
const form = document.getElementById('moveForm');
const result = document.getElementById('result');
const questions = document.getElementById('questions');

// Three actual conditional outcomes. These rules concern planning, not financial readiness.
function decidePath(timeline, wishList) {
  if (timeline === 'later' || timeline === 'unsure') {
    return 'explore';
  } else if (timeline === 'soon' && wishList === 'no') {
    return 'prepare';
  } else if (timeline === 'soon' && wishList === 'yes') {
    return 'plan';
  }
  return null; // Incomplete/invalid answers must never produce a recommendation.
}

function updateProgress() {
  const count = state.completed[searchState].length;
  document.getElementById('progressBar').style.width = `${count / 3 * 100}%`;
  // The response also depends on the user's previous checklist actions.
  if (count === 0) {
    document.getElementById('completionText').textContent = '0 of 3 complete. Choose one small step to begin.';
  } else if (count < 3) {
    document.getElementById('completionText').textContent = `${count} of 3 complete. You’re making progress at your own pace.`;
  } else {
    document.getElementById('completionText').textContent = '3 of 3 complete. You’ve finished this plan. Revisit your answers when your plans change.';
  }
  document.getElementById('stage3').classList.toggle('active', count > 0);
}

function showResult() {
  const outcome = outcomes[searchState];
  document.getElementById('resultLabel').textContent = outcome.label;
  document.getElementById('resultTitle').textContent = outcome.title;
  document.getElementById('resultText').textContent = outcome.description;
  document.getElementById('outcomeNumber').textContent = outcome.number;
  const timelineLabel = { soon: 'Within 3 months', later: 'More than 3 months', unsure: 'Still deciding' }[state.timeline];
  document.getElementById('answerSummary').textContent = `Your timeline: ${timelineLabel}. Wish list: ${state.wishList === 'yes' ? 'Priorities defined' : 'Still taking shape'}.`;
  const note = document.getElementById('changeNote');
  note.hidden = state.submissions < 2;
  if (!note.hidden) {
    if (state.previousOutcome === searchState) {
      note.textContent = 'Your answers still point to this path. Any checked steps have been kept.';
    } else {
      note.textContent = `Your plan changed from ${outcomes[state.previousOutcome].title} to ${outcome.title} Any progress on each path is kept while this page stays open.`;
    }
  }
  const checklist = document.getElementById('checklist');
  checklist.replaceChildren();
  outcome.tasks.forEach((text, index) => {
    const label = document.createElement('label'); label.className = 'task';
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox';
    checkbox.checked = state.completed[searchState].includes(index);
    const span = document.createElement('span'); span.textContent = text;
    checkbox.addEventListener('change', () => {
      const completed = state.completed[searchState];
      if (checkbox.checked && !completed.includes(index)) completed.push(index);
      else if (!checkbox.checked) state.completed[searchState] = completed.filter(item => item !== index);
      updateProgress();
    });
    label.append(checkbox, span); checklist.append(label);
  });
  questions.hidden = true; result.hidden = false;
  document.getElementById('stage1').classList.remove('active');
  document.getElementById('stage2').classList.add('active');
  updateProgress();
  document.getElementById('resultTitle').focus();
}

function checkNextStep(event) {
  event.preventDefault();
  const timeline = document.getElementById('timeline').value;
  const wishList = form.querySelector('input[name="wishList"]:checked')?.value || '';
  const next = decidePath(timeline, wishList);
  if (!next || !['yes', 'no'].includes(wishList)) { form.reportValidity(); return; }
  state.previousOutcome = searchState === 'not-started' ? null : searchState;
  state.timeline = timeline; state.wishList = wishList;
  state.submissions += 1; searchState = next;
  showResult();
}
form.addEventListener('submit', checkNextStep);
document.getElementById('editButton').addEventListener('click', () => {
  questions.hidden = false; result.hidden = true;
  document.getElementById('stage1').classList.add('active');
  document.getElementById('stage2').classList.remove('active');
  document.getElementById('stage3').classList.remove('active');
  document.getElementById('timeline').focus();
});
document.getElementById('resetButton').addEventListener('click', () => {
  searchState = 'not-started';
  state.timeline = ''; state.wishList = ''; state.previousOutcome = null; state.submissions = 0;
  state.completed = { explore: [], prepare: [], plan: [] };
  form.reset(); questions.hidden = false; result.hidden = true;
  document.getElementById('stage1').classList.add('active');
  ['stage2', 'stage3'].forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById('timeline').focus();
});
