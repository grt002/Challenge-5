$(document).ready(function() {

  // Call JQuery to ensure that code isn't run until the browser has finished rendering all the elements in the HTML.
  const dateContainer = $('#currentDay');
  
    function displayCurrentDate() {
      const now = dayjs();
      const formattedDate = now.format('dddd, MMMM D, YYYY');
      dateContainer.text(formattedDate);
    }
  
    function updateTimeblockStatus() {
      // Get the current time using Day.js
      var currentTime =dayjs().hour();
  
      // Loop through each timeblock
      $(".time-block").each(function () {
        var blockTime = parseInt($(this).attr("id").split("-")[1]);
  
        // Check if the timeblock is in the past, present, or future
        if (blockTime < currentTime) {
          $(this).addClass("past");
        } else if (blockTime ===currentTime) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Call updateTimeblockStatus function to update the timeblock status on page load
    updateTimeblockStatus();

    displayCurrentDate();
  
    $('.saveBtn').click(function() {
      // Get the text value of the description textarea for the timeblock
      var description = $(this).siblings('textarea').val();
  
      // Get the id of the timeblock that the button is in
      var timeblockID = $(this).closest('.time-block').attr('id');
  
      //Save the description to local storage using the timeblock id as the key
      localStorage.setItem(timeblockID, description);
    });
  
    // Get user input that was saved in localStorage and set the values of the corresponding textarea elements
    $(".time-block").each(function() {
      var timeblockID = $(this).attr("id");
      var description = localStorage.getItem(timeblockID);
  
      if (description !== null) {
        $(this).children(".description").val(description);
      }
    });
  
    // Event listener for clicking a timeblock
    $(".time-block").on("click", function() {
      // Select description textarea element within the clicked timeblock
      var descriptionEl = $(this).find(".description");
  
      // Set the focus on the textarea element
      descriptionEl.focus();
    }); 
  });