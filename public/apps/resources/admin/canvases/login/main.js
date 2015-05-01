function lSelectChanged()
{
	var temp = getElementObject("lSelect").value;
	if(temp === "appletID"){
		getElementStyleObject("appletID").display = "block";
	}
	else{
		getElementStyleObject("appletID").display = "none";
	}
}
var logininit = function()
{
  var temp;
  temp = PersistantValue.get("loginLoc");
  if(temp == null){
    PersistantValue.set("loginLoc", "ALL");
  }

  //getLocations();
  getElementObject("logInOptionsBox").innerHTML = 
      '<a class="titleText link" style="width: 94%;text-align:left;margin-left:5%;display:block" href="javascript:handlelostpassword()"><span class="glyphicon glyphicon-circle_exclamation_mark"></span> Forgot password? </a>';
  var year = new Date().getFullYear();
  getElementObject("footerWrapper").innerHTML = 
      "<div class='textright' id='logininfo'> <a target='_blank' href='../privacy.html' class='link hilitetext'>Privacy</a> | <a class='link hilitetext' target='_blank' href='../tos.html'>Terms of Service</a></div>"+
      "<div class='textright'>&copy; <a href='http://foxyninjastudios.com' class='link' target='_blank'>Foxy Ninja Studios</a>, 2011-" + year + ". All rights reserved</div>"
  getElementObject("logInButtonBBox").innerHTML = "<a href='javascript:loginClicked()' class='clearButton' id='logInButton'><span class='glyphicon glyphicon-log_in'> </span> Login </a>";
  getElementObject("logOutButtonBBox").innerHTML = "<a href='javascript:logoutClicked()'> <div class='glassFinish' id='logOutButton'>Log Out </div></a>";
  getElementObject("loginInputBoxCP").innerHTML = 
	  '<p class="titleTextLeft" id="cpTitle"> Change Admin Password</p> <label for="ERCpasswordC1" > Current Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordC1" onkeypress="loginEC()"> <label  for="ERCpasswordL1"> New Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordL1" onkeypress="loginEC()"> <label  for="ERCpasswordL2"> Retype New Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordL2" onkeypress="loginEC()"> <a href="javascript:saveLoginPC()"><p id="saveCP" class="deleteNo glassFinish"> Save </p> </a> <a href="javascript:clearLoginPC()"> <p id="clearCP" class="deleteYes glassFinish"> Clear </p></a>';
  getElementObject("loginInputBox").innerHTML = 
      '<div class="sits">'+
      APPLOGO +
      '<br><div class="appSubTitle">ADMIN CONSOLE</div></div>' +
      '<input placeholder="Username (email)" onkeypress="unkeypress(event)" autocapitalize="off" autocorrect="off" class="input" id="ERCusername"> <input placeholder="Password" onkeypress="pwkeypress(event)" autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpassword">';
  $("#lSelect").focus(function() {
  		    $("#lSelectLabel").addClass("labelfocus");
			}).blur(function() {
				  $("#lSelectLabel").removeClass("labelfocus");
				  });
  $("#loginInputBoxCP :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });
  $("#loginInputBox :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

	getElementStyleObject("headerWrapper").marginTop = "-100px";
	getElementStyleObject("homeButton").marginTop = "-100px";
}

function unkeypress(event)
{
	var t = event.charCode || event.keyCode;
	if(t == 13){
		getElementObject("ERCpassword").focus();
	}
}


function pwkeypress(event)
{
	var t = event.charCode || event.keyCode;
	if(t == 13){
		loginClicked();
	}
}

function loginEC()
{
}

function saveLoginPC()
{
  var pwC = getElementObject("ERCpasswordC1").value;
  var pw1 = getElementObject("ERCpasswordL1").value;
  var pw2 = getElementObject("ERCpasswordL2").value;
  if(hex_md5(pwC) != pwHash){
     alertHandler.flashNewMessage("Password error", "Current password is incorrect");
     return;
  }
  if(pw1.length < 4 || pw2.length < 4){
     alertHandler.flashNewMessage("Password error", "Password should have more than 3 characters");
     return;
  }
  if(pw1 != pw2){
     alertHandler.flashNewMessage("Password error", "Passwords do not match");
     return;
  }
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "changeAdminPassword";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + encodeURIComponent(userID);
  url = url + "&oldPassword=" + hex_md5(pwC);
  url = url + "&newPassword=" + hex_md5(pw1);
  console.log(url);
  var callback = saveLoginPC_CB;
  loadFile(url, callback);
}

var data86;

function saveLoginPC_CB(data)
{
  if(data === "1"){
     alertHandler.flashNewMessage("Password reset", "You will be asked to relogin in a few moments..");
     setTimeout("window.location.reload()", 5000);
     return;
  }
  else{
     alertHandler.flashNewMessage("Unable to reset password", "Something went wrong. Try again in a few minutes..");
  }
  activityIndicator.hide();
}

function clearLoginPC()
{
  activityIndicator.show();
  setTimeout("activityIndicator.hide()", 300);
  getElementObject("ERCpasswordC1").value = "";
  getElementObject("ERCpasswordL1").value = "";
  getElementObject("ERCpasswordL2").value = "";
}

var loginLocationID = "";
var userID;
var Location;
var isPubSt = " now published";
var pwHash;
var Locationtext;

function loginClicked()
{
	getElementObject("ERCusername").blur();
	getElementObject("ERCpassword").blur();
  userID = getElementObject("ERCusername").value;
  var passwd = hex_md5(getElementObject("ERCpassword").value);
  pwHash = passwd;
  dialogInputPassword.pwHash = pwHash;
  /*
  Location = getElementObject("lSelect").value;
  if(Location === "appletID"){
  	Location = getElementObject("appletID").value;
  }
  var el = getElementObject("lSelect");
  Locationtext = el.options[el.selectedIndex].text;
  getElementObject("appHeaderSubTitle").innerHTML = Locationtext;
    */
  var url = App.mainURL;
  url = url + "loginAdmin";
  url = url + "?userID=" + userID;
  url = url + "&password=" + passwd;
  url = url + "&loc=" + Location;
  var callback = login_CB;
  loadFile(url, callback);
}

var currT;
function login_CB(data)
{
  if(data != "1"){
    alertHandler.flashNewMessage("Login Failed!","Please check your login name and password");
  dialogInputPassword.pwHash = null;
    return;
  }
  activityIndicator.show();
  setTimeout("activityIndicator.hide()", 700);
 	getElementStyleObject("mainmenuButtonsWrapper").display = "block";
	getElementStyleObject("headerWrapper").marginTop = "";
	getElementStyleObject("homeButton").marginTop  = "";
	getElementStyleObject("body").backgroundImage = "none";
  $(".nonMainButton").fadeIn();
  //getElementObject("footerWrapper1").style.display = "block";
	//setInterval("checkforlocking()", 30000);
    dialogInputPassword.lastlogin = new Date().getTime();
  currT = App.resURL + Location + "icon.png";
    App.haslogin = "false";
    handleScreenForOverlay();

  if(ENV.screen.smallscreenon){
	setTimeout('tinyMCEinitializesmall()', 1000);
  }
  else{
	setTimeout('tinyMCEinitialize()', 1000);
  }

  getElementObject("helpWrapper").style.display = "block";
  getElementObject("loginInputBox").innerHTML = "";
  getElementObject("loginInputTitle").innerHTML = "You are now logged in as " + userID + " (administrator) for " + Locationtext + " " + CARESTEAMLOGO + ".";
  getElementObject("logininfo").innerHTML = "You are now logged in as " + userID + "." + '<a class="link hilitetext" href="javascript:logoutConfirm()">Logout</a>';
 // getElementObject("appletInfoText").innerHTML = "You are now logged in as " + userID + " (administrator) for " + Locationtext + " " + CARESTEAMLOGO + ".";
  getElementStyleObject("loginDetailsBox").display = "block";
  getElementStyleObject("logoutFlairBBox").display = "block";
  getElementStyleObject("logInButton").display = "none";
  getElementStyleObject("loginInputBoxSelectWrapper").display = "none";
  PersistantValue.set("loginLoc", Location);

 // getLabelObject("buttonLogin").innerHTML = "Account Settings";
  getElementObject("maincanvasImage").style.backgroundPosition = "";
  if(ENV.screen.smallscreenon){
    homeButtonClicked();
  }
  else{
	mainMenuButtons.selected("buttonHospitalInfo");
  }
  getProviderInfo();
}

function logoutClicked()
{
  activityIndicator.show();
  clearLoginPC();
  var url = App.mainURL;
  url = url + "logout";
  var callback = logout_CB;
  loadFile(url, callback);
}

function logout_CB(data)
{
  activityIndicator.hide();
  dialogMessage.display('You have successfully logged out...', "images/logoutFlair.png", "Continue", "window.location.reload()");
  return;
}

function getLocations()
{
  var url = App.mainURL;
  url = url + "getLocations";
  var callback = getLocations_CB;
  loadFile(url, callback);
}

function getLocations_CB(data)
{
  var locations = JSON.parse(data);
  var temp = new Date().getTime();
  loginLocationID = temp;
  
  var outS = "";
  for(var i = 0; i < locations.length; i++){
    if(Object.keys(locations[i]).contains("name") == -1){
      outS = outS + "<option value='" + locations[i].loc + "'>" + locations[i].loc + "</option>";
    }
    else{
      outS = outS + "<option value='" + locations[i].loc + "'>" + locations[i].name + "</option>";
    }
  }
   outS = outS + "<option disabled> ---- </option>";
   outS = outS + "<option value='appletID'> Use CAREteam&trade; ID </option>";

  getElementObject("lSelect").innerHTML = outS;
  $(".nonMainButton").fadeOut();
    
  setTimeout("getElementObject('lSelect').value = " + '"' + PersistantValue.get("loginLoc") + '"', 1000);
}

function loginActive()
{
  getElementObject("maincanvasImage").style.backgroundPosition = "50%";
}

function loginDeActive()
{
}

function openHelper()
{
	cordovaOpenLink("http://foxyninjastudios.com");
}
function openIHHS()
{
	cordovaOpenLink("http://ihhs-cares.com");
}
