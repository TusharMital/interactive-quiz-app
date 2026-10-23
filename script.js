const questions = [
    {
        question: "What does a large language model actually predict?",
        options: [
            "The next token",
            "The entire paragraph",
            "The final answer",
            "The user's intention"
        ],
        answer: "The next token"
    },
    {
        question: "In the commit-message format used in this course, what comes before the colon?",
        options: [
            "The type, such as feat or fix",
            "The filename",
            "The programmer name",
            "The date"
        ],
        answer: "The type, such as feat or fix"
    },
    {
        question: "What must a unit test do before the bug is fixed?",
        options: [
            "Fail",
            "Pass",
            "Stop running",
            "Delete the code"
        ],
        answer: "Fail"
    },
    {
        question: "Where should the styling for a webpage live?",
        options: [
            "In a separate CSS file",
            "Inside Python",
            "Inside the browser console",
            "Inside a text file"
        ],
        answer: "In a separate CSS file"
    },
    {
        question: "What does a loop inside another loop usually mean for time complexity?",
        options: [
            "It is quadratic",
            "It is constant",
            "It is logarithmic",
            "It has no complexity"
        ],
        answer: "It is quadratic"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const feedbackElement = document.getElementById("feedback");
const questionCounter = document.getElementById("questionCounter");
const scoreCounter = document.getElementById("scoreCounter");
const progressBar = document.getElementById("progressBar");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const themeButton = document.getElementById("themeToggle");

function showQuestion() {
    answered = false;
    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    scoreCounter.textContent = `Score: ${score}`;
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    optionsElement.replaceChildren();
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    resultElement.textContent = "";
    nextButton.hidden = true;
    restartButton.hidden = true;

    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option-button";
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (answered) {
        return;
    }

    answered = true;
    const correctAnswer = questions[currentQuestion].answer;
    const optionButtons = optionsElement.querySelectorAll("button");

    optionButtons.forEach((button) => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        } else if (button.textContent === selectedOption) {
            button.classList.add("incorrect");
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct! Well done.";
        feedbackElement.classList.add("correct-text");
    } else {
        feedbackElement.textContent = `Not quite. The correct answer is: ${correctAnswer}`;
        feedbackElement.classList.add("incorrect-text");
    }

    scoreCounter.textContent = `Score: ${score}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    if (currentQuestion < questions.length - 1) {
        nextButton.hidden = false;
    } else {
        finishQuiz();
    }
}

function goToNextQuestion() {
    if (!answered || currentQuestion >= questions.length - 1) {
        return;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    questionElement.textContent = "Quiz Complete!";
    questionCounter.textContent = `Completed ${questions.length} questions`;
    optionsElement.replaceChildren();
    nextButton.hidden = true;
    restartButton.hidden = false;
    progressBar.style.width = "100%";
    resultElement.textContent = `Your score is ${score} out of ${questions.length}.`;
    feedbackElement.textContent = score === questions.length
        ? "Perfect score! Excellent work."
        : "Select Restart Quiz if you'd like to try again.";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showQuestion();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    themeButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    themeButton.setAttribute("aria-pressed", String(isDark));
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", restartQuiz);
themeButton.addEventListener("click", toggleTheme);

showQuestion();
