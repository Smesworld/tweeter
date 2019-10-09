/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObject) {
  const name = tweetObject.user.name;
  const imgLocation = tweetObject.user.avatars;
  const handle = tweetObject.user.handle;
  const content = tweetObject.content.text;
  const date = tweetObject.created_at;

  const $tweet = $("<article>").addClass("tweet");

  const 

  const markup = `
    <header>
      <img src=${imgLocation}>
      <span>${name}</span>
      <a>${handle}</a>
    </header>
    <span>${content}</span>
    <footer>
      <span>Date</span>
      <span>Like</span>
    </footer>
  `;

}