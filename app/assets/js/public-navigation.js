// 1. Opening Static Page function
function open_static_page( $page ){
	$.get( $page, function( data ) {
		$( '#content' ).html( data );
	});
}
// END 1. Opening Static Page function

// 2. Show Register Page
function show_register_form(){
	
	var jwt = getCookie('jwt');
	if (jwt == ""){
		clearResponse();
		$('#content').load("templates/public/static_pages/authentication/register.temp.html");
	} else {
		showUpdateAccountForm();
	}
};
// END 2. Show Register Page

// 3. Show Login Page
function showLoginPage(){
    // remove jwt
    setCookie("jwt", "", 1);
    //$("#content").load("templates/public/static_pages/authentication/login.temp.html");
    $("#content").load("templates/public/static_pages/authentication/login.register.alt.temp.html");
    clearResponse();
    showLoggedOutMenu();
    history.pushState(null, 'Login Page', 'login')
}
// END 3. Show Login Page

// 4. Show Dashboard Page
function showDashboardPage(){
    
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post( frontConfig.apiUrl + "users/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
    
        $("#content").load("templates/application/dashboard/index.temp.html");
    })
    
    // show login page on error
    .fail(function(result){
        showLoginPage();
        //$('#response').html("<div class='alert alert-danger'>Please login to access the dashboard page.</div>");
        toastr.success("Please login to access the dashboard page", "Pages: Dashboard");
    });
}
// END 4. Show Dashboard Page

// 5. Show Update My Account page
function showUpdateAccountForm(){
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post(frontConfig.apiUrl+"users/get_account_settings.php", JSON.stringify({ jwt:jwt })).done(function(result) {
     
            // if response is valid, put user details in the form
            var html = `
                <div class="container">
                    <h2>Update Account</h2>
                    <form id='update_account_form'>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" name="username" id="username" required value="` + result.data.username + `" autocomplete="off"/>
                        </div>
                        <div class="form-group">
                            <label for="firstname">Firstname</label>
                            <input type="text" class="form-control" name="firstname" id="firstname" required value="` + result.data.firstname + `" autocomplete="off"/>
                        </div>
             
                        <div class="form-group">
                            <label for="lastname">Lastname</label>
                            <input type="text" class="form-control" name="lastname" id="lastname" required value="` + result.data.lastname + `" autocomplete="off"/>
                        </div>
             
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" name="email" id="email" required value="` + result.data.email + `" autocomplete="off"/>
                        </div>
             
                        <div class="form-group">
                            <label for="created">Created</label>
                            <input type="email" class="form-control" name="created" id="created" required value="` + result.data.created + `" disabled/>
                        </div>
             
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" id="password" autocomplete="off"/>
                        </div>

             
                        <div class="form-group">
                            <label for="cp2-container">Main Color</label>
                            <div class="cp-container" id="cp2-container">
                                <div class="input-group" title="Using input value">
                                    <input id="cp2" type="text" class="form-control" name="main_color" value="` + result.data.main_color + `" autocomplete="off"/>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary colorpicker-input-addon"><i></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
             
                        <button type='submit' class='btn btn-primary'>
                            Save Changes
                        </button>	
                    </form>
                    <style>
                        .cp-container {
                            position: relative;
                        }
                        .cp-container .colorpicker-bs-popover {
                            width: 100%;
                            max-width: none;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker {
                            width: 100%;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-saturation,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-hue,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-alpha,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-preview,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-bar {
                            width: 100%;
                            box-shadow: none;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-saturation {
                            height: 150px;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-saturation .colorpicker-guide {
                            height: 10px;
                            width: 10px;
                            border-radius: 10px;
                            margin: -5px 0 0 -5px;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-hue,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-alpha,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-preview,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-bar {
                            margin-top: 10px;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-hue,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-alpha,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-preview {
                            height: 30px;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-alpha,
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-preview {
                            background-size: 20px 20px;
                            background-position: 0 0, 10px 10px;
                        }
                        .cp-container .colorpicker-bs-popover .colorpicker .colorpicker-preview {
                            font-size: 1rem;
                            line-height: 1.75;
                        }

                        .cp-container {
                            max-width: 350px;
                            margin: 2rem auto;
                        }
                        </style>
                    </div>
                `;
             
            clearResponse();
            $('#content').html(html);
            init_colorpicker_fn( '#cp2', 'rgb' );
        })
     
        // on error/fail, tell the user he needs to login to show the account page
        .fail(function(result){
            showLoginPage();
            //$('#response').html("<div class='alert alert-danger'>Please login to access the account page.</div>");
            toastr.error("Please login to access the account page.", "Users Module - Profile");
        });
}
// END 5. Show Update My Account page

// 6. show dashboard page
function showAdminDashboardPage(){
    
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post( frontConfig.apiUrl + "admin/dashboard/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
        
        $("#content").load("templates/admin/dashboard/index.temp.html");
    })
    
    // show login page on error
    .fail(function(result){
        showLoginPage();
        toastr.success( result.responseJSON.message+"; Error:"+result.responseJSON.error , "Pages: Dashboard");
    });
}
// END 6. show dashboard pages

