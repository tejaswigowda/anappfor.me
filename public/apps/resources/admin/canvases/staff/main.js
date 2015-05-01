var staffinit = function()
{
  getElementObject("activityWrapper").innerHTML = 
    '<p class="titleTextLeft" id="acTitle"> Activity Log </p> <div id="logConsole"> </div>';
  getElementObject("providersInputBox").innerHTML = '<label for="providerUsername" id="providerUsernameText"> Provider Username </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerUsername">'+
  	  '<div style="margin-left:5%" class="fornew proPic" id="proImage"></div>'+
	'<div class="fornew fileUploadWrapper link"> <div class="fileUploadText textLeftDI"> Change Picture</div> <input type="file" name="proFileUpload" id="proFileUpload" onchange="proFileUploaded()"></div>'+
	'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="draftCBPro" type="checkbox">'+
		'<label for="draftCBPro" class="labelinline">Do not list</label>'+
	'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="proCanRecieve" type="checkbox">'+
    '<label for="proCanRecieve" class="labelinline">Can recieve user messages</label>'+
	'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="proCanRecieve1" type="checkbox">'+
    '<label for="proCanRecieve1" class="labelinline">Can recieve provider messages</label>'+
	'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="proCanView" type="checkbox">'+
    '<label for="proCanView" class="labelinline">Can view user Journal</label>'+
	'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="proCanEdit" type="checkbox">'+
	'<label for="proCanEdit" style="" class="labelinline">Can edit user Journal</label>'+
	'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="onCall" type="checkbox">'+
	'<label for="onCall" style="margin-bottom:20px" class="labelinline">On Call</label>'+
  	  '<div id="providersInputBoxA"> <label for="providerName">Provider Name</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerName"> <label for="providerTitle"> Provider Email</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerTitle">'+
	 '<label for="providerPhone"> Provider Phone</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerPhone">'+
	 '<label for="providerWeb"> Provider Website</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerWeb">'+
	 '<label for="providerLinkedin"> Provider LinkedIn</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerLinkedin">'+
	 '<label for="providerDesig"> Provider Designation </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="providerEC()" id="providerDesig">'+
	'<label for="providerNotes"> Notes </label> <textarea class="textarea" onkeypress="providerEC()" id="providerNotes"> </textarea> </div>'+
  	  '<input autocapitalize="off" autocorrect="off" class="input" onchange="passwordChangeToggle()" id="providerChangePassword" type="checkbox"> <label for="providerChangePassword" id="provPassChText"> Reset Password</label>';
  getElementObject("providersInputBoxCP").innerHTML = '<label for="ERCpasswordN1"> New Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordN1" onkeypress="providerEC()"> <label for="ERCpasswordN2"> Retype New Password </label> <input autocapitalize="off" autocorrect="off" type="password" class="input" id="ERCpasswordN2" onkeypress="providerEC()">'

  getElementObject("providerDelete").innerHTML = "<a href='javascript:providerDeleteClicked()'> <div class='glassFinish deleteButton'>Delete provider</div></a>";
  getElementObject("providerDeleteYes").innerHTML = "<a href='javascript:providerDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("providerDeleteNo").innerHTML = "<a href='javascript:providerDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  $("#providersInputBoxA :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });
  $("#providersInputBoxCP :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });
}


function proFileUploaded()
{
  var file = $('#proFileUpload').get(0);
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
               url = url + "editProvider";
               url = url + "?userID=" + encodeURIComponent(currProvider);
               url = url + "&loc=" + encodeURIComponent(Location);
               url = url + "&image=" + encodeURIComponent(dataurl);
               var callback = function(dt){
                  getElementStyleObject("proImage").backgroundImage = "url(" + dataurl + ")";
                  iconUploadPro_CB2(dataurl);
                  activityIndicator.hide();
               }
               loadFile(url, callback);
         }
         img.src = data;
         getElementObject("proFileUpload").value = "";
     }
     activityIndicator.setText("Uploading Picture...");
     activityIndicator.show();
     FR.readAsDataURL( file.files[0] );
  }
}


var proReg = "";

function iconUploadPro_CB2(data)
{
	 if(data.length == 0){ return; }
	 getElementStyleObject("proImage").backgroundImage = "url(" + data + ")";
}

function providerDeleteClicked()
{
  getElementStyleObject("providerDeleteConf").display = "block";
  getElementStyleObject("providerDelete").display = "none";
  setTimeout("providerInfoCB2(false)", 500);
}

function providerDeleteYesClicked()
{
  activityIndicator.show();
  var url = App.mainURL;
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

function staffActive()
{
  getProviderInfo();
  getElementObject("providerChangePassword").checked = false;
}

var currentProviders;
var providersDict;

function getProviderInfoA()
{
  getElementStyleObject("providersBoxWrapper").display = "none";
  getElementStyleObject("providerListWrapper").display = "block";
}

function getProviderInfo()
{
  getElementStyleObject("proImage").backgroundImage = "";
  currentProviders = [];
  providersDict = [];
  getElementStyleObject("providersBoxWrapper").display = "none";
  getElementStyleObject("providerListWrapper").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getProviders";
  url = url + "?loc=" + Location;
  var callback = getProviderInfo_CB;
  loadFile(url, callback);
}

var data46;


function getProviderInfo_CB(data)
{
  	data46 = data;
  activityIndicator.hide();
  var pInfo = JSON.parse(data);
  var pKeys;
  var name;
  var desig;
  var outS = "";
  currl = new Date().getTime().toString();
  providersDict = pInfo;
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
    outS = outS + "<a id='" + currl + pInfo[i].userID + "' class='arrowFinish listItem' href='javascript:providerSelected(" + '"' + pInfo[i].userID + '")' + "'> <p>" + name + "</p><p>" + desig + "</p></a>";
    currentProviders[currentProviders.length] = pInfo[i].userID;
  }
  if(pInfo.length == 0){
  	outS = "<div class='titleText'> 0 Providers </br> <a href='javascript:addNewProvider()'>Add some providers! </a></div>";
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
  getElementStyleObject("activityWrapper").display = "none";
      currs = getElementObject("canvasWrapper").scrollTop;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewProvider = true;
  getElementStyleObject("providerUsername").display = "block";
  getElementObject("providerUsernameText").innerHTML = "Provider Username";
  getElementStyleObject("providersBoxWrapper").display = "block";
  $("#providersInputBox .fornew").fadeOut();
  getElementStyleObject("providersInputBoxCP").display = "block";
  getElementStyleObject("providerListWrapper").display = "none";
  getElementStyleObject("providerChangePassword").display = "none";
  getElementStyleObject("provPassChText").display = "none";

  getElementObject("draftCBPro").checked = false;
  getElementObject("providerName").value = "";
  getElementObject("providerDesig").value = "";
  getElementObject("providerUsername").value = "";
  getElementObject("providerTitle").value = "";
  getElementObject("providerPhone").value = "";
  getElementObject("providerWeb").value = "";
  getElementObject("providerLinkedin").value = "";
  getElementObject("providerNotes").value = "";

  getElementStyleObject("providerDeleteConf").display = "none";
  getElementStyleObject("providerDelete").display = "none";
  setTimeout("providerInfoCB2(true)", 500);
  getElementStyleObject("proImage").backgroundImage = "";
}

function providerSelected(pID)
{
  getElementStyleObject("activityWrapper").display = "";
    var ty = currl + pID;
    selectedStyle.add(ty);
      currs = getElementObject("canvasWrapper").scrollTop;
  currProvider = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewProvider = false;
  getElementStyleObject("providerUsername").display = "none";
  getElementObject("providerUsernameText").innerHTML = "Editing Member: " + pID;
  getElementStyleObject("providersBoxWrapper").display = "block";
  $("#providersInputBox .fornew").fadeIn();
  getElementStyleObject("providerListWrapper").display = "none";
  getElementObject("providerChangePassword").checked = false;
  getElementStyleObject("providersInputBoxCP").display = "none";
  getElementStyleObject("providerChangePassword").display = "";
  getElementStyleObject("provPassChText").display = "";

  getElementStyleObject("providerDeleteConf").display = "none";
  getElementStyleObject("providerDelete").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
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
   if(pKeys.contains("image") >=0){
	var t = pInfo.image;
	iconUploadPro_CB2(t);
	proReg = "";
   }
   else{
	  getElementStyleObject("proImage").backgroundImage = "";
   }


  var temp;
  temp = "canRecieve";
  if(pKeys.contains(temp) >=0 && pInfo[temp] === "true"){
    getElementObject("proCanRecieve").checked = true;
  }
  else{
    getElementObject("proCanRecieve").checked = false;
  }
  temp = "canRecieve1";
  if(pKeys.contains(temp) >=0 && pInfo[temp] === "true"){
    getElementObject("proCanRecieve1").checked = true;
  }
  else{
    getElementObject("proCanRecieve1").checked = false;
  }
  temp = "onCall";
  if(pKeys.contains(temp) >=0 && pInfo[temp] === "true"){
    getElementObject("onCall").checked = true;
  }
  else{
    getElementObject("onCall").checked = false;
  }
  temp = "canView";
  if(pKeys.contains(temp) >=0 && pInfo["canView"] === "true"){
    getElementObject("proCanView").checked = true;
  }
  else{
    getElementObject("proCanView").checked = false;
  }
  temp = "canEdit";
  if(pKeys.contains(temp) >=0 && pInfo["canEdit"] === "true"){
    getElementObject("proCanEdit").checked = true;
  }
  else{
    getElementObject("proCanEdit").checked = false;
  }

  temp = "draft";
  if(pKeys.contains(temp) >=0 && pInfo["draft"] === "true"){
    getElementObject("draftCBPro").checked = true;
  }
  else{
    getElementObject("draftCBPro").checked = false;
  }
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
  temp = "phone";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerPhone").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerPhone").value = "";
  }
  temp = "web";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerWeb").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerWeb").value = "";
  }
  temp = "linkedin";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerLinkedin").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerLinkedin").value = "";
  }
  temp = "email";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerTitle").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerTitle").value = "";
  }
  temp = "pronotes";
  if(pKeys.contains(temp) >=0){
    getElementObject("providerNotes").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("providerNotes").value = "";
  }
  scrollRefreshAll();
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
       alertHandler.flashNewMessage("Provider password error", "Password should have more than 3 characters");
       return;
    }
    if(pw1 != pw2){
       alertHandler.flashNewMessage("Provider password error", "Passwords do not match");
       return;
    }
  }
  if(isNewProvider){
    if(currentProviders.contains(uID) >= 0){
       alertHandler.flashNewMessage("Provider username already in use", "Please choose another username");
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
  var url = App.mainURL;
  url = url + "addProvider";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + encodeURIComponent(getElementObject("providerUsername").value);
  url = url + "&name=" + encodeURIComponent(getElementObject("providerName").value);
  url = url + "&draft=" + getElementObject("draftCBPro").checked.toString();
  url = url + "&canView=" + getElementObject("proCanView").checked.toString();
  url = url + "&canRecieve=" + getElementObject("proCanRecieve").checked.toString();
  url = url + "&canRecieve=" + getElementObject("proCanRecieve1").checked.toString();
  url = url + "&onCall=" + getElementObject("onCall").checked.toString();
  url = url + "&canEdit=" + getElementObject("proCanEdit").checked.toString();
  url = url + "&desig=" + encodeURIComponent(getElementObject("providerDesig").value);
  url = url + "&email=" + encodeURIComponent(getElementObject("providerTitle").value);
  url = url + "&phone=" + encodeURIComponent(getElementObject("providerPhone").value);
  url = url + "&web=" + encodeURIComponent(getElementObject("providerWeb").value);
  url = url + "&linkedin=" + encodeURIComponent(getElementObject("providerLinkedin").value);
  url = url + "&pronotes=" + encodeURIComponent(getElementObject("providerNotes").value);
  url = url + "&password=" + hex_md5(getElementObject("ERCpasswordN1").value);
  if(proReg.length > 0){
	url = url + "&image=" + encodeURIComponent(proReg);
  }
  var callback = function(){getProviderInfo()}
  loadFile(url, callback);
}


function saveProviderInfo(rsPW)
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editProvider";
  url = url + "?loc=" + Location;
  url = url + "&userID=" + encodeURIComponent(getElementObject("providerUsername").value);
  url = url + "&name=" + encodeURIComponent(getElementObject("providerName").value);
  url = url + "&draft=" + getElementObject("draftCBPro").checked.toString();
  url = url + "&canView=" + getElementObject("proCanView").checked.toString();
  url = url + "&canRecieve=" + getElementObject("proCanRecieve").checked.toString();
  url = url + "&canRecieve1=" + getElementObject("proCanRecieve1").checked.toString();
  url = url + "&onCall=" + getElementObject("onCall").checked.toString();
  url = url + "&canEdit=" + getElementObject("proCanEdit").checked.toString();
  url = url + "&desig=" + encodeURIComponent(getElementObject("providerDesig").value);
  url = url + "&email=" + encodeURIComponent(getElementObject("providerTitle").value);
  url = url + "&phone=" + encodeURIComponent(getElementObject("providerPhone").value);
  url = url + "&web=" + encodeURIComponent(getElementObject("providerWeb").value);
  url = url + "&linkedin=" + encodeURIComponent(getElementObject("providerLinkedin").value);
  url = url + "&pronotes=" + encodeURIComponent(getElementObject("providerNotes").value);
  if(proReg.length > 0){
	url = url + "&image=" + encodeURIComponent(proReg);
  }
  if(rsPW){
    url = url + "&password=" + hex_md5(getElementObject("ERCpasswordN1").value);
  }
  var callback = function(){getProviderInfo()}
  loadFile(url, callback);
}

function staffDeActive()
{
  getElementObject("providerName").value = "";
  getElementObject("draftCBPro").checked = false;
  getElementObject("proCanView").checked = false;
  getElementObject("proCanRecieve").checked = false;
  getElementObject("proCanRecieve1").checked = false;
  getElementObject("onCall").checked = false;
  getElementObject("proCanEdit").checked = false;
  getElementObject("providerUsername").value = "";
  getElementObject("providerTitle").value = "";
  getElementObject("providerPhone").value = "";
  getElementObject("providerWeb").value = "";
  getElementObject("providerLinkedin").value = "";
  getElementObject("providerDesig").value = "";
  getElementObject("providerNotes").value = "";
  getElementObject("providerChangePassword").checked = false;
  getElementStyleObject("providersInputBoxCP").display = "none";
}
