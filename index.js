
const startBtn = document.querySelector('.start-btn-wrapper');
const startContainer = document.querySelector('.start-container');
const infoContainer = document.querySelector('.info-container');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.querySelector('.result-container');
const quesNum = document.querySelector('.question-num');

const question = document.querySelector('.question');
const optionA = document.querySelector('.label-a');
const optionB = document.querySelector('.label-b');
const optionC = document.querySelector('.label-c');
const optionD = document.querySelector('.label-d');

const radioA = document.getElementById('a');
const radioB = document.getElementById('b');
const radioC = document.getElementById('c');
const radioD = document.getElementById('d');

const timeStatus = document.querySelector('.time-status');
const timerCount = document.querySelector('.time-count');
const lineTimer = document.querySelector('.timer-line');
const currentQuestion = document.querySelector('.current-question');
const totalQuestion = document.querySelector('.total-question');
const nextBtn = document.querySelector('.next-que-btn');

const radioOptions = document.querySelectorAll('input[name="option"]');
const scorePoint = document.querySelector('.score-point');
const resultTotal = document.querySelector('.result-total');
const replayBtn = document.querySelector('.replay');
const quitBtn = document.querySelector('.quit');
const allLabel = document.querySelectorAll('label');



let counterLine;
let counter;
const timeCount = 15;
let index = 0;
let quesCount = 1;
let quizScore = 0;
let isSelect = false;

startBtn.addEventListener('click', ()=>{
    console.log('clicked');
    infoContainer.classList.add('active-info');
});
exitBtn.addEventListener('click', ()=>{
    infoContainer.classList.remove('active-info');
});
//replayBtn.addEventListener('click', ()=>{
   // resultContainer.classList.remove('active-result');
    //quizContainer.classList.add('active-quiz');
//});
quitBtn.addEventListener('click', ()=>{
    resultContainer.classList.remove('active-result');
    //startContainer.classList.add('active-start');
    location.reload();

});

continueBtn.addEventListener('click', ()=>{
    infoContainer.classList.remove('active-info');
    quizContainer.classList.add('active-quiz');
    loadQuiz(index); 
    timeStatus.textContent = 'Time LEFT'
    quizTimer(timeCount); 
    startTimeLine(0);
    console.log('continue')
});


nextBtn.addEventListener('click', ()=>{

     if(quesCount < questions.length){

        
        loadQuiz(quesCount);
        quesCount++;
        clearInterval(counter);
        clearInterval(counterLine);
        timeStatus.textContent = 'Time LEFT';
        quizTimer(timeCount)
        startTimeLine(0);
        for (option of radioOptions){
            option.classList.remove('correct');
            option.classList.remove('wrong')
        }
        
    }
    else{
        quizContainer.classList.remove('active-quiz');
        resultContainer.classList.add('active-result');
    }
});

replayBtn.addEventListener('click', ()=>{
    resultContainer.classList.remove('active-result');
    quizContainer.classList.add('active-quiz');
    quesCount = 0;
    quizScore = 0;
    loadQuiz(quesCount);
    clearInterval(counter);
    clearInterval(counterLine);
    quizTimer(timeCount);
    startTimeLine(0);
});




function loadQuiz(quizIndex){
    quesNum.innerText = questions[quizIndex].num + ".";
    question.innerText = questions[quizIndex].question;
    optionA.innerText = questions[quizIndex].options[0];
    optionB.innerText = questions[quizIndex].options[1];
    optionC.innerText = questions[quizIndex].options[2];
    optionD.innerText = questions[quizIndex].options[3];

    radioA.value = questions[quizIndex].options[0];
    radioB.value = questions[quizIndex].options[1];
    radioC.value = questions[quizIndex].options[2];
    radioD.value = questions[quizIndex].options[3];

    nextBtn.style.display = 'none';

    for (label of allLabel){
        label.style.color = 'black';
    }

    quizOperation(quizIndex);
    questionCount(quizIndex);

    
}

function quizOperation(index){

    for(let option of radioOptions){
        option.checked = false;
        radioEnabled();

        option.addEventListener('click', ()=>{
            if (option.checked){
                radioDisabled();
                clearInterval(counter);
                clearInterval(counterLine);
                nextBtn.style.display = 'block';
                if (option.value === questions[index].answer){
                    console.log('correct');
                    //console.log(score += 1);
                    quizScore += 1;
                    option.classList.add('correct');
                }
                else if (option.value !== questions[index].answer){
                    option.classList.add('wrong');
                }
            }
            
            
            scorePoint.textContent = quizScore; 
        });
        
           
    } 
}

function radioDisabled(){
    for (option of radioOptions){
        option.disabled = true;
    }
    for (label of allLabel){
        label.style.color = 'gray';
    }
}
function radioEnabled(){
    for (option of radioOptions){
        option.disabled = false;
    }
}


function quizTimer(time){
     counter = setInterval(timer, 1000);
     function timer(){
        timerCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timerCount.textContent;
            timerCount.textContent = '0' + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeStatus.textContent = 'Time OFF';
            radioDisabled();
            nextBtn.style.display = 'block';
        }
     }
}
function startTimeLine(time){
    counterLine = setInterval(lineTime, 1000);
    function lineTime(){
        time += 6.66;
        lineTimer.style.width = time + '%';
        if (time > 96){
            clearInterval(counterLine);
        }
    }
}
function questionCount(index){
    currentQuestion.textContent = questions[index].num;
    totalQuestion.textContent = questions.length;
    resultTotal.textContent = questions.length;
}

function resultLog(){
    let plus = 1;
    for (const question of questions[plus].length){
        console.log(question);
        plus += 1
    }
    
    
}
resultLog(index)
