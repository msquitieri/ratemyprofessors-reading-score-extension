var CONTAINER_CLASS = 'rate-my-professors-extension';

function isValid(comment) {
  if ($.trim(comment) == 'No Comments') return false;
  return true;
}

function getMessageBasedOnScore(score) {
  var message = 'This user received a reading score of <strong>'+score+'</strong> and ';

  if (score < 4.00) {
    message += 'should be <strong class="red">ignored</strong>.';
  } else if (score < 6.00) {
    message += 'should be treated with <strong class="orange">caution</strong>.';
  } else {
    message += 'can be <strong class="green">trusted</strong>.';
  }

  return message;
}

function lightenComment(comment) {
  $(comment).parents("tr").css('opacity', '0.5');
}

function injectReadingScores() {
  $('.comments p').each(function(i, comment) {
    var text = $(comment).html();

    if (isValid(text)) {
      var $div = $("<div></div>").addClass(CONTAINER_CLASS),
          $header = $("<h5></h5>"),
          score = readability.flesch_kincaid_grade_level(text).toFixed(2),
          message = getMessageBasedOnScore(score);

      if (score < 4.00) {
        lightenComment(comment);
      }

      $header.html(message);
      $div.append($header);
      $(comment).parent().prepend($div);
    }
  });
}

// Removes added Reading Scores div containers
// from the page.
function clearReadingScores() {
  $('.'+CONTAINER_CLASS).remove();
}

// Make sure to add the reading scores to new items loaded
// when user clicks the Load More button.
$('#loadMore').on('click', function() {
  setTimeout(function() {
    clearReadingScores();
    injectReadingScores();
  }, 1000);
});

injectReadingScores();