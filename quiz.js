let currentQuestion = 0;
let score = 0;
let questions = [
    {
        question: 'Which HTML tag is used to define a hyperlink?',
        choice1: '<a>',
        choice2: '<b>',
        choice3: '<i>',
        choice4: '<p>',
        answer: 1,
    },
    {
        question: 'Which of the following is a programming language?',
        choice1: 'HTML',
        choice2: 'CSS',
        choice3: 'JavaScript',
        choice4: 'JSON',
        answer: 3,
    },
    {
        question: 'What is the result of 2 + 2?',
        choice1: '3',
        choice2: '4',
        choice3: '5',
        choice4: '6',
        answer: 2,
    },
];

window.onload = function() {
    updateElements();
}

function updateElements() {
    let questionElement = document.getElementById("question");
    questionElement.innerText = questions[currentQuestion].question;

    let buttons = document.getElementsByClassName("option-text");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = questions[currentQuestion]["choice" + (i + 1)];
        buttons[i].style.backgroundColor = ""; 
    }

    document.getElementById("question-num").innerText = currentQuestion + 1;
    document.getElementById("score").innerText = score;
}

function nextPageAndUpdateScore(option) {
    let ans = validateAnswer(option);
    if (ans) {
        score += 10;
    }

    updateScore();
    changeOptionColor(option, ans); 

    
    disableButtons();

    
    setTimeout(function() {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuiz();
        } else {
            updateElements();
            enableButtons();
        }
    }, 1000);

    console.log(`Current question: ${currentQuestion}, Option: ${option}, Score: ${score}`);
}

function endQuiz() {
    let scoreOverlay = document.querySelector("#f-score");
    
    scoreOverlay.classList.remove("hide");
    scoreOverlay.classList.add("final-score");
    
    enableButtons();
    document.getElementById("final-score").innerText = `Final Score: ${score}`;
}

function changeOptionColor(option, ans) {
    let buttons = document.getElementsByClassName("option-text");
    for (let i = 0; i < buttons.length; i++) {
        if (i + 1 === option) {
            buttons[i].style.backgroundColor = ans ? "green" : "red";
        } else {
            buttons[i].style.backgroundColor = "white";
        }
    }
}

function validateAnswer(option) {
    return questions[currentQuestion].answer === option;
}

function disableButtons() {
    let buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true; 
    }
}

function enableButtons() {
    let buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false; 
    }
}

function updateScore() {
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    console.log("restarting the quiz")
    let doc = document.querySelector("#f-score");
    doc.classList.add("hide");
    doc.classList.remove("final-score");
    updateElements();
    enableButtons();
}

function navigateHome() {
    window.location.href = 'index.html';
}
