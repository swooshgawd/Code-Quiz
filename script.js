//Create a start button
var startButton = document.querySelector("#Start-btn")
var startDiv = document.querySelector("#Start")
startButton.addEventListener("click", init)
//Create multiple questions with answer choices
var questionDiv = document.querySelector("#Questions")
var question1 = document.querySelector("#Question1")
var currentQuestion = 1

//Create a timer
var timer = document.querySelector("#timer")
var timeLeft = 99
function startTime() {
    var newTime = setInterval(() => {
        timer.textContent = timeLeft
        timeLeft--
        if (timeLeft < 0) {
            timeLeft = 0
            clearInterval(newTime)
        }
    }, 1000);
}
//Create a high score list with initials
var entryDiv = document.querySelector("#initialEntry")
var entryForm = document.querySelector("#initialForm")
var entryInput = document.querySelector("#initialInput")
var scoreList = document.querySelector("#highScores")
var score
var initialsList = JSON.parse(localStorage.getItem("highScores")) || []
entryForm.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log(entryInput.value)
    var newScore = {
        initials: entryInput.value,
        highScore: score
    }
    initialsList.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(initialsList))
    entryDiv.classList.add("hidden")
    scoreList.classList.remove("hidden")

    initialsList.sort(function(a,b){
        return b.highScore - a.highScore
    })
    for (let i = 0; i < initialsList.length; i++) {
        var entry = document.createElement("h2")
        scoreList.appendChild(entry)
        entry.textContent = initialsList[i].initials + ": " + initialsList[i].highScore
    }
})

function endGame() {
    timer.classList.add("hidden")
    entryDiv.classList.remove("hidden")


}

//When user selects an answer you lead them to next question
function init() {
    startDiv.innerHTML = ""
    document.querySelector("body").addEventListener("click", function (event) {
        if (event.target.matches("button") && !event.target.matches("#Start-btn")) {
            verifyAnswer(event)
        }
    })
    startTime()
    question1.classList.remove("hidden")
}

function verifyAnswer(event) {
    if (event.target.matches(".correct")) {
        console.log("correct")
    }
    else {
        timeLeft -= 5
    }

    event.target.parentElement.classList.add("hidden")
    currentQuestion++
    if (currentQuestion > 4) {
        score = timeLeft
        endGame()
    }
    else {
        document.querySelector("#Question" + currentQuestion).classList.remove("hidden")
    }
}

function showQuestion() {
    var questionTitle = document.createElement("h1")
    questionTitle.textContent = questions[questionIndex].question
    questionDiv.append(questionTitle)

    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        var choiceButton = document.createElement("button")
        choiceButton.textContent = questions[questionIndex].choices[i]
        questionDiv.append(choiceButton)

    }
    //
}