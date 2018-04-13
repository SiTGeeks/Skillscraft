$(function () {
  $('form').submit(function () {
    if ($('.search-input').val() === "") {
      return false;
    }
  });
})
