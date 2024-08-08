const questions = [
    {
        question: "Which of the following is a JavaScript data type?",
        answers: [
            { text: "integer", correct: false},
            { text: "character", correct: false},
            { text: "boolean", correct: true},
            { text: "float", correct: false},
        ]
    },

    {
        question: "What is the correct way to write a JavaScript array",
        answers: [
            { text: `const colors = ["red", "green", "blue"];`, correct: true},
            { text: `const colors = "red", "green", "blue";`, correct: false},
            { text: `const colors = (1:"red", 2:"green", 3:"blue");`, correct: false},
            { text: `const colors = 1 = ("red"), 2 = ("green"), 3 = ("blue");`, correct: false},
        ]
    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: 'alertBox("Hello World");', correct: false},
            { text: 'alert("Hello World");', correct: true},
            { text: 'msgBox("Hello World");', correct: false},
            { text: 'msg("Hello World");', correct: false},
        ]
    },

    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        answers: [
            { text: "combine()", correct: false},
            { text: "append()", correct: false},
            { text: "concat()", correct: true},
            { text: "attach()", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const asnwerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        asnwerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (asnwerButtons.firstChild) {
        asnwerButtons.removeChild(asnwerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(asnwerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length +"!";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}   

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();