
// 6. openUsersAdmin
function openUsersAdmin(){
    clearResponse();
    
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post( frontConfig.apiUrl + "admin/dashboard/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
        $(".main").load("templates/admin/allUsers/index.temp.html");
        omegaLoadScript('templates/admin/allUsers/main.js','allUsersMainJS');
        history.pushState(null, 'All Users', frontConfig.appUrl+'admin/allUsers')
    })
    
    // show login page on error
    .fail(function(result){
        showLoggedOutPage();
        toastr.success( result.responseJSON.message+"; Error:"+result.responseJSON.error , "Admin Token Validation");
    });
}
