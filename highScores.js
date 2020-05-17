const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList.innerHTML = highScores
    .map(score => { //we convert array and convert each of those itmes into something else
        return `<li class="high-score">${score.name} - ${score.score}</li>`; 
    })
    .join("");