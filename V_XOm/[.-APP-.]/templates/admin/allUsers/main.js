
function adminDeleteUser(id){
    var sweet_loader = '<div class="spinner-border" style="width: 4rem; height: 4rem; margin-bottom: 1em;" role="status"><span class="sr-only">Loading...</span></div>';
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            swal.fire({
                html: '<h5>Deleting...</h5>',
                showConfirmButton: false,
                onRender: function() {
                     // there will only ever be one sweet alert open.
                     $('.swal2-content').prepend(sweet_loader);
                }
            });
            // validate jwt to verify access
            var jwt = getCookie('jwt');
            
            // add jwt on the object
            var update_account_form_obj = {jwt: jwt, id: id};

            // convert object to json string
            var form_data=JSON.stringify(update_account_form_obj);
            
            // submit form data to api
            $.ajax({
                url:  frontConfig.apiUrl + "admin/users/delete_user.php",
                type : "POST",
                contentType : 'application/json',
                data : form_data,
                success : function(result) {
                    swal.close();
                    
                    Swal.fire({ 
                        icon: 'success',
                        title: 'User deleted successfully',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    
                    $('.singleUser[data-user-id="'+id+'"]').remove();
            
                    // store new jwt to coookie
                    setCookie("jwt", result.jwt, 1);
                },
            
                // show error message to user
                error: function(xhr, resp, text){
                    swal.close();
                    if(xhr.responseJSON.message=="Access denied."){
                        showLoginPage();
                        //$('#response').html("<div class='alert alert-success'>Access denied. Please login</div>");
                        toastr.error("Access denied. Please login to change settings.", "Users Module - Profile");
                    } else {
                        Swal.fire({ 
                            icon: 'error',
                            title: xhr.responseJSON.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            });
            
        }
      })
}


function loadAdminUsersList(){
    clearResponse();
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post(frontConfig.apiUrl+"admin/users/list_users.php", JSON.stringify({ jwt:jwt })).done(function(result) {
            var html = '<div class="omegaList usersList">';
            // if response is valid, put user details in the form
            for (i = 0; i < result.data.list.length; i++) {
                html += "<div class='singleUser' data-user-id="+result.data.list[i].id+">";
                    html += "<div class='singleUserInfo'>";
                        html += "<div class='singleUserImg'>";
                            html+= "<img src='"+frontConfig.appUrl+"assets/public/img/yea.png'>"
                        html += "</div >";
                        html += "<div class='singleUserDetails'>";
                            html += "<div class='singleUserId'><i class='fas fa-list'></i><p>ID: "+ result.data.list[i].id +"</p></div>";
                            html += "<div class='singleUserUsername'><i class='fas fa-user-circle'></i><p>Username: "+ result.data.list[i].username +"</p></div>";
                            html += "<div class='singleUserEmail'><i class='fas fa-envelope-open-text'></i><p>Email:"+ result.data.list[i].email +"</p></div>";
                        html += "</div >";
                    html += "</div >";
                    html += "<div class='singleUserOptions'>";
                        html += "<a class='btn btn-info' onclick='adminEditUser("+result.data.list[i].id+")'><i class='fas fa-edit'></i><p>Edit</p></a>";
                        html += "<a class='btn btn-danger' onclick='adminDeleteUser("+result.data.list[i].id+")'><i class='fas fa-trash-alt'></i><p>Delete</p></a>";
                    html += "</div >";
                html += "</div >";
              }
            html += '</div>';
            
            html +="<form class='paginationForm adminListUsers'><input type='number' name='perPage' id='perPage' value="+getCookie('perPage')+"><input type='number' name='currentPage' id='currentPage' value="+getCookie('currentPage')+"><button type='submit'>GO</button></form>"
            html +="<span>Number of users:"+ result.data.allUsersNum +"</span> <span>Number of pages: "+ Math.ceil(result.data.allUsersNum/getCookie('perPage')) +"</span>";
            //html += JSON.stringify( result.data );
             
            clearResponse();
            $('.allUsersAdminPage').html(html);
        })
     
        // on error/fail, tell the user he needs to login to show the account page
        .fail(function(result){
            showLoginPage();
            //$('#response').html("<div class='alert alert-danger'>Please login to access the account page.</div>");
            toastr.error("Please login to access the account page.", "Users Module - Profile");
        });
}

loadAdminUsersList();


