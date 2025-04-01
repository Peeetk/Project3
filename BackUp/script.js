const quizData = {
    "UK Cities": [
        {
            question: "What is the largest city in the UK by population?",
            options: ["Manchester", "Birmingham", "London", "Glasgow"],
            answer: 2 // London
        },
        {
            question: "Which UK city is known as the 'Steel City'?",
            options: ["Leeds", "Sheffield", "Newcastle", "Liverpool"],
            answer: 1 // Sheffield
        }
    ],
    "General Knowledge": [
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "J.K. Rowling"],
            answer: 1 // Shakespeare
        },
        {
            question: "What is the capital of France?",
            options: ["Rome", "Paris", "Berlin", "Madrid"],
            answer: 1 // Paris
        }
    ]
};

let subjects = Object.keys(quizData);
let currentSubjectIndex = 0;
let currentQuiz = quizData[subjects[currentSubjectIndex]];
let currentQuestionIndex = 0;
let score = 0; // Score resets after each subject
let totalScore = 0; // Keeps track of total progress
let totalQuestions = Object.values(quizData).flat().length; // Total questions in all subjects

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const subjectButton = document.getElementById("next-subject-btn");
    const scoreDisplay = document.getElementById("score-display");

    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    subjectButton.style.display = "none";

    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });

    scoreDisplay.textContent = `Score: ${score}`;
}

function selectAnswer(selectedIndex) {
    const currentQuestion = currentQuiz[currentQuestionIndex];
    const options = document.querySelectorAll(".option");

    options.forEach((button, index) => {
        if (index === currentQuestion.answer) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.answer) {
        score++;
        totalScore++;
    }
    document.getElementById("score-display").textContent = `Score: ${score}`;
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion();
    } else {
        document.getElementById("question").textContent = `Subject Complete! Your score: ${score}/${currentQuiz.length}`;
        document.getElementById("options").innerHTML = "";
        document.getElementById("next-btn").style.display = "none";

        if (currentSubjectIndex < subjects.length - 1) {
            document.getElementById("next-subject-btn").style.display = "block";
        } else {
            showFinalResults();
        }
    }
}

function nextSubject() {
    currentSubjectIndex++;

    if (currentSubjectIndex < subjects.length) {
        currentQuiz = quizData[subjects[currentSubjectIndex]];
        currentQuestionIndex = 0;
        
        document.getElementById("score-display").textContent = `Total Score: ${totalScore}`;

        loadQuestion();
    }
}

function showFinalResults() {
    document.getElementById("question").textContent = `Final Score: ${totalScore} out of ${totalQuestions}!`;
    document.getElementById("options").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("next-subject-btn").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});
