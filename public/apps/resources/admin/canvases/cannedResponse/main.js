var cannedResponseinit = function()
{
  getElementObject("notificationsInputBox").innerHTML = 
      '<p class="titleText" id="notificationsText"></p> <label for="notificationsNameEn"> Message Subject (English)</label> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="notificationsEC()" id="notificationsNameEn"> </textarea> <label for="notificationsNameEs">Message Subject (Spanish)</label> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="notificationsEC()" id="notificationsNameEs"> </textarea>';
  getElementObject("notificationsInputBox1").innerHTML = 
		'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="draftCBNot" type="checkbox">'+
		'<label for="draftCBNot" class="labelinline"> This is a draft</label>';
  getElementObject("notificationsInputBox2").innerHTML = 
    '<label for="notificationsDescEn"> Message Body (English) </label>  <div class="taWrapper"><textarea class="textareaTMCE" onkeypress="notificationsEC()" id="notificationsDescEn" name="notificationsDescEn"> </textarea></div> <label for="notificationsDescEs"> Message Subject (Spanish) </label>  <div class="taWrapper"><textarea class="textareaTMCE" onkeypress="notificationsEC()" id="notificationsDescEs" name="notificationsDescEs"> </textarea></div>';

  getElementObject("notificationsDelete").innerHTML = "<a href='javascript:notificationsDeleteClicked()'> <div class='glassFinish deleteButton'>Delete this message</div></a>";
  getElementObject("notificationsDeleteYes").innerHTML = "<a href='javascript:notificationsDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("notificationsDeleteNo").innerHTML = "<a href='javascript:notificationsDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  setTimeout('notificationsAux()', 1000);
  $("#notificationsInputBox :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

  $("#notificationsInputBox2 :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

}

function notificationsAux()
{
}

function notificationsDeleteClicked()
{
  getElementStyleObject("notificationsDeleteConf").display = "block";
  getElementStyleObject("notificationsDelete").display = "none";
  setTimeout("notificationsInfoCB2(false)", 500);
}

function notificationsDeleteYesClicked()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "deleteRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + currNotifications;
  var callback = deleteNotifications_CB;
  loadFile(url, callback);
}

function deleteNotifications_CB(data)
{
  dataEdited = false;
  unsavedDataPlugin.hide();
  getNotificationsInfo();
}

function notificationsDeleteNoClicked()
{
  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "block";
  setTimeout("notificationsInfoCB2(false)", 500);
}


function notificationsEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function cannedResponseActive()
{
  getNotificationsInfo();
}

function getNotificationsInfoA()
{
  getElementStyleObject("notificationsBoxWrapper").display = "none";
  getElementStyleObject("notificationsListWrapper").display = "block";
}

function getNotificationsInfo()
{
  getElementStyleObject("notificationsBoxWrapper").display = "none";
  getElementStyleObject("notificationsListWrapper").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowsAdmin";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  var callback = getNotificationsInfo_CB;
  loadFile(url, callback);
}

function getNotificationsInfo_CB(data)
{
  activityIndicator.hide();
  if(data === ""){
    return;
  }
  var pInfo = JSON.parse(data);
  var pKeys;
  var name;
  var city;
  var outS = "";
  currl = new Date().getTime().toString();
  for(var i = 0; i<pInfo.length; i++){
    pKeys = Object.keys(pInfo[i]);
    if(pKeys.contains("nameEn") >=0){
      name = pInfo[i].nameEn;
    }
    else{
      name = "Untitled";
    }
    if(pKeys.contains("nameEs") >=0){
      city = pInfo[i].nameEs;
    }
    else{
      city = "Untitulado";
    }
    outS = outS + "<a id='" + currl + pInfo[i].rowID + "' class='arrowFinish listItem' href='javascript:notificationsSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><p>" + city + "</p></a>";
  }
  if(pInfo.length == 0){
  	outS = "<div class='titleText'> 0 Canned Notifications </br> <a href='javascript:addNewNotifications()'>Add some new canned notifications! </a></div>";
  }
  getElementObject("notificationsList1").innerHTML = outS;
  setTimeout("notificationsInfoCB2(true)", 1000);
}

function notificationsInfoCB2(flag)
{
  scrollRefresh("caresadmin-notifications", flag);
}

var isNewNotifications = false;
function addNewNotifications(pID)
{
      currs = getElementObject("canvasWrapper").scrollTop;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewNotifications = true;
  getElementObject("notificationsText").innerHTML = "Adding New Notification";
  getElementStyleObject("notificationsBoxWrapper").display = "block";
  getElementStyleObject("notificationsListWrapper").display = "none";

  getElementObject("notificationsNameEn").value = "";
  getElementObject("notificationsNameEs").value = "";
  getElementObject("draftCBNot").checked = false;
  tinyMCE.get('notificationsDescEn').setContent("");
  tinyMCE.get('notificationsDescEs').setContent("");

  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "none";
  setTimeout("notificationsInfoCB2(true)", 500);
}

function notificationsSelected(pID)
{
    var ty = currl + pID;
    selectedStyle.add(ty);
      currs = getElementObject("canvasWrapper").scrollTop;
  currNotifications = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewNotifications = false;
  getElementObject("notificationsText").innerHTML = "Editing Message: " + pID;
  getElementStyleObject("notificationsBoxWrapper").display = "block";
  getElementStyleObject("notificationsListWrapper").display = "none";

  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = notificationsSelected_CB;
  loadFile(url, callback);
}

function notificationsSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("notificationsInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "draft";
  if(pKeys.contains(temp) >=0 && pInfo["draft"] === "true"){
    getElementObject("draftCBNot").checked = true;
  }
  else{
    getElementObject("draftCBNot").checked = false;
  }

  temp = "nameEn";
  if(pKeys.contains(temp) >=0){
    getElementObject("notificationsNameEn").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("notificationsNameEn").value = "";
  }
  temp = "nameEs";
  if(pKeys.contains(temp) >=0){
    getElementObject("notificationsNameEs").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("notificationsNameEs").value = "";
  }
   temp = "descEn";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('notificationsDescEn').setContent(pInfo[temp]);
  }
  else{
    tinyMCE.get('notificationsDescEn').setContent("");
  }
  temp = "descEs";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('notificationsDescEs').setContent(pInfo[temp]);
  }
  else{
    tinyMCE.get('notificationsDescEs').setContent("");
  }

	scrollRefreshAll();
}

var currNotifications;

function saveNotificationsClicked()
{
  if(isNewNotifications){
    addNotifications();
  }
  else{
    saveNotificationsInfo();
  }
}

function addNotifications()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("notificationsNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("notificationsNameEs").value);
  url = url + "&draft=" + getElementObject("draftCBNot").checked.toString();
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('notificationsDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('notificationsDescEs').getContent());
  var callback = function(){getNotificationsInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveNotificationsInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currNotifications);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("notificationsNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("notificationsNameEs").value);
  url = url + "&draft=" + getElementObject("draftCBNot").checked.toString();
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('notificationsDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('notificationsDescEs').getContent());
  var callback = function(){getNotificationsInfo()}
  loadFile(url, callback);
}

function cannedResponseDeActive()
{
  getElementObject("notificationsNameEn").value = "";
  getElementObject("notificationsNameEs").value = "";
  getElementObject("draftCBNot").checked = false;
  $(".textareaTCME").blur();
}

