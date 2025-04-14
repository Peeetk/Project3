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
        },
        {
            question: "Where is the oldest pub in UK?",
            options: ["Edinburgh", "South-and-on-Sea", "Derby", "Nottingham"],
            answer: 3 // Nottingham
        },
        {
            question: "Where is the longest Pier in UK?",
            options: ["Cardiff", "Bournemouth", "Skegness", "South-and-on-Sea"],
            answer: 3 // South-and-on-sea
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
    ],
    "Cartoon characters": [
        {
            question: "What is the name of the cat in Tom and Jerry Show?",
            options: ["Jenny", "Lily", "Tom", "Jerry"],
            answer: 2 // Tom
        },
        {
            question: "Who is Buley?",
            options: ["House", "Drink", "Dog", "Flower"],
            answer: 2 //Dog
        },
        {
            question: "Who is the main characters in Paw Petrol?",
            options: ["Major Humdinger", "Marshall", "Major Goddway", "Rider and the pups"],
            answer: 3 // Rider and the pups
        },
        {
            question: "What is the name of the red car in Blaze?",
            options: ["Crasher", "Pickle", "Zeg", "Blaze", "Stripe"],
            answer: 3 // Blaze
        }
    ]
};

let subjects = Object.keys(quizData);
let currentSubjectIndex = 0;
let currentQuiz = quizData[subjects[currentSubjectIndex]];
let currentQuestionIndex = 0;
let score = 0; // Resets per subject
let totalScore = 0; // Accumulates across all subjects
let totalQuestions = Object.values(quizData).reduce((sum, questions) => sum + questions.length, 0); // Fixed calculation


function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const subjectButton = document.getElementById("next-subject-btn");
    const scoreDisplay = document.getElementById("score-display");
    

    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    subjectButton.style.display = "none";

    if (!currentQuiz.length) {
        questionElement.textContent = "No questions available in this category!";
        return;
    }

    const currentQuestion = currentQuiz[currentQuestionIndex];
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
        totalScore++; // Accumulates across subjects
    }

    document.getElementById("score-display").textContent = `Total Score: ${totalScore}`;
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion();
    } else {
        document.getElementById("question").textContent = `Subject Complete! Your Score: ${score}/${currentQuiz.length}`;
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
        score = 0; // Reset for new subject

        document.getElementById("question").textContent = ""; // Clear previous message
        document.getElementById("next-subject-btn").style.display = "none";
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
