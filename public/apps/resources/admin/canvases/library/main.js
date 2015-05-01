var libraryinit = function()
{
  getElementObject("intWrapper").innerHTML = 
        '<div class="titleTextLeft" id="intTitle">Interests</div>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int0" type="checkbox"> <label for="int0">Chronic Obstructive Pulmonary Disease (COPD) </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int1" type="checkbox"> <label for="int1">Congestive Heart Failure (CHF) </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int2" type="checkbox"> <label for="int2">Diabetes </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int3" type="checkbox"> <label for="int3">Hypertension </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int4" type="checkbox"> <label for="int4">Heart Disease </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int5" type="checkbox"> <label for="int5">Joint Replacement </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int6" type="checkbox"> <label for="int6">Kidney Disease </label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="int7" type="checkbox"> <label for="int7">Pneumonia </label>';
  getElementObject("glsWrapper").innerHTML = 
        '<div class="titleTextLeft" id="goalTitle">Goals</div>'+
    '<input onChange="loginEC2()" class="inputcheck" id="gls0" type="checkbox"> <label for="gls0">Exercise</label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="gls1" type="checkbox"> <label for="gls1">Stop Smoking</label>'+
    '</br>'+
    '<input onChange="loginEC2()" class="inputcheck" id="gls2" type="checkbox"> <label for="gls2">Weight Loss</label>';

	getElementObject("healthInfoFileUpload0").innerHTML =
		'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="draftCBHI" type="checkbox">'+
		'<label for="draftCBHI" class="labelinline"> This is a draft</label>'+
		'<a class="textLeftDI link" href="javascript:hiEmbedImage()"> Embed image by url</a>'+
		'<br>'+
		'<a class="textLeftDI link" href="javascript:hiEmbedFile()"> Embed file by url</a>'+
		'<br>'+
	       	'<a class="textLeftDI link" href="javascript:hiEmbedUpload()"> Embed YouTube/Vimeo/Web video url  </a>';
	getElementObject("healthInfoFileUpload").innerHTML = '<div class="fileUploadText textLeftDI"> Upload image, video or document</div> <input type="file" name="hiFileUpload" id="hiFileUpload" onchange="hiFileUploaded()">';
  getElementObject("healthInfoInputBox0").innerHTML = '<p class="titleText" id="healthInfoText"></p> <div class="text" id="permLinkHI"> </div><label for="healthInfoNameEn" >Entry Name (English)</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="healthInfoEC()" id="healthInfoNameEn"> <label  for="healthInfoNameEs">Entry Name (Spanish)</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="healthInfoEC()" id="healthInfoNameEs">';
  getElementObject("healthInfoInputBox").innerHTML =  '<label  for="healthInfoDescEn"> Entry Details (English) </label>  <div class="taWrapper"><textarea class="textareaTMCE" onkeypress="healthInfoEC()" id="healthInfoDescEn" name="healthInfoDescEn"> </textarea></div> <label  for="healthInfoDescEs"> Entry Details (Spanish) </label>  <div class="taWrapper"><textarea class="textareaTMCE" onkeypress="healthInfoEC()" id="healthInfoDescEs" name="healthInfoDescEs"> </textarea></div>';

  getElementObject("healthInfoDelete").innerHTML = "<a href='javascript:healthInfoDeleteClicked()'> <div class='glassFinish deleteButton'>Delete entry</div></a>";
  getElementObject("healthInfoDeleteYes").innerHTML = "<a href='javascript:healthInfoDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("healthInfoDeleteNo").innerHTML = "<a href='javascript:healthInfoDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  $("#healthInfoInputBox :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });
}
function hiFileUploaded()
{
  var fd = new FormData();
  var filename = $('#hiFileUpload').get(0).files[0].name;
  var size = $('#hiFileUpload').get(0).files[0].size;
  fd.append('date', (new Date()).toString());
  fd.append('input', $('#hiFileUpload').get(0).files[0]);
  var ext = filename.substring(filename.length-4, filename.length);
  if(validext(ext) == null){
    alertHandler.flashNewMessage("Not a valid extension", ".png .jpg, .jpeg .mp4, .m4v .doc .pdf .ppt .docx .pptx allowed...");
    return;
  }
  if(size > 20000000){
    alertHandler.flashNewMessage("File too large", "please ensure your file is under 20 Mb...");  
    return;
  }
  activityIndicator.setText("Uploading file...");
  activityIndicator.show();

	var theid =  currHealthInfo + new Date().getTime().toString();
  var fileInput = theid + ext;
  fd.append('fileInput', fileInput);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
         if (xhr.readyState != 4) { return; }
			activityIndicator.hide();
          getElementObject("hiFileUpload").value = "";
          };
  xhr.open("POST", "/uploadFile", true);
  xhr.send(fd);
  activityIndicator.show();

  var aObj = {
	id: theid,
	url: fileInput,
	name: validext(ext),
	type: validext(ext),
	cat: currHealthInfo
  };
	toCloudAssets(aObj);
}

function healthInfoDeleteClicked()
{
  getElementStyleObject("healthInfoDeleteConf").display = "block";
  getElementStyleObject("healthInfoDelete").display = "none";
  setTimeout("healthInfoInfoCB2(false)", 500);
}

function healthInfoDeleteYesClicked()
{
  activityIndicator.show();
  var url = App.mainURL;
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

function libraryActive()
{
  getHealthInfoInfo();
}

function getHealthInfoInfoA()
{
  getElementStyleObject("healthInfoBoxWrapper").display = "none";
  getElementStyleObject("healthInfoListWrapper").display = "block";
}

function getHealthInfoInfo()
{
  getElementStyleObject("healthInfoBoxWrapper").display = "none";
  getElementStyleObject("healthInfoListWrapper").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowsAdmin";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  var callback = getHealthInfoInfo_CB;
  loadFile(url, callback);
}

var currl = new Date().getTime().toString();
var currs = 0;

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
    outS = outS + "<a id='" + currl + pInfo[i].rowID + "' class='arrowFinish listItem' href='javascript:healthInfoSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><p>" + city + "</p></a>";
  }
  if(pInfo.length == 0){
  	outS = "<div class='titleText'> 0 Items </br> <a href='javascript:addNewHealthInfo()'>Add some new entries! </a></div>";
  }
  getElementObject("healthInfoList").innerHTML = outS;
  scrollRefreshAll();
}

function healthInfoInfoCB2(flag)
{
  scrollRefresh("caresadmin-healthInfo", flag);
}

var isNewHealthInfo = false;
function addNewHealthInfo(pID)
{
      currs = getElementObject("canvasWrapper").scrollTop;
  lastScrollPosition = getDocumentScroll();
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewHealthInfo = true;
  getElementObject("healthInfoText").innerHTML = "Adding New Entry";
  getElementObject("permLinkHI").innerHTML = "";
  getElementStyleObject("healthInfoBoxWrapper").display = "block";
  getElementStyleObject("healthInfoListWrapper").display = "none";

  getElementObject("healthInfoNameEn").value = "";
  getElementObject("draftCBHI").checked = false;
  getElementObject("healthInfoNameEs").value = "";
  tinyMCE.get('healthInfoDescEn').setContent("");
  tinyMCE.get('healthInfoDescEs').setContent("");

  getElementStyleObject("healthInfoDeleteConf").display = "none";
  getElementStyleObject("healthInfoDelete").display = "none";
  //getElementStyleObject("hiImagePreview").display = "none";
  //getElementStyleObject("hiImagePreview").backgroundImage = "";
  setTimeout("healthInfoInfoCB2()", 100);
}

function healthInfoSelected(pID)
{
    var ty = currl + pID;
    selectedStyle.add(ty);
      currs = getElementObject("canvasWrapper").scrollTop;
  lastScrollPosition = getDocumentScroll();
 
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
  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = healthInfoSelected_CB;
  loadFile(url, callback);
  updateAssetsHI();
}

function updateAssetsHI()
{
	getElementObject("healthInfoFileList").innerHTML = "<div class='titleText'><h6 class='ac'> </h6></div>";
	var url = App.mainURL;
  url = url + "getAssets";
  url = url + "?cat=" + currHealthInfo;
  var callback = getAssetsHI_CB;
  loadFile(url, callback);
}

function getAssetsHI_CB(data)
{
	if(data === "[]"){
		assetManager.listObject = [];
		getElementObject("healthInfoFileList").innerHTML = "<div class='titleText'>No assets yet</div>";
		return;
	}
	var pInfo = JSON.parse(data);
	assetManager.listObject = pInfo;
	getElementObject("healthInfoFileList").innerHTML = assetManager.getAdminHTML("AER");
	activityIndicator.hide();
}


var data57;
function healthInfoSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("healthInfoInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  temp = "interests";
  if(pKeys.contains(temp) >=0){
    setInterests(decodeURIComponent(pInfo[temp]))
  }
  else{
    setInterests("00000000");
  }
  temp = "goals";
  if(pKeys.contains(temp) >=0){
    setGoals(decodeURIComponent(pInfo[temp]))
  }
  else{
    setGoals("000");
  }
  temp = "draft";
  if(pKeys.contains(temp) >=0 && pInfo["draft"] === "true"){
    getElementObject("draftCBHI").checked = true;
  }
  else{
    getElementObject("draftCBHI").checked = false;
  }
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
    tinyMCE.get('healthInfoDescEn').setContent(pInfo[temp]);
  }
  else{
    tinyMCE.get('healthInfoDescEn').setContent("");
  }
  temp = "descEs";
  if(pKeys.contains(temp) >=0){
    tinyMCE.get('healthInfoDescEs').setContent(pInfo[temp]);
  }
  else{
    tinyMCE.get('healthInfoDescEs').setContent("");
  }

  /*
  temp = "image";
  if(pKeys.contains(temp) >=0){
    getElementStyleObject("hiImagePreview").backgroundImage = "url(https://s3.amazonaws.com/caresapp/" + decodeURIComponent(pInfo[temp]) + "?t=" + new Date().getTime() + ")";
    getElementStyleObject("hiImagePreview").display = "block";
  }
  else{
    getElementStyleObject("hiImagePreview").display = "none";
    getElementStyleObject("hiImagePreview").backgroundImage = "url(noimageuploaded.png)"
  }*/
  getElementObject("permLinkHI").innerHTML = "Permanant Links: <a class='link' target='_blank' href='" + getShareLink('En') + "'>English</a> | <a target='_blank' class='link' href='" + getShareLink('Es') + "'>Spanish</a>"
	scrollRefreshAll();
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
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("healthInfoNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("healthInfoNameEs").value);
  url = url + "&draft=" + getElementObject("draftCBHI").checked.toString();
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('healthInfoDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('healthInfoDescEs').getContent());
  url = url + "&interests=" + encodeURIComponent(getInterests());
  url = url + "&goals=" + encodeURIComponent(getGoals());
  var callback = function(){getHealthInfoInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveHealthInfoInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editRow";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currHealthInfo);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("healthInfoNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("healthInfoNameEs").value);
  url = url + "&draft=" + getElementObject("draftCBHI").checked.toString();
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('healthInfoDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('healthInfoDescEs').getContent());
  url = url + "&interests=" + encodeURIComponent(getInterests());
  url = url + "&goals=" + encodeURIComponent(getGoals());
  var callback = function(){getHealthInfoInfo()}
  loadFile(url, callback);
}

function libraryDeActive()
{
  getElementObject("draftCBHI").checked = false;
  getElementObject("healthInfoNameEn").value = "";
  getElementObject("healthInfoNameEs").value = "";
  tinyMCE.get('healthInfoDescEn').setContent("");
  tinyMCE.get('healthInfoDescEs').setContent("");
  getElementObject("hiFileUpload").value = "";
  $(".textareaTCME").blur();
}

function hiEmbedImage()
{
	embedID = "embedHI" + Location + new Date().getTime().toString();
	embedCat = currHealthInfo;
	embedType = "embedimage";

	dialogInput.display("Enter link to web image.","", embedUploadNow);
}


function hiEmbedFile()
{
	embedID = "embedHI" + Location + new Date().getTime().toString();
	embedCat = currHealthInfo;
	embedType = "embedfile";

	dialogInput.display("Enter link to web file.","", embedUploadNow);
}


function hiEmbedUpload()
{
	embedID = "embedHI" + Location + new Date().getTime().toString();
	embedCat = currHealthInfo;
	embedType = "embedvideo";

	dialogInput.display("Enter YouTube/Vimeo/Web video.","", embedUploadNow);
}

function getGoals()
{
    var outS = "";
    for(var i= 0; i < 3; i++){
        var flag = getElementObject("gls" + i).checked;
        if(flag){
            outS += "1";
        }
        else{
            outS += "0";
        }
    }
    return outS;
}

function setGoals(str)
{
    if(str.length < 3){
        str = "000";
    }
    for(var i= 0; i < str.length; i++){
        var t = str[i];
        if(t === "1"){
            getElementObject("gls" + i).checked = true;
        }
        else{
            getElementObject("gls" + i).checked = false;
        }
    }
}

function getInterests()
{
    var outS = "";
    for(var i= 0; i < 8; i++){
        var flag = getElementObject("int" + i).checked;
        if(flag){
            outS += "1";
        }
        else{
            outS += "0";
        }
    }
    return outS;
}

function setInterests(str)
{
    if(str.length < 8){
        str = "00000000";
    }
    for(var i= 0; i < str.length; i++){
        var t = str[i];
        if(t === "1"){
            getElementObject("int" + i).checked = true;
        }
        else{
            getElementObject("int" + i).checked = false;
        }
    }
}


