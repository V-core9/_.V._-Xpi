const { get } = require("jquery");


// 6. openUsersAdmin
function openUsersAdmin(){
    clearResponse();
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post(frontConfig.apiUrl+"admin/users/list_users.php", JSON.stringify({ jwt:jwt })).done(function(result) {
            var html = '<h2>All Users</h2>';
            // if response is valid, put user details in the form
            html += '<div class="omegaList usersList">';
            for (i = 0; i < result.data.list.length; i++) {
                html += result.data.list[i].id +" "+ result.data.list[i].username +"<br>";
              }
            html += '</div>';
            
            html +="<form class='paginationForm adminListUsers'><input type='number' name='perPage' id='perPage' value="+getCookie('perPage')+"><input type='number' name='currentPage' id='currentPage' value="+getCookie('currentPage')+"><button type='submit'>GO</button></form>"
            html +="<span>Number of users:"+ result.data.allUsersNum +"</span> <span>Number of pages: "+ Math.ceil(result.data.allUsersNum/getCookie('perPage')) +"</span>";
            //html += JSON.stringify( result.data );
             
            clearResponse();
            $('.main').html(html);
            init_colorpicker_fn( '#cp2', 'rgb' );
            history.pushState(null, 'List All Users Admin', frontConfig.appUrl+'admin/users')
        })
     
        // on error/fail, tell the user he needs to login to show the account page
        .fail(function(result){
            showLoginPage();
            //$('#response').html("<div class='alert alert-danger'>Please login to access the account page.</div>");
            toastr.error("Please login to access the account page.", "Users Module - Profile");
        });
}