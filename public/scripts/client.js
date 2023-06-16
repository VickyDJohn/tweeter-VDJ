$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <div class="top-left">
              <img src="${tweet.user.avatars}">
              <h4>${tweet.user.name}</h4>
            </div>
            <h4>${tweet.user.handle}</h4>
          </div>
        </header>
        <div class="tweet-content">
          <p><b>${tweet.content.text}</b></p>
        </div>
        <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="actions">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').append($tweet);
    }
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(response) {
        renderTweets(response);
      });
  };

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const $tweetContent = $form.find('textarea[name="text"]');

    // Clear any previous error messages
    $('.error-message').remove();

    // Validation checks
    if ($tweetContent.val().trim() === '') {
      displayError('Tweet content is required.');
      return;
    }

    if ($tweetContent.val().length > 140) {
      displayError('Tweet content exceeds the character limit of 140.');
      return;
    }

    const formData = $form.serialize();

    // Send POST request to the server
    $.post('/tweets', formData)
      .then(function(response) {
        console.log('Tweet submitted:');
      })
      .catch(function(error) {
        console.error('Error submitting tweet:', error);
      });
  });

  // Function to display an error message
  const displayError = function(message) {
    const $errorMessage = $('<p>').addClass('error-message').text(message);
    $('form').append($errorMessage);
  };

});
