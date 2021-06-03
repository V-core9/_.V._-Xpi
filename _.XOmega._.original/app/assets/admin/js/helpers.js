// 1. Admin All Users pagination change value....resubmit
$(document).on('submit', '.adminListUsers', function(e){
    e.preventDefault();
    loadAdminUsersList();
});
// END 1. Admin All Users pagination change value....resubmit



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