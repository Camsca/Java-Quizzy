const startButton = document.getElementById("start-button");
const headerContainer = document.querySelector(".header-container");
const quizContainer = document.getElementById("quiz-container");

startButton.addEventListener("click",function() {
    headerContainer.style.display = "none"; // Ocultar el encabezado
    quizContainer.style.display = "block"; // Mostrar la sección del cuestionario
});
