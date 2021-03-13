// countdown timer
// document.addEventListener("DOMContentLoaded", () => {
//   const timeLeftDisplay = document.querySelector("#time-left");
//   const startBtn = document.querySelector("#start-button");
//   let timeLeft = 90;

//   function countDown() {
//     setInterval(function () {
//       if (timeLeft <= 0) {
//         clearInterval((timeLeft = 0));
//       }
//       timeLeftDisplay.innerHTML = timeLeft;
//       timeLeft -= 1;
//     }, 1000);
//   }
//   startBtn.addEventListener("click", countDown);
// });
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// array of potential questions
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

// constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

// events that happen when you click start game

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// function that stops the game once timer or questions reach 0
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  // adds 1 to counter for questions index, takes a raondom number rounds down and only takes the legth of the array.
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // answer choices and the datatype of number to match the answers
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // takes the avilable question list and takes away the question that was just asked from the list
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// answer button reactions, slight delay so user cant click around as soon as it refreshes
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    // applies class correct and incorrect
    const seletedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      seletedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // adde a slight delay after answer is selected before moving on to next question and resetting the color.
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();
