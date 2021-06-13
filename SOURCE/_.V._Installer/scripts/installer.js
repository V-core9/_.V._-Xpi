const DEV_MODE = true; // default mode for the current variable is false/undefined
const DEV__MODE = typeof DEV_MODE !== "undefined" ? true : false;

const Vinstaller = {
  installStatus: null,
	installMode: "INIT", // [can be set to  "LIVE" , "DEV" ,  "TEST"] |OR| "INIT" on start to get nextButton to trigger modal.
  prevBtnId: "prev_install_page_button",
  nextBtnId: "next_install_page_button",
  doneBtnId: "finish_install_page_button",
  wizLen: 4
};

function DMoD(){
    if (DEV__MODE) {
        console.log("Method Call Timestamp: " + Date.now());
        return true;
    } 
    return false;
};

Vinstaller.init = function () {
  DMoD();
  this.status(1);
  DMoD();
};

Vinstaller.status = function (statusReport = null) {
  DMoD();
  this.installStatus = statusReport !== null ? statusReport : null;
  this.clickPostCheck();
  DMoD();
};

Vinstaller.clickPostCheck = function () {
  DMoD();
  if (this.installStatus === 1) {                      //document.getElementById(id).classList.toggle("disabledButton");
    document.getElementById(this.prevBtnId).classList.add("disabledButton");
  } else if (this.installStatus === this.wizLen) {
    document.getElementById(this.nextBtnId).classList.add("disabledButton");
  } else {
    document.getElementById(this.prevBtnId).classList.remove("disabledButton");
    document.getElementById(this.nextBtnId).classList.remove("disabledButton");
  }
    document.querySelector('.content section.currentWizardTab').classList.remove("currentWizardTab");
    document.querySelector(".steps li p.currentWizardTab").classList.remove("currentWizardTab");

    document.getElementById('wizard1-t-'+this.installStatus).classList.add("currentWizardTab");
    document.getElementById('wizard1-p-'+this.installStatus).classList.add("currentWizardTab");

  DMoD();
};

Vinstaller.nextBtnClick = function () {
  DMoD();
	if (this.installMode === "INIT"){
		this.selectInstallMode("LIVE");
		showModal('NoSelectedInstallModeModal');
	};
  if (this.installStatus == this.wizLen) {
    console.log("Cant go further--->>>");
  } else {
    this.installStatus++;
  }
  this.clickPostCheck();
  console.log(this.installStatus);
  DMoD();
};

Vinstaller.prevBtnClick = function () {
  DMoD();
  if (parseInt(this.installStatus) == 1) {
    console.log("Cant go further--->>>");
  } else {
    this.installStatus--;
  }
  this.clickPostCheck();
  console.log(this.installStatus);
  DMoD();
};

Vinstaller.btnClick=(elem)=> {
    var targetName = elem.getAttribute('id');
    switch (targetName) {
        case "next_install_page_button":
            Vinstaller.nextBtnClick();
            break;
        case "prev_install_page_button":
            Vinstaller.prevBtnClick();
            break;
        case "finish_install_button":
            console.log("FINISHING YEAAA");
            break;
    
        default:
            break;
    }
    console.log(targetName);
}


Vinstaller.selectInstallMode=(installMode="LIVE")=>{
	try {
		switch (installMode) {
			case "DEV":
				this.installMode = "DEV";
				break;
		
			case "TEST":
				this.installMode = "TEST";
				break;

		
			case "LIVE":
				this.installMode = "LIVE";
				break;

			default:
				this.installMode = "LIVE";
				break;
		}
		console.info('Install Mode Selected :[ '+ this.installMode +' ]');
		if (!document.getElementById('selected_install_mode_print_val').classList.contains(this.installMode)) {
			document.getElementById('selected_install_mode_print_val').classList.remove("DEV");
			document.getElementById('selected_install_mode_print_val').classList.remove("TEST");
			document.getElementById('selected_install_mode_print_val').classList.remove("LIVE");
			document.getElementById('selected_install_mode_print_val').classList.add(this.installMode);
			document.getElementById('selected_install_mode_print_val').innerText = "Selected Install Mode :[ "+ this.installMode +" ]";

			AppInstaller.installMode = this.installMode;
			
			document.querySelectorAll(".mainChoiceButtons > button").forEach(elem=>{
				if (elem.id == this.installMode+"_install_mode_btn") {
					elem.classList.add('selected_btn');
				} else {
					elem.classList.remove('selected_btn');
				}
				console.log(elem);
			});
			
		}
		return true;
	} catch (error) {
		console.warn(error);
		return false;
	}

}

buttonClick=(elem)=>{	Vinstaller.btnClick(elem); };

btnClick=(elem)=>{ Vinstaller.btnClick(elem); };

function selectInstallMode(installMode) {
	return Vinstaller.selectInstallMode(installMode);
}
//// benchmark time start....
var startTime = Date.now();
// declare it for usage...
var AppInstaller = Vinstaller;
let Installer = AppInstaller;
AppInstaller.init();
// loop to slow it down....
//for (let i = 0; i < 50000; i++) {
//  AppInstaller.init();
//    }
// get end time....
var endTime = Date.now();
// and alert so idiot don't miss...I am talking about myself...xD
console.info("Loop took time: " + (endTime - startTime) );
console.log(Installer.installStatus);
