$(document).ready(function () {
  
  $('#tweet-text').on('input', function() {
    let charCount = $(this).val().length;
    let newCount = 140 - charCount;
    $(this).siblings().children('.counter').val(newCount);
    if (newCount < 0) {
      $(this).siblings().children('.counter').addClass('negative')
    } else {
      $(this).siblings().children('.counter').removeClass('negative')
    }
  })

});


