var ls_saveYN;
var ls_showYN;
var isLoggedIn = false;
var logininit = function()
{
   getElementObject("logoutFlairBBox").innerHTML = "<a href='javascript:logoutConfirm()' class='flip0 logoutFlair'></a>";
	unsavedDataPlugin.initialize();
  getElementObject("appHeaderSubTitle").innerHTML = "";
  var year = new Date().getFullYear();
  getElementObject("footerWrapper").innerHTML = 
      "<div class='textleft' id='logininfo'> <a target='_blank' href='../privacy.html' class='link hilitetext'>Privacy</a> | <a class='link hilitetext' target='_blank' href='../tos.html'>Terms of Service</a></div>"+
      "<div class='textright'>&copy; <a href='http://foxyninjastudios.com' class='link' target='_blank'>Foxy Ninja Studios</a>, 2011-" + year + ". All rights reserved</div>"
  var temp;
  temp = PersistantValue.get("loginLoc");
  if(temp == null){
    PersistantValue.set("loginLoc", "ALL");
  }
 
  getElementObject("logInButtonBBox").innerHTML = "<a href='javascript:loginClicked()' class='clearButton' id='logInButton'><span class='glyphicon glyphicon-log_in'> </span> Login</a>"
  	+"<a class='titleText link' style='width: 94%;text-align:left;margin-left:5%;display:block' href='javascript:handlelostpassword()'><span class='glyphicon glyphicon-circle_exclamation_mark'></span> Forgot password? </a>"
  	+"<span style='margin-left:5%'>Don't have an account? </span></br><a style='margin-left:5%' class='hilitetext link' href='javascript:loginRegisterSel()'>Create one <span class='glyphicon glyphicon-hand_right'></span></a>";
  getElementObject("logOutButtonBBox").innerHTML = "<a href='javascript:logoutConfirm()' class='glassFinish' id='logOutButton'>Log Out</a>";

  getElementObject("loginOptionsBox").innerHTML = "<a href='javascript:loginRegisterSel()'> <div class='glassFinish optionsDivLeft' id='loginRegister'>Sign Up</div></a> <a href='javascript:loginSigninSel()'> <div class='glassFinish optionsDivRight' id='loginSignin'>Log In</div></a>";
  
  getElementObject("loginRegisterBox1").innerHTML = 
      '<div class="sits">Register</div>' +
  	"<span style='margin-left:5%'>Already registered? </span><a class='hilitetext link' style='width: 94%;margin-top:2px;margin-bottom:10px; text-align:right' href='javascript:loginSigninSel()'>Login now <span class='glyphicon glyphicon-log_in'></span></a></br>"+
      '<input style="margin-top:25px" placeholder="First Name" autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserFN" onkeypress="loginEC()"> <input placeholder="Last Name" autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserLN" onkeypress="loginEC()"> <input placeholder="Email" autocapitalize="on" autocorrect="off" type="email" class="input" id="ERCuserEmail" onkeypress="loginEC()"> <input placeholder="Phone" autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserPhone" onkeypress="loginEC()"> <span style="margin-left: 6%;margin-bottom: 30px;opacity:.7"> Date of Birth: </span><div style="opacity:.7" class="dateWrapper" id="dw1">' +
  	  '<select class="dateMM" id="dobDTRMM" placeholder="MM" onchange="loginEC()">'+ monthselect + '</select>'+
  	  '<select class="dateDD" id="dobDTRDD" onchange="loginEC()">'+ dayselect + '</select>'+
  	  '<span>, </span>'+
  	  '<select class="dateYYYY" id="dobDTRYYYY" onchange="loginEC()">'+ yearselect + '</select>'+
  	  '</div> <div class="horizontalLine"></div><input style="margin-top:15px" placeholder="Password" autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCUserpassword1" onkeypress="loginEC()"> <input  placeholder="Retype Password" autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCUserpassword2" onkeypress="loginEC()">' + "<p class='textleft'>Please read the <a href='../privacy.html' target='_blank' class='link hilitetext'> Privacy Policy </a> and <a class='link hilitetext' href='../tos.html'> Terms of Service</a>. </p>";
	getElementObject("loginRegisterBox2").innerHTML = 
	 "<label class='labelinline' for='iAgree' style='margin-left:0px;display:inline-block;'><span><span></span></span> I agree with ALL DONE Privacy Policy and Terms of Service</label>" +
	 '<input autocapitalize="off" autocorrect="off" class="inputcheck" id="iAgree" type="checkbox" style="">'+
	 "<a href='javascript:registerNow1()' style='margin-right: 0px;margin-left: auto;display: block;width: 160px;margin-top: 20px;' class='fillButton'><span class='glyphicon glyphicon-edit'></span> Let me in ...</a>" //+ '<p class="textleft"> You can fine-tune your privacy settings once registered.</p>';
  
  getElementObject("loginInputBoxCP").innerHTML = 
      '<p class="titleTextLeft" id="detailsTitle"> My Details </p>'+
		 "<div class='patImage' id='patImage'></div>"+
		 "<div style='height:20px;' class='fileUploadWrapper link'>"+
		"<div class='fileUploadText textLeftDI'> Change Profile Picture </div>"+
		'<input type="file" name="iconUploadPat" id="iconUploadPat" onchange="iconUploadedPat()">'+
		"</div>"+
	  '<label for="ERCuserFN2"> First Name </label> <input autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserFN2" onchange="loginEC2()" onkeypress="loginEC2()"> <label for="ERCuserLN2"> Last Name </label> <input autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserLN2" onchange="loginEC2()" onkeypress="loginEC2()"> <label for="ERCuserPhone2"> Phone </label> <input autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserPhone2" onchange="loginEC2()" onkeypress="loginEC2()"><label id="dobLabel2"> Date of Birth (mm/dd/yyyy)</label><div class="dateWrapper" id="dw2">'+
  	  '<select class="dateMM" id="dobDTMM" onchange="loginEC2()">'+ monthselect + '</select>'+
  	  '<span>&frasl; </span>'+
  	  '<select class="dateDD" id="dobDTDD" onchange="loginEC2()">'+ dayselect + '</select>'+
  	  '<span>&frasl; </span>'+
  	  '<select class="dateYYYY" id="dobDTYYYY" onchange="loginEC2()">'+ yearselect + '</select>'+
  	  '</div>  <label for="ERCuserLang"> Preferred Language </label> <select class="selectInput" onchange="languageChanged()" id="ERCuserLang"> <option value="English">English</option> <option value="Spanish">Spanish</option></select>';
  getElementObject("loginInputBoxCP1").innerHTML = 
        '<div class="titleTextLeft" id="intTitle">Interests</div>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int0" type="checkbox"> <label for="int0">Chronic Obstructive Pulmonary Disease (COPD) </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int1" type="checkbox"> <label for="int1">Congestive Heart Failure (CHF) </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int2" type="checkbox"> <label for="int2">Diabetes </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int3" type="checkbox"> <label for="int3">Hypertension </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int4" type="checkbox"> <label for="int4">Heart Disease </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int5" type="checkbox"> <label for="int5">Joint Replacement </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int6" type="checkbox"> <label for="int6">Kidney Disease </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int7" type="checkbox"> <label for="int7">Pneumonia </label>'+
    '</br>'+
        '<div class="titleTextLeft" id="goalTitle">Goals</div>'+
    '<input onChange="loginEC2()" class="inputcheck" id="gls0" type="checkbox"> <label for="gls0">Exercise</label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="gls1" type="checkbox"> <label for="gls1">Stop Smoking</label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="gls2" type="checkbox"> <label for="gls2">Weight Loss</label>';

  getElementObject("cpWrapper").innerHTML = '<p class="titleTextLeft" id="cpTitle"> Change Password</p><label for="ERCpasswordC1"> Current Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordC1" onkeypress="loginEC()"> <label for="ERCpasswordL1"> New Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordL1" onkeypress="loginEC()"> <label for="ERCpasswordL2"> Retype New Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordL2" onkeypress="loginEC()"> <a href="javascript:saveLoginPC()"><p id="saveCP" class="deleteNo glassFinish"> Save </p> </a> <a href="javascript:clearLoginPC()"> <p id="clearCP" class="deleteYes glassFinish"> Clear </p></a>';
  
  getElementObject("loginInputBox").innerHTML = '<div class="sits">' +
      APPLOGO +
      '</div></div><input placeholder="Username (email)" autocapitalize="off" autocorrect="off" class="input" type="email" onkeypress="unkeypress(event)" id="ERCusername' + '"> <input placeholder="Password" autocapitalize="off" autocorrect="off" type="password" class="input" onkeypress="pwkeypress(event)" id="ERCpassword' + '">';

  /*
$("#dw1 :input").focus(function() {
	$("#dobLabel").addClass("labelfocus");
	}).blur(function() {
	$("#dobLabel").removeClass("labelfocus");
});

$("#dw2 :input").focus(function() {
	$("#dobLabel2").addClass("labelfocus");
	}).blur(function() {
	$("#dobLabel2").removeClass("labelfocus");
});

$("#loginInputBox :input").focus(function() {
	$("label[for='" + this.id + "']").addClass("labelfocus");
	}).blur(function() {
	$("label").removeClass("labelfocus");
});

$("#loginInputBoxCP :input").focus(function() {
	$("label[for='" + this.id + "']").addClass("labelfocus");
	}).blur(function() {
	$("label").removeClass("labelfocus");
});

$("#cpWrapper :input").focus(function() {
	$("label[for='" + this.id + "']").addClass("labelfocus");
	}).blur(function() {
	$("label").removeClass("labelfocus");
});


$("#loginRegisterBox1 :input").focus(function() {
	$("label[for='" + this.id + "']").addClass("labelfocus");
	}).blur(function() {
	$("label").removeClass("labelfocus");
});
*/

  Language = "English";
	 loginSigninSel(); 
  if(ENV.embedded){
    apppush.initialize();
  }
	//checkforLogin();

}

function checkforLogin()
{
    var url = App.mainURL;
    url = url + "isUserLoggedIn";
    var callback = login_CB;
  loadFile(url, callback);
}
 function languageChanged()
{
  loginEC2();
  var lang = getElementObject("ERCuserLang").value;
  Language = lang;
}

function savePatientInfo()
{
    var uID = userID;
    var lang = getElementObject("ERCuserLang").value;
    var pNo = getElementObject("ERCuserPhone2").value;
    var fName = getElementObject("ERCuserFN2").value;
    var lName = getElementObject("ERCuserLN2").value;
    var mm = parseInt(getElementObject("dobDTMM").value);
    var dd = parseInt(getElementObject("dobDTDD").value);
    var yyyy = parseInt(getElementObject("dobDTYYYY").value);
    //var saveYN = getElementObject("saveMyRecords").checked;
   // var showYN = getElementObject("showMyRecords").checked;
    
	var dob = new Date(yyyy,mm,dd);
	
	if(parseInt(dd) > new Date(yyyy, mm+1, 0).getDate()){
        alertHandler.flashNewMessage("Invalid date of birth", "Please enter a valid date");
        return;
	}
	if(dob.toString() === "Invalid Date"){
        alertHandler.flashNewMessage("Invalid date of birth", "Please enter a valid date");
        return;
	}
	dob = dob.getTime();

    if(fName.length < 1 || lName.length < 1){
        alertHandler.flashNewMessage("Name error", "Please enter valid first and last name");
        return;
    }
 /*   if(pNo.length < 7){
        alertHandler.flashNewMessage("Phone number error", "Please enter valid phone number");
        return;
    }*/

    activityIndicator.show();
    var url = App.mainURL;
    url = url + "editPatient";
    // url = url + "?loc=" + Location;
    url = url + "?userID=" + encodeURIComponent(uID);
    url = url + "&fname=" + encodeURIComponent(fName);
    url = url + "&lname=" + encodeURIComponent(lName);
    url = url + "&lang=" + encodeURIComponent(lang);
    url = url + "&dob=" + encodeURIComponent(dob);
    url = url + "&phone=" + encodeURIComponent(pNo);
    url = url + "&interests=" + encodeURIComponent(getInterests());
    url = url + "&goals=" + encodeURIComponent(getGoals());
    if(patReg.length > 0){
	    url = url + "&image=" + encodeURIComponent(patReg);
    }
    //url = url + "&saveYN=" + encodeURIComponent(saveYN);
    //url = url + "&showYN=" + encodeURIComponent(showYN);
    var callback = savePatientInfo_CB;
    loadFile(url, callback);
}

function savePatientInfo_CB(data)
{
    data56 = data;
    dataEdited = false;
    unsavedDataPlugin.hide();
    updateLangSettings();
    activityIndicator.hide();
}

function updateLangSettings()
{
  if(Language === "English"){
	  surgAC.setOptions({"lookup":surgsEnglish})
	  medProbsAC.setOptions({"lookup":medProbsEnglish})
  }
  else{
	  surgAC.setOptions({"lookup":surgsSpanish})
	  medProbsAC.setOptions({"lookup":medProbsSpanish})
  }
}

function registerNow1()
{
    var t = getElementObject("iAgree").checked;
    if(t == false){
        alertHandler.flashNewMessage("Error", "Please agree with the Terms and Service to continue.");
        return;
    }

    var mm = parseInt(getElementObject("dobDTRMM").value);
    var dd = parseInt(getElementObject("dobDTRDD").value);
    var yyyy = parseInt(getElementObject("dobDTRYYYY").value);

    var dob = new Date(yyyy, mm, dd);
    if(parseInt(dd) > new Date(yyyy, mm+1, 0).getDate()){
    alertHandler.flashNewMessage("Invalid date of birth", "Please enter a valid date");
    return;
    }
    if(dob.toString() === "Invalid Date"){
    alertHandler.flashNewMessage("Invalid date of birth", "Please enter a valid date");
    return;
    }
    dob = dob.getTime();


    var pw1 = getElementObject("ERCUserpassword1").value;
    var pw2 = getElementObject("ERCUserpassword2").value;
    var uID = getElementObject("ERCuserEmail").value;
    var pNo = getElementObject("ERCuserPhone").value;
    var eMail = getElementObject("ERCuserEmail").value;
    var fName = getElementObject("ERCuserFN").value;
    var lName = getElementObject("ERCuserLN").value;
    if(uID.length < 7 || uID.indexOf("@") < 0){
    alertHandler.flashNewMessage("Email error", "Please enter a valid email");
    return;
    }
    if(fName.length < 1 || lName.length < 1){
    alertHandler.flashNewMessage("Name error", "Please enter your first and last name");
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

    registerNow();

}


function registerNow()
{
    var mm = parseInt(getElementObject("dobDTRMM").value);
    var dd = parseInt(getElementObject("dobDTRDD").value);
    var yyyy = parseInt(getElementObject("dobDTRYYYY").value);
 
	var dob = new Date(yyyy, mm, dd);
	dob = dob.getTime();

	var pw1 = getElementObject("ERCUserpassword1").value;
    var pw2 = getElementObject("ERCUserpassword2").value;
    var uID = getElementObject("ERCuserEmail").value;
    var pNo = getElementObject("ERCuserPhone").value;
    var eMail = getElementObject("ERCuserEmail").value;
    var fName = getElementObject("ERCuserFN").value;
    var lName = getElementObject("ERCuserLN").value;

	var url = App.mainURL;
    url = url + "addUser";
    url = url + "?userID=" + encodeURIComponent(uID);
    url = url + "&fname=" + encodeURIComponent(fName);
    url = url + "&lname=" + encodeURIComponent(lName);
    url = url + "&email=" + encodeURIComponent(eMail);
    url = url + "&dob=" + encodeURIComponent(dob);
    url = url + "&agree=true";
    url = url + "&password=" + hex_md5(pw1);
    var callback = registerNow_CB;
    loadFile(url, callback);
}

var data12;

function registerNow_CB(data)
{
  if(data === "-1"){
     alertHandler.flashNewMessage("Email Error!", "Email does not exist");
     dataEdited = false;
     unsavedDataPlugin.hide();
		Canvas.showOneCanvasOnly("login");
	getElementObject("ERCuserEmail").focus();
     return;
  }
  if(data === "0"){
     alertHandler.flashNewMessage("Account Exists", "Email already on file");
     dataEdited = false;
     unsavedDataPlugin.hide();
		Canvas.showOneCanvasOnly("login");
	getElementObject("ERCuserEmail").focus();
     return;
  }

  if(data != "1"){
     alertHandler.flashNewMessage("Something went wrong", "Please try again");
     dataEdited = false;
     unsavedDataPlugin.hide();
		Canvas.showOneCanvasOnly("login");
     return;
  }

  alertHandler.flashNewMessage("Account Created", "You can now sign in");
  dataEdited = false;
  unsavedDataPlugin.hide();
  Canvas.showOneCanvasOnly("login");
	  loginSigninSel();
  getElementObject("ERCpassword").focus();
  getElementObject("ERCusername").value = getElementObject("ERCuserEmail").value;
  getElementObject("ERCuserFN").value = "";
  getElementObject("ERCuserLN").value = "";
  getElementObject("ERCuserEmail").value = "";
  getElementObject("ERCuserPhone").value = "";
  getElementObject("ERCUserpassword1").value = "";
  getElementObject("ERCUserpassword2").value = "";
  //getElementObject("ERCUserpassword").value = "";

  return;
}

function loginSigninSel()
{
  //Helper.takeout("loginRegisterBox", "Right", "bounce", "Right");
  //Helper.bringin("loginInputBox1", "Left", "bounce", "Left");

  $("#loginRegisterBox").fadeOut(0);
  $("#loginInputBox1W").fadeIn(0);
  getElementObject("loginRegister").className = "glassFinish optionsDivLeft whitebg";
  getElementObject("loginSignin").className = "glassFinish optionsDivRight redbg";
}

function loginRegisterSel()
{
  //Helper.bringin("loginRegisterBox", "Right", "bounce", "Right");
  //Helper.takeout("loginInputBox1", "Left", "bounce", "Left");

  $("#loginRegisterBox").fadeIn(0);
  $("#loginInputBox1W").fadeOut(0);
  getElementObject("loginRegister").className = "glassFinish optionsDivLeft redbg"; 
  getElementObject("loginSignin").className = "glassFinish optionsDivRight whitebg";
}

function loginEC()
{
 // dataEdited = true;
 // unsavedDataPlugin.show();
}

function loginEC2()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function saveLoginPC()
{
  var pwC = getElementObject("ERCpasswordC1").value;
  var pw1 = getElementObject("ERCpasswordL1").value;
  var pw2 = getElementObject("ERCpasswordL2").value;
  if(hex_md5(pwC) != dialogInputPassword.pwHash){
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
  url = url + "changePatientPassword";
  //url = url + "?loc=" + Location;
  url = url + "?userID=" + encodeURIComponent(userID);
  url = url + "&oldPassword=" + hex_md5(pwC);
  url = url + "&newPassword=" + hex_md5(pw1);
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

var userID;
var username;
var userimage;
var Location ="ALL";
var Language = "English";
var Locationtext;

function loginClicked()
{
  userID = getElementObject("ERCusername").value;
  var passwd = hex_md5(getElementObject("ERCpassword").value);
  if(userID.length <= 5){
    alertHandler.flashNewMessage("Login Failed!","Please try again");
    return;
  }

  dialogInputPassword.pwHash = passwd;
  activityIndicator.setText("Logging in...");
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "loginUser";
  url = url + "?userID=" + encodeURIComponent(userID);
  url = url + "&password=" + passwd;
  //url = url + "&loc=" + Location;
  var callback = login_CB;
  loadFile(url, callback);
  getElementObject("ERCusername").blur();
  getElementObject("ERCpassword").blur();
  if(ENV.embedded){
    apppush.register();
  }
}

function login_CB(data)
{
  activityIndicator.hide();
  if(data === "0"){
    alertHandler.flashNewMessage("Login Failed!","Please check your login name and password");
  dialogInputPassword.pwHash = null;
    return;
  }
  if(data != "1"){
    alertHandler.flashNewMessage("Login Failed!","Please try again");
  dialogInputPassword.pwHash = null;
    return;
  }
  //fontsizeChanged();
    App.haslogin = "false";
    handleScreenForOverlay();
 // setTimeout("handleLockScreen()", 1800000);
   getElementObject("caresVideo").innerHTML = '';
 //  getElementStyleObject("backButton").backgroundImage = 'url(images/back.png)';
   getElementStyleObject("caresVideo").display = 'none';
  activityIndicator.show();
   getElementObject("footerWrapper1").style.display = "block";
  //var scrollable = document.getElementById("canvasWrapper");
  getElementObject("maincanvasImage").style.backgroundPosition = "";
  //new ScrollFix(scrollable);
  getElementObject("body").style.background = "none";
  getElementObject("helpWrapper").style.display = "block";
  if(ENV.screen.smallscreenon){
	setTimeout('tinyMCEinitializesmallP()', 1000);
  }
  else{
	setTimeout('tinyMCEinitializeP()', 1000);
	  if(!ENV.device.touchSupport){
       getElementStyleObject("backButton").marginTop = '-100px';
		$(".ListWrapper").css({"max-height":ENV.screen.height-300});
		$(".BoxWrapper").css({"max-width":ENV.screen.width-600});
		  getElementObject("backButtonBBox").style.marginTop = "-100px";
	  }
  }

  getElementStyleObject("homeButton").opacity = "1";
	setInterval("checkforNewNots()", 30000);
	getElementStyleObject("body").backgroundImage = "none";
	// setInterval("checkforlocking()", 30000);
    dialogInputPassword.lastlogin = new Date().getTime();
  setTimeout("activityIndicator.hide()", 700);
//  getElementStyleObject("logoutFlairBBox").display = "block";
  getElementStyleObject("loginInputBox1").display = "none";
  getElementStyleObject("loginRegisterBox").display = "none";
  getElementObject("loginInputTitle").innerHTML = "You are now logged in as " + userID + ".";
  getElementObject("logininfo").innerHTML = "You are now logged in as " + userID + '. <a class="link hilitetext" href="javascript:logoutConfirm()">Logout</a>';
  getElementStyleObject("loginDetailsBox").display = "block";
  getElementStyleObject("logInButtonBBox").display = "none";
  getElementStyleObject("loginOptionsBox").display = "none";
  getElementObject("appHeaderSubTitle").innerHTML = getElementObject("ERCusername").value;
  getElementObject("statusWrapper").innerHTML = "<div id='statusBox'>" +
  	  "<a id='patImageStatus' class='patImage flip1' href='javascript:editAccount()'></a>" +
  	  "<div id='statusUN' class='titleText statusText'></div>" +
  	  "<div id='howAreYou' class='howAreYou statusText'></div>" +
  	  "<div id='whereAreYou' class='whereAreYou statusText'></div>" +
  	  "<div id='myVitals' class='myVitals statusText'></div>" +
  	  "<a href='javascript:editStatus()' class='editStatus flip0' id='editStatus'> </a>" +
  	  "</div>";

  getElementObject("ERCusername").value = "";
  getElementObject("ERCpassword").value = "";

 // getLabelObject("buttonLogin").innerHTML = "Account";
  postLogin();

}

function postLogin()
{ 
  $(".nonMainButton").fadeIn();
  getElementStyleObject("mainmenuButtonsWrapper").display = "block";
  getElementStyleObject("rovingicon").display = "none";
    getERNavLoc();
  if(ENV.screen.smallscreenon){
    homeButtonClicked();
  }
  else{
    mainMenuButtons.selected("buttonNotifications");
  }

	loadPatientInfo();
	setNotBadge();
	alertHandler.class = "lightbulb";
	alertHandler.flashNewMessage('Click the light bulb at the bottom of your screen for tips!', "");
  getElementStyleObject("loginAboutWrapper").marginTop = "0px";
   $(".ipad .brandTitle").css({"max-width":ENV.screen.width-240});
      if(ENV.device.touchSupport){
        locAllStyle();
      }
	  /*
      if(ENV.device.touchSupport){
          window.onscroll = function(ev) {
                  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    if(checkforbott){
                        checkforbott = false;
                        loadMoreMessages();
                    }
                }
          };
      }
      */
      $("body .input").each(function(index, elem) {
              var eId = $(elem).attr("id");
                  var label = null;
                      if (eId && (label = $(elem).parent().find("label[for="+eId+"]")).length == 1) {
                                  $(elem).attr("placeholder", $(label).html());
                                          //$(label).attr("style", "opacity:0");
                                            }
                                             });
      $("#body").addClass("postlogin");
}

function loadPatientInfo()
{
  var url = App.mainURL;
  url = url + "getPatient";
  url = url + "?userID=" + encodeURIComponent(userID);
  //url = url + "&password=" + passwd;
  //url = url + "&loc=" + Location;
  var callback = loadPatientInfo_CB;
  loadFile(url, callback);
}

var appletlocs = [];
var data687;

function loadPatientInfo_CB(data)
{
	scrollRefreshAll();
  	loadUserStatus_CB(data);
  var pInfo = JSON.parse(data);
  data687 = pInfo;
  var pKeys;
  var name;
  var desig;
  var lang;
  var outS = "";
  var un = "";
     pKeys = Object.keys(pInfo);
     if(pKeys.contains("agree") >=0 && pInfo.agree === "false"){
         getAgreement();
     }
     if(pKeys.contains("pwreset") >=0 && pInfo.pwreset === "true"){
	     alertHandler.flashNewMessage("You are using a system generated password (possibly due to a reset).", "It is recommended that you change your password.");
     }
     if(pKeys.contains("interests") >=0){
         setInterests(decodeURIComponent(pInfo.interests));
     }
     else{
         setInterests("00000000");
     }
     if(pKeys.contains("goals") >=0){
         setGoals(decodeURIComponent(pInfo.goals));
     }
     else{
         setGoals("000");
     }
     if(pKeys.contains("appletlocs") >=0){
	     appletlocs = pInfo.appletlocs;
     }
     else{
	     appletlocs = [];
     }
     if(pKeys.contains("fname") >=0){
       getElementObject("ERCuserFN2").value = pInfo.fname;
       un += pInfo.fname;
     }
     else{
       getElementObject("ERCuserFN2").value = "";
     }
     if(pKeys.contains("lname") >=0){
       getElementObject("ERCuserLN2").value = pInfo.lname;
       un += ' ' + pInfo.lname;
     }
     else{
       getElementObject("ERCuserLN2").value = "";
     }
       getElementObject("statusUN").innerHTML = "<a class='link' href='javascript:editAccount()'>" + un + "</a>";
     username = un;

     if(pKeys.contains("phone") >=0){
       getElementObject("ERCuserPhone2").value = pInfo.phone;
     }
     else{
       getElementObject("ERCuserPhone2").value = "";
     }
     if(pKeys.contains("lang") >=0){
       getElementObject("ERCuserLang").value = pInfo.lang;
     }
     else{
       getElementObject("ERCuserLang").value = "English";
     }
     if(pKeys.contains("image") >=0){
       var tr = decodeURIComponent(pInfo.image);
       iconUploadPat_CB2(tr);
	patReg = "";
     }
     if(pKeys.contains("dob") >=0){
       var x = new Date(parseInt(pInfo.dob));
       var year, month, day;
       year = String(x.getFullYear());
       month = String(x.getMonth());
       day = String(x.getDate());
       
       getElementObject("dobDTDD").value = day;
       getElementObject("dobDTMM").value = month;
       getElementObject("dobDTYYYY").value = year;
     }
     else{
       getElementObject("dobDTDD").value = "label";
       getElementObject("dobDTMM").value = "label";
       getElementObject("dobDTYYYY").value = "label";
     }
	 /*
     var temp = "showYN";
     var ls_temp = "ls_showYN";
     if(pKeys.contains(temp) >=0){
        PersistantValue.set(ls_temp, pInfo[temp]);
        setTimeout(ls_temp + ' = Boolean(PersistantValue.get("' + ls_temp + '"))', 100);
		getElementObject("showMyRecords").checked = pInfo.showYN;
     }
	 else{
        setTimeout(temp + " = true", 100);
        PersistantValue.set(temp, "true");
		getElementObject("showMyRecords").checked = true;
	 }
	 temp = "saveYN";
	 ls_temp = "ls_saveYN";
     if(pKeys.contains(temp) >=0){
        PersistantValue.set(ls_temp, pInfo[temp]);
        setTimeout(ls_temp + ' = Boolean(PersistantValue.get("' + ls_temp + '"))', 100);
		getElementObject("saveMyRecords").checked = pInfo.saveYN;
     }
	 else{
        setTimeout(temp + " = true", 100);
        PersistantValue.set(temp, "true");
		getElementObject("saveMyRecords").checked = true;
	 }
	 */
    updateLangSettings();
}

function getAgreement()
{
    activityIndicator.show();
	var url = App.mainURL;
	url = url + "ua.txt";
	var callback = function (data){
        var outS = "";
        outS += "<div class='textWrapper' id=''>";
        outS += "<div class='theText' id='' style=''>" + data + " </div>";
        outS += "</div>";
        outS += "<div class='fright'>";
        outS += '<a class="dialogNo glassFinish" href="javascript:agreeNo()"> Not Now </a>';
        outS += '<a class="dialogYes glassFinish" href="javascript:agreeYes()"> Agree </a>';
        outS += "</div>";
        overlayWrapper.set(outS);
        overlayWrapper.show();
         alertHandler.flashNewMessage("Before you begin...", "Please agree with the <b>Terms and Conditions</b> to continue");


    }
	loadFile(url, callback);
}

function agreeYes()
{
    activityIndicator.hide();
    var url = App.mainURL;
    url = url + "editPatient";
    url = url + "?userID=" + encodeURIComponent(userID);
    url = url + "&agree=true";
    var callback = function(dt){
        alertHandler.class = "lightbulb";
        alertHandler.flashNewMessage('Click the light bulb at the bottom of your screen for tips!', "");
        overlayWrapper.hide();
        activityIndicator.hide();
    }
    loadFile(url, callback);
}

function agreeNo()
{
  var url = App.mainURL;
  url = url + "logout";
  var callback = function(data){
      window.location.reload();
  }
  loadFile(url, callback);
}

function logoutClicked()
{
  clearLoginPC();
  var url = App.mainURL;
  url = url + "logout";
  var callback = logout_CB;
  activityIndicator.show();
  loadFile(url, callback);
}

function logout_CB(data)
{
  activityIndicator.hide();
  dialogMessage.display('You have logged out...', "images/logwhite.png", "Continue", "window.location.reload()");
  return;
}

var data56;


function loginActive()
{
  	getElementObject("helpText").innerHTML = "<p class='helpA1'>Use your registration email to sign in and start using CARES<i>app</i>.me. </p> <p class='helpA2'>If you haven’t already register using your email. I takes only a minute!</p>";
  locAllStyle();
    activityIndicator.hide();
}

function loginDeActive()
{
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


function saveRecordsChangeToggle()
{
  loginEC2();
  ls_saveYN = getElementObject("saveMyRecords").checked;
  PersistantValue.set('ls_saveYN', ls_saveYN.toString());
}



function logoutClickedConfirm()
{

}

function handlelostpassword()
{
	dialogInput.display("Enter your <i>email</i> used to register for " + CARESLOGO + ".", "",resetPasswordNow, "Continue", "Cancel","images/lockwhite.png");
}

function resetPasswordNow(data)
{
    var url = App.mainURL;
    url = url + "resetPatientPassword";
    url = url + "?userID=" + encodeURIComponent(dialogInput.value);
    var callback = resetPasswordNow_CB;
    loadFile(url, callback);
}


function resetPasswordNow_CB(data)
{
	if(data === "1"){
	  dialogMessage.display('Your password is reset. Please check your email.', null, "OK");
	}
	else{
	     alertHandler.flashNewMessage("Something went wrong", "Please try again");
	}
}



var patReg = "";

function iconUploadedPat()
{
  var file = $('#iconUploadPat').get(0);
   if(file.files[0].type.split("/")[0].toLowerCase() != "image"){
       alertHandler.flashNewMessage("Incorrect file type","Please snsure you are uploading an image file.");
   }
  if ( file.files && file.files[0] && file.files[0].type.split("/")[0].toLowerCase() === "image") {
     var FR= new FileReader();                                         
     FR.onload = function(e) { 
         var data = e.target.result;                                   
         var canvas = document.createElement("canvas"); 
         var img = document.createElement("img"); 
         img.onload = function(){
              var MAX_WIDTH = 70; 
              var MAX_HEIGHT = 70;
              var width = img.width;
              var height = img.height;
              if (width > height) {
                 if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
               } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
               }
               canvas.width = width;
               canvas.height = height;
               var ctx = canvas.getContext("2d");
               ctx.drawImage(img, 0, 0, width, height);

               var dataurl = canvas.toDataURL("image/png");
               var url = App.mainURL;
               url = url + "editPatient";
               url = url + "?userID=" + encodeURIComponent(userID);
               url = url + "&image=" + encodeURIComponent(dataurl);
               var callback = function(dt){
                  getElementStyleObject("patImage").backgroundImage = "url(" + dataurl + ")";
                  getElementStyleObject("patImageStatus").backgroundImage = "url(" + dataurl + ")";
                  currT = dataurl;
                  activityIndicator.hide();
               }
               loadFile(url, callback);
         }
         img.src = data;
         getElementObject("iconUploadPat").value = "";
     }
     activityIndicator.setText("Uploading Picture...");
     activityIndicator.show();
     FR.readAsDataURL( file.files[0] );
  }
}

var currT;

function iconUploadPat_CB2(data){
	
	if(data.length == 0){
		return;
	}
  getElementStyleObject("patImage").backgroundImage = "url(" + data +  ")";
  getElementStyleObject("patImageStatus").backgroundImage = "url(" + data + ")";
  userimage = data;
  currT = data;
}

function editAccount()
{
	mainMenuButtons.selected("buttonLogin");
	//loadStatus();
}

function getGoals()
{
    var outS = "";
    for(var i= 0; i < 3; i++){
        var flag = getElementObject("gls" + i).checked;
        if(flag){
            outS += "1";
        }
        else{
            outS += "0";
        }
    }
    mygls = outS;
    return outS;
}

function setGoals(str)
{
    if(str.length < 3){
        str = "000";
    }
    mygls = str;
    for(var i= 0; i < str.length; i++){
        var t = str[i];
        if(t === "1"){
            getElementObject("gls" + i).checked = true;
        }
        else{
            getElementObject("gls" + i).checked = false;
        }
    }
}

function getInterests()
{
    var outS = "";
    for(var i= 0; i < 8; i++){
        var flag = getElementObject("int" + i).checked;
        if(flag){
            outS += "1";
        }
        else{
            outS += "0";
        }
    }
    myints = outS;
    return outS;
}

function setInterests(str)
{
    if(str.length < 8){
        str = "00000000";
    }
    myints = str;
    for(var i= 0; i < str.length; i++){
        var t = str[i];
        if(t === "1"){
            getElementObject("int" + i).checked = true;
        }
        else{
            getElementObject("int" + i).checked = false;
        }
    }
}


