// --- Problems (example, adapt as needed) ---
const problems = [
  {
    id: 1,
    title: "Linear Search",
    desc: "Given an array and a value, search for the value using linear search and print its index (or -1 if not found).",
    template: [
      "// Input: n arr[0..n-1] x",
      "int main() {",
      "    int n, x, arr[100];",
      '    scanf("%d", &n);',
      '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);',
      '    scanf("%d", &x);',
      "    int idx = _____0;", // blank 0
      "    for (int i = 0; i < n; i++) {",
      "        if (arr[i] == _____1) {", // blank 1
      "            idx = i;",
      "            break;",
      "        }",
      "    }",
      '    printf("%d\\n", idx);',
      "    return 0;",
      "}",
    ],
    blanks: [
      { answers: ["-1"], placeholder: "initial value" }, // blank 0
      { answers: ["x"], placeholder: "search value" }, // blank 1
    ],
    hints: [
      "Blank 1: What should idx be initialized to?",
      "Blank 2: What value are you searching for in the array?",
      "For input n=5, arr=1 2 3 4 5, x=3, output is 2. For x=7, output is -1.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput:
      "For input n=5, arr=1 2 3 4 5, x=3, output is 2. For x=7, output is -1.",
  },
  {
    id: 2,
    title: "Bubble Sort",
    desc: "Sort an array using bubble sort and print the sorted array.",
    template: [
      "// Input: n arr[0..n-1]",
      "int main() {",
      "    int n, arr[100];",
      '    scanf("%d", &n);',
      '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);',
      "    for (int i = 0; i < _____0; i++) {", // blank 0 (loop bound)
      "        for (int j = 0; j < n - i - 1; j++) {",
      "            if (arr[j] > _____1) {", // blank 1 (comparison)
      "                int temp = arr[j];",
      "                arr[j] = arr[j + 1];",
      "                arr[j + 1] = temp;",
      "            }",
      "        }",
      "    }",
      '    for (int i = 0; i < n; i++) printf("%d ", arr[i]);',
      "    return 0;",
      "}",
    ],
    blanks: [
      { answers: ["n - 1", "n-1"], placeholder: "loop bound" }, // blank 0
      { answers: ["arr[j + 1]", "arr[j+1]"], placeholder: "next element" }, // blank 1
    ],
    hints: [
      "Blank 1: What is the correct upper bound for the outer loop?",
      "Blank 2: What value should arr[j] be compared to for swapping?",
      "For input n=5, arr=5 4 3 2 1, output is 1 2 3 4 5.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput: "For input n=5, arr=5 4 3 2 1, output is 1 2 3 4 5.",
  },
  {
    id: 3,
    title: "Binary Search",
    desc: "Given a sorted array and a value, search for the value using binary search and print its index (or -1 if not found).",
    template: [
      "int main() {",
      "    int n, x, arr[100];",
      '    scanf("%d", &n);',
      '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);',
      '    scanf("%d", &x);',
      "    int l = 0, r = n - 1, idx = -1;",
      "    while (l <= r) {",
      "        int m = (l + r) / 2;",
      "        if (arr[m] == _____0) {", // blank 0
      "            idx = m;",
      "            break;",
      "        } else if (arr[m] < x) {",
      "            l = _____1;", // blank 1
      "        } else {",
      "            r = m - 1;",
      "        }",
      "    }",
      '    printf("%d\\n", idx);',
      "    return 0;",
      "}",
    ],
    blanks: [
      { answers: ["x"], placeholder: "search value" }, // blank 0
      { answers: ["m + 1", "m+1"], placeholder: "move left pointer" }, // blank 1
    ],
    hints: [
      "What value are you searching for in the array?",
      "How do you move the left pointer when arr[m] < x?",
      "For input n=5, arr=1 2 3 4 5, x=3, output is 2. For x=7, output is -1.",
    ],
    compilerOutput: "Compiled successfully.",
    runtimeOutput:
      "For input n=5, arr=1 2 3 4 5, x=3, output is 2. For x=7, output is -1.",
  },
];

let currentProblem = null;
let userInputs = [];

function renderProblemOptions() {
  const select = document.getElementById("problem-select");
  select.innerHTML = problems
    .map((p, i) => `<option value=\"${i}\">Problem ${i + 1}</option>`)
    .join("");
}

function renderProblem(idx) {
  currentProblem = problems[idx];
  userInputs = Array(currentProblem.blanks.length).fill("");
  document.getElementById("problem-desc").textContent = currentProblem.desc;
  renderCodeTemplate();
  renderHints();
  // Removed user input rendering
  document.getElementById("feedback").textContent = "";
  document.getElementById("runtime-output").textContent = "";
  document.getElementById("run-btn").disabled = true;
}

function renderCodeTemplate() {
  const codeDiv = document.getElementById("code-template");
  codeDiv.innerHTML = "";
  currentProblem.template.forEach((line) => {
    let html = line;
    // Replace all numbered blanks in order
    html = html.replace(/_____([0-9]+)/g, (match, bIdx) => {
      bIdx = parseInt(bIdx, 10);
      const blank = currentProblem.blanks[bIdx];
      if (!blank) return match;
      return `<input class=\"blank-input\" data-blank=\"${bIdx}\" value=\"${userInputs[bIdx] || ""}\" placeholder=\"${blank.placeholder}\" />`;
    });
    codeDiv.innerHTML += `<div class=\"template-line\">${html}</div>`;
  });
  // Attach input listeners
  codeDiv.querySelectorAll(".blank-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const bIdx = +e.target.getAttribute("data-blank");
      userInputs[bIdx] = e.target.value;
      document.getElementById("feedback").textContent = "";
      document.getElementById("runtime-output").textContent = "";
      document.getElementById("run-btn").disabled = true;
    });
  });
}

function renderHints() {
  const hintSelect = document.getElementById("hint-level");
  hintSelect.innerHTML = "";
  hintSelect.innerHTML += `<option value=\"0\" disabled selected>Hint 0</option>`;
  for (let i = 1; i <= currentProblem.hints.length; ++i) {
    hintSelect.innerHTML += `<option value=\"${i}\">Hint ${i}</option>`;
  }
  showHints(0);
  hintSelect.onchange = (e) => showHints(+e.target.value);
}

function showHints(level) {
  const hintsDiv = document.getElementById("hints");
  if (level === 0) {
    hintsDiv.innerHTML = "";
    return;
  }
  hintsDiv.innerHTML = `<div class=\"hint\">${currentProblem.hints[level - 1]}</div>`;
}

function checkAnswers() {
  let allCorrect = true;
  let feedback = "";
  currentProblem.blanks.forEach((blank, i) => {
    // Remove all whitespace for comparison
    const userVal = (userInputs[i] || "").replace(/\s+/g, "");
    const correct = blank.answers.some(
      (a) => userVal === a.replace(/\s+/g, ""),
    );
    if (correct) {
      feedback += `<div class=\"feedback-correct\">Blank ${i + 1}: Correct</div>`;
    } else {
      feedback += `<div class=\"feedback-incorrect\">Blank ${i + 1}: Incorrect</div>`;
      allCorrect = false;
    }
  });
  document.getElementById("feedback").innerHTML = feedback;
  document.getElementById("run-btn").disabled = !allCorrect;
}

function showRuntimeOutput() {
  document.getElementById("runtime-output").innerHTML =
    `<div class=\"feedback-all-correct\">${currentProblem.runtimeOutput}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProblemOptions();
  renderProblem(0);
  document.getElementById("problem-select").onchange = (e) =>
    renderProblem(+e.target.value);
  document.getElementById("submit-btn").onclick = checkAnswers;
  document.getElementById("run-btn").onclick = showRuntimeOutput;
});
