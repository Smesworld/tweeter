const onKeyUp = function() {
  const maxTweetLength = 140;
  const inputLength = $(this).val().length; // Get number of chars in input
  const $span = $(this).siblings("span")[0]; // Get span sibling
  const charsLeft = maxTweetLength - inputLength;
  $($span).text(charsLeft);
  if (charsLeft < 0) {
    $($span).addClass("negative");
  } else {
    $($span).removeClass("negative");
  }
};

$(document).ready( () => {
  $("[name='text']").keyup(onKeyUp);

  // Reveal and hide new tweet bar
  $('#compose').click(function() {
    if ($('.new-tweet').is(":hidden")) {
      $('.new-tweet').slideDown("slow");
      $("[name='text']").focus();

    } else {
      $('.new-tweet').slideUp("slow");
      removeError();
    }
  });

  // Reveal and hide scroll button
  $( window ).scroll(function() {
    if ($(this).scrollTop() >= 200) {
      $(".scrollButton").show();
      $("#compose").hide();
      removeError();
      $('.new-tweet').slideUp("slow");
    } else {
      $(".scrollButton").hide();
      $("#compose").show();
    }
  })

  // Scroll to top and activate compose area
  $(".scrollButton").click(function() {
    $("html, body").animate({ scrollTop: 0}, "slow", "swing", function() {
      $('.new-tweet').slideDown("slow");
      $("[name='text']").focus();
      $(".scrollButton").hide();
    });
  })

});
