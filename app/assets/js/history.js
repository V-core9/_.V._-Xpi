
//HISTORY TESTING

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


$(function(){
    
	var helperCurrentPath = window.location.pathname;
	helperCurrentPath = helperCurrentPath.split('/');
	var lastsegment = helperCurrentPath[helperCurrentPath.length-1];
	
	if (debuggingMode){
		alert(helperCurrentPath);
		alert(lastsegment);
	}
	switch(lastsegment) {
		case 'register':
			show_register_form();
			break;
		case 'login':
			showLoginPage();
			break;
		case 'about-us':
			open_static_page('templates/static_pages/about_us_page/index.php');
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
			open_static_page('templates/static_pages/home_page/index.php');
		}
        
    
		$("a").click(function(e){
			e.preventDefault();
			var href = $(this).attr('href');
			
			var helperCurrentPath = window.location.pathname;
			helperCurrentPath = helperCurrentPath.split('/');
			var lastsegment = helperCurrentPath[helperCurrentPath.length-1];
			if (lastsegment != href){
				History.navigateToPath( href )
			}
			//return false;
        });
    
    
        
    $(window).on('popstate', function(event) {
        if (document.location.pathname !== History.previousHash) {
        var helperCurrentPath = window.location.pathname;
        helperCurrentPath = helperCurrentPath.split('/');
        var lastsegment = helperCurrentPath[helperCurrentPath.length-1];
        
        if (debuggingMode){
            alert(helperCurrentPath);
            alert(lastsegment);
        }
        switch(lastsegment) {
            case 'register':
                show_register_form();
                break;
            case 'login':
                showLoginPage();
                break;
            case 'about-us':
                open_static_page('templates/static_pages/about_us_page/index.php');
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
                open_static_page('templates/static_pages/home_page/index.php');
            }
        }
        });

        
    });