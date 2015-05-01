var caresadminmanageProvidersinit = function()
{
  getElementObject("providersInputBox").innerHTML = '<p class="titleText" id="providerUsernameText"> Provider Username </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerUsername"> <p class="text">Provider Name</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerName"> <p class="text"> ProviderTitle </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerTitle"> <p class="text"> Provider Designation </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerDesig"> <p class="text"> Notes </p> <textarea class="textarea" onkeypress="providerEC()" id="providerNotes"> </textarea>  <input autocapitalize="off" autocorrect="off" class="input" onchange="passwordChangeToggle()" id="providerChangePassword" type="checkbox"> <span id="provPassChText"> Reset Password</span>';
  getElementObject("providersInputBoxCP").innerHTML = '<p class="text"> New Password </p> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordN1" onkeypress="providerEC()"> <p class="text"> Retype New Password </p> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordN2" onkeypress="providerEC()">'

  getElementObject("addProvider").innerHTML = "<a href='javascript:addNewProvider()'> <div class='glassFinish addNew'>Add new provider</div></a>";
  getElementObject("providerDelete").innerHTML = "<a href='javascript:providerDeleteClicked()'> <div class='glassFinish deleteButton'>Delete provider</div></a>";
  getElementObject("providerDeleteYes").innerHTML = "<a href='javascript:providerDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("providerDeleteNo").innerHTML = "<a href='javascript:providerDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
}

function providerDeleteClicked()
{
  setTimeout('getElementStyleObject("providerDeleteConf").display = "block"', 500);
  getElementStyleObject("providerDelete").display = "none";
  setTimeout("providerInfoCB2(false)", 500);
}

function providerDeleteYesClicked()
{
  activityIndicator.show();
  var url = "../";
  url = url + "deleteProvider";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + currProvider;
  var callback = deleteProvider_CB;
  loadFile(url, callback);
}

function deleteProvider_CB(data)
{
  dataEdited = false;
  unsavedDataPlugin.hide();
  getProviderInfo();
}

function providerDeleteNoClicked()
{
  getElementStyleObject("providerDeleteConf").display = "none";
  getElementStyleObject("providerDelete").display = "block";
  setTimeout("providerInfoCB2(false)", 500);
}


function passwordChangeToggle()
{
  var t = getElementObject("providerChangePassword").checked;
  if(t){
    getElementStyleObject("providersInputBoxCP").display = "block";
  }
  else{
    getElementStyleObject("providersInputBoxCP").display = "none";
  }
  setTimeout("providerInfoCB2(false)", 500);
}

function providerEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function manageProvidersActive()
{
  getProviderInfo();
  getElementObject("providerChangePassword").checked = false;
}

var currentProviders;
function getProviderInfo()
{
  currentProviders = new Array();
  getElementStyleObject("providersBoxWrapper").display = "none";
  getElementStyleObject("providerListWrapper").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getProviders";
  url = url + "?loc=" + Location;
  var callback = getProviderInfo_CB;
  loadFile(url, callback);
}

function getProviderInfo_CB(data)
{
  activityIndicator.hide();
  var pInfo = JSON.parse(data);
  var pKeys;
  var name;
  var desig;
  var outS = "";
  for(var i = 0; i<pInfo.length; i++){
    pKeys = Object.keys(pInfo[i]);
    if(pKeys.contains("name") >=0){
      name = pInfo[i].name;
    }
    else{
      name = "No name";
    }
    if(pKeys.contains("desig") >=0){
      desig = pInfo[i].desig;
    }
    else{
      desig = "Untitled";
    }
    outS = outS + "<a class='listItem' href='javascript:providerSelected(" + '"' + pInfo[i].userID + '")' + "'> <p>" + name + "</p><div class='sub'>" + desig + "</div></a>";
    currentProviders[currentProviders.length] = pInfo[i].userID;
  }
  getElementObject("providerList").innerHTML = outS;
  setTimeout("providerInfoCB2(true)", 1000);
}

function providerInfoCB2(flag)
{
  scrollRefresh("caresadmin-manageProviders", flag);
}

var isNewProvider = false;
function addNewProvider(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewProvider = true;
  getElementStyleObject("providerUsername").display = "block";
  getElementObject("providerUsernameText").innerHTML = "Provider Username";
  getElementStyleObject("providersBoxWrapper").display = "block";
  getElementStyleObject("providersInputBoxCP").display = "block";
  getElementStyleObject("providerListWrapper").display = "none";
  getElementStyleObject("providerChangePassword").display = "none";
  getElementStyleObject("provPassChText").display = "none";

  getElementObject("providerName").value = "";
  getElementObject("providerDesig").value = "";
  getElementObject("providerUsername").value = "";
  getElementObject("providerTitle").value = "";
  getElementObject("providerNotes").value = "";

  getElementStyleObject("providerDeleteConf").display = "none";
  getElementStyleObject("providerDelete").display = "none";
  setTimeout("providerInfoCB2(true)", 500);
}

function providerSelected(pID)
{
  currProvider = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewProvider = false;
  getElementStyleObject("providerUsername").display = "none";
  getElementObject("providerUsernameText").innerHTML = "Editing Provider : " + pID;
  getElementStyleObject("providersBoxWrapper").display = "block";
  getElementStyleObject("providerListWrapper").display = "none";
  getElementObject("providerChangePassword").checked = false;
  getElementStyleObject("providersInputBoxCP").display = "none";
  getElementStyleObject("providerChangePassword").display = "";
  getElementStyleObject("provPassChText").display = "";

  getElementStyleObject("providerDeleteConf").display = "none";
  getElementStyleObject("providerDelete").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getProvider";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + pID;
  var callback = providerSelected_CB;
  loadFile(url, callback);
}

function providerSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("providerInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "name";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerName").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerName").value = "";
  }
  temp = "desig";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerDesig").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerDesig").value = "";
  }
  temp = "userID";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerUsername").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerUsername").value = "";
  }
  temp = "title";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerTitle").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerTitle").value = "";
  }
  temp = "notes";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerNotes").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerNotes").value = "";
  }
}

var currProvider;

function saveProviderClicked()
{
  var pw1 = getElementObject("ERCpasswordN1").value;
  var pw2 = getElementObject("ERCpasswordN2").value;
  var uID = getElementObject("providerUsername").value;
  var resetPW = getElementObject("providerChangePassword").checked;
  var changePW = false;
  if(isNewProvider || resetPW){
    changePW = true;
    if(pw1.length < 4 || pw2.length < 4){
       messageHandler.flashNewMessage("Provider password error", "Password should have more than 3 characters");
       return;
    }
    if(pw1 != pw2){
       messageHandler.flashNewMessage("Provider password error", "Passwords do not match");
       return;
    }
  }
  if(isNewProvider){
    if(currentProviders.contains(uID) >= 0){
       messageHandler.flashNewMessage("Provider username already in use", "Please choose another username");
       return;
    }
  }
  if(isNewProvider){
    addProvider();
  }
  else{
    saveProviderInfo(resetPW);
  }
}

function addProvider()
{
  activityIndicator.show();
  var url = "../";
  url = url + "addProvider";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + encodeURIComponent(getElementObject("providerUsername").value);
  url = url + "&name=" + encodeURIComponent(getElementObject("providerName").value);
  url = url + "&desig=" + encodeURIComponent(getElementObject("providerDesig").value);
  url = url + "&title=" + encodeURIComponent(getElementObject("providerTitle").value);
  url = url + "&notes=" + encodeURIComponent(getElementObject("providerNotes").value);
  url = url + "&password=" + hex_md5(getElementObject("ERCpasswordN1").value);
  var callback = function(){getProviderInfo()}
  loadFile(url, callback);
}

function saveProviderInfo(rsPW)
{
  activityIndicator.show();
  var url = "../";
  url = url + "editProvider";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + encodeURIComponent(getElementObject("providerUsername").value);
  url = url + "&name=" + encodeURIComponent(getElementObject("providerName").value);
  url = url + "&desig=" + encodeURIComponent(getElementObject("providerDesig").value);
  url = url + "&title=" + encodeURIComponent(getElementObject("providerTitle").value);
  url = url + "&notes=" + encodeURIComponent(getElementObject("providerNotes").value);
  if(rsPW){
    url = url + "&password=" + hex_md5(getElementObject("ERCpasswordN1").value);
  }
  var callback = function(){getProviderInfo()}
  loadFile(url, callback);
}

function manageProvidersDeActive()
{
  getElementObject("providerName").value = "";
  getElementObject("providerUsername").value = "";
  getElementObject("providerTitle").value = "";
  getElementObject("providerDesig").value = "";
  getElementObject("providerNotes").value = "";
  getElementObject("providerChangePassword").checked = false;
  getElementStyleObject("providersInputBoxCP").display = "none";
}
