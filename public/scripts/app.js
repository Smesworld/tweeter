/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const timeSinceDate = function(date) {
  const min = 1000 * 60;
  const hour = min * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  const currentDate = new Date();
  const diffDate = currentDate - date;

  if (diffDate / min < 1) {
    return `< min`;
  } else if (diffDate / hour < 1) {
    return `${Math.round(diffDate / min)} min(s)`;
  } else if (diffDate / day < 1) {
    return `${Math.round(diffDate / hour)} hour(s)`;
  } else if (diffDate / month < 1) {
    return `${Math.round(diffDate / day)} day(s)`;
  } else if (diffDate / year < 1) {
    return `${Math.round(diffDate / month)} month(s)`;
  } else {
    return `${Math.round(diffDate / year)} year(s)`;
  }
};

const createTweetElement = function(tweetObject) {
  const $tweet = $("<article>").addClass("tweet");

  const markup = `
    <header>
      <img src=${tweetObject.user.avatars}>
      <span>${tweetObject.user.name}</span>
      <a>${tweetObject.user.handle}</a>
    </header>
    <span>${escape(tweetObject.content.text)}</span>
    <footer>
      <span>${timeSinceDate(tweetObject.created_at)}</span>
      <img src="/images/flag-pole.svg">
      <img src="/images/retweet-arrows.svg">
      <img src="/images/like.svg">
    </footer>
  `;

  $($tweet).append(markup);

  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

// Get all tweets
const loadTweets = function(lastTweet = false) {
  $.ajax("/tweets")
    .then((tweets) => {
      if (lastTweet) {
        renderTweets([tweets[tweets.length - 1]]);
      } else {
        renderTweets(tweets);
      }
    })
    .fail((error) => {
      renderError(error.responseJSON.error);
    });

};

// Display error message
const renderError = function(message) {
  $('.error').text(message).slideDown("slow");
};

// Hide and remove error message
const removeError = function() {
  $('.error').text("").slideUp(1);
};

$(document).ready(() => {
  // Render all current tweets
  loadTweets();

    // Submit tweets
    $('#post-tweet').submit(function(event) {
      event.preventDefault();
      removeError();
  
      const $children = $(this).children();
      const inputLength = $($children[0]).val().length;
      const data = $($children[0]).serialize();
  
      if (inputLength <= 0) {
        renderError("Please enter a tweet.");
      } else if (inputLength > 140) {
        renderError("Please shorten the tweet.");
      } else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: data,
          success: () => {
            loadTweets(true); // Render added tweet
          }
        })
          .then(() => {
            $(this)[0].reset(); // Reset form
            $($children[2]).text(140); // Reset char counter to 140
          })
          .fail((error) => {
            renderError(error.responseJSON.error);
          });
      }
    });

});
