const DEV_MODE = true; // default mode for the current variable is false/undefined
const DEV__MODE = typeof DEV_MODE !== "undefined" ? true : false;

const Vinstaller = {
  installStatus: null,
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

function btnClick(element) {
    var targetName = element.getAttribute('id');
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


































