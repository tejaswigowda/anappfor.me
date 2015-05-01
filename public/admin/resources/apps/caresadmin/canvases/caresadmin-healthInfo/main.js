var caresadminhealthInfoinit = function()
{
  getElementObject("healthInfoInputBox").innerHTML = '<p class="titleText" id="healthInfoText"></p> <p class="text">Entry Name (English)</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="healthInfoEC()" id="healthInfoNameEn"> <p class="text">Entry Name (Spanish)</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="healthInfoEC()" id="healthInfoNameEs"> <p class="text"> Upload/Change Image</p><input type="file" onchange="hiImageUpload()" id="hiImage"> <div id="hiImagePreview"> </div><p class="text"> Entry Details (English) </p> <textarea class="textareaTMCE" onkeypress="healthInfoEC()" id="healthInfoDescEn" name="healthInfoDescEn"> </textarea> <p class="text"> Entry Details (Spanish) </p> <textarea class="textareaTMCE" onkeypress="healthInfoEC()" id="healthInfoDescEs" name="healthInfoDescEs"> </textarea>';

  getElementObject("addHealthInfo").innerHTML = "<a href='javascript:addNewHealthInfo()'> <div class='glassFinish addNew'>Add new entry</div></a>";
  getElementObject("healthInfoDelete").innerHTML = "<a href='javascript:healthInfoDeleteClicked()'> <div class='glassFinish deleteButton'>Delete entry</div></a>";
  getElementObject("healthInfoDeleteYes").innerHTML = "<a href='javascript:healthInfoDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("healthInfoDeleteNo").innerHTML = "<a href='javascript:healthInfoDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  setTimeout('healthInfoAux()', 1000);
}
function hiImageUpload()
{
  var fd = new FormData();
  var filename = $('#hiImage').get(0).files[0].name;
  var size = $('#hiImage').get(0).files[0].size;
  if(size > 256000){
    messageHandler.flashNewMessage("File too large", "please ensure your image is under 256 Kb");  
    return;
  }
  getElementStyleObject("hiImagePreview").backgroundImage = "";
  fd.append('date', (new Date()).toString());
  fd.append('input', $('#hiImage').get(0).files[0]);
  var fileInput = currHealthInfo + filename.substring(filename.length-4, filename.length);
  tempimg = fileInput;
  fd.append('fileInput', fileInput);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
         if (xhr.readyState != 4) { return; }
          hiImageUpload_CB2();
          getElementObject("hiImage").value = "";
          };
  xhr.open("POST", "/uploadFile", true);
  xhr.send(fd);
  activityIndicator.show();
  var url = "../";
  url = url + "editRow";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currHealthInfo);
  url = url + "&image=" + encodeURIComponent(fileInput);
  var callback = hiImageUpload_CB;
  loadFile(url, callback);

}
var tempimg;
function hiImageUpload_CB(data){
  activityIndicator.hide();
}

function hiImageUpload_CB2(){
  getElementStyleObject("hiImagePreview").backgroundImage = "url(http://s3.amazonaws.com/caresapp/" + tempimg + "?t=" + new Date().getTime() +")";
}

function healthInfoAux()
{
  tinyMCE.init({
     mode : "specific_textareas",
     editor_selector : "textareaTMCE",
     theme : "advanced",
     theme_advanced_buttons1 : "bold,italic,underline, strikethrough, separator,justifyleft, justifycenter,justifyright,  justifyfull, separator,undo, redo,seperator,formatselect,fontselect,fontsizeselect, seperator, bulllist, numlist, seperator, outdent, indent, seperator, search, replace",
     theme_advanced_buttons2: "",
     theme_advanced_buttons3: "",
     theme_advanced_buttons4: "",
     theme_advanced_toolbar_location : "top",
     theme_advanced_toolbar_align : "left"
  });

}

function healthInfoDeleteClicked()
{
  setTimeout('getElementStyleObject("healthInfoDeleteConf").display = "block"', 500);
  getElementStyleObject("healthInfoDelete").display = "none";
  setTimeout("healthInfoInfoCB2(false)", 500);
}

function healthInfoDeleteYesClicked()
{
  activityIndicator.show();
  var url = "../";
  url = url + "deleteRow";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + currHealthInfo;
  var callback = deleteHealthInfo_CB;
  loadFile(url, callback);
}

function deleteHealthInfo_CB(data)
{
  dataEdited = false;
  unsavedDataPlugin.hide();
  getHealthInfoInfo();
}

function healthInfoDeleteNoClicked()
{
  getElementStyleObject("healthInfoDeleteConf").display = "none";
  getElementStyleObject("healthInfoDelete").display = "block";
  setTimeout("healthInfoInfoCB2(false)", 500);
}


function healthInfoEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function healthInfoActive()
{
  getHealthInfoInfo();
}

function getHealthInfoInfo()
{
  getElementStyleObject("healthInfoBoxWrapper").display = "none";
  getElementStyleObject("healthInfoListWrapper").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRows";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  var callback = getHealthInfoInfo_CB;
  loadFile(url, callback);
}

function getHealthInfoInfo_CB(data)
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
    outS = outS + "<a class='listItem' href='javascript:healthInfoSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><div class='sub'>" + city + "</div></a>";
  }
  getElementObject("healthInfoList").innerHTML = outS;
  setTimeout("healthInfoInfoCB2(true)", 1000);
}

function healthInfoInfoCB2(flag)
{
  scrollRefresh("caresadmin-healthInfo", flag);
}

var isNewHealthInfo = false;
function addNewHealthInfo(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewHealthInfo = true;
  getElementObject("healthInfoText").innerHTML = "Adding New Entry";
  getElementStyleObject("healthInfoBoxWrapper").display = "block";
  getElementStyleObject("healthInfoListWrapper").display = "none";

  getElementObject("healthInfoNameEn").value = "";
  getElementObject("healthInfoNameEs").value = "";
  tinyMCE.get('healthInfoDescEn').setContent("");
  tinyMCE.get('healthInfoDescEs').setContent("");

  getElementStyleObject("healthInfoDeleteConf").display = "none";
  getElementStyleObject("healthInfoDelete").display = "none";
  getElementStyleObject("hiImagePreview").backgroundImage = "";
  setTimeout("healthInfoInfoCB2()", 500);
}

function healthInfoSelected(pID)
{
  currHealthInfo = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewHealthInfo = false;
  getElementObject("healthInfoText").innerHTML = "Editing Entry : " + pID;
  getElementStyleObject("healthInfoBoxWrapper").display = "block";
  getElementStyleObject("healthInfoListWrapper").display = "none";

  getElementStyleObject("healthInfoDeleteConf").display = "none";
  getElementStyleObject("healthInfoDelete").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRowInfo";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = healthInfoSelected_CB;
  loadFile(url, callback);
}

function healthInfoSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("healthInfoInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "nameEn";
  if(pKeys.contains(temp) >=0){
    getElementObject("healthInfoNameEn").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("healthInfoNameEn").value = "";
  }
  temp = "nameEs";
  if(pKeys.contains(temp) >=0){
    getElementObject("healthInfoNameEs").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("healthInfoNameEs").value = "";
  }
  temp = "descEn";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('healthInfoDescEn').setContent(decodeURIComponent(pInfo[temp]));
  }
  else{
    tinyMCE.get('healthInfoDescEn').setContent("");
  }
  temp = "descEs";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('healthInfoDescEs').setContent(decodeURIComponent(pInfo[temp]));
  }
  else{
    tinyMCE.get('healthInfoDescEs').setContent("");
  }

  temp = "image";
  if(pKeys.contains(temp) >=0){
    getElementStyleObject("hiImagePreview").backgroundImage = "url(http://s3.amazonaws.com/caresapp/" + decodeURIComponent(pInfo[temp]) + "?t=" + new Date().getTime() + ")";
  }
  else{
    getElementStyleObject("hiImagePreview").backgroundImage = "url(noimageuploaded.png)"
  }
}

var currHealthInfo;

function saveHealthInfoClicked()
{
  if(isNewHealthInfo){
    addHealthInfo();
  }
  else{
    saveHealthInfoInfo();
  }
}

function addHealthInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "addRow";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("healthInfoNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("healthInfoNameEs").value);
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('healthInfoDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('healthInfoDescEs').getContent());
  var callback = function(){getHealthInfoInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveHealthInfoInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "editRow";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currHealthInfo);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("healthInfoNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("healthInfoNameEs").value);
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('healthInfoDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('healthInfoDescEs').getContent());
  var callback = function(){getHealthInfoInfo()}
  loadFile(url, callback);
}

function healthInfoDeActive()
{
  getElementObject("healthInfoNameEn").value = "";
  getElementObject("healthInfoNameEs").value = "";
  tinyMCE.get('healthInfoDescEn').setContent("");
  tinyMCE.get('healthInfoDescEs').setContent("");
  getElementObject("hiImage").value = "";
}
