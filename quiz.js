let userName = "";
let currentQuestionIndex = 0;
let score = 0;

let timeLeft = 30;
let timer;

/* ================= START GAME ================= */
function startGame() {
    userName = document.getElementById("username").value.trim();

    if (!userName) {
        alert("Please enter your name");
        return;
    }

    document.getElementById("login-screen").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";

    startQuiz();
}

/* ================= QUESTIONS ================= */
const questions = [
{
    question: "HTML full form?",
    answers: [
        { text: "Home Tool Markup Language", correct: false },
        { text: "Hyper Transfer Markup Language", correct: false },
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Hyper Tool Multi Language", correct: false }
    ]
},
{
    question: "CSS is used for?",
    answers: [
        { text: "Database", correct: false },
        { text: "Styling web pages", correct: true },
        { text: "Server handling", correct: false },
        { text: "Hardware control", correct: false }
    ]
},
{
    question: "JavaScript is a?",
    answers: [
        { text: "Markup Language", correct: false },
        { text: "Database", correct: false },
        { text: "Operating System", correct: false },
        { text: "Programming Language", correct: true }
    ]
},
{
    question: "CPU stands for?",
    answers: [
        { text: "Computer Personal Unit", correct: false },
        { text: "Central Processing Unit", correct: true },
        { text: "Central Print Unit", correct: false },
        { text: "Control Program Unit", correct: false }
    ]
},
{
    question: "RAM is?",
    answers: [
        { text: "Random Access Memory", correct: true },
        { text: "Read Access Memory", correct: false },
        { text: "Run Active Memory", correct: false },
        { text: "Rapid Access Module", correct: false }
    ]
},
{
    question: "Which is frontend technology?",
    answers: [
        { text: "HTML CSS JS", correct: true },
        { text: "Python only", correct: false },
        { text: "C++ only", correct: false },
        { text: "SQL only", correct: false }
    ]
},
{
    question: "Which is backend runtime?",
    answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: false },
        { text: "Photoshop", correct: false },
        { text: "Node.js", correct: true }
    ]
},
{
    question: "Which is NOT a programming language?",
    answers: [
        { text: "Java", correct: false },
        { text: "Python", correct: false },
        { text: "HTML", correct: true },
        { text: "C++", correct: false }
    ]
},
{
    question: "Which tag is used for heading?",
    answers: [
        { text: "<h1>", correct: true },
        { text: "<p>", correct: false },
        { text: "<div>", correct: false },
        { text: "<span>", correct: false }
    ]
},
{
    question: "Which tag is used for image?",
    answers: [
        { text: "<image>", correct: false },
        { text: "<pic>", correct: false },
        { text: "<img>", correct: true },
        { text: "<src>", correct: false }
    ]
},
{
    question: "Which symbol is array in JS?",
    answers: [
        { text: "{}", correct: false },
        { text: "[]", correct: true },
        { text: "()", correct: false },
        { text: "<>", correct: false }
    ]
},
{
    question: "Which loop is used in JS?",
    answers: [
        { text: "repeat", correct: false },
        { text: "loop", correct: false },
        { text: "iterate", correct: false },
        { text: "for", correct: true }
    ]
},
{
    question: "Database example?",
    answers: [
        { text: "MySQL", correct: true },
        { text: "HTML", correct: false },
        { text: "CSS", correct: false },
        { text: "Photoshop", correct: false }
    ]
},
{
    question: "OS example?",
    answers: [
        { text: "Chrome", correct: false },
        { text: "Google", correct: false },
        { text: "Windows", correct: true },
        { text: "Word", correct: false }
    ]
},
{
    question: "Cloud service?",
    answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: false },
        { text: "AWS", correct: true },
        { text: "JS", correct: false }
    ]
},
{
    question: "Search engine?",
    answers: [
        { text: "Google", correct: true },
        { text: "VS Code", correct: false },
        { text: "Word", correct: false },
        { text: "Paint", correct: false }
    ]
},
{
    question: "File extension HTML?",
    answers: [
        { text: ".html", correct: true },
        { text: ".css", correct: false },
        { text: ".js", correct: false },
        { text: ".txt", correct: false }
    ]
},
{
    question: "JS output function?",
    answers: [
        { text: "console.log()", correct: true },
        { text: "print()", correct: false },
        { text: "echo()", correct: false },
        { text: "write()", correct: false }
    ]
},
{
    question: "API full form?",
    answers: [
        { text: "Application Programming Interface", correct: true },
        { text: "Auto Program Input", correct: false },
        { text: "App Process Interface", correct: false },
        { text: "Advanced Program Integration", correct: false }
    ]
},
{
    question: "Version control system?",
    answers: [
        { text: "Git", correct: true },
        { text: "Word", correct: false },
        { text: "Excel", correct: false },
        { text: "Paint", correct: false }
    ]
}
];

/* ================= SHUFFLE ================= */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* ================= DOM ================= */
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

/* ================= QUIZ START ================= */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    shuffleArray(questions);

    questions.forEach(q => {
        shuffleArray(q.answers);
    });

    nextButton.innerHTML = "Next";

    showQuestion();
}

/* ================= SHOW QUESTION ================= */
function showQuestion() {
    resetState();
    startTimer();

    let q = questions[currentQuestionIndex];

    questionElement.innerHTML = q.question;

    progress.innerHTML =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    q.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;
        button.classList.add("btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

/* ================= RESET ================= */
function resetState() {
    clearInterval(timer);

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/* ================= TIMER ================= */
function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    document.getElementById("timer").innerText =
        "Time Left: " + timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerText =
            "Time Left: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextButton();
        }

    }, 1000);
}

/* ================= ANSWER ================= */
function selectAnswer(e) {

    clearInterval(timer);

    const selectedBtn = e.target;

    const isCorrect =
        selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

/* ================= NEXT ================= */
function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

/* ================= SCORE ================= */
function showScore() {

    resetState();

    let percentage =
        ((score / questions.length) * 100).toFixed(0);

    questionElement.innerHTML =
        `${userName}, You scored ${score} out of ${questions.length}`;

    progress.innerHTML =
        `Percentage: ${percentage}%`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

/* ================= BUTTON ================= */
nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }

});