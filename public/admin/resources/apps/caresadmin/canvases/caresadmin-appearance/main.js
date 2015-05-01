var caresadminappearanceinit = function()
{
  getElementObject("appearanceInputBox").innerHTML = '<div data-role="fieldcontain"><p class="text" id="hbgText"> Header Background</p><input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" name="appHBGRed" id="appHBGRed" onchange="appPreviewUpdateTrue()"/> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appHBGGreen" onchange="appPreviewUpdateTrue()"/> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appHBGBlue" onchange="appPreviewUpdateTrue()"/><p class="text" id="htcText"> Header Text Color</p> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appHCRed" onchange="appPreviewUpdateTrue()"> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appHCGreen" onchange="appPreviewUpdateTrue()"> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appHCBlue" onchange="appPreviewUpdateTrue()"><p class="text" id="mbgText"> Main Screen Background </p> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appMainRed" onchange="appPreviewUpdateTrue()"> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appMainGreen" onchange="appPreviewUpdateTrue()"> <input data-role="page" data-highlight="true" data-mini="false" type="range" min="0" max="255" value="100" step="1" class="inputSlider" id="appMainBlue" onchange="appPreviewUpdateTrue()"> <p class="text" id="iconUploadText"> Upload/Change App Icon </p> <input type="file" name="iconUpload" id="iconUpload" onchange="iconUploaded()"> </div>';
  
  setTimeout('$("#appearanceInputBox .inputSlider").slider(); $(".ui-loader").hide();', 1000);
}

var data89;

function iconUploaded()
{
  /*var reader = new FileReader();
  reader.onload = (function(theFile) {
   return function(e) {
    getElementStyleObject("appPreview").backgroundImage = "url(" + e.target.result + ")";
   };
  })(f);
  var f = getElementObject("iconUpload").files[0]
  reader.readAsDataURL(f);*/

  var fd = new FormData();
  getElementObject("iconUploadText").innerHTML = "Loading icon. Please wait";
  var filename = $('#iconUpload').get(0).files[0].name;
  var size = $('#iconUpload').get(0).files[0].size;
  if(size > 256000){
    messageHandler.flashNewMessage("File too large", "please ensure your icon is under 256 Kb");  
    return;
  }
  fd.append('date', (new Date()).toString());
  fd.append('input', $('#iconUpload').get(0).files[0]);
  var t = filename.substring(filename.length-4, filename.length).toLowerCase();
  if(t != ".png"){
    messageHandler.flashNewMessage("Incorrect File", "please ensure your icon is a png image");  
    return;
  }

  getElementStyleObject("appPreview").backgroundImage = "";
  var fileInput = Location + "icon" + t;
  tempimg1 = fileInput;
  fd.append('fileInput', fileInput);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) { return; }
    getElementObject("iconUploadText").innerHTML = "Upload/Change Icon";
    getElementObject("iconUpload").value = "";
    iconUpload_CB2();
  };
  xhr.open("POST", "/uploadFile", true);
  xhr.send(fd);


}

function iconUpload_CB2(){
  getElementStyleObject("appPreview").backgroundImage = "url(http://s3.amazonaws.com/caresapp/" + Location + "icon.png?t=" + new Date().getTime()  + ")";

}


function appearanceActive()
{
  getAppearanceInfo();
  iconUpload_CB2();
}

function getAppearanceInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "getLocationAppInfo";
  url = url + "?loc=" + Location;
  var callback = getAppearanceInfo_CB;
  loadFile(url, callback);
}

var data68;

function getAppearanceInfo_CB(data)
{
  activityIndicator.hide();
  var hInfo = JSON.parse(decodeURIComponent(data));
  data68 = hInfo;
  var hIKeys = Object.keys(hInfo);
  var temp;
  temp = "name";
  if(hIKeys.contains(temp) < 0){
    getElementObject("headerTitlePreview2").innerHTML = "";
  }
  else{
    getElementObject("headerTitlePreview2").innerHTML = decodeURIComponent(hInfo[temp]);
  }
  
  temp = "color";
  if(hIKeys.contains(temp) < 0){
    temp = ["0", "0", "0", "100", "100", "100", "255", "255", "255"];
  }
  else{
    temp = JSON.parse(hInfo[temp]);
  }

  for(var i=0; i<appNumbers.length; i++){
    getElementObject(appNumbers[i]).value = temp[i];
  }
  $("#appearanceInputBox .inputSlider").slider("refresh");
  appPreviewUpdate(false);

  dataEdited= false;
  unsavedDataPlugin.hide();
}

function cancelAppearanceClicked()
{
  var t = getAppearanceInfo();
  unsavedDataPlugin.hide();
  dataEdited = false;
}

function saveAppearanceClicked()
{
  var t = appPreviewUpdate(false);
  if(t!=null){
    saveAppearanceInfo();
  }
}


function saveAppearanceInfo()
{
  activityIndicator.show();
  var url = "../";
  url = url + "editLocation";
  url = url + "?loc=" + Location;
  url = url + "&color=" + encodeURIComponent(JSON.stringify(appPreviewUpdate(false)));
  console.log(url);
  var callback = function(){
    activityIndicator.hide();
  }
  loadFile(url, callback);
}

function appearanceDeActive()
{
  for(var i=0; i< appNumbers.length; i++){
    getElementObject(appNumbers[i]).value = "";
  }
  getElementObject("iconUpload").value = "";
  getElementObject("iconUploadText").innerHTML = "Upload/Change App Icon";
}

function appChanged()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function isNormalInteger(str) {
      var n = ~~Number(str);
      return String(n) === str && n >= 0 && n <=255;
}

var appNumbers = ["appMainRed","appMainGreen","appMainBlue","appHBGRed","appHBGGreen","appHBGBlue","appHCRed", "appHCGreen","appHCBlue"];

function appPreviewUpdateTrue(){
  appChanged();
  appPreviewUpdate(false);
}

function appPreviewUpdate(flag)
{
  var temp;
  var valid = [true,true,true];
  var redColor = "rgb(209, 72, 54)";
  var colors = new Array();
  for(var i=0; i< appNumbers.length; i++){
    temp = getElementObject(appNumbers[i]).value;
    if(isNormalInteger(temp)){
      getElementStyleObject(appNumbers[i]).backgroundColor = "";
      colors[colors.length] = temp;
    }
    else{
      valid[parseInt(i/3)] = false;
      getElementStyleObject(appNumbers[i]).backgroundColor = redColor;
    }
  }
  
  
  if(valid[0]){
    getElementStyleObject("appPreview").backgroundColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
    getElementObject("mbgText").innerHTML = "Main Screen Background : " + "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
  }
  else{
    getElementStyleObject("appPreview").backgroundColor = "";
    getElementObject("mbgText").innerHTML = "Main Screen Background";
  }
  if(valid[1]){
    getElementStyleObject("headerPreview").backgroundColor = "rgb(" + colors[3] + "," + colors[4] + "," + colors[5] + ")";
    getElementObject("hbgText").innerHTML = "Header Background : " + "rgb(" + colors[3] + "," + colors[4] + "," + colors[5] + ")";
  }
  else{
    getElementStyleObject("headerPreview").backgroundColor = "";
    getElementObject("hbgText").innerHTML = "Header Background";
  }
  if(valid[2]){
    getElementStyleObject("headerPreview").color = "rgb(" + colors[6] + "," + colors[7] + "," + colors[8] + ")";
    getElementObject("htcText").innerHTML = "Header Text Color : " + "rgb(" + colors[6] + "," + colors[7] + "," + colors[8] + ")";
  }
  else{
    getElementStyleObject("headerPreview").color = "";
    getElementObject("htcText").innerHTML = "Header Text Color";
  }

  if(valid[0] && valid[1] && valid[2]){
    return colors;
  }
  else{
    return null;
  }
}


