var aerAC ={};
var ordersinit = function()
{
  getElementObject("afterERInputBox").innerHTML = '<h1 class="" id="aerTextTitle"></h1> <div class="assetBox" id="aerAssetBox"> <div class="assetWrapper" id="aerAssetWrapper"> </div></div><div id="aerInfoText"> </div><div id="aerInfoText1"> </div>';
  getElementObject("addAfterER").innerHTML = "<select class='locSelect flip0' id='afterERLoc' onchange='afterERLocChanged()'> </select>"
      +"<div class='comictt'>&#9650;</div>";
  getElementObject("afterERSearch").innerHTML = 
  	  '<input placeholder="Search" autocapitalize="off" autocorrect="off" class="input searchInput standardFont" id="aerSearch">';
  getElementObject("aerBrandOpts").innerHTML = "<a href='javascript:switchTo(0)'><div class='glassFinish optionsDivLeft'>Library</div></a><a href='javascript:switchTo(1)'><div class='glassFinish optionsDivTile selected'>Support</div></a><a href='javascript:switchTo(2)'><div class='glassFinish optionsDivRight'>Options</div></a>";
  setTimeout("configAERAC()",100);
}

function switchTo(opt)
{
    if(opt == 2 && Canvas.current != "caresuser-appSettings"){
        mainMenuButtons.selected("buttonAppSettings");
    }
    if(opt == 0 && Canvas.current != "caresuser-healthInfo"){
        mainMenuButtons.selected("buttonHealthInfo");
    }
    if(opt == 1 && Canvas.current != "caresuser-afterER"){
        mainMenuButtons.selected("buttonAfterER");
    }
}

function configAERAC()
{
   aerAC = $('#aerSearch').autocomplete({
     maxHeight: 100,
     width: "100%",
     autoSelectFirst: true,
       onSelect: function(value, data){ activityIndicator.show();afterERSelected(data);bsScrollAER()},
     delimiter: /(,|;)\s*/
  });
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

function orderActive()
{
	getElementStyleObject("noitem").display = "block";	
	getElementStyleObject("addAfterER").display = "block";
  	getElementObject("helpText").innerHTML = "<p class='helpX'>Add " + CARESTEAMSLOGO + " to browse " + CARESTEAMLOGO + " content (Library/Resources). A secure connection exists between you and your " + CARESTEAMSLOGO + ".</p><p class='helpP'> You can switch between your " + CARESTEAMSLOGO + " when you see the red-heart on top of the screen.</p>";
  getElementStyleObject("aerAssetBox").display = "none";
  getAfterERLoc();
}

var data76;
function getAfterERLoc()
{
  var url = App.mainURL;
  url = url + "getPatientLocations";
  url = url + "?userID=" + encodeURIComponent(userID);
  var callback = getAfterERLoc_CB;
  loadFile(url, callback);
}

function getAfterERLoc_CB(data)
{
  data76 = data;

  var locs = JSON.parse(data); 
  patLocs = locs;
  if(patLocs.indexOf(Location) < 0){if(patLocs.length > 0){Location = patLocs[0]} else{Location = "ALL"}}
  handlemmdisplay()
  var outS = "<option value='ALL'> CARESapp Support</option>";
  if(locs.length > 0){
	outS += "<option disabled>&#9660; My CAREteams (" + locs.length.toString() + ") </option>";
  }
  var temp = Object.keys(locNames);
  for(var i = 0; i < temp.length; i++){
	  if(patLocs.indexOf(temp[i])>=0){
	    outS = outS + "<option value='" + temp[i] + "'> &nbsp; &nbsp; &nbsp;" + locNames[temp[i]] + " </option>"
	  }
  }
//  outS += "<option disabled> ---------- </option>";
  outS += "<option value='manage'>&hearts; Manage CAREteams ... </option>";
  //outS = outS + "</select>";
  getElementObject("afterERLoc").innerHTML = outS;
  setTimeout('afterERLocChanged3()', 200);
}

function afterERLocChanged3()
{
  getElementObject('afterERLoc').value = Location;
  getElementObject('afterERLoc').blur();
  applyLocationStyle();
  getAfterERInfo();
}

function afterERLocChanged()
{
  var temp = getElementObject('afterERLoc').value;
  getElementObject('afterERLoc').blur();
  	if(temp === "manage"){
		erNavActiveSmp = true;
		mainMenuButtons.selected("buttonERNavigator");
		return;
	}
  Location = temp;
  applyLocationStyle();
  getAfterERInfo();
}

function backtoAERList(){
  //$("#afterERBoxWrapper").fadeOut();
  //$("#afterERListWrapper").fadeIn();
  navPlugin.hide();
  setTimeout('selectedStyle.clean()', 800);
  getElementStyleObject("afterERBoxWrapper").display = "none";
  getElementStyleObject("afterERListWrapper").display = "block";
  getElementStyleObject("addAfterER").display = "block";
  getElementObject('aerTextTitle').innerHTML = "";
  getElementObject('aerInfoText').innerHTML = "";
  getElementStyleObject("aerAssetBox").display = "none";
  getElementObject("aerAssetWrapper").innerHTML = "";
  getElementStyleObject("socialShare").display = "none";
//  getElementStyleObject("helpButton").display = "block";
  $("#" + Canvas.current + " .searchWrapper").fadeIn(0);
	 // getElementStyleObject("afterERListWrapper").display = "block";
    //  if(ENV.screen.smallscreenon){
    //      getElementStyleObject("afterERDetailsBox").display = "none";
    //  }
}

function getAfterERInfo()
{
  getElementObject("afterERList").innerHTML = "";
  getElementStyleObject("afterERBoxWrapper").display = "none";
  getElementStyleObject("afterERListWrapper").display = "block";
  //$("afterERBoxWrapper").fadeOut();
  //$("afterERListWrapper").fadeIn();
    activityIndicator.setText("Listing <b>Resources</b>...");
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getRows";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  var callback = getAfterERInfo_CB;
  loadFile(url, callback);
}

var data677;

var currAERsf = new Date().getTime().toString();
function getAfterERInfo_CB(data)
{
	currAERsf = new Date().getTime().toString();
  activityIndicator.hide();
  var ac = {};
  ac.suggestions = [];
  ac.data = [];
  if(data === ""){
    return;
  }
  var pInfo = JSON.parse(data);
  data677 = pInfo;
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
    //outS = outS + "<a id='aer" + currAERsf + pInfo[i].rowID + "' class='arrowFinish listItem' href='javascript:afterERSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p><div class='sub'>" + city + "</div></a>";
    outS = outS + "<a id='aer" + currAERsf + pInfo[i].rowID + "' class='arrowFinish listItem' href='javascript:afterERSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p></div></a>";
    ac.suggestions[ac.suggestions.length] = name;
    ac.data[ac.data.length] = pInfo[i].rowID;
  }
  var flg = true;
  if(outS.length < 5){
      flg = false;
    outS = "<p class='titleText'> No items to show </p>";
  }
  getElementObject("afterERList").innerHTML = outS;
  $("#" + Canvas.current + " .ListWrapper").fadeOut(0).fadeIn(0);
  $("#" + Canvas.current + " .aList").css({"color":selectedStyle.hilite1});
  navPlugin.currList = ac.data;
  navPlugin.currID = null;
  scrollRefreshAll();
  aerAC.setOptions({"lookup":ac});
  if(!ENV.device.touchSupport && flg){
      setTimeout("afterERSelected(navPlugin.currList[0])", 100);
  }
}

function afterERInfoCB4(flag)
{
    afterERSelected();
}

function afterERInfoCB2(flag)
{
  //scrollRefresh("caresuser-afterER", flag);
}

var isNewAfterER = false;
function addNewAfterER(pID)
{
  //dataEdited = true;
  //unsavedDataPlugin.show();
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

  setTimeout("afterERInfoCB2(true)", 500);
}

function afterERSelected(pID)
{
  activityIndicator.show();
    selectedStyle.clean();
	getElementStyleObject("noitem").display = "none";	
	getElementObject("aerSearch").value = "";

	if(navPlugin.smp){
	    navPlugin.smp = false;
	}
	else{
		lastScrollPosition = getDocumentScroll();
	}
  currAfterER = pID;
  navPlugin.currID = pID;
  selectedStyle.add("aer" + currAERsf + pID);
  //dataEdited = true;
  //unsavedDataPlugin.show();
  isNewAfterER = false;

  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=AfterER";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + pID;
  var callback = afterERSelected_CB;
  loadFile(url, callback);

  assetID = "aerAssetWrapper";
  assetBox = "aerAssetBox";
  getAssetCarousel(null, Location, pID);
}

function openAERMap()
{
	cordovaOpenLink("http://maps.apple.com/?q=" + encodeURIComponent(currAfterERMap));
}
var currAfterERMap = "";
function afterERSelected_CB(data)
{
  showBackButton();
  getElementStyleObject("socialShare").display = "block";
//  getElementStyleObject("helpButton").display = "none";
  getElementStyleObject("afterERBoxWrapper").display = "block";
   if(ENV.device.touchSupport){
	  	$("#" + Canvas.current + " .searchWrapper").fadeOut(0);
	  setTimeout('getElementStyleObject("afterERListWrapper").display = "none";', 200);
	  getElementStyleObject("addAfterER").display = "none";
   }
  activityIndicator.hide();
  navPlugin.show();
  setTimeout("afterERInfoCB2(true)", 500);
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  var theName ="";
  var outS = "";
  var outS1 = "";
  var addrstr = "";

  temp = "name";
  if(pKeys.contains(temp) >=0){
    theName = decodeURIComponent(pInfo[temp]);
    getElementObject("aerTextTitle").innerHTML = decodeURIComponent(pInfo[temp]);
    shareTitle = decodeURIComponent(pInfo[temp]);
  }
  else{
    getElementObject("aerTextTitle").innerHTML = "No location name";
  }
  getElementStyleObject("aerTextTitle").color = selectedStyle.hilite;
  temp = "desc";
  if(pKeys.contains(temp) >=0){
    outS = outS + "<p>" + decodeURIComponent(pInfo[temp]) + "</p>";
  }
  temp = "addr";
  if(pKeys.contains(temp) >=0){
    addrstr = addrstr + " " + decodeURIComponent(pInfo[temp]);
  }
  temp = "city";
  if(pKeys.contains(temp) >=0){
    addrstr = addrstr + " " + decodeURIComponent(pInfo[temp]);
  }
  temp = "zip";
  if(pKeys.contains(temp) >=0){
    addrstr = addrstr + " " + decodeURIComponent(pInfo[temp]);
  }
  if(addrstr.length > 1){
	  currAfterERMap = addrstr;
	  if(ENV.embedded){
		outS1 = outS1 + "<a href='javascript:openAERMap()' class='address link' style='margin-bottom:10px'> " + "<p>" + addrstr+ "</p></a>";
	  }
	  else{
		outS1 = outS1 + "<a target='_blank' href='http://maps.apple.com/?q=" + theName + " " + addrstr  + "' class='address link' style='margin-bottom:10px'> " + "<p>" + addrstr+ "</p></a>";
	  }
  }
  /*
  temp = "web";
  if(pKeys.contains(temp) >=0){
    addrstr = addrstr + " " + decodeURIComponent(pInfo[temp]);
  }
  */
  temp = "web";
  if(pKeys.indexOf(temp) >=0){
		currWebLink1 = decodeURIComponent(pInfo[temp]);
		if(currWebLink1.length > 0){
			if(currWebLink1.substring(0,4) != "http"){
				currWebLink1 = "http://" + currWebLink1;	
			}
			if(ENV.embedded){
				outS1 += "<a class='url link' style='margin-bottom:10px' href='javascript:openWebLink()'><p>" + currWebLink1 + "</p></a>";
			}
			else{
				outS1 += "<a class='url link' style='margin-bottom:10px' target='_blank' href='"+ currWebLink1 +"'><p>" + currWebLink1 + "</p></a>";
			}
		}
  }

  temp = "tel";
  if(pKeys.contains(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
	outS1 = outS1 + "<a target='_blank' href='tel:" +  addrstr[t]  +  "' class='phoneno link' style='margin-bottom:10px'> " + "<p><phone>" + addrstr[t] + "</phone></p></a>";
    }
  }
  getElementObject("aerInfoText").innerHTML = outS;
  getElementObject("aerInfoText1").innerHTML = outS1;
  scrollRefreshAll();
  setTimeout('handleEmbeddedLinks("aerInfoText")',200);
}

var currWebLink1 = "";
function openWebLink1()
{
	cordovaOpenLink(currWebLink1);
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
  url = url + "&desc=" + encodeURIComponent(getElementObject("afterERDesc").value);
  url = url + "&addr=" + encodeURIComponent(getElementObject("afterERAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("afterERCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("afterERZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("afterERTel").value);
  var callback = function(){getAfterERInfo()}
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
  url = url + "&desc=" + encodeURIComponent(getElementObject("afterERDesc").value);
  url = url + "&addr=" + encodeURIComponent(getElementObject("afterERAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("afterERCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("afterERZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("afterERTel").value);
  var callback = function(){getAfterERInfo()}
  loadFile(url, callback);
}

function orderDeActive()
{
  $("#" + Canvas.current + " .searchWrapper").fadeIn(0);
  getElementStyleObject("noitem").display = "none";	
  navPlugin.hide();
  getElementObject("aerAssetWrapper").innerHTML = "";
	getElementObject("aerSearch").value = "";
  getElementStyleObject("addAfterER").display = "none";
  getElementStyleObject("socialShare").display = "none";
//  getElementStyleObject("helpButton").display = "block";
  getElementStyleObject("afterERBoxWrapper").display = "none";
  getElementStyleObject("afterERListWrapper").display = "block";
  getElementObject('aerTextTitle').innerHTML = "";
  getElementObject('aerInfoText').innerHTML = "";
  getElementObject('aerInfoText1').innerHTML = "";
  getElementStyleObject("aerAssetBox").display = "none";
  // Location = "ALL";
  // applyLocationStyle();
  getElementObject("afterERList").innerHTML = "";
//	getElementObject("aerBrandText").innerHTML = "";
//	getElementStyleObject("aerBrand").backgroundImage = "";
	$(".brandWrapper2").removeClass("brandplain");
	getElementStyleObject("backButton").display = "none";
}
