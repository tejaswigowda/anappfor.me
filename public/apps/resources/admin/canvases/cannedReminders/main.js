var cannedRemindersinit = function()
{
  getElementObject("remindersInputBox").innerHTML = 
      '<p class="titleText" id="remindersText"></p> <label for="remindersNameEn">Reminder Subject (English)</label> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="remindersEC()" id="remindersNameEn"> </textarea> <label for="remindersNameEs">Reminder Subject (Spanish)</label> <textarea autocapitalize="off" autocorrect="off" class="textarea" onkeypress="remindersEC()" id="remindersNameEs"> </textarea>';
  getElementObject("remindersInputBox1").innerHTML = 
		'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="draftCBRem" type="checkbox">'+
		'<label for="draftCBRem" class="labelinline"> This is a draft</label>';
  getElementObject("remindersInputBox2").innerHTML = 
   '<label  for="remindersDescEn"> Reminder Body (English) </label>  <div class="taWrapper"><textarea class="textareaTMCE" onkeypress="remindersEC()" id="remindersDescEn" name="remindersDescEn"> </textarea></div> <label  for="remindersDescEs"> Reminder Body (Spanish) </label>  <div class="taWrapper"><textarea class="textareaTMCE" onkeypress="remindersEC()" id="remindersDescEs" name="remindersDescEs"> </textarea></div>';

  getElementObject("remindersDelete").innerHTML = "<a href='javascript:remindersDeleteClicked()'> <div class='glassFinish deleteButton'>Delete this reminder</div></a>";
  getElementObject("remindersDeleteYes").innerHTML = "<a href='javascript:remindersDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("remindersDeleteNo").innerHTML = "<a href='javascript:remindersDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  setTimeout('remindersAux()', 1000);
  $("#remindersInputBox :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

  $("#remindersInputBox2 :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

}

function remindersAux()
{
}

function remindersDeleteClicked()
{
  getElementStyleObject("remindersDeleteConf").display = "block";
  getElementStyleObject("remindersDelete").display = "none";
  setTimeout("remindersInfoCB2(false)", 500);
}

function remindersDeleteYesClicked()
{
  activityIndicator.show();
  var url = App.mainURL;
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

function cannedRemindersActive()
{
  getRemindersInfo();
}

function getRemindersInfoA()
{
  getElementStyleObject("remindersBoxWrapper").display = "none";
  getElementStyleObject("remindersListWrapper").display = "block";
}

function getRemindersInfo()
{
  getElementStyleObject("remindersBoxWrapper").display = "none";
  getElementStyleObject("remindersListWrapper").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowsAdmin";
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
    outS = outS + "<a id='" + currl + pInfo[i].rowID + "' class='arrowFinish listItem' href='javascript:remindersSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><p>" + city + "</p></a>";
  }
  if(pInfo.length == 0){
  	outS = "<div class='titleText'> 0 Canned Reminders </br> <a href='javascript:addNewReminders()'>Add some canned reminders! </a></div>";
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
      currs = getElementObject("canvasWrapper").scrollTop;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewReminders = true;
  getElementObject("remindersText").innerHTML = "Adding New Reminder";
  getElementStyleObject("remindersBoxWrapper").display = "block";
  getElementStyleObject("remindersListWrapper").display = "none";

  getElementObject("remindersNameEn").value = "";
  getElementObject("remindersNameEs").value = "";
  getElementObject("draftCBRem").checked = false;
  tinyMCE.get('remindersDescEn').setContent("");
  tinyMCE.get('remindersDescEn').setContent("");

  getElementStyleObject("remindersDeleteConf").display = "none";
  getElementStyleObject("remindersDelete").display = "none";
  setTimeout("remindersInfoCB2(true)", 500);
}

function remindersSelected(pID)
{
    var ty = currl + pID;
    selectedStyle.add(ty);
      currs = getElementObject("canvasWrapper").scrollTop;
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
  var url = App.mainURL;
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

  temp = "draft";
  if(pKeys.contains(temp) >=0 && pInfo["draft"] === "true"){
    getElementObject("draftCBRem").checked = true;
  }
  else{
    getElementObject("draftCBRem").checked = false;
  }
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
  temp = "descEn";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('remindersDescEn').setContent(pInfo[temp]);
  }
  else{
    tinyMCE.get('remindersDescEn').setContent("");
  }
  temp = "descEs";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('remindersDescEs').setContent(pInfo[temp]);
  }
  else{
    tinyMCE.get('remindersDescEs').setContent("");
  }

	scrollRefreshAll();
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
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("remindersNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("remindersNameEs").value);
  url = url + "&draft=" + getElementObject("draftCBRem").checked.toString();
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('remindersDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('remindersDescEs').getContent());
  var callback = function(){getRemindersInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveRemindersInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editRow";
  url = url + "?category=CannedReminders";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currReminders);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("remindersNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("remindersNameEs").value);
  url = url + "&draft=" + getElementObject("draftCBRem").checked.toString();
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('notificationsDescEn').getContent());
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('remindersDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('remindersDescEs').getContent());
  var callback = function(){getRemindersInfo()}
  loadFile(url, callback);
}

function cannedRemindersDeActive()
{
  getElementObject("remindersNameEn").value = "";
  getElementObject("remindersNameEs").value = "";
  getElementObject("draftCBRem").checked = false;
  $(".textareaTCME").blur();
}


