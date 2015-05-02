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
		'<input type="file" name="iconUploadUser" id="iconUploadUser" onchange="iconUploadedPat()">'+
		"</div>"+
	  '<label for="ERCuserFN2"> First Name </label> <input autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserFN2" onchange="loginEC2()" onkeypress="loginEC2()"> <label for="ERCuserLN2"> Last Name </label> <input autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserLN2" onchange="loginEC2()" onkeypress="loginEC2()"> <label for="ERCuserPhone2"> Phone </label> <input autocapitalize="on" autocorrect="off" type="text" class="input" id="ERCuserPhone2" onchange="loginEC2()" onkeypress="loginEC2()"><label id="dobLabel2"> Date of Birth (mm/dd/yyyy)</label><div class="dateWrapper" id="dw2">'+
  	  '<select class="dateMM" id="dobDTMM" onchange="loginEC2()">'+ monthselect + '</select>'+
  	  '<span>&frasl; </span>'+
  	  '<select class="dateDD" id="dobDTDD" onchange="loginEC2()">'+ dayselect + '</select>'+
  	  '<span>&frasl; </span>'+
  	  '<select class="dateYYYY" id="dobDTYYYY" onchange="loginEC2()">'+ yearselect + '</select>'+
  	  '</div>  <label for="ERCuserLang"> Preferred Language </label> <select class="selectInput" onchange="languageChanged()" id="ERCuserLang"> <option value="English">English</option> <option value="Spanish">Spanish</option></select>';
 
  getElementObject("loginInputBox").innerHTML = '<div class="sits">' +
      APPLOGO +
      '</div></div><input placeholder="Username (email)" autocapitalize="off" autocorrect="off" class="input" type="email" onkeypress="unkeypress(event)" id="ERCusername' + '"> <input placeholder="Password" autocapitalize="off" autocorrect="off" type="password" class="input" onkeypress="pwkeypress(event)" id="ERCpassword' + '">';

  Language = "English";
	 loginSigninSel(); 
  if(ENV.embedded){
    apppush.initialize();
  }

}

function checkforLogin()
{
    var url = App.mainURL;
    url = url + "isUserLoggedIn";
    var callback = login_CB;
  loadFile(url, callback);
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
      
      $("body .input").each(function(index, elem) {
              var eId = $(elem).attr("id");
                  var label = null;
                      if (eId && (label = $(elem).parent().find("label[for="+eId+"]")).length == 1) {
                                  $(elem).attr("placeholder", $(label).html());
                                          //$(label).attr("style", "opacity:0");
                                            }
                                             });
      */
      $("#body").addClass("postlogin");
}

function loadUserInfo()
{
  var url = App.mainURL;
  url = url + "getUser";
  url = url + "?userID=" + encodeURIComponent(userID);
  //url = url + "&password=" + passwd;
  //url = url + "&loc=" + Location;
  var callback = loadUserInfo_CB;
  loadFile(url, callback);
}

var appletlocs = [];
var data687;

function loadUserInfo_CB(data)
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


function resetPasswordNow(data)
{
    var url = App.mainURL;
    url = url + "resetUserPassword";
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

function iconUploadedUser()
{
  var file = $('#iconUploadUser').get(0);
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
               url = url + "editUser";
               url = url + "?userID=" + encodeURIComponent(userID);
               url = url + "&image=" + encodeURIComponent(dataurl);
               var callback = function(dt){
                  getElementStyleObject("patImage").backgroundImage = "url(" + dataurl + ")";
                  currT = dataurl;
                  activityIndicator.hide();
               }
               loadFile(url, callback);
         }
         img.src = data;
         getElementObject("iconUploadUser").value = "";
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
  userimage = data;
  currT = data;
}

