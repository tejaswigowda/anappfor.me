var caresadminerNavigatorinit = function()
{
  getElementObject("erNavigatorInputBox").innerHTML = '<p class="titleText" id="erNavigatorText"></p>  <p class="text">Step Name (English)</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="erNavigatorEC()" id="erNavigatorNameEn"> <p class="text">Step Name (Spanish)</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="erNavigatorEC()" id="erNavigatorNameEs"> <p class="text"> Step Description (English) </p> <textarea class="textarea" onkeypress="erNavigatorEC()" id="erNavigatorDescEn" name="erNavigatorDescEn"> </textarea> <p class="text"> Step Description (Spanish) </p> <textarea class="textarea" onkeypress="erNavigatorEC()" id="erNavigatorDescEs" name="erNavigatorDescEs"> </textarea><p class="text" id="uploadVideoText"> Upload/Change Video</p><input type="file" onchange="erVideoUpload()" id="erVideo"> <div id="videoPreview"></div>';
  getElementObject("erNavigatorInputBoxAux").innerHTML = '<p class="titleText" id="noofStepsText"> Number of steps </p> <select onchange="noofERStepsChanged()" id="noofERSteps"> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> </select> '; 
}

function noofERStepsChanged()
{
  setERStepsNo();
}

function erVideoUpload()
{
  var fd = new FormData();
  var filename = $('#erVideo').get(0).files[0].name;
  var size = $('#erVideo').get(0).files[0].size;
  if(size > 20000000){
    messageHandler.flashNewMessage("File too large", "please ensure your is under 20 mb");  
    return;
  }
  getElementObject("uploadVideoText").innerHTML = "Uploading Video ...";
  fd.append('date', (new Date()).toString());
  fd.append('input', $('#erVideo').get(0).files[0]);
  var fileInput = Location + currERNav + filename.substring(filename.length-4, filename.length);
  tempvid = fileInput;
  fd.append('fileInput', fileInput);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
         if (xhr.readyState != 4) { return; }
          getElementObject("uploadVideoText").innerHTML = "Upload/Change Video";
          erVideoUpload_CB2();
  };
  xhr.open("POST", "/uploadFile");
  xhr.send(fd);
  var url = "../";
  url = url + "editRow";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  url = url + "&video=" + encodeURIComponent(fileInput);
  var callback = erVideoUpload_CB;
  loadFile(url, callback);

}
var tempvid;
function erVideoUpload_CB(data){
  messageHandler.flashNewMessage("Uploading video", "please wait ...");
  activityIndicator.show();
}

function erVideoUpload_CB2(){
  getElementObject("videoPreview").innerHTML = "<a class='glassFinish deleteButton currentVideo' href='http://s3.amazonaws.com/caresapp/" + tempvid + "?t=" + new Date().getTime() + "' target='_blank'> Current Video </a>";
  getElementObject("erVideo").value = "";
  activityIndicator.hide();
}


function erNavigatorDeleteClicked()
{
  getElementStyleObject("erNavigatorDeleteConf").display = "block";
  getElementStyleObject("erNavigatorDelete").display = "none";
}

function erNavigatorDeleteYesClicked()
{
  activityIndicator.show();
  var url = "../";
  url = url + "deleteRow";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + currERNav;
  var callback = deleteERNav_CB;
  loadFile(url, callback);
}

function deleteERNav_CB(data)
{
  dataEdited = false;
  unsavedDataPlugin.hide();
  getERNavInfo();
}

function erNavigatorDeleteNoClicked()
{
  getElementStyleObject("erNavigatorDeleteConf").display = "none";
  getElementStyleObject("erNavigatorDelete").display = "block";
}


function erNavigatorEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function erNavigatorActive()
{
  getERNavInfo();
}

function setERStepsNo()
{
  activityIndicator.show();
  var n = getElementObject("noofERSteps").value;
  var url = "../";
  url = url + "addRow";
  url = url + "?category=ERNav";
  url = url + "&rowID=" + Location + "ERNav";
  url = url + "&loc=" + Location;
  url = url + "&erno=" + n;
  var callback = setERStepsNo_CB;
  loadFile(url, callback);
}

function setERStepsNo_CB(data)
{
  var n = getElementObject("noofERSteps").value;
  if(data === "0"){
    var url = "../";
    url = url + "editRow";
    url = url + "?category=ERNav";
    url = url + "&rowID=" + Location + "ERNav";
    url = url + "&loc=" + Location;
    url = url + "&erno=" + n;
    var callback = function(){getERNavInfo()};
    loadFile(url, callback);
  }
  else{
    getERNavInfo();
  }
}

function getERNavInfo()
{
  getElementStyleObject("erNavigatorBoxWrapper").display = "none";
  getElementStyleObject("erNavigatorListWrapper").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRowInfo";
  url = url + "?category=ERNav";
  url = url + "&rowID=" + Location + "ERNav";
  url = url + "&loc=" + Location;
  var callback = getERNavInfo_CB;
  loadFile(url, callback);
}

function getNSS(n)
{
  var ret = "";
  switch(n){
    case 1:
      ret = "1st";
      break;
    case 2:
      ret = "2nd";
      break;
    case 3:
      ret = "3rd";
      break;
    case 4:
      ret = "4th";
      break;
    case 5:
      ret = "5th";
      break;
    case 6:
      ret = "6th";
      break;
    case 7:
      ret = "7th";
      break;
    case 8:
      ret = "8th";
      break;
    case 9:
      ret = "9th";
      break;
    case 10:
      ret = "10th";
      break;
    default:
      ret = "";
      break;
  }
  return ret;
}

var data92;
function getERNavInfo_CB(data)
{
  activityIndicator.hide();
  var pInfo;
  if(data === "0"){
    pInfo = 7;
  }
  else{
    pInfo = parseInt(JSON.parse(data).erno);
  }
  getElementObject("noofERSteps").value = pInfo.toString();
  var outS = "";
  for(var i = 0; i<pInfo; i++){
    outS = outS + "<a class='listItem' href='javascript:erNavigatorSelected(" + '"' + i.toString() + '")' + "'> <p>" + getNSS(i+1) + "</p><div class='sub'>" + "Step" + "</div></a>";
  }
  getElementObject("erNavigatorList").innerHTML = outS;
  setTimeout("erNavigatorInfoCB2(true)", 1000);
}

function erNavigatorInfoCB2(flag)
{
  scrollRefresh("caresadmin-erNavigator", flag);
}

var isNewERNav = false;
function addNewERNav(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewERNav = true;
  getElementObject("erNavigatorText").innerHTML = "Adding New Entry";
  getElementStyleObject("erNavigatorBoxWrapper").display = "block";
  getElementStyleObject("erNavigatorListWrapper").display = "none";

  getElementObject("erNavigatorNameEn").value = "";
  getElementObject("erNavigatorNameEs").value = "";
  getElementObject("erNavigatorDescEn").value = "";
  getElementObject("erNavigatorDescEs").value = "";
  setTimeout("erNavigatorInfoCB2(true)", 500);

}

function erNavigatorSelected(pID)
{
  currERNav = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewERNav = false;
  getElementObject("erNavigatorText").innerHTML = "Editing Step " + (parseInt(pID) + 1).toString() + ".";
  getElementStyleObject("erNavigatorBoxWrapper").display = "block";
  getElementStyleObject("erNavigatorListWrapper").display = "none";

  activityIndicator.show();
  var url = "../";
  url = url + "getRowInfo";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  var callback = erNavigatorSelected_CB;
  loadFile(url, callback);
}

var data93;
function erNavigatorSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("erNavigatorInfoCB2(true)", 500);
  if(data==="0"){
    getElementObject("erNavigatorNameEn").value = "";
    getElementObject("erNavigatorNameEs").value = "";
    getElementObject("erNavigatorDescEn").value = "";
    getElementObject("erNavigatorDescEs").value = "";
    getElementObject("videoPreview").innerHTML = "";
    return;
  }
  var pInfo = JSON.parse(data);
  data93 = pInfo;
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "nameEn";
  if(pKeys.contains(temp) >=0){
    getElementObject("erNavigatorNameEn").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("erNavigatorNameEn").value = "";
  }
  temp = "nameEs";
  if(pKeys.contains(temp) >=0){
    getElementObject("erNavigatorNameEs").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("erNavigatorNameEs").value = "";
  }
  temp = "descEn";
  if(pKeys.contains(temp) >=0){
    getElementObject("erNavigatorDescEn").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("erNavigatorDescEn").value = "";
  }
  temp = "descEs";
  if(pKeys.contains(temp) >=0){
    getElementObject("erNavigatorDescEs").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("erNavigatorDescEs").value = "";
  }
  temp = "video";
  if(pKeys.contains(temp) >=0){
    getElementObject("videoPreview").innerHTML = "<a class='glassFinish deleteButton currentVideo' href='http://s3.amazonaws.com/caresapp/" + decodeURIComponent(pInfo[temp]) + "?t=" + new Date().getTime() + "' target='_blank'> Current Video </a>";
  }
  else{
    getElementObject("videoPreview").innerHTML = "";
  }
}

var currERNav;

function saveERNavClicked()
{
    addERNav();
}

function addERNav()
{
  activityIndicator.show();
  var url = "../";
  url = url + "addRow";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("erNavigatorNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("erNavigatorNameEs").value);
  url = url + "&descEn=" + encodeURIComponent(getElementObject("erNavigatorDescEn").value);
  url = url + "&descEs=" + encodeURIComponent(getElementObject("erNavigatorDescEs").value);
  var callback = saveERNavInfo;
  console.log(url);
  loadFile(url, callback);
}

function saveERNavInfo(data)
{
  activityIndicator.show();
  if(data==="0"){
    var url = "../";
    url = url + "editRow";
    url = url + "?category=ERNav";
    url = url + "&loc=" + Location;
    url = url + "&rowID=" + Location + "ERN" + currERNav;
    url = url + "&nameEn=" + encodeURIComponent(getElementObject("erNavigatorNameEn").value);
    url = url + "&nameEs=" + encodeURIComponent(getElementObject("erNavigatorNameEs").value);
    url = url + "&descEn=" + encodeURIComponent(getElementObject("erNavigatorDescEn").value);
    url = url + "&descEs=" + encodeURIComponent(getElementObject("erNavigatorDescEs").value);
    var callback = function(){getERNavInfo()}
    loadFile(url, callback);
  }
  else{
    getERNavInfo();
  }
}

function erNavigatorDeActive()
{
  getElementObject("erNavigatorNameEn").value = "";
  getElementObject("erNavigatorNameEs").value = "";
  getElementObject("erNavigatorDescEn").value = "";
  getElementObject("erNavigatorDescEs").value = "";
  getElementObject("erVideo").value = "";
}
