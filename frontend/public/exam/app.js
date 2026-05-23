// Simple quiz data (mix of HTML, CSS, JS, jQuery, Bootstrap)
const QUESTIONS = [
  {
    id: 1,
    q: 'Which tag is used for the largest heading in HTML5?',
    options: ['<heading>', '<h6>', '<h1>', '<title>'],
    answer: 2,
  },
  {
    id: 2,
    q: 'Which CSS property controls the spacing between lines of text?',
    options: ['letter-spacing', 'line-height', 'word-spacing', 'text-indent'],
    answer: 1,
  },
  {
    id: 3,
    q: 'Which method adds an element to the end of an array in JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    answer: 0,
  },
  {
    id: 4,
    q: 'Using jQuery, which syntax selects all paragraphs?',
    options: ['document("p")', '$("p")', 'jQuery.p()', 'select("p")'],
    answer: 1,
  },
  {
    id: 5,
    q: 'Which Bootstrap class creates a responsive container with fixed padding?',
    options: ['.container-fluid', '.container', '.row', '.col'],
    answer: 1,
  },
];

let current = 0;
let answers = JSON.parse(localStorage.getItem('exam_answers') || '[]') || [];
const TOTAL_TIME = 15 * 60; // seconds (15 minutes)
let timeLeft = parseInt(localStorage.getItem('exam_time') || TOTAL_TIME);

function renderQuestion(i) {
  const q = QUESTIONS[i];
  const $area = $('#quiz-area');
  $area.empty();
  const $q = $("<div class='question'></div>");
  $q.append(`<h5>Q${i + 1}. ${q.q}</h5>`);
  const $opts = $('<div></div>');
  q.options.forEach((opt, idx) => {
    const sel = (answers[i] === idx) ? 'active' : '';
    const $o = $(`<div class='option p-2 mb-1 rounded ${sel}' data-idx='${idx}'>${opt}</div>`);
    $o.on('click', () => {
      answers[i] = idx;
      localStorage.setItem('exam_answers', JSON.stringify(answers));
      renderQuestion(i);
    });
    $opts.append($o);
  });
  $q.append($opts);
  $area.append($q);
}

function showResult(score) {
  $('#resultArea').show().html(`<div class='alert alert-success'>You scored <strong>${score}</strong> out of ${QUESTIONS.length}.</div>`);
}

function calcScore() {
  let score = 0;
  QUESTIONS.forEach((q, idx) => {
    if (answers[idx] === q.answer) score++;
  });
  return score;
}

function startTimer() {
  const tick = () => {
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    timeLeft -= 1;
    localStorage.setItem('exam_time', String(timeLeft));
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    $('#timer').text(`${m}:${s}`);
  };
  tick();
  setInterval(tick, 1000);
}

function submitExam() {
  const score = calcScore();
  // show locally
  showResult(score);
  // try to POST to backend
  fetch('/api/exams/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId: null, name: 'Guest', score, answers }),
  })
    .then(res => res.json())
    .then(data => {
      console.log('Submitted:', data);
      localStorage.removeItem('exam_answers');
      localStorage.removeItem('exam_time');
    })
    .catch(err => {
      console.warn('Could not submit to server:', err);
    });
}

$(function () {
  if (answers.length === 0) answers = Array(QUESTIONS.length).fill(null);
  renderQuestion(current);
  startTimer();

  $('#prevBtn').on('click', () => {
    if (current > 0) current -= 1;
    renderQuestion(current);
  });

  $('#saveBtn').on('click', () => {
    localStorage.setItem('exam_answers', JSON.stringify(answers));
    alert('Progress saved locally.');
  });

  $('#submitBtn').on('click', () => {
    if (!confirm('Submit exam now?')) return;
    submitExam();
  });
});
