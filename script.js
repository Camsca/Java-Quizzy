const startButton = document.getElementById("start-button");
const headerContainer = document.querySelector(".header-container");
const quizContainer = document.getElementById("quiz-container");
const questionsContainer = document.getElementById("questions");
const optionsContainer = document.getElementById("options");
const timerValue = document.getElementById("timer-value");
const allDoneSection = document.getElementById("all-done");
const finalScore = document.getElementById("Final-score");
const initialsForm = document.getElementById("initials-form");
const nameInput = document.getElementById("name");
const viewHighScoresSection = document.getElementById("view-high-scores");
const goBackButton = document.getElementById("go-back-button");
const clearScoresButton = document.getElementById("clear-scores-button");
const resultsSection = document.getElementById("results");

let currentQuestionIndex=0;
let time=90;

startButton.addEventListener("click",function(){
    headerContainer.style.display = "none";
    quizContainer.style.display= "block";
displayQuestions(currentQuestionIndex);
startTimer();
});//agregando el bton para empezar las pregumtas y el timer//