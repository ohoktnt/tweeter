/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class="tweet">Hello world</article>`);
  return $tweet;
}

const $tweet = createTweetElement(tweetData);

console.log($tweet);

$(document).ready(function () {
  $('#tweets-container').append($tweet);
})