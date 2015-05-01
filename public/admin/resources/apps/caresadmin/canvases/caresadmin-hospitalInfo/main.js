var caresadminhospitalInfoinit = function()
{
  getElementObject("hospitalInfoInputBox").innerHTML = '<p class="text">Hospital Name</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalName"> <p class="text"> Brief Description </p> <textarea class="textarea" onkeypress="hospitalInfoEC()" id="hospitalDesc"> </textarea> <p class="text"> Street Address </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalAddr"> <p class="text"> City </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalCity"> <p class="text"> ZIP Code </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalZip"> <p class="text"> Phone Number </p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalTel">';
}

function hospitalInfoEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function hospitalInfoActive()
{
  getHospitalInfo();
}

function getHospitalInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "getLocationInfo";
  url = url + "?loc=" + Location;
  var callback = getHospitalInfo_CB;
  loadFile(url, callback);
}

function getHospitalInfo_CB(data)
{
  activityIndicator.hide();
  var hInfo = JSON.parse(data);
  var hIKeys = Object.keys(hInfo);
  var temp;
  temp = "name";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalName").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalName").value = "";
  }

  temp = "desc";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalDesc").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalDesc").value = "";
  }

  temp = "addr";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalAddr").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalAddr").value = "";
  }

  temp = "city";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalCity").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalCity").value = "";
  }

  temp = "zip";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalZip").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalZip").value = "";
  }

  temp = "tel";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalTel").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalTel").value = "";
  }
}

function saveHospitalInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "editLocation";
  url = url + "?loc=" + Location;
  url = url + "&name=" + encodeURIComponent(getElementObject("hospitalName").value);
  url = url + "&desc=" + encodeURIComponent(getElementObject("hospitalDesc").value);
  url = url + "&addr=" + encodeURIComponent(getElementObject("hospitalAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("hospitalCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("hospitalZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("hospitalTel").value);
  var callback = function(){
    activityIndicator.hide();
  }
  loadFile(url, callback);
}

function hospitalInfoDeActive()
{
  getElementObject("hospitalName").value = "";
  getElementObject("hospitalDesc").value = "";
  getElementObject("hospitalAddr").value = "";
  getElementObject("hospitalCity").value = "";
  getElementObject("hospitalZip").value = "";
  getElementObject("hospitalName").value = "";
  getElementObject("hospitalTel").value = "";
}
