var productsinit = function()
{
	getElementObject("afterERFileUpload0").innerHTML = 
		'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="draftCBAER" type="checkbox">'+
		'<label class="labelinline" for="draftCBAER" id=""> This is a draft</label>'+
		'<a class="textLeftDI link" href="javascript:aerEmbedImage()"> Embed image by url</a>'+
		'<br>'+
		'<a class="textLeftDI link" href="javascript:aerEmbedFile()"> Embed file by url</a>'+
		'<br>'+
	'<a class="textLeftDI link" href="javascript:aerEmbedUpload()"> Embed YouTube/Vimeo/Web video url  </a>';
	getElementObject("afterERFileUpload").innerHTML = '<div class="fileUploadText textLeftDI"> Upload image, video or document</div> <input type="file" name="aerFileUpload" id="aerFileUpload" onchange="aerFileUploaded()">';
  getElementObject("afterERInputBox0").innerHTML = '<p class="titleText" id="afterERText"></p> <div class="text" id="permLinkAER"> </div><label for="afterERName">Resource Name</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERName">'
  getElementObject("afterERInputBox").innerHTML = '<label for="afterERDesc"> Resource Description </label>  <div class="taWrapper"> <textarea class="textareaTMCE" onkeypress="afterEREC()" id="afterERDesc"> </textarea> </div> <label for="afterERAddr"> Street Address </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERAddr"> <label for="afterERCity"> City </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERCity"> <label for="afterERZip"> ZIP Code </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERZip"> <label for="afterERTel"> Phone Number </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERTel"> <label for="afterERWeb"> Website </label><input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterERWeb"><label for="afterEREmail"> Email </label><input autocapitalize="off" autocorrect="off" class="input" onkeypress="afterEREC()" id="afterEREmail">';

  getElementObject("afterERDelete").innerHTML = "<a href='javascript:afterERDeleteClicked()'> <div class='glassFinish deleteButton'>Delete resource</div></a>";
  getElementObject("afterERDeleteYes").innerHTML = "<a href='javascript:afterERDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("afterERDeleteNo").innerHTML = "<a href='javascript:afterERDeleteNoClicked()'> <div class='glassFinish deleteNo'>No, not now.</div></a>";
  $("#afterERInputBox :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

}
function aerFileUploaded()
{
  var fd = new FormData();
  var filename = $('#aerFileUpload').get(0).files[0].name;
  var size = $('#aerFileUpload').get(0).files[0].size;
  fd.append('date', (new Date()).toString());
  fd.append('input', $('#aerFileUpload').get(0).files[0]);
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

	var theid =  currAfterER + new Date().getTime().toString();
  var fileInput = theid + ext;
  fd.append('fileInput', fileInput);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
         if (xhr.readyState != 4) { return; }
			activityIndicator.hide();
			getElementObject("aerFileUpload").value = "";
          };
  xhr.open("POST", "/uploadFile", true);
  xhr.send(fd);

  var aObj = {
	id: theid,
	url: fileInput,
	name: validext(ext),
	type: validext(ext),
	cat: currAfterER
  };
	toCloudAssets(aObj);
}



function afterERDeleteClicked()
{
  getElementStyleObject("afterERDeleteConf").display = "block";
  getElementStyleObject("afterERDelete").display = "none";
  setTimeout("afterERInfoCB2(false)", 500);
}

function afterERDeleteYesClicked()
{
  activityIndicator.show();
  var url = App.mainURL;
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

function productsActive()
{
  getAfterERInfo();
}

function getAfterERInfoA()
{
  getElementStyleObject("afterERBoxWrapper").display = "none";
  getElementStyleObject("afterERListWrapper").display = "block";
}

function getAfterERInfo()
{
  getElementStyleObject("afterERBoxWrapper").display = "none";
  getElementStyleObject("afterERListWrapper").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowsAdmin";
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
  currl = new Date().getTime().toString();
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
    outS = outS + "<a id='" + currl + pInfo[i].rowID + "' class='arrowFinish listItem' href='javascript:afterERSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><p>" + city + "</p></a>";
  }
  if(pInfo.length == 0){
  	outS = "<div class='titleText'> 0 Resources </br> <a href='javascript:addNewAfterER()'>Add some new reminders</a></div>";
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
      currs = getElementObject("canvasWrapper").scrollTop;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewAfterER = true;
  getElementObject("afterERText").innerHTML = "Adding New Resource";
  getElementObject("permLinkAER").innerHTML = "";
  getElementStyleObject("afterERBoxWrapper").display = "block";
  getElementStyleObject("afterERListWrapper").display = "none";

  getElementObject("afterERName").value = "";
  getElementObject("draftCBAER").checked = false;
  tinyMCE.get('afterERDesc').setContent("");
  getElementObject("afterERAddr").value = "";
  getElementObject("afterERCity").value = "";
  getElementObject("afterERZip").value = "";
  getElementObject("afterERTel").value = "";
  getElementObject("afterERWeb").value = "";
  getElementObject("afterEREmail").value = "";

  getElementStyleObject("afterERDeleteConf").display = "none";
  getElementStyleObject("afterERDelete").display = "none";
  setTimeout("afterERInfoCB2(true)", 500);
}

function afterERSelected(pID)
{
    var ty = currl + pID;
    selectedStyle.add(ty);
      currs = getElementObject("canvasWrapper").scrollTop;
  currAfterER = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewAfterER = false;
  getElementObject("afterERText").innerHTML = "Editing Resource: " + pID;
  getElementStyleObject("afterERBoxWrapper").display = "block";
  getElementStyleObject("afterERListWrapper").display = "none";

  getElementStyleObject("afterERDeleteConf").display = "none";
  getElementStyleObject("afterERDelete").display = "block";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = afterERSelected_CB;
  loadFile(url, callback);

  updateAssetsAER()
}

function updateAssetsAER()
{
	getElementObject("afterERFileList").innerHTML = "<div class='titleText'><h6 class='ac'> </h6></div>";
	var url = App.mainURL;
  url = url + "getAssets";
  url = url + "?cat=" + currAfterER;
  var callback = getAssetsAER_CB;
  loadFile(url, callback);
}

function getAssetsAER_CB(data)
{
	if(data === "[]"){
		assetManager.listObject = [];
		getElementObject("afterERFileList").innerHTML = "<div class='titleText'>No assets yet</div>";
		return;
	}
	var pInfo = JSON.parse(data);
	assetManager.listObject = pInfo;
	getElementObject("afterERFileList").innerHTML = assetManager.getAdminHTML("AER");
	activityIndicator.hide();
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
  temp = "draft";
  if(pKeys.contains(temp) >=0 && pInfo["draft"] === "true"){
    getElementObject("draftCBAER").checked = true;
  }
  else{
    getElementObject("draftCBAER").checked = false;
  }

  temp = "desc";
  if(pKeys.contains(temp) >=0){
      tinyMCE.get('afterERDesc').setContent(decodeURIComponent(pInfo[temp]));
  }
  else{
      tinyMCE.get('afterERDesc').setContent("");
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
  temp = "web";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterERWeb").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterERWeb").value = "";
  }
  temp = "email";
  if(pKeys.contains(temp) >=0){
    getElementObject("afterEREmail").value = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("afterEREmail").value = "";
  }
  getElementObject("permLinkAER").innerHTML = "Permanant Links: <a class='link' target='_blank' href='" + getShareLink('En') + "'>English</a> | <a target='_blank' class='link' href='" + getShareLink('Es') + "'>Spanish</a>"
	  scrollRefreshAll();
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
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "AER" + new Date().getTime();
  url = url + "&name=" + encodeURIComponent(getElementObject("afterERName").value);
  url = url + "&draft=" + getElementObject("draftCBAER").checked.toString();
  url = url + "&desc=" + encodeURIComponent(tinyMCE.get('afterERDesc').getContent());
  url = url + "&addr=" + encodeURIComponent(getElementObject("afterERAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("afterERCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("afterERZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("afterERTel").value);
  url = url + "&web=" + encodeURIComponent(getElementObject("afterERWeb").value);
  url = url + "&email=" + encodeURIComponent(getElementObject("afterEREmail").value);
  var callback = function(){getAfterERInfo()}
  console.log(url);
  loadFile(url, callback);
}

function saveAfterERInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editRow";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currAfterER);
  url = url + "&name=" + encodeURIComponent(getElementObject("afterERName").value);
  url = url + "&draft=" + getElementObject("draftCBAER").checked.toString();
  url = url + "&desc=" + encodeURIComponent(tinyMCE.get('afterERDesc').getContent());
  url = url + "&addr=" + encodeURIComponent(getElementObject("afterERAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("afterERCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("afterERZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("afterERTel").value);
  url = url + "&web=" + encodeURIComponent(getElementObject("afterERWeb").value);
  url = url + "&email=" + encodeURIComponent(getElementObject("afterEREmail").value);
  var callback = function(){getAfterERInfo()}
  loadFile(url, callback);
}

function productsDeActive()
{
  getElementObject("afterERName").value = "";
  getElementObject("draftCBAER").checked = false;
  tinyMCE.get('afterERDesc').setContent("");
  getElementObject("afterERAddr").value = "";
  getElementObject("afterERCity").value = "";
  getElementObject("afterERZip").value = "";
  getElementObject("afterERTel").value = "";
  $(".textareaTCME").blur();
}


function aerEmbedImage()
{
	embedID = "embedAER" + Location + new Date().getTime().toString();
	embedCat = currAfterER;
	embedType = "embedimage";

	dialogInput.display("Enter link to web image.","", embedUploadNow);
}


function aerEmbedFile()
{
	embedID = "embedAER" + Location + new Date().getTime().toString();
	embedCat = currAfterER;
	embedType = "embedfile";

	dialogInput.display("Enter link to web file.","", embedUploadNow);
}

function aerEmbedUpload()
{
	embedID = "embedAER" + Location + new Date().getTime().toString();
	embedCat = currAfterER;
	embedType = "embedvideo";

	dialogInput.display("Enter YouTube/Vimeo/Web video.","", embedUploadNow);
}
