$(document).ready(function() {
  $("[name='text']").keyup(function() {
    const maxTweetLength = 140;
    const inputLength = $(this).val().length; // Get number of chars in input
    const $span = $(this).siblings("span")[0]; // Get span sibling
    const charsLeft = maxTweetLength - inputLength;
    $($span).text(charsLeft)
    if (charsLeft < 0) {
      $($span).addClass("negative");
    } else {
      $($span).removeClass("negative");
    }
  });
});
