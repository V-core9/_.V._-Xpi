var debuggingMode = false;

toastr.options = {
					"closeButton": true,
					"debug": false,
					"newestOnTop": true,
					"progressBar": true,
					"positionClass": "toast-bottom-right",
					"preventDuplicates": false,
					"onclick": null,
					"showDuration": "300",
					"hideDuration": "1000",
					"timeOut": "5000",
					"extendedTimeOut": "1500",
					"showEasing": "swing",
					"hideEasing": "linear",
					"showMethod": "fadeIn",
					"hideMethod": "fadeOut"
                }
const addCSS = s =>(d=>{d.head.appendChild(d.createElement("style")).innerHTML=s})(document);     

$(document).ready(function(){
	
	

	var main_color = getCookie('main_color');
	if (main_color != ""){
		addCSS("body{ color: " + main_color + "; }");
	}

	var helperCurrentPath = window.location.pathname;
	helperCurrentPath = helperCurrentPath.split('/');
	var lastsegment = helperCurrentPath[helperCurrentPath.length-1];
	
	if (debuggingMode){
		alert(helperCurrentPath);
		alert(lastsegment);
    };
    
	switch(lastsegment) {
		case 'register':
			show_register_form();
			break;
		case 'login':
			showLoginPage();
			break;
		case 'about-us':
			open_static_page('templates/public/static_pages/about_us_page/index.php');
			break;
		case 'my-account':
			showUpdateAccountForm();
			break;
		case 'dashboard':
			showDashboardPage();
			break;
		case 'dashboard-admin':
			showAdminDashboardPage();
			break;
		default:
			open_static_page('templates/public/static_pages/home_page/index.php');
		}
	


	var jwtTest = getCookie('jwt');
	
	if(jwtTest != ""){
		var helperNavBool = true;
		helperNavBool = showAdminLoggedInMenu();
		if (helperNavBool){ 
			//$('#dashboard').click();
			showLoggedInMenu()
		}
	} else {
		showLoggedOutMenu();
	}

    // show sign up / registration form
    $(document).on('click', '#sign_up', function(){
		show_register_form();
	});

	$(document).on('click', '.nav-item.nav-link', function(){
		$('.nav-item.nav-link').removeClass('current_page');
		$(this).addClass('current_page');
	})
    // show login form
	$(document).on('click', '#login', function(event){
	    showLoginPage();
	});
	 
	// show dashboard page
	$(document).on('click', '#dashboard', function(){
	    showDashboardPage();
	    clearResponse();
	});
	 
	// show dashboard page
	$(document).on('click', '#dashboard-admin', function(){
	    showAdminDashboardPage();
	    clearResponse();
	});
	 
	// show dashboard page
	$(document).on('click', '#homepage, #home_logo, .open_homepage', function(){
	    open_static_page('templates/public/static_pages/home_page/index.php');
	    clearResponse();
	});
	 
	// show dashboard page
	$(document).on('click', '#aboutuspage', function(){
	    open_static_page('templates/public/static_pages/about_us_page/index.php');
	    clearResponse();
	});
	 
	// show update account form
	$(document).on('click', '#update_account', function(){
	    showUpdateAccountForm();
	});
	 
	// trigger when 'update account' form is submitted
	$(document).on('submit', '#update_account_form', function(){
	 
	    // handle for update_account_form
	    var update_account_form=$(this);
	 
	    // validate jwt to verify access
	    var jwt = getCookie('jwt');
	 
	    // get form data
		var update_account_form_obj = update_account_form.serializeObject()
		 
		// add jwt on the object
		update_account_form_obj.jwt = jwt;
		 
		// convert object to json string
		var form_data=JSON.stringify(update_account_form_obj);
		 
		// submit form data to api
		$.ajax({
		    url:  frontConfig.apiUrl + "users/update_user.php",
		    type : "POST",
		    contentType : 'application/json',
		    data : form_data,
		    success : function(result) {
		 
		        // tell the user account was updated
		        //$('#response').html("<div class='alert alert-success'>Account was updated.</div>");
				toastr.success("Account details were updated successfulyl", "Users Module - Profile");
		 
		        // store new jwt to coookie
		        setCookie("jwt", result.jwt, 1);
				addCSS("body{ color: " + result.data.main_color + "; }");
		        setCookie("main_color", result.data.main_color , 1);
		    },
		 
		    // show error message to user
			error: function(xhr, resp, text){
			    if(xhr.responseJSON.message=="Unable to update user."){
			        //$('#response').html("<div class='alert alert-danger'>Unable to update account.</div>");
					toastr.warning("Unable to update account details, please try again in a moment.", "Users Module - Profile");
			    }
			 
			    else if(xhr.responseJSON.message=="Access denied."){
			        showLoginPage();
			        //$('#response').html("<div class='alert alert-success'>Access denied. Please login</div>");
					toastr.error("Access denied. Please login to change settings.", "Users Module - Profile");
			    }
			}
		});
	 
	    return false;
	});
	 
	// logout the user
	$(document).on('click', '#logout', function(){
	    showLoginPage();
		//$('#response').html("<div class='alert alert-info'>You are logged out.</div>");
		
		toastr.success("Logout Successful", "Users Module - Login");
	});
});


	 





function init_colorpicker_fn( id_str, format_str = 'hex' ) {
	
	if ( !id_str.startsWith( '#' ) ) {
		id_str = '#' + id_str;
	}
	
	var $picker_el = jQuery( id_str );

	$picker_el.colorpicker( {
		format: format_str,
		horizontal: true,
		popover: {
			container: id_str + '-container'
		},
		template: '<div class="colorpicker">' +
			'<div class="colorpicker-saturation"><i class="colorpicker-guide"></i></div>' +
			'<div class="colorpicker-hue"><i class="colorpicker-guide"></i></div>' +
			'<div class="colorpicker-alpha">' +
			'	<div class="colorpicker-alpha-color"></div>' +
			'	<i class="colorpicker-guide"></i>' +
			'</div>' +
			'<div class="colorpicker-bar">' +
			'	<div class="input-group">' +
			'		<input class="form-control input-block color-io" />' +
			'	</div>' +
			'</div>' +
			'</div>'
	} ).on( 'colorpickerCreate colorpickerUpdate', function( e ) {
		$picker_el.parent().find( '.colorpicker-input-addon>i' ).css( 'background-color', e.value );
	} ).on( 'colorpickerCreate', function( e ) {
		resize_color_picker_fn( $picker_el );
	} ).on( 'colorpickerShow', function( e ) {
		var cpInput_el = e.colorpicker.popupHandler.popoverTip.find( '.color-io' );

		cpInput_el.val( e.color.string() );

		cpInput_el.on( 'change keyup', function() {
			e.colorpicker.setValue( cpInput_el.val() );
		} );
	} ).on( 'colorpickerHide', function( e ) {
		var cpInput_el = e.colorpicker.popupHandler.popoverTip.find( '.color-io' );
		cpInput_el.off( 'change keyup' );
	} ).on( 'colorpickerChange', function( e ) {
		var cpInput_el = e.colorpicker.popupHandler.popoverTip.find( '.color-io' );

		if ( e.value === cpInput_el.val() || !e.color || !e.color.isValid() ) {
			return;
		}

		cpInput_el.val( e.color.string() );
	} );

	$picker_el.parent().find( '.colorpicker-input-addon>i' ).on( 'click', function( e ) {
		$picker_el.colorpicker( 'colorpicker' ).show();
	} );

	jQuery( window ).resize( function( e ) {
		resize_color_picker_fn( $picker_el );
	} );
}

function resize_color_picker_fn( $picker_el ) {
	var rem_int = parseInt( getComputedStyle( document.documentElement ).fontSize ),
		width_int = $picker_el.parent().width() - ( ( rem_int * .75 ) * 2 ) - 2,
		colorPicker_obj = $picker_el.colorpicker( 'colorpicker' ),
		slider_obj = colorPicker_obj.options.slidersHorz;

	slider_obj.alpha.maxLeft = width_int;
	slider_obj.alpha.maxTop = 0;

	slider_obj.hue.maxLeft = width_int;
	slider_obj.hue.maxTop = 0;

	slider_obj.saturation.maxLeft = width_int;
	slider_obj.saturation.maxTop = 150;

	colorPicker_obj.update();
}
