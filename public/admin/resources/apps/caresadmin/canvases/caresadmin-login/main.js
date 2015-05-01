var caresadminlogininit = function()
{
  var temp;
  temp = PersistantValue.get("loginLoc");
  if(temp == null){
    PersistantValue.set("loginLoc", "ALL");
  }

  getLocations();
  getElementObject("logInButtonBBox").innerHTML = "<a href='javascript:loginClicked()'> <div class='glassFinish' id='logInButton' >Log In </div></a>";
  getElementObject("logOutButtonBBox").innerHTML = "<a href='javascript:logoutClicked()'> <div class='glassFinish' id='logOutButton' >Log Out </div></a>";
  getElementObject("loginInputBoxCP").innerHTML = '<p class="titleText"> Change Admin Password</p> <p class="text"> Current Password </p> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordC1" onkeypress="loginEC()"> <p class="text"> New Password </p> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordL1" onkeypress="loginEC()"> <p class="text"> Retype New Password </p> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordL2" onkeypress="loginEC()"> <a href="javascript:saveLoginPC()"><p class="deleteNo glassFinish"> Save </p> </a> <a href="javascript:clearLoginPC()"> <p class="deleteYes glassFinish"> Clear </p></a>';
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
     messageHandler.flashNewMessage("Password error", "Current password is incorrect");
     return;
  }
  if(pw1.length < 4 || pw2.length < 4){
     messageHandler.flashNewMessage("Password error", "Password should have more than 3 characters");
     return;
  }
  if(pw1 != pw2){
     messageHandler.flashNewMessage("Password error", "Passwords do not match");
     return;
  }
  activityIndicator.show();
  var url = "../";
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
     messageHandler.flashNewMessage("Password reset", "You will be asked to relogin in a few moments..");
     setTimeout("window.location.reload()", 5000);
     return;
  }
  else{
     messageHandler.flashNewMessage("Unable to reset password", "Something went wrong. Try again in a few minutes..");
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
var pwHash;
var Locationtext;

function loginClicked()
{
  userID = getElementObject("ERCusername" + loginLocationID).value;
  var passwd = hex_md5(getElementObject("ERCpassword" + loginLocationID).value);
  pwHash = passwd;
  Location = getElementObject("ll" + loginLocationID).value;
  var el = getElementObject("ll" + loginLocationID);
  Locationtext = el.options[el.selectedIndex].text;
  getElementObject("appHeaderSubTitle").innerHTML = Locationtext;

  var url = "../";
  url = url + "loginAdmin";
  url = url + "?userID=" + userID;
  url = url + "&password=" + passwd;
  url = url + "&loc=" + Location;
  var callback = login_CB;
  loadFile(url, callback);
}

function login_CB(data)
{
  data56 = data;
  if(data.length < 13 || data.substring(0,13) != "Authenticated"){
    messageHandler.flashNewMessage("Login Failed!","Please check your login name and password");
    return;
  }
  activityIndicator.show();
  setTimeout("activityIndicator.hide()", 700);
  $(".nonMainButton").fadeIn();
  getElementObject("loginInputBox").innerHTML = "";
  getElementObject("loginInputTitle").innerHTML = "You are now logged in as " + userID + " at " + Locationtext + ".";
  getElementStyleObject("loginDetailsBox").display = "block";
  getElementStyleObject("logInButton").display = "none";
  PersistantValue.set("loginLoc", Location);

}

function logoutClicked()
{
  activityIndicator.show();
  clearLoginPC();
  var url = "../";
  url = url + "logout";
  var callback = logout_CB;
  loadFile(url, callback);
}

function logout_CB(data)
{
  activityIndicator.hide();
  $(".nonLogin").fadeOut();
  getLocations();
  getElementObject("loginInputTitle").innerHTML = "You will need ER Cares Login to customize ER Cares for your location.";
  getElementStyleObject("loginDetailsBox").display = "none";
  getElementStyleObject("logInButton").display = "block";
  getElementObject("appHeaderSubTitle").innerHTML = "";

}

function getLocations()
{
  var url = "../";
  url = url + "getLocations";
  var callback = getLocations_CB;
  loadFile(url, callback);
}

var data56;
function getLocations_CB(data)
{
  var locations = JSON.parse(data);
  data56 = locations;
  var temp = new Date().getTime();
  loginLocationID = temp;
  
  var outS = '<p class="text"> User Name</p> <input autocapitalize="off" autocorrect="off" class="input" id="ERCusername' + temp + '"> <p class="text"> Password </p> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpassword' + temp + '">' + "<select class='selectInput' id='ll" + temp + "'>";
  for(var i = 0; i < locations.length; i++){
    if(Object.keys(locations[i]).contains("name") == -1){
      outS = outS + "<option value='" + locations[i].loc + "'>" + locations[i].loc + "</option>";
    }
    else{
      outS = outS + "<option value='" + locations[i].loc + "'>" + locations[i].name + "</option>";
    }
  }
  outS = outS + "</select>";
  getElementObject("loginInputBox").innerHTML = outS;
  $(".nonLogin").fadeOut();
    
  setTimeout("getElementObject('ll" + temp + "').value = " + '"' + PersistantValue.get("loginLoc") + '"', 1000);
}

function loginActive()
{
}

function loginDeActive()
{
}
