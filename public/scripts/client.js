$(document).ready(function() {
// Function to create a new tweet element based on the tweet data
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <div class="top-left">
              <img src="${escape(tweet.user.avatars)}">
              <h4>${escape(tweet.user.name)}</h4>
            </div>
            <h4>${escape(tweet.user.handle)}</h4>
          </div>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
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
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(response) {
        renderTweets(response);
      })
      .catch(function(error) {
        console.error('Error loading tweets:', error);
      });
  };

  loadTweets();

  // Form submission event handler
  $('form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const $tweetContent = $form.find('textarea[name="text"]');
    const $errorContainer = $('#error-message');

    $errorContainer.slideUp(); // Slide up the error container

    // Validation checks
    if ($tweetContent.val().trim() === '') {
      $errorContainer.html('⚠️Tweet content cannot be empty').slideDown();
      return;
    }

    if ($tweetContent.val().length > 140) {
      $errorContainer.html('⚠️Tweet content exceeds the character limit').slideDown();
      return;
    }

    const formData = $form.serialize();

    // POST request to submit the tweet
    $.post('/tweets', formData)
      .then(function(response) {
        $tweetContent.val('');
        loadTweets();
      })
      .catch(function(error) {
        console.error('Error submitting tweet:', error);
      });
  });
});


// Function to escape special characters in HTML
function escape(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}