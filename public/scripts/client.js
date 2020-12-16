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

$(document).ready(function () {

  renderTweets = function(tweetArr) {
    // loops through tweets
    for(let tweet of tweetArr) {
      console.log(tweet)
      // calls createtweet elemnt for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }
  
  createTweetElement = function(tweetObj) {
    const date = createDate(tweetObj.created_at);
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
      <div>${date}</div>
      <div class="icons"><i class="fas fa-flag"></i>  <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
    </footer>
  </article>`);
    return $tweet;
  }
  
  createDate = function(milliseconds) {
    const date = new Date(milliseconds).toDateString();
    return date;
  }
  
  renderTweets(data)
  
  // will collect information from form
  $('#new-tweet-form').on("submit", function(event) {
    // stop the form from being submitted
    event.preventDefault();
    console.log('submit default stopped')
    
    const $tweet = $(this).children('textarea').serialize();
    // const tweetText = $tweet.val();
    console.log($tweet)
    
    // Create AJAX request
    $.ajax({
      method: 'POST',
      url: 'http://localhost:8080/tweets',
      data: $tweet
    })
      .done(function () {
        console.log('ajax data sent?')
      })
      .catch((err) => {
        console.log(err)
      })
    

    $(this).children('textarea').val('');
  })
  
  // const addTweet = (data) => {
  //   // Create an AJAX request 
  //   $.ajax({
  //     method: 'POST',
  //     url: 'http://localhost:8080'
  //   })
  //     .then((result) => {
  //       console.log(data)
  //       console.log(result);
  //     })
  //     .catch((err) => console.log(err))
  // }    
  
})


