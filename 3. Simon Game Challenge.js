var buttonColours = ["Red", "Blue", "Green", "Yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playTheSound(randomChosenColour);
}

$(document).keydown(function () {
  if (!start) {
    nextSequence();
    start = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playTheSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playTheSound(colour) {
  var sound = new Audio("./Project Sounds/" + colour + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("Pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("Pressed")
  }, 101);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    var sound = new Audio("./Project Sounds/Wrong.mp3");
    sound.play();
    $("body").addClass("Game-Over");
    setTimeout(function () {
      $("body").removeClass("Game-Over")
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  start = false;
}
