/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function () {
  
  // Cross-Site Scripting Prevention
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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

  // toggle new tweet button
  $('.newtweet-group').on('click', function() {
    $('.new-tweet').slideToggle('slow')
  })
  
  createTweetElement = function(tweetObj) {
    const time = createTimeAgo(tweetObj.created_at);
    const $tweet = $(`        
    <article class="tweet">
    <header>
      <div>
        <h3><img src="${tweetObj.user.avatars}"> &ensp; ${tweetObj.user.name}</h3>
        <h3 class="userID">${tweetObj.user.handle}</h3>
      </div>
    </header>
    <p>${escape(tweetObj.content.text)}</p>
    <footer>
      <div>${time}</div>
      <div class="icons"><i class="fas fa-flag"></i>  <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
    </footer>
  </article>`);
    return $tweet;
  }

  createTimeAgo = function(milliseconds) {
    let now = Date.now()
    const timePassed = now - milliseconds;
    // 1 day ago
    const daysPassed = Math.floor(timePassed/86400000)
    if(daysPassed === 1) {
      return `1 day ago`
    }
    // hours ago
    if (daysPassed < 1) {
      const hoursPassed = Math.floor(timePassed/3600000);

    // mins ago
      if (hoursPassed < 1) {
        const minsPassed = Math.floor(timePassed/60000)
        return `${minsPassed} mins ago`
      }
      return `${hoursPassed} hours ago`
    }
    // days ago
    return `${daysPassed} days ago`;
  }

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
    $('#error').empty();
    const counter = Number($(this).children('div').children('output').val())
    // console.log(counter);
    if(counter < 0) {
      const message = "<p class='error'><i class='fas fa-exclamation-triangle'></i> Oops! Your tweet content is too long! <i class='fas fa-exclamation-triangle'></i></p>"
      return $('#error').append(message)
    } else if(counter === 140) {
      const message = "<p class='error'><i class='fas fa-exclamation-triangle'></i> Oops! Your tweet does not have any characters!<i class='fas fa-exclamation-triangle'></i></p>"
      return $('#error').append(message);
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


