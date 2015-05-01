var hiAC ={};
var productsinit = function()
{
  getElementObject("hiBrandOpts").innerHTML = "<a href='javascript:switchTo(0)'><div class='glassFinish optionsDivLeft selected'>Library</div></a><a href='javascript:switchTo(1)'><div class='glassFinish optionsDivTile'>Support</div></a><a href='javascript:switchTo(2)'><div class='glassFinish optionsDivRight'>Options</div></a>";
  getElementObject("healthInfoInputBox").innerHTML = '<h1 class="" id="healthInfoTextTitle"></h1> <div class="assetBox" id="hiAssetBox"> <div class="assetWrapper" id="hiAssetWrapper"></div></div> <div id="healthInfoText"> </div>';
  getElementObject("addHealthInfo").innerHTML = "<select class='locSelect flip0' id='HILoc' onchange='HILocChanged()'> </select>"
      +"<div class='comictt'>&#9650;</div>"
  getElementObject("healthInfoSearch").innerHTML = 
  	  '<input placeholder="Search" autocapitalize="off" autocorrect="off" class="input searchInput standardFont" id="hiSearch">';
  setTimeout("configHIAC()",100);
}

function configHIAC()
{
   hiAC = $('#hiSearch').autocomplete({
     maxHeight: 100,
     width: "100%",
     autoSelectFirst: true,
       onSelect: function(value, data){ activityIndicator.show();healthInfoSelected(data);bsScrollHI()},
     delimiter: /(,|;)\s*/
  });
}

var tempimg;
function hiImageUpload_CB(data){
  activityIndicator.hide();
}

function hiImageUpload_CB2(){
  getElementStyleObject("hiImagePreview").backgroundImage = "url(https://s3.amazonaws.com/caresapp/" + tempimg + "?t=" + new Date().getTime() +")";
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

function productsActive()
{
	$("#" + Canvas.current + " .searchWrapper").fadeIn(0);
	getElementStyleObject("noitem").display = "block";	
  	getElementObject("helpText").innerHTML = "<p class='helpX'>Add " + CARESTEAMSLOGO + " to browse " + CARESTEAMLOGO + " content (Library/Support). A secure connection exists between you and your " + CARESTEAMSLOGO + ".</p><p class='helpP'> You can switch between your " + CARESTEAMSLOGO + " when you see the red-heart on top of the screen.</p>";
  getElementStyleObject("hiAssetBox").display = "none";
  getHILoc();
}

function backtoHIList()
{
  navPlugin.hide();
  $("#" + Canvas.current + " .searchWrapper").fadeIn(0);
  setTimeout('selectedStyle.clean()', 800);
  getElementStyleObject("addHealthInfo").display = "block";
  getElementStyleObject("healthInfoBoxWrapper").display = "none";
  getElementStyleObject("healthInfoListWrapper").display = "block";
  getElementObject('healthInfoText').innerHTML = "";
  getElementObject('healthInfoTextTitle').innerHTML = "";
  getElementStyleObject('hiAssetBox').display = "none";
  getElementObject("hiAssetWrapper").innerHTML = "";
  getElementObject("healthInfoTextTitle").innerHTML = "";
  getElementObject("healthInfoText").innerHTML = "";
  getElementStyleObject("socialShare").display = "";
  getElementStyleObject("socialShare").display = "none";
  //getElementStyleObject("helpButton").display = "block";
	//  getElementStyleObject("healthInfoListWrapper").display = "block";
    //  if(ENV.screen.smallscreenon){
    //      getElementStyleObject("healthInfoDetailsBox").display = "none";
   //   }
}

function getHealthInfoInfo()
{
  getElementObject("healthInfoList").innerHTML = "";
  //$("#healthInfoListWrapper").fadeIn();
  //$("#healthInfoBoxWrapper").fadeOut();
  getElementStyleObject("healthInfoBoxWrapper").display = "none";
  getElementStyleObject("healthInfoListWrapper").display = "block";
    activityIndicator.setText("Listing <b> Library</b> entries...");
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRows";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  var callback = getHealthInfoInfo_CB;
  loadFile(url, callback);
}

var data89;
var currHIsf = new Date().getTime().toString();
function getHealthInfoInfo_CB(data)
{
	currHIsf = new Date().getTime().toString();
  getElementStyleObject("addHealthInfo").display = "block";
  activityIndicator.hide();
  if(data === ""){
    return;
  }
  var ac = {};
  ac.suggestions = [];
  ac.data = [];
  var pInfo = JSON.parse(data);
  var pKeys;
  var name;
  var city;
  var outS = "";
  for(var i = 0; i<pInfo.length; i++){
    var extrac = "";
    var extram = 0;
    pKeys = Object.keys(pInfo[i]);
    if(Language === "English"){
      if(pKeys.contains("nameEn") >=0){
        name = pInfo[i].nameEn;
      }
      else{
        continue;
      }
    }
    else{
      if(pKeys.contains("nameEs") >=0){
        name = pInfo[i].nameEs;
      }
      else{
        continue;
      }
    }
  if(pKeys.contains("interests") >=0){
    if(xnor1only(decodeURIComponent(pInfo[i].interests), myints)){
        extrac += '<div class="msgbadge1 myi"> </div>';
        extram += 15;
    }
  }
  if(pKeys.contains("goals") >=0){
    if(xnor1only(decodeURIComponent(pInfo[i].goals), mygls)){
        extrac += '<div class="msgbadge1 myg"> </div>';
        extram += 15;
    }
  }
  if(extram > 0){
    extram = "style='margin-top:-" + extram + "px'";
  }
  else{
    extram = "";
  }
    outS = outS + "<a id='hi" + currHIsf + pInfo[i].rowID + "' class='listItem arrowFinish' href='javascript:healthInfoSelected(" + '"' + pInfo[i].rowID + '")' + "'> " + extrac + "<p " + extram + ">" + name + "</p></a>";
    ac.suggestions[ac.suggestions.length] = name;
    ac.data[ac.data.length] = pInfo[i].rowID;
  }
  var flg = true;
  if(outS.length < 5){
      flg = false;
    outS = "<p class='titleText'> No items to show </p>";
  }
  getElementObject("healthInfoList").innerHTML = outS;
  $("#" + Canvas.current + " .ListWrapper").fadeOut(0).fadeIn(0);
  $("#" + Canvas.current + " .aList").css({"color":selectedStyle.hilite1});
  navPlugin.currList = ac.data;
  navPlugin.currID = null;
  hiAC.setOptions({"lookup":ac});
  scrollRefreshAll();
  if(!ENV.device.touchSupport && flg){
      setTimeout("healthInfoSelected(navPlugin.currList[0])", 100);
  }
}

var myints = "00000000";
var mygls = "000";

function xnor1only(a,b)
{
    console.log(a,b);
    if(a.length == b.length){
        for(var i = 0; i < a.length; i++){
            if(a[i] == b[i] && a[i] == "1"){
                return true;
            }
        }
    }
    return false;
}

function healthInfoInfoCB2(flag)
{
  //scrollRefresh("caresuser-healthInfo", flag);
}

var isNewHealthInfo = false;
function addNewHealthInfo(pID)
{
  dataEdited = true;
  unsavedDataPlugin.show();
  isNewHealthInfo = true;
  getElementStyleObject("healthInfoBoxWrapper").display = "block";
  getElementStyleObject("healthInfoListWrapper").display = "none";

  getElementObject("healthInfoNameEn").value = "";
  getElementObject("healthInfoNameEs").value = "";
  tinyMCE.get('healthInfoDescEn').setContent("");
  tinyMCE.get('healthInfoDescEs').setContent("");

  getElementStyleObject("healthInfoDeleteConf").display = "none";
  getElementStyleObject("healthInfoDelete").display = "none";
  //getElementStyleObject("hiImagePreview").backgroundImage = "";
  setTimeout("healthInfoInfoCB2()", 500);
}

function healthInfoSelected(pID)
{
  activityIndicator.show();
    selectedStyle.clean();
	getElementStyleObject("noitem").display = "none";	
  getElementObject("hiSearch").value = "";
	if(navPlugin.smp){
	    navPlugin.smp = false;
	}
	else{
		lastScrollPosition = getDocumentScroll();
	}
  currHealthInfo = pID;
  navPlugin.currID = pID;
  selectedStyle.add("hi" + currHIsf + pID);
  //dataEdited = true;
  //unsavedDataPlugin.show();
  isNewHealthInfo = false;

  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = healthInfoSelected_CB;
  loadFile(url, callback);

  assetID = "hiAssetWrapper";
  assetBox = "hiAssetBox";
  getAssetCarousel(null, Location, pID);
}

function healthInfoSelected_CB(data)
{
  showBackButton();
  getElementStyleObject("socialShare").display = "block";
  //getElementStyleObject("helpButton").display = "none";
  //$("#healthInfoBoxWrapper").fadeIn();
  //$("#healthInfoListWrapper").fadeOut();
  getElementStyleObject("healthInfoBoxWrapper").display = "block";
   if(ENV.device.touchSupport){
	  	$("#" + Canvas.current + " .searchWrapper").fadeOut(0);
	  getElementStyleObject("addHealthInfo").display = "none";
	  setTimeout('getElementStyleObject("healthInfoListWrapper").display = "none";',200);
   }
  navPlugin.show();
  var pInfo = JSON.parse(data);
 

  var pKeys = Object.keys(pInfo);
  var temp;
  getElementStyleObject("healthInfoTextTitle").color = selectedStyle.hilite;
  if(Language === "English"){
    temp = "nameEn";
    if(pKeys.contains(temp) >=0){
      getElementObject("healthInfoTextTitle").innerHTML = decodeURIComponent(pInfo[temp]);
      shareTitle = pInfo[temp];
    }
    else{
      getElementObject("healthInfoTextTitle").innerHTML = "No title provided";
      shareTitle = "No title provided";
    }
    temp = "descEn";
    if(pKeys.contains(temp) >=0){
      getElementObject('healthInfoText').innerHTML = pInfo[temp];
    }
    else{
      getElementObject('healthInfoText').innerHTML = "";
    }
  }
  else{
    temp = "nameEs";
    if(pKeys.contains(temp) >=0){
      getElementObject("healthInfoTextTitle").value = pInfo[temp];
      shareTitle = pInfo[temp];
    }
    else{
      getElementObject("healthInfoTextTitle").value = "No Title";
      shareTitle = "No Title";
    }
    temp = "descEs";
    if(pKeys.contains(temp) >=0){
      getElementObject('healthInfoText').innerHTML = pInfo[temp];
    }
    else{
      getElementObject('healthInfoText').innerHTML = "";
    }
  }

  activityIndicator.hide();
  scrollRefreshAll();
  setTimeout('handleEmbeddedLinks("healthInfoText")', 200);
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
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('healthInfoDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('healthInfoDescEs').getContent());
  var callback = function(){getHealthInfoInfo()}
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
  url = url + "&descEn=" + encodeURIComponent(tinyMCE.get('healthInfoDescEn').getContent());
  url = url + "&descEs=" + encodeURIComponent(tinyMCE.get('healthInfoDescEs').getContent());
  var callback = function(){getHealthInfoInfo()}
  loadFile(url, callback);
}

function productsDeActive()
{
	getElementStyleObject("noitem").display = "none";	
  navPlugin.hide();
  getElementObject("hiAssetWrapper").innerHTML = "";
	getElementObject("hiSearch").value = "";
  getElementObject("healthInfoTextTitle").innerHTML = "";
  getElementObject("healthInfoText").innerHTML = "";
  getElementStyleObject("hiAssetBox").display = "none";
  //Location = "ALL";
  //applyLocationStyle();
  getElementObject("healthInfoList").innerHTML = "";
//	getElementObject("hiBrandText").innerHTML = "";
//		getElementStyleObject("hiBrand").backgroundImage = "";
	$(".brandWrapper2").removeClass("brandplain");
	getElementStyleObject("backButton").display = "none";
  getElementStyleObject("addHealthInfo").display = "none";
  getElementStyleObject("socialShare").display = "none";
//  getElementStyleObject("helpButton").display = "block";
}

function getHILoc()
{
  var url = App.mainURL;
  url = url + "getPatientLocations";
  url = url + "?userID=" + encodeURIComponent(userID);
  var callback = getHILoc_CB;
  loadFile(url, callback);
}

function getHILoc_CB(data)
{
  var locs = JSON.parse(data); 
  data76 = locs;
  patLocs = locs;
  if(patLocs.indexOf(Location) < 0){if(patLocs.length > 0){Location = patLocs[0]} else{Location = "ALL"}}
  handlemmdisplay();
  getElementStyleObject("addHealthInfo").display = "block";
  var outS = "<option value='ALL'> CARESapp Library</option>";
  if(locs.length > 0){
	outS += "<option disabled>&#9660; My CAREteams (" + locs.length.toString() + ")</option>";
  }
  var temp = Object.keys(locNames);
  for(var i = 0; i < temp.length; i++){
	  if(patLocs.indexOf(temp[i])>=0){
	    outS = outS + "<option value='" + temp[i] + "'> &nbsp; &nbsp; &nbsp;" + locNames[temp[i]] + " </option>"
	  }
  }
//  outS += "<option disabled> ---------- </option>";
  outS += "<option value='manage'> &hearts; Manage CAREteams ... </option>";
  //outS = outS + "</select>";
  getElementObject("HILoc").innerHTML = outS;
  setTimeout('HILocChanged3()', 200);
}

function HILocChanged3()
{
  getElementObject('HILoc').value = Location;
  applyLocationStyle();
  getHealthInfoInfo();
}

function HILocChanged()
{
	getElementObject("hiSearch").value = "";
	var temp = getElementObject('HILoc').value;
	getElementObject('HILoc').blur();
  	if(temp === "manage"){
		erNavActiveSmp = true;
		mainMenuButtons.selected("buttonERNavigator");
		return;
	}
  Location = temp;
  applyLocationStyle();
  getHealthInfoInfo();
}
