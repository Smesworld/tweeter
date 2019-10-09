/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1570585909000
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1570590855000
    }
]

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
}

const createTweetElement = function(tweetObject) {
  const name = tweetObject.user.name;
  const imgLocation = tweetObject.user.avatars;
  const handle = tweetObject.user.handle;
  const content = tweetObject.content.text;
  const date = tweetObject.created_at;

  const $tweet = $("<article>").addClass("tweet");

  const timeSince = timeSinceDate(date);

  const markup = `
    <header>
      <img src=${imgLocation}>
      <span>${name}</span>
      <a>${handle}</a>
    </header>
    <span>${content}</span>
    <footer>
      <span>${timeSince}</span>
      <span>Like</span>
    </footer>
  `;

  $($tweet).append(markup);

  return $tweet;
}

$(document).ready( () => {
  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  // renderTweets(data);

  // Get tweets
  const loadTweets = function() {
    $.ajax("/tweets")
    .then((tweets) => {
      renderTweets(tweets);
    })
    .fail((error) => {
      console.log("ABORT! ALL IS FIRE!!", error);
    });

  }();

  const loadTweet = function() {
    $.ajax("/tweets")
    .then((tweets) => {
      renderTweets([tweets[tweets.length - 1]]);
    })
    .fail((error) => {
      console.log("ABORT! ALL IS FIRE!!", error);
    });
  };

  // Submit tweets
  $('#post-tweet').submit( function(event) {
    event.preventDefault();
    // console.log($(this).val());
    const data = $(this).serialize();
    if (data.length <= 5) {
      // console.log("put a thing in silly")
      alert("Ya din say nufin");
    } else if (data.length > 145) {
      // console.log('Shit son, say less!');
      alert(`Oi! Say less =\\ ${data.length}`);
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: () => {loadTweet()}
      }).then(() => {
        $(this)[0].reset();    
      })
      .fail((error) => {
        console.log("noooooo", error);
      })
    }
  });
});
