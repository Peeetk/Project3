const quizData = [
    {
        "question": "What is the largest city in the UK by population?",
        "options": ["Manchester", "Birmingham", "London", "Glasgow"],
        "answer": 2 //London
    },
    {
        "question": "Which UK city is known as the 'Steel City'?",
        "options": ["Leeds", "Sheffield", "Newcastle", "Liverpool"],
        "answer": 1 //Sheffield
    },
    {
        "question": "Where is the oldest pub in UK?",
        "options": ["Edinburgh", "Southend-on-Sea", "Derby", "Nottingham"],
        "answer": 3 //Nottingham
    },
    {
        "question": "Where is the longest Pier in UK?",
        "options": ["Cardiff", "Bournemouth", "Skegness", "Southend-on-Sea"],
        "answer": 3 //Southend on sea
    },
    {
        "question": "Who wrote 'Hamlet'?",
        "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "J.K. Rowling"],
        "answer": 1 //W. Shakespare
    },
    {
        "question": "What is the capital of France?",
        "options": ["Rome", "Paris", "Berlin", "Madrid"],
        "answer": 1 //Paris
    },
    {
        "question": "What is the name of the cat in Tom and Jerry Show?",
        "options": ["Jenny", "Lily", "Tom", "Jerry"],
        "answer": 2 //Tom
    },
    {
        "question": "Who is Buley?",
        "options": ["House", "Drink", "Dog", "Flower"],
        "answer": 2 //Dog
    },
    {
        "question": "Who are the main characters in Paw Patrol?",
        "options": ["Major Humdinger", "Marshall", "Major Goodway", "Rider and the pups"],
        "answer": 3 //Major Goodway
    },
    {
        "question": "What is the name of the red car in Blaze?",
        "options": ["Pickle", "Zeg", "Blaze", "Stripe"],
        "answer": 2 //Blaze
    }
];

let currentQuestionIndex = 0;
let score = 0;
let totalScore = 0;
let totalQuestions = quizData.length;
let generatedNumbers = [];

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score-display");

    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";

    // If all questions have been answered, show final results
    if (generatedNumbers.length >= totalQuestions) {
        showFinalResults();
        return;
    }

    let randomNumber = Math.floor(Math.random() * totalQuestions);

    // Ensure no repeated questions
    while (generatedNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * totalQuestions);
    }

    generatedNumbers.push(randomNumber);

    const currentQuestion = quizData[randomNumber];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    scoreDisplay.textContent = `Total Score: ${totalScore}`;
}

function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[generatedNumbers[generatedNumbers.length - 1]];
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
        totalScore++; // Accumulates across subjects
    }

    document.getElementById("score-display").textContent = `Total Score: ${totalScore}`;
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    loadQuestion();
}

function showFinalResults() {
    document.getElementById("question").textContent = `Final Score: ${totalScore} out of ${totalQuestions}!`;
    document.getElementById("options").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});
