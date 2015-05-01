var appinit = function()
{
	getElementObject("erNavigatorFileUpload0").innerHTML = 
//		'<label for="draftCBER" class="labelinline"> This is a draft</label>'+
//		'<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="" id="draftCBER" type="checkbox">'+
		'<a class="textLeftDI link" href="javascript:erEmbedImage()"> Embed image by url</a>'+
		'<br>'+
		'<a class="textLeftDI link" href="javascript:erEmbedFile()"> Embed file by url</a>'+
		'<br>'+
		'<a class="textLeftDI link" href="javascript:erEmbedUpload()"> Embed YouTube/Vimeo/Web video url  </a>';
	getElementObject("erNavigatorFileUpload").innerHTML = 
		'<div class="fileUploadText textLeftDI"> Upload image, video or document</div> <input type="file" name="erFileUpload" id="erFileUpload" onchange="erFileUploaded()">';
getElementObject("erNavigatorInputBox0").innerHTML = '<p class="titleText" id="erNavigatorText"></p>  <div class="text" id="permLinkER"> </div><label for="erNavigatorNameEn">Item Name (English)</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="erNavigatorEC()" id="erNavigatorNameEn"> <label for="erNavigatorNameEs">Item Name (Spanish)</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="erNavigatorEC()" id="erNavigatorNameEs">';
getElementObject("erNavigatorInputBox").innerHTML =  '<label for="erNavigatorDescEn"> Item Description (English) </label> <div class="taWrapper"> <textarea class="textareaTMCE" onkeypress="erNavigatorEC()" id="erNavigatorDescEn" name="erNavigatorDescEn"> </textarea> </div> <label for="erNavigatorDescEs"> Item Description (Spanish) </label> <div class="taWrapper"> <textarea class="textareaTMCE" onkeypress="erNavigatorEC()" id="erNavigatorDescEs" name="erNavigatorDescEs"> </textarea> </div>';
  getElementObject("erNavigatorInputBoxAux").innerHTML =
		'<label id="checklistToggleL" for="checklistToggle"> This is a checklist </label>'+ 
 '<input autocapitalize="off" autocorrect="off" class="checkbox" onchange="setERStepsNo()" id="checklistToggle" type="checkbox"></br>'+
  	  '<p class="titleText" id="noofStepsText"> Number of Items: </p> <select onchange="noofERStepsChanged()" id="noofERSteps"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option>     <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option>       </select> '; 
  getElementObject("erNavigatorList").innerHTML = "<a class='arrowFinish listItem' href='javascript:stepSelected(0)' id='stepN0'> <p>Item 1 </p> </a> <a  class='arrowFinish listItem' href='javascript:stepSelected(1)' id='stepN1'> <p> Item 2</p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(2)' id='stepN2'> <p> Item 3</p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(3)' id='stepN3'> <p> Item 4</p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(4)' id='stepN4'> <p> Item 5</p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(5)' id='stepN5'> <p> Item 6</p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(6)' id='stepN6'> <p> Item 7 </p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(7)' id='stepN7'> <p> Item 8</p> </a> <a  class='arrowFinish listItem'  href='javascript:stepSelected(8)' id='stepN8'> <p> Item 9</p> </a>  <a  class='arrowFinish listItem'  href='javascript:stepSelected(9)' id='stepN9'> <p> Item 10 </p> </a>  	  <a  class='arrowFinish listItem'  href='javascript:stepSelected(10)' id='stepN10'> <p> Item 11 </p> </a>  	  <a  class='arrowFinish listItem'  href='javascript:stepSelected(11)' id='stepN11'> <p> Item 12 </p> </a>  	  <a  class='arrowFinish listItem'  href='javascript:stepSelected(12)' id='stepN12'> <p> Item 13 </p> </a>  	  <a  class='arrowFinish listItem'  href='javascript:stepSelected(13)' id='stepN13'> <p> Item 14 </p> </a><a  class='arrowFinish listItem'  href='javascript:stepSelected(14)' id='stepN14'> <p> Item 15 </p> </a>";
 //setTimeout("erNavAux2()", 100);
}

function erNavAux2(){
	$("#erNavigatorInputBoxAux :input").focus(function() {
				$("label[for='" + this.id + "']").addClass("labelfocus");
					}).blur(function() {
							$("label").removeClass("labelfocus");
							});
}

function noofERStepsChanged()
{
  setERStepsNo();
}

function validext(ext)
{
	ext = ext.substring(1).toLowerCase();
	console.log(ext)
	var t = ["png", "jpg", "jpeg", "mp4", "m4v", "doc", "pdf", "ppt", "docx", "pptx"];
	var r = t.contains(ext) 
	if(r < 0){
		return null;
	}
	else if(r <= 2){
		return "image";
	}
	else if(r <= 4){
		return "video";
	}
	else if(r <= 9){
		return "doc";
	}
	else{
		return null;
	}
}


function erFileUploaded()
{
  var fd = new FormData();
  var filename = $('#erFileUpload').get(0).files[0].name;
  var size = $('#erFileUpload').get(0).files[0].size;
  var ext = filename.substring(filename.length-4, filename.length);
  console.log(ext);
  if(validext(ext) == null){
    alertHandler.flashNewMessage("Not a valid extension", ".png .jpg, .jpeg .mp4, .m4v .doc .pdf .ppt .docx .pptx allowed...");
	erVideoUpload_CB2();
    return;
  }
  if(size > 20000000){
    alertHandler.flashNewMessage("File too large", "please ensure your file is under 20 Mb...");  
	erVideoUpload_CB2();
    return;
  }
  activityIndicator.setText("Uploading file...");
  activityIndicator.show();
  fd.append('date', (new Date()).toString());
  fd.append('input', $('#erFileUpload').get(0).files[0]);

	var theid =  Location + currERNav + new Date().getTime().toString();
  var fileInput = theid + ext;
  tempvid = fileInput;
  fd.append('fileInput', fileInput);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
         if (xhr.readyState != 4) { return; }
          erVideoUpload_CB2();
  };
  xhr.open("POST", "/uploadFile");
  xhr.send(fd);

  var aObj = {
	id: theid,
	url: fileInput,
	name: validext(ext),
	type: validext(ext),
	cat: Location + "ERN" + currERNav
  };
	toCloudAssets(aObj);
}
var tempvid;

function erVideoUpload_CB2(){
  getElementObject("erFileUpload").value = "";
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
  var url = App.mainURL;
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

function appActive()
{
  getERNavInfo();
}

function setERStepsNo()
{
  activityIndicator.show();
  var n = getElementObject("noofERSteps").value;
  var c = getElementObject("checklistToggle").checked.toString();
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=ERNav";
  url = url + "&rowID=" + Location + "ERNav";
  url = url + "&loc=" + Location;
  url = url + "&erno=" + n;
  url = url + "&checklist=" + c;
  var callback = setERStepsNo_CB;
  loadFile(url, callback);
}

function setERStepsNo_CB(data)
{
  var n = getElementObject("noofERSteps").value;
  var c = getElementObject("checklistToggle").checked.toString();
  if(data === "0"){
    var url = App.mainURL;
    url = url + "editRow";
    url = url + "?category=ERNav";
    url = url + "&rowID=" + Location + "ERNav";
    url = url + "&loc=" + Location;
    url = url + "&erno=" + n;
	url = url + "&checklist=" + c;
    var callback = function(){getERNavInfo()};
    loadFile(url, callback);
  }
  else{
    getERNavInfo();
  }
}

function getERNavInfoA()
{
  getElementStyleObject("erNavigatorBoxWrapper").display = "none";
  getElementStyleObject("erNavigatorListWrapper").display = "block";
}

function getERNavInfo()
{
  getElementStyleObject("erNavigatorBoxWrapper").display = "none";
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowsAdmin";
  url = url + "?category=ERNav";
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
var data93;
function getERNavInfo_CB(data)
{
   activityIndicator.hide();
     var pInfo = JSON.parse(data);
     data93 = pInfo;
       var tempDict = [];
         var tempDictKeys = [];
           var len = 7;
           var cl = false;
             var lang;
             for (var j = 0; j < pInfo.length; j++){
               if(pInfo[j].rowID != "undefined"){
                 tempDict[pInfo[j].rowID] = pInfo[j];
                 tempDictKeys[tempDictKeys.length] = pInfo[j].rowID;
               }
             }
        if(tempDictKeys.contains(Location + "ERNav") >= 0){
           len = parseInt(tempDict[Location + "ERNav"].erno);
           cl = tempDict[Location + "ERNav"];
        }

        getElementObject("noofERSteps").value = len.toString();
        pInfo = parseInt(JSON.parse(data).erno);
                     var outS = "";
   for(var i = 0; i<15; i++){
	if(i >= len){
		getElementStyleObject("stepN" + i.toString()).display = "none";
	}
	else{
		getElementStyleObject("stepN" + i.toString()).display = "block";
	}
	if(tempDictKeys.contains(Location + "ERN" + i.toString()) >= 0){
		getLabelObject("stepN" + i.toString()).innerHTML = tempDict[Location + "ERN" + i.toString()]["nameEn"] + "</br>" + tempDict[Location + "ERN" + i.toString()]["nameEs"];
	}
	else{
		getLabelObject("stepN" + i.toString()).innerHTML = "Item " + (i+1).toString();
	}
  }
  $("html").animate({"scrollTop":"0"}, 0);
  getElementStyleObject("erNavigatorListWrapper").display = "block";

		getElementObject("checklistToggle").checked = false;
        if(Object.keys(cl).contains("checklist")){
			var t = cl.checklist;
			if(t === "true"){
				getElementObject("checklistToggle").checked = true;
			}
		}
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
  getElementObject("permLinkER").innerHTML = "";
  getElementStyleObject("erNavigatorBoxWrapper").display = "block";
  getElementStyleObject("erNavigatorListWrapper").display = "none";

  getElementObject("erNavigatorNameEn").value = "";
  getElementObject("erNavigatorNameEs").value = "";
    tinyMCE.get('erNavigatorDescEn').setContent("");
    tinyMCE.get('erNavigatorDescEs').setContent("");
  setTimeout("erNavigatorInfoCB2(true)", 500);

}

function stepSelected(pID)
{
      currs = getElementObject("canvasWrapper").scrollTop;
  currERNav = pID;
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewERNav = false;
  getElementObject("erNavigatorText").innerHTML = "Editing Item " + (parseInt(pID) + 1).toString() + ".";
  getElementStyleObject("erNavigatorBoxWrapper").display = "block";
  getElementStyleObject("erNavigatorListWrapper").display = "none";

  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  var callback = erNavigatorSelected_CB;
  loadFile(url, callback);

  updateAssetsERN();
}

function updateAssetsERN()
{
	getElementObject("erNavigatorFileList").innerHTML = "<div class='titleText'><h6 class='ac'> </h6></div>";
	var url = App.mainURL;
  url = url + "getAssets";
  url = url + "?cat=" + Location + "ERN" + currERNav;
  console.log(url);
  var callback = getAssetsERN_CB;
  loadFile(url, callback);
}

var data57;
function getAssetsERN_CB(data)
{
	data57 = data;
	if(data === "[]"){
		assetManager.listObject = [];
		getElementObject("erNavigatorFileList").innerHTML = "<div class='titleText'>No assets yet</div>";
		return;
	}
	var pInfo = JSON.parse(data);
	assetManager.listObject = pInfo;
	getElementObject("erNavigatorFileList").innerHTML = assetManager.getAdminHTML("ERN");
	activityIndicator.hide();
}


var data93;
function erNavigatorSelected_CB(data)
{
  activityIndicator.hide();
  setTimeout("erNavigatorInfoCB2(true)", 500);
  if(data==="0"){
    getElementObject("erNavigatorNameEn").value = "";
    getElementObject("erNavigatorNameEs").value = "";
    tinyMCE.get('erNavigatorDescEn').setContent("");
    tinyMCE.get('erNavigatorDescEs').setContent("");
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
      tinyMCE.get('erNavigatorDescEn').setContent(pInfo[temp]);
  }
  else{
      tinyMCE.get('erNavigatorDescEn').setContent("");
  }
  temp = "descEs";
  if(pKeys.contains(temp) >=0){
      tinyMCE.get('erNavigatorDescEs').setContent(pInfo[temp]);
  }
  else{
      tinyMCE.get('erNavigatorDescEs').setContent("");
  }

  updateAssetsERN();
  getElementObject("permLinkER").innerHTML = "Permanant Links: <a class='link' target='_blank' href='" + getShareLink('En') + "'>English</a> | <a target='_blank' class='link' href='" + getShareLink('Es') + "'>Spanish</a>"
	  scrollRefreshAll();
}

var currERNav;

function saveERNavClicked()
{
    addERNav();
}

function addERNav()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("erNavigatorNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("erNavigatorNameEs").value);
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('erNavigatorDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('erNavigatorDescEs').getContent());
  var callback = saveERNavInfo;
  console.log(url);
  loadFile(url, callback);
}

function saveERNavInfo(data)
{
  activityIndicator.show();
  if(data==="0"){
    var url = App.mainURL;
    url = url + "editRow";
    url = url + "?category=ERNav";
    url = url + "&loc=" + Location;
    url = url + "&rowID=" + Location + "ERN" + currERNav;
    url = url + "&nameEn=" + encodeURIComponent(getElementObject("erNavigatorNameEn").value);
    url = url + "&nameEs=" + encodeURIComponent(getElementObject("erNavigatorNameEs").value);
    url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('erNavigatorDescEn').getContent());
    url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('erNavigatorDescEs').getContent());
    var callback = function(){getERNavInfo()}
    loadFile(url, callback);
  }
  else{
    getERNavInfo();
  }
}

function appDeActive()
{
  getElementObject("erNavigatorNameEn").value = "";
  getElementObject("erNavigatorNameEs").value = "";
  tinyMCE.get('erNavigatorDescEn').setContent("");
  tinyMCE.get('erNavigatorDescEs').setContent("");
  $(".textareaTCME").blur();
}

function toCloudAssets(theObj){
	var url = App.mainURL;
  url = url + "putAsset";
  url = url + "?id=" + encodeURIComponent(theObj.id);
  url = url + "&name=" + encodeURIComponent(theObj.name);
  url = url + "&cat=" + encodeURIComponent(theObj.cat);
  url = url + "&url=" + encodeURIComponent(theObj.url);
  url = url + "&type=" + encodeURIComponent(theObj.type);
  url = url + "&loc=" + encodeURIComponent(Location);
  if(Object.keys(theObj).indexOf("ss") >= 0){
	  url = url + "&ss=" + encodeURIComponent(theObj.ss);
  }
  var callback = toCloudAssets_CB;
  loadFile(url, callback);
}

function toCloudAssets_CB(data)
{
	if(Canvas.current === "caresadmin-erNavigator"){
		updateAssetsERN();
	}
	else if(Canvas.current === "caresadmin-afterER"){
		updateAssetsAER();
	}
	else if(Canvas.current === "caresadmin-healthInfo"){
		updateAssetsHI();
	}
}

function AERview(id)
{
	assetManager.preview(id);
}
function HIview(id)
{
	assetManager.preview(id);
}
function ERNview(id)
{
	assetManager.preview(id);
}

function ERNdelete(id)
{
	deleteClicked(id);
}
function AERdelete(id)
{
	deleteClicked(id);
}
function HIdelete(id)
{
	deleteClicked(id);
}

function ERNrename(id)
{
	renameClicked(id);
}
function AERrename(id)
{
	renameClicked(id);
}
function HIrename(id)
{
	renameClicked(id);
}


function ERNaddtoss(id)
{
	addtoss(id);
}
function AERaddtoss(id)
{
	addtoss(id);
}
function HIaddtoss(id)
{
	addtoss(id);
}

function ERNremovefromss(id)
{
	removefromss(id);
}
function AERremovefromss(id)
{
	removefromss(id);
}
function HIremovefromss(id)
{
	removefromss(id);
}

var renameID = null;
var deleteID = null;

function deleteNow()
{
	var key = assetManager.isKey(deleteID);
	var listItem = assetManager.listObject[key];
	var url = App.mainURL;
  url = url + "deleteAsset";
  url = url + "?id=" + encodeURIComponent(listItem.id);
  var callback = toCloudAssets_CB;
  loadFile(url, callback);
   overlayWrapper.hide();
}

function deleteClicked(id)
{
	var key = assetManager.isKey(id);
	if(key==null){
		return;
	}
	var listItem = assetManager.listObject[key];
	deleteID = id;

	dialogConfirm.display("Delete <i>" + listItem.name + "</i> ?", "images/remove.png", "Yes, Delete now", "deleteNow()", "No, not now", null);
}



var ssID = null;
var ssValue = false;

function addtossNow()
{
	var key = assetManager.isKey(ssID);
	var listItem = assetManager.listObject[key];
  var aObj = {
	id: listItem.id,
	url: listItem.url,
	type: listItem.type,
	name: listItem.name,
	ss: ssValue,
	cat: listItem.cat
  };
	  dialogConfirm.done()
	toCloudAssets(aObj);
}
function removefromss(id)
{
	var key = assetManager.isKey(id);
	if(key==null){
		return;
	}
	ssID = id;
	ssValue = false;

	dialogConfirm.display("Remove <i>" + assetManager.listObject[key].name + "</i> from welcome slideshow?", "images/ssr.png", "No, not now", null, "Yes, remove", "addtossNow()");
}

function addtoss(id)
{
	var key = assetManager.isKey(id);
	if(key==null){
		return;
	}
	ssID = id;
	ssValue = true;

	dialogConfirm.display("Add <i>" + assetManager.listObject[key].name + "</i> to welcome slideshow?", "images/ssa.png", "Yes, add now", "addtossNow()", "No, not now", null);
}


function renameNow()
{
	var key = assetManager.isKey(renameID);
	var listItem = assetManager.listObject[key];
  var aObj = {
	id: listItem.id,
	url: listItem.url,
	type: listItem.type,
	name: dialogInput.value,
	cat: listItem.cat
  };
	toCloudAssets(aObj);
}
function renameClicked(id)
{
	var key = assetManager.isKey(id);
	if(key==null){
		return;
	}
	renameID = id;

	dialogInput.display("Renaming asset <i>" + assetManager.listObject[key].name + "</i>.",assetManager.listObject[key].name, renameNow);
}


function embedUploadNow()
{
  var aObj = {
	id: embedID,
	url: dialogInput.value,
	type: embedType,
	name: "Embedded video",
	cat: embedCat
  };
	toCloudAssets(aObj);
}

var embedCat = null;
var embedID = null;
var embedType = null;


function erEmbedImage()
{
	embedID = "embedERN" + Location + new Date().getTime().toString();
	embedCat = Location + "ERN" + currERNav;
	embedType = "embedimage";

	dialogInput.display("Enter link to web image.","", embedUploadNow);
}


function erEmbedFile()
{
	embedID = "embedERN" + Location + new Date().getTime().toString();
	embedCat = Location + "ERN" + currERNav;
	embedType = "embedfile";

	dialogInput.display("Enter link to web file.","", embedUploadNow);
}

function erEmbedUpload()
{
	embedID = "embedERN" + Location + new Date().getTime().toString();
	embedCat = Location + "ERN" + currERNav;
	embedType = "embedvideo";

	dialogInput.display("Enter YouTube/Vimeo/Web video.","", embedUploadNow);
}
