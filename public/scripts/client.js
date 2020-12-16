/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Fake data taken from initial-tweets.json
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
    "created_at": 1461113959088
  }
]


renderTweets = function(tweetArr) {
  // loops through tweets
  for(let tweet of tweetArr) {
    console.log(tweet)
    // calls createtweet elemnt for each tweet
    const $tweet = createTweetElement(tweet);
    
    // takes return value and appends it to the tweets container
    $(document).ready(function () {
      $('#tweets-container').append($tweet);
    })
  }
  
}

createTweetElement = function(tweetObj) {
  const $tweet = $(`        
  <article class="tweet">
  <header>
    <div>
      <h3><img src="${tweetObj.user.avatars}"> ${tweetObj.user.name}</h3>
      <h3 class="userID">${tweetObj.user.handle}</h3>
    </div>
  </header>
  <p>${tweetObj.content.text}</p>
  <footer>
    <div>${tweetObj.created_at}</div>
    <div class="icons"><i class="fas fa-flag"></i>  <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
  </footer>
</article>`);
  return $tweet;
}


renderTweets(data)

