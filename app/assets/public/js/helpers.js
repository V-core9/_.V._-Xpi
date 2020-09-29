// 1. function to make form values to json format
$.fn.serializeObject = function(){
    
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) 
        {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
// END 1. function to make form values to json format

// 2. Remove any prompt messages
function clearResponse(){
	$('#response').html('');
}
// END 2. Remove any prompt messages

// 3. get or read cookie
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// END 3. get or read cookie

// 4. Show Public Navigation
function showLoggedOutMenu(){
    $(".topAppNavbar").load("templates/public/navigation/index.temp.html");
}
// END 4. Show Public Navigation

// 5. Show Application Navigation
function showLoggedInMenu(option = null){
       
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post( frontConfig.apiUrl + "users/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
        $(".topAppNavbar").load("templates/application/navigation/index.temp.html");
        return true;
    })
    
    // show login page on error
    .fail(function(result){
        showLoginPage();
        toastr.success( result.responseJSON.message+"; Error:"+result.responseJSON.error , "Element: Admin Navigation");
        return false;
    });
}
// END 5. Show Application Navigation

// 6. Show Admin navigation
function showAdminLoggedInMenu(){
    
    // validate jwt to verify access
    var jwt = getCookie('jwt');
    $.post( frontConfig.apiUrl + "admin/dashboard/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
        $(".topAppNavbar").load("templates/admin/navigation/index.temp.html");
        return true;
    })
    
    // show login page on error
    .fail(function(result){
        //showLoginPage();
        //toastr.success( result.responseJSON.message+"; Error:"+result.responseJSON.error , "Element: Admin Navigation");
        return false;
    });
}
// END 6. Show Admin navigation

// 7. Click Prevention Function
function linkClickFunction(e){ 
    var href = $(e.target).attr('href');
    
    var helperCurrentPath = window.location.pathname;
    helperCurrentPath = helperCurrentPath.split('/');
    var lastsegment = helperCurrentPath[helperCurrentPath.length-1];
    if (lastsegment != href){
        History.navigateToPath( href )
    }
    //return false;

}
 

History = History || {};
History.pathname = null;
History.previousHash = null;
History.hashCheckInterval = -1;
History.stack = [];
History.initialize = function () {
    if (History.supportsHistoryPushState()) {
        History.pathname = document.location.pathname;
        $(window).bind("popstate", History.onHistoryChanged);
    } else {
        History.hashCheckInterval = setInterval(History.onCheckHash, 200);
    }
};
History.supportsHistoryPushState = function () {
    return ("pushState" in window.history) && window.history.pushState !== null;
};
History.onCheckHash = function () {
    if (document.location.hash !== History.previousHash) {
        History.navigateToPath(document.location.hash.slice(1));
        History.previousHash = document.location.hash;
    }
};
History.pushState = function (url) {
    if (History.supportsHistoryPushState()) {
        window.history.pushState("", "", url);
    } else {
        History.previousHash = url;
        document.location.hash = url;
    }
    History.stack.push(url);
};
History.onHistoryChanged = function (event) {
    if (History.supportsHistoryPushState()) {
        if(History.pathname != document.location.pathname){
            History.pathname = null;
            History.navigateToPath(document.location.pathname);
        }
    }
};
History.navigateToPath = function(pathname) {
    History.pushState(pathname);

    // DO SOME HANDLING OF YOUR PATH HERE

};


// END 7. Click Prevention Function


// 8. Load script function
//   -input [url] -> url of the file to load
//      will prepend frontConfig.appUrl to [url]
function omegaLoadScript(url, jsId = ""){
    if (document.getElementById(jsId) !== null){
        document.getElementById(jsId).remove()
    };
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = frontConfig.appUrl+url;
    // add id if it has
    if (jsId != ""){
        jsElm.setAttribute("id", jsId);
    }
    // finally insert the element to the body element in order to load the script
    document.getElementById('applicationScripts').appendChild(jsElm);
}
// END 8. Load script