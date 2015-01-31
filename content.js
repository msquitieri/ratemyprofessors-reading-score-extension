function isValid(comment) {
  if ($.trim(comment) == 'No Comments') return false;
  return true;
}

$('.comments p').each(function(i, comment) {
  var text = $(comment).html(),
      $div, $header, message;

  if (isValid(text)) {
    $div = $("<div></div>").addClass('rate-my-professors-extension');
    $header = $("<h5></h5>");

    message = 'This user received a reading score of <strong>123.21</strong> can be <strong class="green">trusted</strong>.';
    $header.html(message);
    $div.append($header);
    $(comment).parent().prepend($div);
  }
});