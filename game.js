let buttonColors = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

let level = 0

let gameStarted = false

function nextSequence () {
   userClickedPattern = []
   level++
   $("h1").text("Level "+ level)
   let randomNumber = Math.floor(Math.random() * 4) 
   let randomChosenColour = buttonColors[randomNumber]
   gamePattern.push(randomChosenColour)
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

$(document).keydown(function () {
  if(!gameStarted) {
   gameStarted = true
   $("h1").text("Level " + level)
   nextSequence()
  }
})

$(".btn").click(function (){
     let userChosenColor = $(this).attr("id")
      userClickedPattern.push(userChosenColor)
      // console.log("Button clicked: " + userChosenColor);
      // console.log(userClickedPattern);
      playSound(userChosenColor)
      animatePress(userChosenColor)
      checkAnswer(userClickedPattern.length - 1)
})

function startOver () {
   level = 0
   gamePattern = []
   gameStarted = false
}

function playSound(name) {
   let audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }

function animatePress (currentColor) {
   $("#" + currentColor).addClass("pressed")
   setTimeout(function () {
      $("#" + currentColor).removeClass("pressed")}, 200) 
}

function checkAnswer(currentLevel) {
   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
       // console.log("Success!");
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    }else {
      let wrong = new Audio("./sounds/wrong.mp3")
      wrong.play()
      $("body").addClass("game-over")
      setTimeout(function () {
         $("body").removeClass("game-over")
      }, 200)
      $("h1").text("Game Over. Press any key to restart!")
      // console.log("Wrong!")
      startOver()
   }
}

