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

  $('form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const $tweetContent = $form.find('textarea[name="text"]');
    const $errorMessage = $form.find('.error-message');

    $errorMessage.remove(); // Clear any previous error messages

    // Validation checks
    if ($tweetContent.val().trim() === '') {
      const errorMessage = $('<p class="error-message">Tweet content cannot be empty</p>');
      $form.append(errorMessage);
      return;
    }

    if ($tweetContent.val().length > 140) {
      const errorMessage = $('<p class="error-message">Tweet content exceeds the character limit</p>');
      $form.append(errorMessage);
      return;
    }

    const formData = $form.serialize();

    $.post('/tweets', formData)
      .then(function(response) {
        $tweetContent.val(''); // Clear the tweet content textarea
        loadTweets(); // Fetch and render the updated tweets
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