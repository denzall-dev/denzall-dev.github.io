/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  };
  // Game Item Objects
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };
  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }
  function redrawGameItem() {
    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
  }
  $(document).on("keyup", handleKeyup);
  $(document).on("keydown", handleKeydown);
  function handleKeyup(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT)
      walker.speedX = 0;
    if (event.which === KEY.UP || event.which === KEY.DOWN) walker.speedY = 0;
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
   // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeydown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 // Helper function to prevent the walker object from leaving the board
 function wallCollision() {
  // Get the boundaries of the board
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();
  var walkerSize = $("#walker").width();
  if (walker.x < 0)walker.x = 0;
  if (walker.y < 0)walker.y = 0;
  if (walker.x + walkerSize > boardWidth) walker.x = boardWidth - walkerSize;
  if (walker.y + walkerSize > boardHeight)
    walker.y = boardHeight - walkerSize
 }

 






  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
