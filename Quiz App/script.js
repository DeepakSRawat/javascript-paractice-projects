let quiz = [
    {
        question: "Grand Central Terminal, Park Avenue, New York is the world's",
        options: [ 
            {text: "largest railway station", correct: "true"},
            {text: "highest railway station", correct: "false"},
            {text: "longest railway station", correct: "false"},
            {text: "None of the above", correct: "false"},
        ]
    },
    {
        question: "Entomology is the science that studies",
        options: [ 
            {text: "Behavior of human beings", correct: "false"},
            {text: "Insects", correct: "true"},
            {text: "The origin and history of technical and scientific terms", correct: "false"},
            {text: "The formation of rocks", correct: "false"},
        ]
    },
    {
        question: "For which of the following disciplines is Nobel Prize awarded?",
        options: [ 
            {text: "Physics and Chemistry", correct: "false"},
            {text: "Physiology or Medicine", correct: "false"},
            {text: "Literature, Peace and Economics", correct: "false"},
            {text: "All of the above", correct: "true"},
        ]
    },
    {
        question: "Which is the smallest continent in the world",
        options: [ 
            {text: "Asia", correct: "false"},
            {text: "Australia", correct: "true"},
            {text: "Arctic", correct: "false"},
            {text: "Africa", correct: "false"},
        ]
    },
];

const questionElement = document.getElementById("question");
const optionsButtons = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let score = 0;
let currentQuestionIndex = 0;

function startQuiz(){
    resetState()// to remove the question and options of previos quiz
    score = 0;
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = quiz[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option =>{
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("btn");
        optionsButtons.appendChild(button);
        button.dataset.correct = option.correct;
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(optionsButtons.firstChild){
        optionsButtons.removeChild(optionsButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const iscorrect = selectedButton.dataset.correct === "true";
    if(iscorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(optionsButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display="block";

}

function showNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        resetState();
        showQuestion();
    }
    else showScore();
}

function showScore(){
    resetState();
    console.log(`You scored ${score} out of ${quiz.length}`)
    questionElement.innerHTML = `You scored ${score} out of ${quiz.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < quiz.length){
        showNextQuestion();
    }
    else{
        startQuiz();
    }
})

startQuiz();
