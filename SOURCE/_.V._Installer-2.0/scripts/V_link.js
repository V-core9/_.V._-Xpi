// isURL <= Validator Function Confirming [string-> str] variable is valid URL ;
isURL=(str)=> {
  var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?'+ // port
  '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
};

// vink <= Short Named V_Link Function...
vink = (url) => {
	return V_link(url);
};

// V_link <= Function That is actually opening the link ;
V_link = (url = null) => {
  if (isURL(url)){
  	console.info("SUCCESS >> Function V_link(url) opening url "+ url );
  	window.open("https://www.w3schools.com");
    return true;
  } else {
  	console.warn("Error >> Function V_link(url).... V_link input can not be Empty Value!");
    return false;
  };
};

// add_V_Link_Events <= EVENTS TO TRIGGER IT...
add_V_Link_Events=() => {
	console.info("INTO >> add_V_Link_Events");
	var pageButtons = document.getElementsByTagName("button");
	var buttonNumber = pageButtons.length;
	console.info("Found_: "+ buttonNumber +" :_ buttons in the page");
	
	for ( var i = 0; i < buttonNumber; i++) {
		var currentButton = pageButtons[i];
			currentButton.addEventListener('click', (e) => {
				e.preventDefault();
				var btnURL = e.currentTarget.getAttribute("vink") ? e.currentTarget.getAttribute("vink") : "";
				btnURL = e.currentTarget.getAttribute("V_link") ? e.currentTarget.getAttribute("V_link") : btnURL;
				if (btnURL != ""){
					V_link(btnURL);
				} ;
				console.log(btnURL);
			})
	}
	console.info("OUTOF << add_V_Link_Events");
}

//Adding Events On Window Load/READY...>>
window.onload =()=>{
	add_V_Link_Events();
}
