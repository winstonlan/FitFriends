$(function () {
    var sidenav = $('.sidenav');
    var top = sidenav.offset().top;

    $(window).scroll(function (event) {
      var y = $(this).scrollTop();
      if (y >= top) {
        sidenav.addClass('fixed');
      } else {
        sidenav.removeClass('fixed');
      }
    });
});