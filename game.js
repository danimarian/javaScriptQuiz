const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); //i used array.from to convert the nodelist to array
const progressText = document.getElementById('progressText'); //progress text bar
const scoreText = document.getElementById('score'); //score we update
const progressBarFull = document.getElementById("progressBarFull");

let curentQuestion = {};
let acceptingAnswers = false; //after a person answer we create a delay for answer
let score = 0; //the score so it starts with 0
let questionCounter = 0; //at what question are you now
let availableQuestions = []; //copy of all question set so we can find a unique question to the user

let questions = [
    {//1question
        question : "Inside which HTML element do we put the JavaScript",
        choice1:"<js>",
        choice2:"<javascrip>",
        choice3:"<scripting>",
        choice4:"<script>",
        answer:4
    },
    {//2question
        question :  "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1:"<script href='example.js'",
        choice2:"<script name='xxx.js'>",
        choice3:"<script src='xxx.js'>",
        choice4:"<script file='xxx.js'>",
        answer:3
    },
    {//3question
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
      },
      {//4question
        question: "Which of the following is true about variable naming conventions in JavaScript?",
        choice1: "JavaScript variable names must begin with a letter or the underscore character.",
        choice2: "JavaScript variable names are case sensitive.",
        choice3: "Both of the above.",
        choice4: "None of the above.",
        answer: 3
      },
      {//5question
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        choice1: "last()",
        choice2: "put()",
        choice3: "push()",
        choice4: "None of the above.",
        answer: 3
      },
      {//6question
        question: "Which of the following function of Number object returns a string value version of the current number?",
        choice1: "toString()",
        choice2: "toFixed()",
        choice3: "toLocaleString()",
        choice4: "toPrecision()",
        answer: 1
      },
      {//7question
        question: "Which of the following function of String object returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order?",
        choice1: "localeCompare()",
        choice2: "search()",
        choice3: "substr()",
        choice4: "concat()",
        answer: 1
      },
      {//8question
        question: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
        choice1: "pop()",
        choice2: "push()",
        choice3: "join()",
        choice4: "map()",
        answer: 2
      },
      {//9question
        question: "Which of the following function of Array object represents the source code of an object?",
        choice1: "toSource()",
        choice2: "splice()",
        choice3: "toString()",
        choice4: "unshift()",
        answer: 1
      },
      {//10question
        question: "Which of the following function of String object causes a string to be displayed as a subscript, as if it were in a <sub> tag?",
        choice1: "sup()",
        choice2: "small()",
        choice3: "strike()",
        choice4: "sub()",
        answer: 4
      },
    ];


//CONSTS

const CORRECT_BONUS = 10; //when you get a correct answer you get 10 points
const MAX_QUESTIONS = 10; // how many question user get before he finish


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // i ussed spread array (...) take question array and put in a new array
    console.log();
    getNewQuestion();
};


getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) { //if we dont have any question left or we give the use all the questions we wanted
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = "Question" + questionCounter + "/" + MAX_QUESTIONS; //concatenation between question answered and the max questions we have
   
   
   
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //1 divided by question and multiply with 100 for round %



    const questionIndex = Math.floor(Math.random() * availableQuestions.length); //we based this on how many questions we have
    currentQuestion = availableQuestions[questionIndex]; //refferencte to the current question
    question.innerText = currentQuestion.question; // set the html element 

    choices.forEach( choice => {//grab choices
        const number = choice.dataset['number']; //get number from dataset number
        choice.innerText = currentQuestion['choice' + number]; //we get the corect choice from curent question
    });

     availableQuestions.splice(questionIndex, 1); //take the available question and get rid of that so we can go for the next questions
     acceptingAnswers = true;
};


choices.forEach( choice => {  
    choice.addEventListener("click", e => { 
        if (!acceptingAnswers) return; 
        
        acceptingAnswers = false;
        const selectedChoice = e.target; 
        const selectedAnswer = selectedChoice.dataset["number"];
        
        let classToApply = "incorrect"; //set default incorrect 
        if (selectedAnswer == currentQuestion.answer) { //if its correct update as correct
            classToApply = 'correct';
        };

        if(classToApply === 'correct') { //if what we selected is correct ->
            incrementScore(CORRECT_BONUS); //-> we increment the score with the bonus
        }

        selectedChoice.parentElement.classList.add(classToApply); //if the choice is what we clicked we applied class to see background color
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply); //we remove the class just to see the background color
            getNewQuestion();//afer we select a question go for the new one
        },1000);//1000 for how long the delay will be 
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score; //update the score text
};

startGame();