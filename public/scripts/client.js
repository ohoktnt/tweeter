/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function () {

  renderTweets = function(tweetArr) {
    // to eliminate duplicates
    $('#tweets-container').empty()
    // loops through tweets
    for(let tweet of tweetArr) {
      console.log(tweet)
      // calls createtweet elemnt for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
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
  
  // renderTweets(data)
  

  // adding New Tweets
  // will collect information from form
  $('#new-tweet-form').on("submit", function(event) {
    // stop the form from being submitted
    event.preventDefault();
    console.log('submit default stopped')
    
    const $tweet = $(this).children('textarea').serialize();
    // const tweetText = $tweet.val();
    console.log($tweet)
    
    // form validation
    const counter = Number($(this).children('div').children('output').val())
    console.log(counter);
    if(counter < 0) {
      return alert("Oops! Your tweet content is too long!")
    }
    
    if(counter === 140) {
      return alert("Oops! Your tweet has not been entered!")
    }


    // Create AJAX request - for new tweet

    $.ajax({
      method: 'POST',
      url: 'http://localhost:8080/tweets',
      data: $tweet
    })
      .done(function () {
        console.log('ajax data sent?')
        loadTweets();
      })
      .catch((err) => {
        console.log(err)
      })
    
    $(this).children('textarea').val('');
    $(this).children('div').children('output').val('140');
  })
  
  loadTweets = function() {
    // make request to /tweets and recieve array of tweets as JSON
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
    // on sucess, call the renderTWeets function passing the response
      .then((result) => {
        console.log(result)
        renderTweets(result)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  loadTweets();
  
})


