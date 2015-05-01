var caresadminnotificationsinit = function()
{
  getElementObject("notificationsInputBox").innerHTML = '<p class="titleText" id="notificationsText"></p> <p class="text"> Notification Text (English)</p> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="notificationsEC()" id="notificationsNameEn"> </textarea> <p class="text">Notification Text (Spanish)</p> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="notificationsEC()" id="notificationsNameEs"> </textarea>';

  getElementObject("addNotifications").innerHTML = "<a href='javascript:addNewNotifications()'> <div class='glassFinish addNew'>Add new notification</div></a>";
  getElementObject("notificationsDelete").innerHTML = "<a href='javascript:notificationsDeleteClicked()'> <div class='glassFinish deleteButton'>Delete notification</div></a>";
  getElementObject("notificationsDeleteYes").innerHTML = "<a href='javascript:notificationsDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("notificationsDeleteNo").innerHTML = "<a href='javascript:notificationsDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  setTimeout('notificationsAux()', 1000);
}

function notificationsAux()
{
}

function notificationsDeleteClicked()
{
  setTimeout('getElementStyleObject("notificationsDeleteConf").display = "block"', 500);
  getElementStyleObject("notificationsDelete").display = "none";
  setTimeout("notificationsInfoCB2(false)", 500);
}

function notificationsDeleteYesClicked()
{
  activityIndicator.show();
  var url = "../";
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

function notificationsActive()
{
  getNotificationsInfo();
}

function getNotificationsInfo()
{
  getElementStyleObject("notificationsBoxWrapper").display = "none";
  getElementStyleObject("notificationsListWrapper").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRows";
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
    outS = outS + "<a class='listItem' href='javascript:notificationsSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><div class='sub'>" + city + "</div></a>";
  }
  getElementObject("notificationsList").innerHTML = outS;
  setTimeout("notificationsInfoCB2(true)", 1000);
}

function notificationsInfoCB2(flag)
{
  scrollRefresh("caresadmin-notifications", flag);
}

var isNewNotifications = false;
function addNewNotifications(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewNotifications = true;
  getElementObject("notificationsText").innerHTML = "Adding New Notification";
  getElementStyleObject("notificationsBoxWrapper").display = "block";
  getElementStyleObject("notificationsListWrapper").display = "none";

  getElementObject("notificationsNameEn").value = "";
  getElementObject("notificationsNameEs").value = "";

  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "none";
  setTimeout("notificationsInfoCB2(true)", 500);
}

function notificationsSelected(pID)
{
  currNotifications = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewNotifications = false;
  getElementObject("notificationsText").innerHTML = "Editing Notification: " + pID;
  getElementStyleObject("notificationsBoxWrapper").display = "block";
  getElementStyleObject("notificationsListWrapper").display = "none";

  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "block";
  activityIndicator.show();
  var url = "../";
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
  var url = "../";
  url = url + "addRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("notificationsNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("notificationsNameEs").value);
  var callback = function(){getNotificationsInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveNotificationsInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "editRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currNotifications);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("notificationsNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("notificationsNameEs").value);
  var callback = function(){getNotificationsInfo()}
  loadFile(url, callback);
}

function notificationsDeActive()
{
  getElementObject("notificationsNameEn").value = "";
  getElementObject("notificationsNameEs").value = "";
}

