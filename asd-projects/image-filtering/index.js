// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  //applyFilter();
  //applyFilter(reddify);
  //applyFilter(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  applyFliterNoBackground(reddify);
  applyFliterNoBackground(decreaseBlue);
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
//todo 1
function applyFilter(filterFunction) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      //todo 2
      let rgbString = image[i][j];

      let rgbNumbers = rgbStringToArray(rgbString);

      filterFunction(rgbNumbers);

      image[i][j] = rgbArrayToString(rgbNumbers);
    }
    //applyFilter(reddify);
  }
}

//function applyFilter() {}
// TODO 7: Create the applyFilterNoBackground function
function applyFliterNoBackground(filterFunction) {
  const backgroundColor = image[0][0];

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] !== backgroundColor) {
        let rgbString = image[i][j];

        let rgbNumbers = rgbStringToArray(rgbString);

        filterFunction(rgbNumbers);

        image[i][j] = rgbArrayToString(rgbNumbers);
      }
    }
  }
}
// TODO 5: Create the keepInBounds function
function keepInBounds(number) {
  return Math.max(0, Math.min(255, number));
}
// TODO 3: Create reddify function
function reddify(rgbArray) {
  rgbArray[RED] = 200;
}
// TODO 6: Create more filter functions
function decreaseBlue(rgbArray) {
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] - 50);
}
function increaseGreenByBlue(rgbArray) {
  rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + rgbArray[BLUE]);
}
// CHALLENGE code goes below here
