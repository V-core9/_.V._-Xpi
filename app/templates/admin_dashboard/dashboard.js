
(function($) {
  "use strict"; // Start of use strict
  var dashboard_settings=getCookie("dashboard_settings");
      dashboard_settings = dashboard_settings.split('<>');
      if (dashboard_settings[0] != "" && dashboard_settings[0] == "collapsed") {
        $("#page-top").toggleClass("sidenav-toggled");
        $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
        $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
      }
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("#page-top").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    if ($('#page-top').hasClass('sidenav-toggled')){
        setCookie("dashboard_settings", "collapsed", 30);
    } else {
        document.cookie = "dashboard_settings=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".nav-item").mouseenter(function(e) {
    e.preventDefault();
    if ($("#page-top").hasClass("sidenav-toggled")){
        $(this).addClass("collapsed-toggle-visible");
    }
  });
  $(".nav-item").mouseleave(function(e) {
    e.preventDefault();
    if ($(this).hasClass('collapsed-toggle-visible') && !$('.collapsed-toggle-visible').children('.collapsed').length){
        $(this).children('.nav-link-collapse').click();
    }
    $(this).removeClass("collapsed-toggle-visible");
  });
  
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('#page-top.fixed-nav .navbar-sidenav, #page-top.fixed-nav .sidenav-toggler, #page-top.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, #page-top').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
  
})(jQuery); // End of use strict





  $(function() {
    getAllUsersAdmin();
  })
  
  function getAllUsersAdmin(){
    
          // validate jwt to verify access
          var jwt = getCookie('jwt');
          $.post( frontConfig.apiUrl + "admin/users/all.php", JSON.stringify({ jwt:jwt })).done(function(result) {
              
                $(".numberOfUsers").text(result.data);
  
          })
       
          // show login page on error
          .fail(function(result){
              showLoginPage();
                  toastr.success( result.responseJSON.message+"; Error:"+result.responseJSON.error , "Pages: Dashboard");
          });
  }


  $( document ).ready(function() {
    $('.content-container').css({'transition-delay': '1s','opacity' : '1'});
});