// Initial array of topics
var topics = ["The Office", "Game of Thrones", "The OA", "This Is Us", "The Flash", "How To Get Away With Murder", "The Walking Dead"];
// Function for displaying buttons
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    //Dynamically create buttons for each show in the array
    var a = $("<button>");
    a.addClass("show");
    a.attr("data-show", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}
// This function handles events where one button is clicked
$("#add-show").on("click", function(event) {
  event.preventDefault();
  var addShow = $("<button>");
  $("#buttons-view").append(addShow);
  // This line grabs the input from the textbox
  var show = $("#show-input").val().trim();
  console.log(show);
  // Adding the show from the textbox to our array
  topics.push(show);
  console.log(topics);
  // Calling renderButtons which handles the processing of our show array
  renderButtons();
});

// Function for displaying the show gif
$(document).on("click", ".show", displayGif);
// Calling the renderButtons function to display the initial buttons
renderButtons();

// Function for dumping gifs and ratings from Giphy website
function displayGif() {
  //used empty function to empty out any previously clicked TV shows
  $('#topics-view').empty();
  var show = $(this).attr("data-show");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=xUjvfL3IQgQb7N3vr78keiWRqnw0uNvK&limit=10";
  //use ajax function to pull data from giphy site
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  //use promise function to dump data into
  .then(function(response) {
    console.log(response);
    results = response.data;
    console.log(results);

    $.each(results, function(key,result) {
      //define variables needed in loop
      var rating = result.rating;
      // var title = result.title;
      // var stillImage = result.images.fixed_height_still.url;
      // var animatedImage = result.url;
      // var initialState = "animated";
      var container = $('<div>');
      //dynamically creates a p tag to show the rating of the gif
      var p_rate = $("<p>").text(rating); // example: <p>g</p>
      //dynamically creates an img tag to display the gifs
      var gifImage = $("<img>");
      gifImage.attr('id', 'showGif');
      gifImage.attr("src", result.images.original_still.url);
      gifImage.attr("data-still", result.images.original_still.url);
      gifImage.attr("data-animate", result.images.original.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("alt", "TV-show gif");
      //DONE with img
      //appending the rating and image inside the dynamically made div container
      container.append(p_rate).append(gifImage);
      $('#topics-view').append(container);
    })
  });
}
//to pause/play gif
function dataState(){
  var state = $(this).attr("data-state");
  var animateImage = $(this).attr("data-animate");
  var stillImage = $(this).attr("data-still");
  //if statement will allow the state of the gif to change from still to animate when clicked
  if (state == "still") {
    $(this).attr("src", animateImage);
    $(this).attr("data-state", "animate");
  } else if (state == "animate") {
    $(this).attr("src", stillImage);
    $(this).attr("data-state", "still");
  }
}
$(document).on("click", "#showGif", dataState);
