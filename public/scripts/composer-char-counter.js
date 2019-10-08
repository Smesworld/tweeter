$(document).ready(function() {
  $("[name='text']").keyup(function() {
    const inputLength = $(this).val().length; // Get number of chars in input
    const $span = $(this).siblings("span")[0]; // Get span sibling
    const charsLeft = 140 - inputLength;
    if (charsLeft < 0) {
      $($span).text(charsLeft).addClass("negative");
    } else {
      $($span).text(charsLeft).removeClass("negative");
    }
  });
});
