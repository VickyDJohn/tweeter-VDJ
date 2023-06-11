$(document).ready(function() {
  const maxLength = 140;
  const counter = $('.counter'); 

  $('#new-tweet textarea').on('input', function() {
    const inputValue = $(this).val();
    const remainingChars = maxLength - inputValue.length;
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.addClass('exceeded');
    } else {
      counter.removeClass('exceeded');
    }
  });
});
