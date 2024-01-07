var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  var lastIndex = userClickedPattern.length-1;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(lastIndex);
});

$(document).keydown(function(){

  if (!started) {

    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }

});

function nextSequence(){

  level++;
  $("h1").text("Level " + level);

  var randomNum = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio(randomChosenColor+".mp3");
  audio.play();

}

function playSound(name){

  var audio = new Audio(name+".mp3");
  audio.play();

}

function animatePress(currentColor){
$("."+currentColor).addClass("pressed");
setTimeout(function(){
  $("."+currentColor).removeClass("pressed");
},100);

}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    setTimeout(function () {
      nextSequence();
    }, 1000)
  } else {
    playSound("wrong")
    
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
