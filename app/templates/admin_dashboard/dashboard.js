$('#menu-action').click(function() {
    $('.sidebarDashboard').toggleClass('active');
    $('.main').toggleClass('active');
    $(this).toggleClass('active');
  
    if ($('.sidebarDashboard').hasClass('active')) {
      $(this).find('i').addClass('fa-close');
      $(this).find('i').removeClass('fa-bars');
      setCookie("dashboard_settings", "expanded", 30);
    } else {
      $(this).find('i').addClass('fa-bars');
      $(this).find('i').removeClass('fa-close');
      document.cookie = "dashboard_settings=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  });
  
  // Add hover feedback on menu
  $('#menu-action').hover(function() {
      $('.sidebarDashboard').toggleClass('hovered');
  });
  
  $(function() {
    
      var dashboard_settings=getCookie("dashboard_settings");
      dashboard_settings = dashboard_settings.split('<>');
      if (dashboard_settings[0] != "" && dashboard_settings[0] == "expanded") {
        $('.sidebarDashboard').addClass('active');
        $('.main').addClass('active');
        $('#menu-action').toggleClass('active');
        $('#menu-action').find('i').addClass('fa-close');
        $('#menu-action').find('i').removeClass('fa-bars');
      }
  });
  
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