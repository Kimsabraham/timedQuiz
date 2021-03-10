const startButton = document.getElementById("start-btn");
const questionContainerEl = document.getElementById("question-container");

const shuffledQuestions, currentQuestionsIndex;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionsIndex = 0;
  questionContainerEl.classList.remove("hide");
  setNextQuestion();
}

function nextQuestion() {}

function selectAnswer() {}

const questions = [
  {
    question: " What is HTML?",
    answers: [
      { text: "hyper mark up language", correct: true },
      { text: "one potato", correct: false },
    ],
  },
];
