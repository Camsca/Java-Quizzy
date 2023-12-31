// DOM Elements
const startButton = document.getElementById("start-button");
const headerContainer = document.querySelector(".header-container");
const quizContainer = document.getElementById("quiz-container");
const questionsContainer = document.getElementById("questions");
const optionsContainer = document.getElementById("options");
const timerValue = document.getElementById("timer-value");
const allDoneSection = document.getElementById("all-done");
const finalScore = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const nameInput = document.getElementById("name");
const viewHighScoresSection = document.getElementById("view-high-scores");
const goBackButton = document.getElementById("go-back-button");
const clearScoresButton = document.getElementById("clear-scores-button");
const resultsSection = document.getElementById("results");
const highScoresList = document.getElementById("high-scores-list");
const wrongFeedback = document.getElementById("Wrong");
const correctFeedback = document.getElementById("Correct");
const viewHighScoresLink = document.querySelector('a[href="#view-high-scores"]');

// State Variables
let time = 60;
let currentQuestionIndex = 0;
let points = 0;
let timerInterval;

// Event Listeners
startButton.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", submitScore);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);
viewHighScoresLink.addEventListener('click', showHighScoresSection)
// Functions
function startQuiz() {
  headerContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestions(currentQuestionIndex);
  startTimer();
}

function startTimer() {
  timerValue.textContent = time;
  timerInterval = setInterval(function () {
    time--;
    timerValue.textContent =  Math.max(0, time); ///

    if (time <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function displayQuestions(index) {
  const question = questions[index];

  questionsContainer.textContent = question.question;
  optionsContainer.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    optionsContainer.appendChild(button);

    button.addEventListener("click",  () => {
      checkAnswer(optionIndex, question.correctIndex);
      setTimeout(() => {
        
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          displayQuestions(currentQuestionIndex);
        } else {
          endQuiz();
        }
      }, 1000); 
    });
  });
}

function checkAnswer(selectedIndex, correctIndex) {
  console.log("Selected index:", selectedIndex);
  console.log("Correct index:", correctIndex);
  correctFeedback.style.display = 'none'; 
  wrongFeedback.style.display = 'none';   
  if (selectedIndex === correctIndex) {
    points += 2;
    correctFeedback.style.display = 'block'; 
    console.log("Correct answer! Points:", points);
    setTimeout(() => {
      correctFeedback.style.display = 'none'; 
      moveToNextQuestion();
    }, 1000);
  } else {
    time -= 15;
    wrongFeedback.style.display = 'block'; 
    console.log("Wrong answer! Time:", time);
 if (time < 0) {
      time = 0;
    }
    setTimeout(() => {
      wrongFeedback.style.display = 'none'; 
      moveToNextQuestion();
    }, 1000);
  }
}
function moveToNextQuestion() {
currentQuestionIndex++;
if (currentQuestionIndex < questions.length) {
displayQuestions(currentQuestionIndex);
 } else {
 endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
 showResults();
 quizContainer.style.display = "none";
}

function showResults() {
  quizContainer.style.display = "none";
  allDoneSection.style.display = "block";
  finalScore.textContent = points;
}

function submitScore(event) {
  event.preventDefault();
  const name = nameInput.value;
  const scoreObject = { name, score: points };

  let highScores = localStorage.getItem("highScores");
  highScores = highScores ? JSON.parse(highScores) : [];
  highScores.push(scoreObject);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  updatedHighScoresList();
  allDoneSection.style.display = "none";
  viewHighScoresSection.style.display = "block";
}

function updatedHighScoresList() {
  highScoresList.innerHTML = "";
  const storedHighScores = localStorage.getItem("highScores");
  const highScores = storedHighScores ? JSON.parse(storedHighScores) : [];
  
  highScores.sort((a, b) => b.score - a.score);
  
  highScores.forEach((scoreObject, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1} ${scoreObject.name}: ${scoreObject.score}`;
    highScoresList.appendChild(listItem);
  });
}

function goBack() {
  headerContainer.style.display = "block";
  quizContainer.style.display = "none";
  allDoneSection.style.display = "none";
  resultsSection.style.display = "none";
  viewHighScoresSection.style.display = "none";

  currentQuestionIndex = 0;
  points = 0;
  time = 60;
}

function clearScores() {
  localStorage.removeItem("highScores");
  updatedHighScoresList();
}

function showHighScoresSection() {
  headerContainer.style.display = "none";
  quizContainer.style.display = "none";
  allDoneSection.style.display = "none";
  resultsSection.style.display = "none";
  viewHighScoresSection.style.display = "block";
 
}

//questions /
const questions = [
  {
    question: "What is the concept of hoisting' in JavaScript?",
    options: [
      "a) Moving variables to a different scope",
      "b)Rearranging code for better performance ",
      "c)Automatically lifting heavy operations ",
      "d)Variables and function declarations are moved to the top of their scope ",
    ],
    correctIndex: 3,
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["a) var", "b) let", "c) const", "d) both b) and c)"],
    correctIndex: 3,
  },
  {
    question: "What does the '===' operator check in JavaScript?",
    options: [
      "a) Equality of values",
      "b) Equality of values and types",
      "c) Inequality of values",
      "d) Inequality of values and types",
    ],
    correctIndex: 1,
  },
  {
    question: "Which function is used to print a value to the console?",
    options: [
      "a) console.print()",
      "b) log()",
      "c) print()",
      "d) console.log()",
    ],
    correctIndex: 3,
  },
  {
    question: "What is the scope of a variable declared with 'var'?",
    options: [
      "a) Local scope",
      "b) Global scope",
      "c) Function scope",
      "d) Block scope",
    ],
    correctIndex: 2,
  },
  {
    question: "What is the correct way to write a comment in JavaScript?",
    options: [
      "a) <!-- This is a comment -->",
      "c) /* This is a comment */",
      "d) ** This is a comment **",
    ],
    correctIndex: 1,
  },
  {
    question: "What does the 'typeof' operator return?",
    options: [
      "a) The data type of a variable",
      "b) The value of a variable",
      "c) The variable name",
      "d) An error",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Which of the following is NOT a primitive data type in JavaScript?",
    options: ["a) String", "b) Number", "c) Boolean", "d) Array"],
    correctIndex: 3,
  },
  {
    question: "What is the purpose of the 'return' statement in a function?",
    options: [
      "a) It defines a new variable",
      "b) It exits the function and specifies a value to be returned to the caller",
      "c) It prints a message to the console",
      "d) It declares a loop",
    ],
    correctIndex: 1,
  },
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    options: [
      "a) To check if a variable is defined",
      "b) To convert a value to a string",
      "c) To determine the data type of a value",
      "d) To compare two values for equality",
    ],
    correctIndex: 2,
  },
];
