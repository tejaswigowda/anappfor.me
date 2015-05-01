var caresadminremindersinit = function()
{
  getElementObject("remindersInputBox").innerHTML = '<p class="titleText" id="remindersText"></p> <p class="text">Reminder Text (English)</p> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="remindersEC()" id="remindersNameEn"> </textarea> <p class="text">Reminder Text (Spanish)</p> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="remindersEC()" id="remindersNameEs"> </textarea>';

  getElementObject("addReminders").innerHTML = "<a href='javascript:addNewReminders()'> <div class='glassFinish addNew'>Add new reminder</div></a>";
  getElementObject("remindersDelete").innerHTML = "<a href='javascript:remindersDeleteClicked()'> <div class='glassFinish deleteButton'>Delete reminder</div></a>";
  getElementObject("remindersDeleteYes").innerHTML = "<a href='javascript:remindersDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("remindersDeleteNo").innerHTML = "<a href='javascript:remindersDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  setTimeout('remindersAux()', 1000);
}

function remindersAux()
{
}

function remindersDeleteClicked()
{
  setTimeout('getElementStyleObject("remindersDeleteConf").display = "block"', 500);
  getElementStyleObject("remindersDelete").display = "none";
  setTimeout("remindersInfoCB2(false)", 500);
}

function remindersDeleteYesClicked()
{
  activityIndicator.show();
  var url = "../";
  url = url + "deleteRow";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + currReminders;
  var callback = deleteReminders_CB;
  loadFile(url, callback);
}

function deleteReminders_CB(data)
{
  dataEdited = false;
  unsavedDataPlugin.hide();
  getRemindersInfo();
}

function remindersDeleteNoClicked()
{
  getElementStyleObject("remindersDeleteConf").display = "none";
  getElementStyleObject("remindersDelete").display = "block";
  setTimeout("remindersInfoCB2(false)", 500);
}


function remindersEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function remindersActive()
{
  getRemindersInfo();
}

function getRemindersInfo()
{
  getElementStyleObject("remindersBoxWrapper").display = "none";
  getElementStyleObject("remindersListWrapper").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRows";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  var callback = getRemindersInfo_CB;
  loadFile(url, callback);
}

function getRemindersInfo_CB(data)
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
    outS = outS + "<a class='listItem' href='javascript:remindersSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><div class='sub'>" + city + "</div></a>";
  }
  getElementObject("remindersList").innerHTML = outS;
  setTimeout("remindersInfoCB2(true)", 1000);
}

function remindersInfoCB2(flag)
{
  scrollRefresh("caresadmin-reminders", flag);
}

var isNewReminders = false;
function addNewReminders(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewReminders = true;
  getElementObject("remindersText").innerHTML = "Adding New Reminder";
  getElementStyleObject("remindersBoxWrapper").display = "block";
  getElementStyleObject("remindersListWrapper").display = "none";

  getElementObject("remindersNameEn").value = "";
  getElementObject("remindersNameEs").value = "";

  getElementStyleObject("remindersDeleteConf").display = "none";
  getElementStyleObject("remindersDelete").display = "none";
  setTimeout("remindersInfoCB2(true)", 500);
}

function remindersSelected(pID)
{
  currReminders = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewReminders = false;
  getElementObject("remindersText").innerHTML = "Editing Reminder: " + pID;
  getElementStyleObject("remindersBoxWrapper").display = "block";
  getElementStyleObject("remindersListWrapper").display = "none";

  getElementStyleObject("remindersDeleteConf").display = "none";
  getElementStyleObject("remindersDelete").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRowInfo";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = remindersSelected_CB;
  loadFile(url, callback);
}

function remindersSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("remindersInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "nameEn";
  if(pKeys.contains(temp) >=0){
    getElementObject("remindersNameEn").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("remindersNameEn").value = "";
  }
  temp = "nameEs";
  if(pKeys.contains(temp) >=0){
    getElementObject("remindersNameEs").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("remindersNameEs").value = "";
  }
}

var currReminders;

function saveRemindersClicked()
{
  if(isNewReminders){
    addReminders();
  }
  else{
    saveRemindersInfo();
  }
}

function addReminders()
{
  activityIndicator.show();
  var url = "../";
  url = url + "addRow";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("remindersNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("remindersNameEs").value);
  var callback = function(){getRemindersInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveRemindersInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "editRow";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currReminders);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("remindersNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("remindersNameEs").value);
  var callback = function(){getRemindersInfo()}
  loadFile(url, callback);
}

function remindersDeActive()
{
  getElementObject("remindersNameEn").value = "";
  getElementObject("remindersNameEs").value = "";
}


