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
  
  // toggle new tweet button on nav
  $('.newtweet-group').on('click', function() {
    $('.new-tweet').slideToggle('slow')
    $('#new-tweet-form').children('textarea').focus();
  })

  // date helper function 
  createTimeAgo = function(milliseconds) {
    let now = Date.now()
    const timePassed = now - milliseconds;
    // Time conditions 
    const daysPassed = Math.floor(timePassed/86400000)
    // 1 day ago
    if(daysPassed === 1) {
      return `1 day ago`
    }
    if (daysPassed < 1) {
      const hoursPassed = Math.floor(timePassed/3600000);
      if (hoursPassed < 1) {
        const minsPassed = Math.floor(timePassed/60000)
        // mins ago
        return `${minsPassed} mins ago`
      }
      // hours ago
      return `${hoursPassed} hours ago`
    }
    // days ago
    return `${daysPassed} days ago`;
  }

  // Tweet management // 

  renderTweets = function(tweetArr) {
    // to eliminate duplicates
    $('#tweets-container').empty()
    // loops through tweets data 
    for(let tweet of tweetArr) {
      // calls createtweet element for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container in order of newest first
      $('#tweets-container').prepend($tweet);
    }
  }
  
  // new tweet HTML with data filled
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
  
  // adding New Tweet
  $('#new-tweet-form').on("submit", function(event) {
    // stop the form from being submitted
    event.preventDefault();
    
    // new tweet text 
    const $tweet = $(this).children('textarea').serialize();

    // form validation for new tweet text
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
      loadTweets();
      // clear out counter and text area on submission 
      $(this).children('textarea').val('');
      $(this).children('div').children('output').val('140');
    })
    .catch((err) => {
      console.log(err)
    })
  })
  
  loadTweets = function() {
    // make request to /tweets and receive array of tweets as JSON
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
    // on successful, call the renderTWeets function passing the response
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


