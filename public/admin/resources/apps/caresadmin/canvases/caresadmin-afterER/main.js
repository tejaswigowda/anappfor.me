var caresadminafterERinit = function()
{
  getElementObject("afterERInputBox").innerHTML = '<p class="titleText" id="afterERText"></p> <p class="text">Location Name</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERName"> <p class="text"> Location Description </p> <textarea class="textarea" onkeypress="afterEREC()" id="afterERDesc"> </textarea> <p class="text"> Street Address </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERAddr"> <p class="text"> City </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERCity"> <p class="text"> ZIP Code </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERZip"> <p class="text"> Phone Number </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERTel">';

  getElementObject("addAfterER").innerHTML = "<a href='javascript:addNewAfterER()'> <div class='glassFinish addNew'>Add new location</div></a>";
  getElementObject("afterERDelete").innerHTML = "<a href='javascript:afterERDeleteClicked()'> <div class='glassFinish deleteButton'>Delete location</div></a>";
  getElementObject("afterERDeleteYes").innerHTML = "<a href='javascript:afterERDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("afterERDeleteNo").innerHTML = "<a href='javascript:afterERDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
}


function afterERDeleteClicked()
{
  setTimeout('getElementStyleObject("afterERDeleteConf").display = "block"', 500);
  getElementStyleObject("afterERDelete").display = "none";
  setTimeout("afterERInfoCB2(false)", 500);
}

function afterERDeleteYesClicked()
{
  activityIndicator.show();
  var url = "../";
  url = url + "deleteRow";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + currAfterER;
  var callback = deleteAfterER_CB;
  loadFile(url, callback);
}

function deleteAfterER_CB(data)
{
  dataEdited = false;
  unsavedDataPlugin.hide();
  getAfterERInfo();
}

function afterERDeleteNoClicked()
{
  getElementStyleObject("afterERDeleteConf").display = "none";
  getElementStyleObject("afterERDelete").display = "block";
  setTimeout("afterERInfoCB2(false)", 500);
}


function afterEREC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function afterERActive()
{
  getAfterERInfo();
}

function getAfterERInfo()
{
  getElementStyleObject("afterERBoxWrapper").display = "none";
  getElementStyleObject("afterERListWrapper").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRows";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  var callback = getAfterERInfo_CB;
  loadFile(url, callback);
}

function getAfterERInfo_CB(data)
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
    if(pKeys.contains("name") >=0){
      name = pInfo[i].name;
    }
    else{
      name = "No name";
    }
    if(pKeys.contains("city") >=0){
      city = pInfo[i].city;
    }
    else{
      city = "Unknown Location";
    }
    outS = outS + "<a class='listItem' href='javascript:afterERSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><div class='sub'>" + city + "</div></a>";
  }
  getElementObject("afterERList").innerHTML = outS;
  setTimeout("afterERInfoCB2(true)", 1000);
}

function afterERInfoCB2(flag)
{
  scrollRefresh("caresadmin-afterER", flag);
}

var isNewAfterER = false;
function addNewAfterER(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewAfterER = true;
  getElementObject("afterERText").innerHTML = "Adding New Location";
  getElementStyleObject("afterERBoxWrapper").display = "block";
  getElementStyleObject("afterERListWrapper").display = "none";

  getElementObject("afterERName").value = "";
  getElementObject("afterERDesc").value = "";
  getElementObject("afterERAddr").value = "";
  getElementObject("afterERCity").value = "";
  getElementObject("afterERZip").value = "";
  getElementObject("afterERTel").value = "";

  getElementStyleObject("afterERDeleteConf").display = "none";
  getElementStyleObject("afterERDelete").display = "none";
  setTimeout("afterERInfoCB2(true)", 500);
}

function afterERSelected(pID)
{
  currAfterER = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewAfterER = false;
  getElementObject("afterERText").innerHTML = "Editing Location: " + pID;
  getElementStyleObject("afterERBoxWrapper").display = "block";
  getElementStyleObject("afterERListWrapper").display = "none";

  getElementStyleObject("afterERDeleteConf").display = "none";
  getElementStyleObject("afterERDelete").display = "block";
  activityIndicator.show();
  var url = "../";
  url = url + "getRowInfo";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = afterERSelected_CB;
  loadFile(url, callback);
}

function afterERSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("afterERInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "name";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERName").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERName").value = "";
  }
  temp = "desc";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERDesc").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERDesc").value = "";
  }
  temp = "addr";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERAddr").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERAddr").value = "";
  }
  temp = "city";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERCity").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERCity").value = "";
  }
  temp = "zip";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERZip").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERZip").value = "";
  }
  temp = "tel";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERTel").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERTel").value = "";
  }
}

var currAfterER;

function saveAfterERClicked()
{
  if(isNewAfterER){
    addAfterER();
  }
  else{
    saveAfterERInfo();
  }
}

function addAfterER()
{
  activityIndicator.show();
  var url = "../";
  url = url + "addRow";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "AER" + new Date().getTime();
  url = url + "&name=" + encodeURIComponent(getElementObject("afterERName").value);
  url = url + "&desc=" + encodeURIComponent(getElementObject("afterERDesc").value);
  url = url + "&addr=" + encodeURIComponent(getElementObject("afterERAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("afterERCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("afterERZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("afterERTel").value);
  var callback = function(){getAfterERInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveAfterERInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "editRow";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currAfterER);
  url = url + "&name=" + encodeURIComponent(getElementObject("afterERName").value);
  url = url + "&desc=" + encodeURIComponent(getElementObject("afterERDesc").value);
  url = url + "&addr=" + encodeURIComponent(getElementObject("afterERAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("afterERCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("afterERZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("afterERTel").value);
  var callback = function(){getAfterERInfo()}
  loadFile(url, callback);
}

function afterERDeActive()
{
  getElementObject("afterERName").value = "";
  getElementObject("afterERDesc").value = "";
  getElementObject("afterERAddr").value = "";
  getElementObject("afterERCity").value = "";
  getElementObject("afterERZip").value = "";
  getElementObject("afterERTel").value = "";
}
