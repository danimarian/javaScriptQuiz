const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


const MAX_HIGH_SCORES = 5;//he have a list with only 5 high scores saved


finalScore.innerText = mostRecentScore;


username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
  });


saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

const score = {
     score: Math.floor(Math.random() * 100),
     name: username.value
  };
highScores.push(score);
highScores.sort((a,b)  => b.score - a.score); //if b score is high than the a score put b before a
highScores.splice(5); //at index 5 start cutting everyithing after that

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign("index.html");//go back home
};
