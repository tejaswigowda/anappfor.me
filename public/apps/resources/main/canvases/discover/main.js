var data565;
function updateCTdropdown(arr){
    data565 = arr;
  var outS = 
	  '<option disabled> - Categories - </option>'+
	  '<option value="ALL"> All </option>';
  var disab = "";
  var temp = arr[0];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="cc"> Care Coordination (' + temp +')</option>';
  var temp = arr[1];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="cl"> Community Living (' + temp +')</option>';
  var temp = arr[2];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="dt"> Dental (' + temp +')</option>';
  var temp = arr[3];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="gm"> General Medicine (' + temp +')</option>';
  var temp = arr[4];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="sd"> Healthy Living (' + temp +')</option>';
  var temp = arr[5];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="pet"> Pet care (' + temp +')</option>';
  var temp = arr[6];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="phar"> Pharmacy (' + temp +')</option>';
  var temp = arr[7];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="prt"> Preventative/Rehab/Therapeutic (' + temp +')</option>';
  var temp = arr[8];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="sp"> Specialties (' + temp +')</option>';
  var temp = arr[9];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="vend"> Vendors (' + temp +')</option>';
  var temp = arr[10];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="vision">Vision (' + temp +')</option>';
  var temp = arr[11];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="sustain">Collective Impact/Sustainability (' + temp +')</option>';
  var temp = arr[12];if(temp == 0){ disab = "disabled";} else{ disab = ""}
  outS += '<option ' + disab + ' value="nearby">Nearby (within 20 miles) (' + temp +')</option>';
  getElementObject("appletCat").innerHTML = outS;

}

var erAC ={};
var appAC ={};
var discoverinit = function()
{
  getElementObject("buttonplaces").innerHTML = getElementObject("buttonplaces").innerHTML + '<div class="hilitebg badge" id="appBadge"> </div>';
 // getElementObject("erNavigatorBrandOpts").innerHTML = "<a href='javascript:switchTo(0)'><div class='glassFinish optionsDivLeft'>Library</div></a><a href='javascript:switchTo(1)'><div class='glassFinish optionsDivTile'>Support</div></a><a href='javascript:switchTo(2)'><div class='glassFinish optionsDivRight selected'>Options</div></a>";
  getElementObject("appSearch").innerHTML = 
  	  '<input placeholder="Search" autocapitalize="off" autocorrect="off" class="input searchInput standardFont" id="aSearch">';
  //getElementObject("erNavSearch").innerHTML = 
  //	  '<input placeholder="Search" autocapitalize="off" autocorrect="off" class="input searchInput standardFont" id="erSearch">';
  setTimeout("configERAC()",100);
  setTimeout("configAppAC()",100);
  /*
  getElementObject("healthRecordsOptionsBox2").innerHTML = '<div style="text-align: center;margin-top: 10px;margin-bottom: -5px;"> Authorized '+ CARESTEAMLOGO +' members can :</div>'+
      '<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="showRecordsChangeToggle()" id="showMyRecords" type="checkbox">'+
      '<label for="showMyRecords">View <i>Journal</i></label>' + 
      '<span style="width: 40px;text-align: center;"> | </span>'+
      '<input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="editRecordsChangeToggle()" id="editMyRecords" type="checkbox">'+
      '<label for="editMyRecords">Edit <i>Journal</i></label>'; 
  */
  getElementObject("erNavigatorOptionsBox").innerHTML = "<a href='javascript:checkinSelClicked()'> <div class='glassFinish optionsDivLeft' id='navCheckIn'>Applet Listing</div></a><a href='javascript:sessionsSel()'> <div class='glassFinish optionsDivRight' id='navSessions'>Options</div></a>";// <div class='horizontalLine' style='margin-top: 0px;margin-bottom: 40px;'> </div>";
  getElementObject("locListOptionsWrapper1").innerHTML = '<a href="javascript:addbyAppletID()"" class="link textright" style="font-weight:bold;margin: 0px;width: 98%;margin-top: 10px;margin-top: 5px;padding-right:5px;border-right: 2px solid;"> Add using C<i>g</i>ID</a>';
  

  getElementObject("locListOptionsWrapper0").innerHTML = '<select onchange="appletCatChanged()" id="appletCat" class="selectInput">' +
	  '<option disabled> - Categories - </option>'+
	  '<option value="ALL"> All </option>'+
	  '<option value="cc"> Care Coordination </option>'+
	  '<option value="cl"> Community Living </option>'+
	  '<option value="dt"> Dental</option>'+
	  '<option value="gm"> General Medicine</option>'+
	  '<option value="sd"> Healthy Living</option>'+
	  '<option value="pet"> Pet care</option>'+
	  '<option value="phar"> Pharmacy</option>'+
	  '<option value="prt"> Preventative/Rehab/Therapeutic</option>'+
	  '<option value="sp"> Specialties</option>'+
	  '<option value="vend"> Vendors</option>'+
	  '<option value="vision">Vision </option>'+
	  '<option value="sustain">Collective Impact/Sustainability</option>'+
	  '<option value="nearby">Nearby (within 20 miles)</option>'+
	  '</select>';

  getElementObject("locListOptionsWrapper").innerHTML = ' <label for="locListCheck"> Hide ' + CARESTEAMSLOGO + '</label><input autocapitalize="off" autocorrect="off" class="inputcheck" onchange="locListToggle()" id="locListCheck" type="checkbox" style="">';
  
 // getElementObject("erNavigatorInputBox").innerHTML = '<p class="titleText" id="erNavigatorText"></p>  <p class="text">Step Name (English)</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="erNavigatorEC()" id="erNavigatorNameEn"> <p class="text">Step Name (Spanish)</p> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="erNavigatorEC()" id="erNavigatorNameEs"> <p class="text"> Step Description (English) </p> <textarea class="textarea" onkeypress="erNavigatorEC()" id="erNavigatorDescEn" name="erNavigatorDescEn"> </textarea> <p class="text"> Step Description (Spanish) </p> <textarea class="textarea" onkeypress="erNavigatorEC()" id="erNavigatorDescEs" name="erNavigatorDescEs"> </textarea><p class="text" id="uploadVideoText"> Upload/Change Video</p><input type="file" onchange="erVideoUpload()" id="erVideo"> <div id="videoPreview"></div>';
  getElementObject("erNavigatorCheckInBBox").innerHTML = "<p class='textleft'>By adding the above location/provider as my partner, I agree to have read and understood the IHHS <a href=''> Privacy Policy </a>, <a href=''> HIPPA Compliace Statement</a> and <a href=''> End User Agreement </a>. </p> <p class='textleft'> If you agree click <u>Add as Partner</u> to continue. </p><a href='javascript:checkinNow()'> <div class='glassFinish deleteNo'>Add as Partner !</div></a> <div class='horizontalLine'> </div>";

  getElementObject("erNavigatorExistsBox").innerHTML = "<p id='sessionExistsText' class='titleText'> You have checked into this location earlier. You can either check back in to the same session (your navigator progress is saved) or you can choose to start a new session.</p> <a href='javascript:checkinNow2()'> <div class='glassFinish deleteNo'>Check in to Existing Session</div></a> <a href='javascript:checkinNow3()'> <div class='glassFinish deleteYes'>Create New Session</div></a> <a href='javascript:checkinNow4()'> <div class='glassFinish deleteNo'>Back</div></a>";
  getElementObject("erNavLocs").innerHTML = "<select class='locSelect flip0' id='navLoc' onchange='ERNavLocChanged()'></select><div class='comictt'>&#9650;</div>";
     

  /*
  getElementObject("erNavigatorListOptions").innerHTML =
      "<a  class=''  href='javascript:checkoutYes()'><div class='glassFinish deleteYes' id='checkOutYes'> Yes, remove.</div> </a><a  class=''  href='javascript:checkoutNo()'><div class='glassFinish deleteNo' id='checkOutNo'> No, not now.</div> </a>"
  	 +"<a  class=''  href='javascript:checkout()'><div style='margin-left:0px; width:100%' class='fadeC deleteYesFull' id='checkOut'> Remove as " + CARESTEAMLOGO + "</div> </a>";
     */
 // getElementObject("erNavigatorList").innerHTML = "<a class='listItem arrowFinish' href='javascript:stepSelected(-1)' id='stepNMP'> <p>" + CARESTEAMLOGO + " Members</p> </a> <a class='listItem arrowFinish' href='javascript:stepSelected(0)' id='stepN0'> <p>Item 1 </p> </a> <a  class='listItem arrowFinish' href='javascript:stepSelected(1)' id='stepN1'> <p> Item 2</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(2)' id='stepN2'> <p> Item 3</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(3)' id='stepN3'> <p> Item 4</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(4)' id='stepN4'> <p> Item 5</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(5)' id='stepN5'> <p> Item 6</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(6)' id='stepN6'> <p> Item 7 </p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(7)' id='stepN7'> <p> Item 8</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(8)' id='stepN8'> <p> Item 9</p> </a> <a  class='listItem arrowFinish'  href='javascript:stepSelected(9)' id='stepN9'> <p> Item 10 </p> </a><a  class='listItem arrowFinish'  href='javascript:stepSelected(10)' id='stepN10'> <p> Item 11 </p> </a><a  class='listItem arrowFinish'  href='javascript:stepSelected(11)' id='stepN11'> <p> Item 12 </p> </a><a  class='listItem arrowFinish'  href='javascript:stepSelected(12)' id='stepN12'> <p> Item 13 </p> </a><a  class='listItem arrowFinish'  href='javascript:stepSelected(13)' id='stepN13'> <p> Item 14 </p> </a><a  class='listItem arrowFinish'  href='javascript:stepSelected(14)' id='stepN14'> <p> Item 15 </p> </a>";
  getElementObject("erNavigatorDetailsOptions").innerHTML = "<a href='javascript:stepNotDone()' id='stepDoneButton'> <div class='glassFinish deleteNo'> Step Completed </div> </a> <a href='javascript:stepDone()' id='stepNotDoneButton'> <div class='glassFinish deleteYes'> Step NOT Completed</div> </a><div cl;ass='horizontalLine'> </div>";
//  getElementObject("erNavigatorInputText").innerHTML = "<p class='titleText'> Select a location to check in. If no locations are available, you have already signed into all currently available locations.</p>"
  checkinSel();
	getElementStyleObject("noitem").display = "none";	


}

function configAppAC()
{
   appAC = $('#aSearch').autocomplete({
     maxHeight: 100,
     width: "100%",
     autoSelectFirst: true,
       onSelect: function(value, data){activityIndicator.show(); showApplet(data);bsScrollApp()},
     delimiter: /(,|;)\s*/
  });

}

function configERAC()
{
   erAC = $('#erSearch').autocomplete({
     maxHeight: 100,
     width: "100%",
     autoSelectFirst: true,
       onSelect: function(value, data){activityIndicator.show(); stepSelected(data);bsScrollERNav()},
     delimiter: /(,|;)\s*/
  });

}


function sustainSelected()
{
	getElementObject("appletCat").value = "sustain";
	appletCatChanged();
}

function ccSelected()
{
	getElementObject("appletCat").value = "cc";
	appletCatChanged();
}

function clSelected()
{
	getElementObject("appletCat").value = "cl";
	appletCatChanged();
}

function dtSelected()
{
	getElementObject("appletCat").value = "dt";
	appletCatChanged();
}

function gmSelected()
{
	getElementObject("appletCat").value = "gm";
	appletCatChanged();
}

function sdSelected()
{
	getElementObject("appletCat").value = "sd";
	appletCatChanged();
}

function petSelected()
{
	getElementObject("appletCat").value = "pet";
	appletCatChanged();
}

function pharSelected()
{
	getElementObject("appletCat").value = "phar";
	appletCatChanged();
}

function prtSelected()
{
	getElementObject("appletCat").value = "prt";
	appletCatChanged();
}

function spSelected()
{
	getElementObject("appletCat").value = "sp";
	appletCatChanged();
}

function vendSelected()
{
	getElementObject("appletCat").value = "vend";
	appletCatChanged();
}

function visionSelected()
{
	getElementObject("appletCat").value = "vision";
	appletCatChanged();
}

function appletCatChanged()
{
	if(ENV.device.touchSupport){
		backtoNavList();
		hideBackButton();
	}
	activityIndicator.setText("Updating " + CARESTEAMSLOGO + "...");
	activityIndicator.show();
	getElementObject("locListCheck").checked = false;
	var val = getElementObject("appletCat").value;
	if(val === "ALL"){
		$("#locList .listItem").fadeIn();
	}
	else{
		$("#locList .listItem").fadeOut();
		$("#locList ." + val).stop().fadeIn();
	}
	setTimeout("activityIndicator.hide()",250);
}

function checkout()
{
	getElementStyleObject("checkOutYes").display = "block";
	getElementStyleObject("checkOutNo").display = "block";
	getElementStyleObject("checkOut").display = "none";
}
function checkoutNo()
{
	getElementStyleObject("checkOutYes").display = "none";
	getElementStyleObject("checkOutNo").display = "none";
	getElementStyleObject("checkOut").display = "block";
}
function checkoutYes()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "removePatientLocation";
  url = url + "?userID=" + encodeURIComponent(userID);
  url = url + "&loc=" + Location;
  var callback = checkout_CB;
  loadFile(url, callback);
	scrollRefreshAll();
}

function checkout_CB(data)
{
  setTimeout("Location='ALL';sessionsSel();", 20);
  dialogMessage.display("<b>" + locNames[Location] + '</b> has been removed as your ' + CARESTEAMLOGO + '.', App.resURL + Location + "icon.png", null, null);
    handlemmdisplay();
}

var currentERStatus = "10000000000000000000";

var patLocs = [];

function getERNavLocAux()
{
  var url = App.mainURL;
  url = url + "getPatientLocations";
  url = url + "?userID=" + encodeURIComponent(userID);
  var callback = function (data){
      var locs = JSON.parse(data); 
      patLocs = locs;
      if(patLocs.indexOf(Location) < 0){if(patLocs.length > 0){Location = patLocs[0]} else{Location = "ALL"}}
  };
  loadFile(url, callback);
}


function getERNavLoc()
{
  var url = App.mainURL;
  url = url + "getPatientLocations";
  url = url + "?userID=" + encodeURIComponent(userID);
  var callback = getERNavLoc_CB;
  loadFile(url, callback);
}

var data85;
function getERNavLoc_CB(data)
{
   data85 = data;
  var locs = JSON.parse(data); 
  patLocs = locs;
  if(patLocs.indexOf(Location) < 0){if(patLocs.length > 0){Location = patLocs[0]} else{Location = "ALL"}}
  handlemmdisplay();
  if(patLocs.length == 0){
    getElementStyleObject("erNavigatorOptionsBox").display = "none";
    setTimeout('gotoApps()', 500);
    return;
  }
	getElementStyleObject("erNavigatorListOptions").display = "block";
  var outS = "<option disabled> &#9660; My CAREteams (" + patLocs.length.toString() + ") </option>";
  var temp = Object.keys(locNames);
  for(var i = 0; i < temp.length; i++){
	if(patLocs.indexOf(temp[i])>=0){
	    outS = outS + "<option value='" + temp[i] + "'> &nbsp; &nbsp; &nbsp;" + locNames[temp[i]] + " </option>"
	}
  }
//  outS += "<option disabled> ---------- </option>";
  outS += "<option value='manage'>&hearts; Manage CAREteams ... </option>";
  //outS = outS + "</select>";
  getElementObject("navLoc").innerHTML = outS;
  setTimeout("ERNavLocChanged2()",200);
}


var setLocation = false;

function ERNavLocChanged2()
{
  if(Location != "ALL"){
    getElementObject('navLoc').value = Location;
  }
  else
  {
    Location = getElementObject('navLoc').value;
  }
  applyLocationStyle();
  getERNavInfo();
}

function ERNavLocChanged()
{
  var temp = getElementObject('navLoc').value;
  getElementObject('navLoc').blur();
  	if(temp === "manage"){
		erNavActiveSmp = true;
		mainMenuButtons.selected("buttonERNavigator");
		return;
	}
  Location = temp;
  currPushLoc = temp;
  applyLocationStyle();
  getERNavInfo();
}

function checkinNow4()
{
    getElementStyleObject("erNavigatorExistsBox").display = "none";
    getElementStyleObject("erNavigatorInputBox").display = "block";
    getElementStyleObject("erNavigatorCheckInBBox").display = "block";
}
function checkinNow2()
{
  updatePatSession(false);
  sessionsSel();
}

function checkinNow3()
{
  updatePatSession(true);
  sessionsSel();
}

function checkinNow()
{
  	scrollRefreshAll();
  var temp = checkinloc;
  Location = temp;

  var url = App.mainURL;
  url = url + "addPatientLocation";
  url = url + "?userID=" + encodeURIComponent(userID);
  url = url + "&loc=" + encodeURIComponent(temp);
  var callback = checkinNow_CB;
  loadFile(url, callback);
  console.log(url);

}

function checkinNow_CB(data)
{
  var url;
  var temp = checkinloc;
  if(data === "1"){
  	Location = temp;
	alertHandler.class = "checkin";
	alertHandler.flashNewMessage(CARESTEAMLOGO + ' added!', "NEXT STEPS : Manage Privacy, Browse " + CARESTEAMLOGO + " Library and Resources...");
    mainMenuButtons.selected("buttonAppSettings");
	 // setTimeout('sessionsSel()', 200);
  }
  else if(data === "-1"){
    alertHandler.flashNewMessage("Invalid " + CARESTEAMLOGO + " ID", "Please try again");
  }
  else{
    alertHandler.flashNewMessage("Something went wrong", "Please try again an a minute");
  }
  return;
}

function updatePatSession(arg)
{
    var temp = checkinloc;
    activityIndicator.show();
    var url = App.mainURL;
    url = url + "editSession";
    url = url + "?sessionID=" + encodeURIComponent(temp + userID);
    url = url + "&loc=" + encodeURIComponent(temp);
    url = url + "&userID=" + encodeURIComponent(userID);
    url = url + "&date=" + encodeURIComponent(new Date().getTime());
    if(arg){
      url = url + "&navigator=" + encodeURIComponent("10000000000");
    }
    //url = url + "&myRecs_saveYN=" + encodeURIComponent(ls_saveYN);
    //url = url + "&myRecs_showYN=" + encodeURIComponent(ls_showYN);

    Location = temp;
    var callback = cb_CB;
    loadFile(url, callback);
}

function cb_CB()
{
  	setLocation = true;
  setTimeout('activityIndicator.hide();sessionsSel()', 200);
}

var GPS = {
	lat:null,
	lng: null,
	time: null
}

function updateGPS()
{
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(updateGPSPosition);
	}
	else{
		GPS.lat = null;
		GPS.lng = null;
		GPS.time = null;
	}
}

function updateGPSPosition(pos)
{
	GPS.lat = pos.coords.latitude;
	GPS.lng = pos.coords.longitude;
	GPS.time = new Date().getTime();
}

function checkinSelClicked()
{
	checkinSel();
	getElementStyleObject("noitem").display = "block";
}

var gpsflag = false;
function checkinSel()
{
	  $("#" + Canvas.current + " .searchWrapper").fadeIn(0);
	selectedStyle.hion = false;
	allApplets = true;
    if(gpsflag)updateGPS();
    gpsflag = true;	
  setTimeout('getElementStyleObject("erNavigatorExistsBox").display = "none";', 200);
  getElementStyleObject("erNavigatorInputBox").display = "block";
  //setTimeout('getElementStyleObject("erNavigatorList").display = "none";',200);
	getElementStyleObject("erNavigatorDetailsBox").display = "none";
	//getElementStyleObject("healthRecordsOptionsBox2").display = "none";
	//getElementObject("erNavigatorBrandText").innerHTML = "";
	getElementObject("erNavLocDetails").innerHTML = "";
	//getElementStyleObject("erNavigatorBrand").backgroundImage = "";
  getElementStyleObject("erNavigatorCheckInBBox").display = "none";
//	getElementStyleObject("bwERNav").display = "none";
  locAllStyle();
  //getElementStyleObject("erNavigatorCheckInBBox").display = "block";
  
  getElementObject("navSessions").className = "glassFinish optionsDivRight whitebg";
  getElementObject("navCheckIn").className = "glassFinish optionsDivLeft redbg";
  getElementStyleObject("erNavigatorBoxWrapper").display = "block";
  //getElementStyleObject("erNavigatorListWrapper").display = "none";
  getElementStyleObject("erNavLocs").display = "none";
  getLocations();
	//getElementStyleObject("erNavigatorListOptions").display = "none";
	scrollRefreshAll();
	getElementObject("appletCat").value = "ALL";
	navPlugin.hide();
}

function sessionsSel()
{
  getElementObject("erNavigatorDetailsTitle0").innerHTML = "";
  getElementStyleObject("erNavigatorDetailsTitle0").display = "none";
  getElementStyleObject("erNavLocDetails").display = "none";
	selectedStyle.hion = true;
	applyAppStyle(null, "");
	allApplets = false;
	checkoutNo();
	getElementStyleObject("noitem").display = "none";
//  getElementObject("navCheckIn").className = "glassFinish optionsDivLeft whitebg";
//  getElementObject("navSessions").className = "glassFinish optionsDivRight redbg";
	getElementStyleObject("healthRecordsOptionsBox2").display = "block";
  setTimeout('getElementStyleObject("erNavigatorBoxWrapper").display = "none";', 200);
  getElementStyleObject("erNavigatorListWrapper").display = "block";
  getElementStyleObject("erNavigatorOptionsBox").display = "block";
	getElementStyleObject("bwERNav").display = "block";
  getERNavLoc();
  getElementStyleObject("erNavLocs").display = "block";
  getElementObject("locList").innerHTML = "";
}

function checkinLocChanged()
{
	return;
	activityIndicator.show();
	var loc = getElementObject("ll" + loginLocationID).value;
	if(loc === "0"){
		getElementObject("locBrandText").innerHTML = "<div class='title'> Select a partner to add. </div>If no partners are available, you have already added all current CARES partners.";
		getElementStyleObject("locBrand").backgroundImage = "url('images/loc.png')";
		getElementStyleObject("erNavigatorCheckInBBox").display = "none";
		activityIndicator.hide();
		return;
	}
	getElementStyleObject("erNavigatorCheckInBBox").display = "block";
	var url = App.mainURL;
	url = url + "getLocationInfo";
	url = url + "?loc=" + encodeURIComponent(loc);
	var callback = checkinLocChanged_CB;
	loadFile(url, callback);
}

function checkinLocChanged_CB(data)
{
  var pInfo = JSON.parse(data);
  var pKeys;
  brandText = "";
  var addrstr = "";
  pKeys = Object.keys(pInfo);
  var temp = "name";
  if(pKeys.contains(temp) >= 0){
    brandText = brandText + pInfo[temp];
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
    brandText = "<div class='title'>" + brandText + "</div><a target='_blank' href='http://maps.apple.com/?q=" + brandText + " " + addrstr  + "' class='external' data-rel='external' data-ajax='false'>" + "<p>" + addrstr+ "</p></a>";
  }
  temp = "tel";
  if(pKeys.contains(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      	if(ENV.screen.smallscreenon && ENV.device.touchSupport){
			brandText = brandText + "<a target='_blank' href='tel:" +  addrstr[t]  + "' class='external' data-rel='external' data-ajax='false'>" + "<p>" + addrstr[t] + "</p></a>";
		}
		else{
			brandText = brandText + "<p>" + addrstr[t] + "</p>";
		}
    }
  }

  getElementObject("locBrandText").innerHTML = brandText;
  getElementStyleObject("locBrand").backgroundImage = "url('" + App.resURL + pInfo["loc"] + "icon.png')";
	activityIndicator.hide();

}

function getACTagSt(st)
{
	var outS = "";
	if(st.length <= 10){
		return outS;
	}
	if(st[0] === "1"){
		outS += "<a href='javascript:ccSelected()' class='tag tr200'>Care Coordination </a> ";
	}
	if(st[1] === "1"){
		outS += "<a href='javascript:clSelected()' class='tag tr200'>Community Living </a> ";
	}
	if(st[2] === "1"){
		outS += "<a href='javascript:dtSelected()' class='tag tr200'>Dental </a> ";
	}
	if(st[3] === "1"){
		outS += "<a href='javascript:gmSelected()' class='tag tr200'> General Medicine</a> ";
	}
	if(st[4] === "1"){
		outS += "<a href='javascript:sdSelected()' class='tag tr200'> Healthy Living/Self Discovery </a> ";
	}
	if(st[5] === "1"){
		outS += "<a href='javascript:petSelected()' class='tag tr200'> Pet Care</a> ";
	}
	if(st[6] === "1"){
		outS += "<a href='javascript:pharSelected()' class='tag tr200'>Pharmacy </a> ";
	}
	if(st[7] === "1"){
		outS += "<a href='javascript:prtSelected()' class='tag tr200'> Preventative/Rehab/Therapeutic</a> ";
	}
	if(st[8] === "1"){
		outS += "<a href='javascript:spSelected()' class='tag tr200'>Specialties </a> ";
	}
	if(st[9] === "1"){
		outS += "<a href='javascript:vendSelected()' class='tag tr200'> Vendor </a> ";
	}
	if(st[10] === "1"){
		outS += "<a href='javascript:visionSelected()' class='tag tr200'>Vision</a> ";
	}
	if(st[11] === "1"){
		outS += "<a href='javascript:sustainSelected()' class='tag tr200'>Collective Impact and Sustainability</a> ";
	}
	return outS;
}


function getACClassSt(st)
{
	var outS = "";
	if(st.length <= 11){
		return outS;
	}
	if(st[0] === "1"){
		outS += "cc ";
	}
	if(st[1] === "1"){
		outS += "cl ";
	}
	if(st[2] === "1"){
		outS += "dt ";
	}
	if(st[3] === "1"){
		outS += "gm ";
	}
	if(st[4] === "1"){
		outS += "sd ";
	}
	if(st[5] === "1"){
		outS += "pet ";
	}
	if(st[6] === "1"){
		outS += "phar ";
	}
	if(st[7] === "1"){
		outS += "prt ";
	}
	if(st[8] === "1"){
		outS += "sp ";
	}
	if(st[9] === "1"){
		outS += "vend ";
	}
	if(st[10] === "1"){
		outS += "vision ";
	}
	if(st[11] === "1"){
		outS += "sustain";
	}
	return outS;
}

var allApplets = false;

function getLocations()
{
  activityIndicator.setText("Listing " + CARESTEAMSLOGO + "...");
	activityIndicator.show();
  var url = App.mainURL;
  url = url + "getLocationsAll";
  var callback = getLocations_CB;
  loadFile(url, callback);
}

var loginLocationID = "";

var locNames = [];

var t67;
function getLocations_CB(data)
{
	activityIndicator.hide();
  var ac = {};
  ac.suggestions = [];
  ac.data = [];
  var locations = JSON.parse(data);
  t67 = locations;
  var temp = new Date().getTime();
  loginLocationID = temp;
  
  var outS = "";
  var outS0 = "";
  var outS1 = "";
  var outS2 = "";
  var flag = true;
	currAppsf = new Date().getTime().toString();
	var theid = "";
    var flag19 = true;
    var iscatpop = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < locations.length; i++){
    if(locations[i].loc === "ALL"){
      continue;
    }
	if(Object.keys(locations[i]).contains("published") >= 0 && locations[i].published === "false"){
		continue;
	}
    var catsuf = "";
    var outSx = "";
	if(Object.keys(locations[i]).contains("lat") >= 0 && Object.keys(locations[i]).contains("long") >= 0){
        var lat = parseFloat(locations[i]["lat"]);
        var lng = parseFloat(locations[i]["long"]);
        var f = getDistanceFromLatLonInKm(lat,lng, GPS.lat, GPS.lng);
        if(!isNaN(f)){
            f /= 1.6;
            f = parseInt(f).toString() 
                if(f === "1") { f = f + " mile"}
                else { f = f + " miles"}
                
                if(parseInt(f) < 21) { catsuf = " nearby"; iscatpop[12]++;}
            outSx = "<br><i>" + f + " away</i>";
        }
    }
	locNames[locations[i].loc] = locations[i].name;
	var catSt = "";
	if(Object.keys(locations[i]).contains("catSt") >= 0){
		catSt =  locations[i].catSt.toString();
        for(var y= 0; y < catSt.length; y++){
            if(catSt[y] === "1"){
                iscatpop[y]++;
            }
        }
	}

	theid = "a" + currAppsf + locations[i].loc;

    var flag9 = false;
    if(patLocs && patLocs.contains(locations[i].loc) >=0){
		outS +=  "<a id='" + theid + "' class='listItem myapplet arrowFinish " + getACClassSt(catSt) + catsuf + "' href='javascript:showApplet(" + '"' + locations[i].loc + '"' +  ")'> " + "<div class='notPic'  style='background-image: url(" + '"' + App.resURL  + locations[i].loc + 'icon.png")' + "'></div>" ;
        outS = outS + "<div class='msgbadge mya'> </div>";
        flag9 = true;
    }
	else{
		outS +=  "<a id='" + theid + "' class='listItem arrowFinish " + getACClassSt(catSt) + catsuf + "' href='javascript:showApplet(" + '"' + locations[i].loc + '"' +  ")'> " + "<div class='notPic'  style='background-image: url(" + '"' + App.resURL  + locations[i].loc + 'icon.png")' + "'></div>" ;
        if(flag19 === true){
            flag19 = locations[i].loc;
        }
	}
	outS = outS + "<p>";
	var n = "";
	if(Object.keys(locations[i]).contains("name") == -1){
		outS = outS + "<strong>" + locations[i].loc + "</strong>";
		n = locations[i].loc;
	}
	else{
		outS = outS + "<strong>" + locations[i].name + "</strong>";
		n = locations[i].name;
	}
	if(Object.keys(locations[i]).contains("city") >= 0){
		outS = outS + "<br><i>" + locations[i].city + "</i>";
	}

	outS = outS + outSx;
	outS = outS + "</p></a>";
    ac.suggestions[ac.suggestions.length] = n;
    ac.data[ac.data.length] = locations[i].loc;
    if(Location === locations[i].loc){
        outS0 = outS;
    }
    else{
        if(flag9){
            outS1 += outS;
        }
        else{
            outS2 += outS;
        }
    }
    outS = "";
  }
	outS = "<div class='aList locationsList' id=''>" + outS0 + outS1 + outS2 + "</div>";
    updateCTdropdown(iscatpop);
  appAC.setOptions({"lookup":ac});
  currApps = ac.data;
  getElementObject("locList").innerHTML = outS;
  $("#" + Canvas.current + " .ListWrapper").fadeOut(0).fadeIn(0);
  $("#" + Canvas.current + " .aList").css({"color":selectedStyle.hilite1});
    
  //setTimeout("getElementObject('ll" + temp + "').value = " + '"' + PersistantValue.get("loginLoc") + '"', 500);
  totalLocs = locations.length -1;
  setmyapplettext();
  setTimeout("checkinLocChanged2();", 20);
  if(!ENV.device.touchSupport){
      if(goaftercheckout != null){
          showApplet(goaftercheckout);
          goaftercheckout = null;
          return;
      }
      var t = Location;
      if (t === "ALL"){
            t = flag19;
      }
      setTimeout("showApplet('" + t + "')", 20);
      if (patLocs.length == 0){
          Location = "ALL";
      }
  }
}

var currApps = null;
var currApp = null;
var currAppsf = new Date().getTime().toString();

var pushSmp = true;

function showApplet(loct)
{
    if(patLocs.indexOf(loct) >= 0){
        pushSmp = true; 
    }
    else{
        pushSmp = false; 
    }
	getElementObject("aSearch").value = "";
	 activityIndicator.show();
		lastScrollPosition = getDocumentScroll();

	getElementStyleObject("noitem").display = "none";
	 selectedStyle.clean();
	  getElementStyleObject("erNavigatorDetailsBox").display = "none";
	  getElementStyleObject("erNavLocDetails").display = "none";
	 currApp = loct;
	 var url = App.mainURL;
	   url = url + "getLocationInfo";
	       url = url + "?loc=" + loct;
		   var callback = showApplet_CB;
		     loadFile(url, callback);
	// showBackButton();	
     if(Canvas.current === "caresuser-erNavigator"){
      getProCarousel(loct,"erAssetWrapper", "erAssetBox")
     }
     else if(Canvas.current === "caresuser-appSettings"){
      getProCarousel(loct,"aserAssetWrapper", "aserAssetBox")
     }
	if(allApplets){
		selectedStyle.add("a" + currAppsf + loct);
	}
	else{
	  selectedStyle.add("stepNMP");
	}
}


var currPushLoc = "";
var data670;
function showApplet_CB(data)
{
	var pInfo = JSON.parse(data);
	data670 = pInfo;
    currPushLoc = pInfo.loc;
	var keys = Object.keys(pInfo);
	var name = CARESTEAMLOGO + " Members";
	var catSt = "";
	var font = "";
	var catStHTML = "";
	var addtoNet= "";
	if(allApplets){
		if(keys.indexOf("font") >= 0){
			font = pInfo.font;
		}
		if(keys.indexOf("color") >= 0){
			applyAppStyle(pInfo.color, font);
		}
		else{
			applyAppStyle(null, "");
		}
		if(keys.indexOf("catSt") >= 0){
			catSt =  pInfo.catSt.toString();
		}
		catStHTML = "<div class='standardFont' style='margin-top:20px;margin-bottom:20px;line-height:40px;text-align:left'><b style='color#323232'>CATEGORIES : </b>" + getACTagSt(catSt) + "</div>";
		addtoNet = "<a class='connect standardFont fadeC' href='javascript:addtoNetwork(" + '"' + pInfo.loc + '"' +  ")'> Add as " + CARESTEAMLOGO + "</a>";
		if(keys.indexOf("name")>=0){
			name = pInfo.name;
		}
	}
	 var temp1  = "No description provided" + catStHTML;
	if(keys.indexOf("desc")>=0){
	  temp1 = pInfo.desc + catStHTML;
	}
     if(Canvas.current === "caresuser-erNavigator"){
        getElementObject("erNavigatorDetails").innerHTML = temp1;
     }
     else if(Canvas.current === "caresuser-appSettings"){
        getElementObject("aserNavigatorDetails").innerHTML = temp1;
     }

	if(allApplets && patLocs && patLocs.indexOf(pInfo.loc) >=0){
		addtoNet = "<a class='disconnect standardFont fadeC' href='javascript:removeFromNetwork(" + '"' + pInfo.loc + '"' +  ")'> Remove </a>";
		addtoNet += "<a class='settings standardFont fadeC' href='javascript:goToSettings(" + '"' + pInfo.loc + '"' +  ")'> Options </a>";
	}
  getElementObject("erNavigatorDetailsTitle0").innerHTML = addtoNet;
  if(addtoNet.length > 0){
	  getElementStyleObject("erNavigatorDetailsTitle0").display = "block";
  }
  else{
	  getElementStyleObject("erNavigatorDetailsTitle0").display = "none";
  }
  getElementObject("erNavigatorDetailsTitle").innerHTML = "<div style='text-align:center' class='bold'>" + name + "</div>";
 // getElementObject("aserNavigatorDetailsTitle").innerHTML = "<div class='bold'>" + name + "</div>";
 // getElementStyleObject("aserNavigatorDetailsTitle").color = selectedStyle.hilite;
 // getElementStyleObject("aserNavigatorDetailsBox").display = "block";
  getElementStyleObject("erNavigatorDetailsTitle").color = selectedStyle.hilite;
  getElementStyleObject("erNavigatorDetailsBox").display = "block";
  if(ENV.device.touchSupport){
	  getElementStyleObject("erNavigatorBoxWrapper").display = "none";
	  getElementStyleObject("erNavigatorOptionsBox").display = "none";
  }
//  getElementStyleObject("helpButton").display = "none";
	setTimeout('scrollRefreshAll();activityIndicator.hide();', 200);
}

function applyAppStyle(obj, font)
{
	if(obj == null){
	      getElementStyleObject("erNavigatorDetailsBox").backgroundColor = "";
	      getElementStyleObject("body").color = '';
	      getElementStyleObject("erAssetBox").color = '';
	      getElementStyleObject("erNavigatorDetailsBox").fontFamily = "";
	      getElementStyleObject("erNavigatorDetailsTitle").color = "";
	      return;
	}
	var f1 = 0;
	if(font.length > 0){
		f1 = parseInt(font);
	}
	var temp = JSON.parse(obj);
	  var c1 = "rgba(" + temp[0] + "," + temp[1] + "," + temp[2] + ",.4)";
	    var c2 = "rgb(" + temp[3] + "," + temp[4] + "," + temp[5] + ")";
	      var c3 = "rgb(" + temp[6] + "," + temp[7] + "," + temp[8] + ")";
	selectedStyle.hilite = c3;
	      console.log(c2, c3);
	      getElementStyleObject("erNavigatorDetailsTitle").color = c3;
	      getElementStyleObject("body").backgroundColor = c1;
	      getElementStyleObject("erNavigatorDetails").color = c2;
	      getElementStyleObject("erAssetBox").color = c2;
	      getElementStyleObject("erNavigatorDetailsBox").fontFamily = webSafeFonts[f1];

}

function addSpecialist()
{
	dialogInput2.display("Enter Specialist name and phone numbers.","", "", addSpecialistNow, "Add", "Cancel", "images/spTitle1.png");
}

function addSpecialistNow()
{
	var aObj = {
		id: userID + new Date().getTime().toString(),
		name: dialogInput2.value1,
		phone: dialogInput2.value1,
		type: "sp",
		cat: userID
	};
	toCloudS(aObj);
}

function toCloudS(theObj){
		var url = App.mainURL;
		  url = url + "putAsset";
		    url = url + "?id=" + encodeURIComponent(theObj.id);
		      url = url + "&name=" + encodeURIComponent(theObj.name);
		        url = url + "&cat=" + encodeURIComponent(theObj.cat);
			  url = url + "&url=" + encodeURIComponent(theObj.url);
			    url = url + "&type=" + encodeURIComponent(theObj.type);
			      var callback = toCloudS_CB;
			        loadFile(url, callback);
} 

function toCloudS_CB(data)
{
	updateSurgeons()
}

function updateSurgeons()
{
	getElementObject("spList").innerHTML = "<div class='titleText'>Loading...</div>";
	var url = App.mainURL;
	url = url + "getAssets";
	url = url + "?cat=" + userID;
	var callback = updateSurgeons_CB;
	loadFile(url, callback);
}

function updateSurgeons_CB(data)
{
		if(data === "[]"){
					assetManager.listObject = [];
							getElementObject("spList").innerHTML = "<div class='titleText'>No assets yet</div>";
									return;
										}
			var pInfo = JSON.parse(data);
				assetManager.listObject = pInfo;
					getElementObject("spList").innerHTML = assetManager.getAdminHTML("SP");
						activityIndicator.hide();
}

function checkinLocChanged2()
{
	locListToggle();
}

function showAppletDetails(l)
{
	$("#locList .l" + l).fadeOut(0);
	$("#locList ." + l).show();
}


function removeFromNetwork(l)
{
	dialogConfirm.display("Remove <b>" + locNames[l] + '</b> as ' + CARESTEAMLOGO + '?', App.resURL + l + "icon.png", null, 'removeFromNetworkAux("' +l + '")', null, null);
}
function removeFromNetworkAux(l)
{
	var index = patLocs.indexOf(l);
	if(index >= 0){
		patLocs.splice(index, 1);
		setmyapplettext();
	}
	if(patLocs.length == 0){
		getElementStyleObject("erNavigatorOptionsBox").display = "none";
	}
	checkoutYes2(l);
	overlayWrapper.hide();
	hideBackButton();
}

function checkoutYes2(l)
{
    activityIndicator.setText("Removing <b>" + Locationtext + "</b> as a " + CARESTEAMLOGO + "...");
  activityIndicator.show();
  goaftercheckout = null;
  var url = App.mainURL;
  url = url + "removePatientLocation";
  url = url + "?userID=" + encodeURIComponent(userID);
  url = url + "&loc=" + l;
  var callback = checkout_CB2;
  loadFile(url, callback);
}

var goaftercheckout = null;

function checkout_CB2(data)
{
  setTimeout("checkinSelClicked()",20);
	alertHandler.class = "checkout";
	alertHandler.flashNewMessage(CARESTEAMLOGO + ' Removed!', "You can add " + CARESTEAMLOGO + " again at any time...");
    handlemmdisplay();
}
var checkinloc;
function addtoNetwork(l)
{
	dialogConfirm.display("Add <b>" + locNames[l] + ' as ' + CARESTEAMLOGO + '?', App.resURL + l + "icon.png", null, 'addtoNetworkAux("' +l + '")', null, null);
}
function addtoNetworkAux(l)
{
	checkinloc= l;
	checkinNow();
	overlayWrapper.hide();
	//hideBackButton();
}

function addbyAppletID()
{
	dialogInput.display("Enter " + CARESTEAMLOGO + " ID","", addbyAppletID_CB, "Continue", "Cancel","images/chi.png");
}

function addbyAppletID_CB()
{
	var t = dialogInput.value;
	if(patLocs.contains(t) >= 0){
		alertHandler.flashNewMessage("Already a " + CARESTEAMLOGO,"Redirecting....")
	}
	addtoNetworkAux(t);
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
  if(size > 10000000){
    alertHandler.flashNewMessage("File too large", "please ensure your is under 256 Kb");  
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
  var url = App.mainURL;
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
  activityIndicator.setText("Uploading video. Please wait ...");
  activityIndicator.show();
}

function erVideoUpload_CB2(){
  getElementObject("videoPreview").innerHTML = "<a class='glassFinish deleteButton currentVideo' href='https://s3.amazonaws.com/caresapp/" + tempvid + "?t=" + new Date().getTime() + "' target='_blank'> Current Video </a>";
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

var erNavActiveSmp = true;

function discoverActive()
{
  //getERNavInfo();
	//getElementStyleObject("appBadge").backgroundColor = "#FFFFFF";
	//getElementStyleObject("appBadge").color = "#A70240";
    if(App.haslogin === 'true'){
        getElementStyleObject("loginBanner").display = "block";
    }
    hideBackButton();
    getElementStyleObject("body").backgroundImage = "none";
	getElementStyleObject("noitem").backgroundImage = "url(images/noitem2.png)";
	getElementStyleObject("noitem").display = "none";	
	getElementObject("appletCat").value = "ALL";
	getElementObject("locListCheck").checked = false;
  	getElementObject("helpText").innerHTML = "<p class='helpX'>Add " + CARESTEAMSLOGO + " to browse " + CARESTEAMLOGO + "'s content (Library/Resources). A secure connection exists between you and your " + CARESTEAMSLOGO + ".</p>"
        // + "<p class='helpP'> You can switch between your " + CARESTEAMSLOGO + " when you see the red heart on top of the screen.</p>";
	getElementStyleObject("erAssetBox").display = "none";
  //if(erNavActiveSmp){
  	checkinSelClicked();
  //}
  //else{
	//sessionsSel();
  	//erNavActiveSmp = true;
  //}
   // getERNavLocAux();
}

function setERStepsNo()
{
  activityIndicator.show();
  var n = getElementObject("noofERSteps").value;
  var url = App.mainURL;
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
    var url = App.mainURL;
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
  activityIndicator.show();
  getElementStyleObject("erNavigatorDetailsBox").display = "none";
  getElementStyleObject("erNavLocDetails").opacity= "0";
  getElementStyleObject("erNavLocDetails").display = "none";
  // if(!ENV.device.touchSupport){
//	  getElementStyleObject("erNavLocDetails").display = "block";
  // }
  getElementStyleObject("erNavigatorBoxWrapper").display = "none";
  getElementStyleObject("erNavigatorListWrapper").display = "block";
  var url = App.mainURL;
  url = url + "getRows";
  url = url + "?category=ERNav";
  //url = url + "&rowID=" + Location + "ERNav";
  url = url + "&loc=" + Location;
  var callback = getERNavInfo_CB;
  loadFile(url, callback);
  selectedStyle.clean();
}

var data92;
var data29, data24;
function getERNavInfo_CB(data)
{
	if(appletlocs.contains(Location) == -1){
		getElementObject("showMyRecords").checked = false;
	}
	else{
		getElementObject("showMyRecords").checked = true;
	}
  activityIndicator.hide();
  var pInfo = JSON.parse(data);
  var tempDict = [];
  var tempDictKeys = [];
  var len = 7;
  var lang;
  if(Language === "English"){
    lang = "En";
  }
  else{
    lang = "Es";
  }
  for (var j = 0; j < pInfo.length; j++){
    if(pInfo[j].rowID != "undefined"){
      tempDict[pInfo[j].rowID] = pInfo[j];
      tempDictKeys[tempDictKeys.length] = pInfo[j].rowID;
    }
  }
  data29 = tempDictKeys;
  data24 = tempDict;
  var ac = {};
  ac.suggestions = [];
  ac.data = [];
  if(tempDictKeys.contains(Location + "ERNav") >= 0){
     len = parseInt(tempDict[Location + "ERNav"].erno);
  }

  pInfo = parseInt(JSON.parse(data).erno);
  var outS = "";
  var name = "";
  for(var i = 0; i<15; i++){
    if(i >= len){
      getElementStyleObject("stepN" + i.toString()).display = "none";
    }
    else{
      getElementStyleObject("stepN" + i.toString()).display = "block";
    }
    if(tempDictKeys.contains(Location + "ERN" + i.toString()) >= 0){
       name = tempDict[Location + "ERN" + i.toString()]["name" + lang];
    }
    else{
       name = "Step " + (i+1).toString();
    }
    getLabelObject("stepN" + i.toString()).innerHTML = name;
    if(i < len){
	    ac.suggestions[ac.suggestions.length] = name;
	    ac.data[ac.data.length] = i;
    }
  }
  if(flag7){
  	flag7 = false;
	return;
  }
  getElementStyleObject("erNavigatorList").display = "block";
  erAC.setOptions({"lookup":ac});
  var y = [-1];
  navPlugin.currList = y.concat(ac.data);
  navPlugin.currID = null;
  if(!ENV.device.touchSupport){
	  setTimeout('stepSelected(-1)',100);
  }
  scrollRefreshAll();
}

var flag7 = true;

function erNavigatorInfoCB2()
{
  //getNavStatus();
}

function getNavStatus()
{
  var url = App.mainURL;
  url = url + "getSessionInfo";
  url = url + "?sessionID=" + encodeURIComponent(Location + userID);
  url = url + "&loc=" + encodeURIComponent(Location);
  var callback = getNavStatus_CB;
  loadFile(url, callback);
}

function getNavStatus_CB(data)
{
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var t = "10000000000";
  if(pKeys.contains("navigator") >=0){
     t = pInfo.navigator;
  }
  
  currentERStatus = t;
  setNavStatus(t)

}

function setNavStatus(data)
{
  	return;
  for(var i = 0; i<15; i++){
    if(data[i] === "1"){
      getLabelObject("stepN" + i.toString()).className = "tick";
    }
    else{
      getLabelObject("stepN" + i.toString()).className = "notick";
    }
  }

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
function stepNotDone()
{
  getElementStyleObject("stepDoneButton").display = "none";
  getElementStyleObject("stepNotDoneButton").display = "block";
  currentERStatus = currentERStatus.substring(0,currERNav) + "0" + currentERStatus.substring(currERNav+1);
  updateERStatus(currentERStatus);
}

function stepDone()
{
  getElementStyleObject("stepDoneButton").display = "block";
  getElementStyleObject("stepNotDoneButton").display = "none";
  currentERStatus = currentERStatus.substring(0,currERNav) + "1" + currentERStatus.substring(currERNav+1);
  updateERStatus(currentERStatus);
}

function updateERStatus(st)
{
    var url = App.mainURL;
    url = url + "editSession";
    url = url + "?sessionID=" + encodeURIComponent(Location + userID);
    url = url + "&loc=" + encodeURIComponent(Location);
    url = url + "&userID=" + encodeURIComponent(userID);
    url = url + "&navigator=" + encodeURIComponent(st);
    activityIndicator.show();
    var callback = updateERStatus_CB;
    loadFile(url, callback);
    setNavStatus(st);
}

function updateERStatus_CB(data)
{
    activityIndicator.hide();
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

function backtoNavList()
{
  navPlugin.hide();
  setTimeout('selectedStyle.clean()', 800);
  $("#" + Canvas.current + " .searchWrapper").fadeIn(0);
  getElementStyleObject("erNavigatorDetailsBox").display = "none";
  getElementStyleObject("erNavigatorOptionsBox").display = "block";
  getElementObject("erNavigatorDetails").innerHTML = "";
  getElementObject("erAssetWrapper").innerHTML = "";
	getElementStyleObject("erAssetBox").display = "none";
  getElementStyleObject("socialShare").display = "none";
//  getElementStyleObject("helpButton").display = "block";
  if(!allApplets || Canvas.current === "caresuser-appSettings"){
	  getElementStyleObject("erNavigatorBoxWrapper").display = "none";
	  getElementStyleObject("erNavLocs").display = "block";
	  getElementStyleObject("healthRecordsOptionsBox2").display = "block";
	  getElementStyleObject("erNavigatorListOptions").display = "block";
	  getElementStyleObject("erNavigatorListWrapper").display = "block";
      if(ENV.device.touchSupport){
          getElementStyleObject("aserNavigatorDetailsBox").display = "none";
      }
  }
  else{
	  getElementStyleObject("erNavigatorListWrapper").display = "none";
	  getElementStyleObject("erNavigatorBoxWrapper").display = "block";
  }
  if(Canvas.current === "caresuser-erNavigator"){
      locAllStyle();
  }
}

function stepSelected(theStep)
{
    if(theStep == -1){
        pushSmp = true; 
    }
  erNavigatorSelected(theStep);
}

function erNavigatorSelected(pID)
{
  activityIndicator.show();
    selectedStyle.clean();
	getElementStyleObject("noitem").display = "none";	
	getElementObject("erSearch").value = "";
  navPlugin.show();
	if(navPlugin.smp){
	    navPlugin.smp = false;
	}
	else{
		lastScrollPosition = getDocumentScroll();
	}
  currERNav = pID;
  navPlugin.currID = pID;
  navPlugin.show();
  if(ENV.device.touchSupport){
  	showBackButton();
  }

  if(pID == -1){
	  showApplet(Location);
	if(ENV.device.touchSupport){
	  setTimeout('getElementStyleObject("erNavigatorListWrapper").display = "none";', 200);
	  getElementStyleObject("erNavigatorOptionsBox").display = "none";
	  getElementStyleObject("erNavLocs").display = "none";
	  getElementStyleObject("healthRecordsOptionsBox2").display = "none";
	  getElementStyleObject("erNavigatorListOptions").display = "none";
	  	$("#" + Canvas.current + " .searchWrapper").fadeOut(0);
   } 
    selectedStyle.add("stepNMP");
    scrollRefreshAll();
	  return;
  }

  var url = App.mainURL;
  url = url + "getRowInfo";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  var callback = erNavigatorSelected_CB;
  loadFile(url, callback);
  selectedStyle.add("stepN" + pID);

  assetID = "aserAssetWrapper";
  assetBox = "aserAssetBox";
  getAssetCarousel(null, Location, Location + "ERN" + currERNav);
}

var data93;
function erNavigatorSelected_CB(data)
{
   if(ENV.device.touchSupport){
	  setTimeout('getElementStyleObject("erNavigatorListWrapper").display = "none";', 200);
	  getElementStyleObject("erNavLocs").display = "none";
	  getElementStyleObject("healthRecordsOptionsBox2").display = "none";
	  getElementStyleObject("erNavigatorListOptions").display = "none";
	  	$("#" + Canvas.current + " .searchWrapper").fadeOut(0);
   }
  getElementStyleObject("erNavLocDetails").display = "none";
  getElementStyleObject("socialShare").display = "block";
//  getElementStyleObject("helpButton").display = "none";
  getElementStyleObject("aserNavigatorDetailsBox").display = "block";
  setTimeout("erNavigatorInfoCB2(true)", 500);
  if(data==="0"){
    getElementObject("aserNavigatorDetails").innerHTML = "No description";
      getElementObject("aserNavigatorDetailsTitle").innerHTML = "Item " + currERNav.toString();
    activityIndicator.hide();
    scrollRefreshAll();
    return;
  }
  var pInfo = JSON.parse(data);
  var outS = "";
  //outS = outS + "<div class='horizontalLine'> </div>";
  var pKeys = Object.keys(pInfo);
  var temp;
  if(Language === "English"){
    temp = "nameEn";
    if(pKeys.contains(temp) >=0){
      getElementObject("aserNavigatorDetailsTitle").innerHTML = pInfo[temp];
		shareTitle = pInfo[temp];
    }
    /*
    temp = "video";
    if(pKeys.contains(temp) >=0){
      outS = outS + "<video width='100%' height='200' class='aVideo' controls> <source src='http://s3.amazonaws.com/caresapp/" + decodeURIComponent(pInfo[temp]) + "?t=" + new Date().getTime() + "'> </video>";
    }
    */
    temp = "descEn";
    if(pKeys.contains(temp) >=0){
      outS = outS + "<p>" + pInfo[temp] + "</p>";
    }
  }
  else{
    temp = "nameEs";
    if(pKeys.contains(temp) >=0){
      getElementObject("aserNavigatorDetailsTitle").innerHTML = "<h1>" + pInfo[temp] + "</h1>";
		shareTitle = pInfo[temp];
    }
    /*
    temp = "video";
    if(pKeys.contains(temp) >=0){
      outS = outS + "<video width='100%' height='200' class='aVideo' controls> <source src='https://s3.amazonaws.com/caresapp/" + decodeURIComponent(pInfo[temp]) + "?t=" + new Date().getTime() + "'> </video>";
    }
    */
    temp = "descEs";
    if(pKeys.contains(temp) >=0){
      outS = outS + "<p>" + decodeURIComponent(pInfo[temp]) + "</p>";
    }
  }
  getElementObject("aserNavigatorDetails").innerHTML = outS;

  if(currentERStatus[currERNav] === "0"){
     getElementStyleObject("stepDoneButton").display = "none";
     getElementStyleObject("stepNotDoneButton").display = "block";
  }
  else{
     getElementStyleObject("stepDoneButton").display = "block";
     getElementStyleObject("stepNotDoneButton").display = "none";
  }
	setTimeout('scrollRefreshAll();activityIndicator.hide();', 200);
  setTimeout('handleEmbeddedLinks("aserNavigatorDetails")', 200);
  if(App.embedded === "true"){
  	setTimeout("iPhoneOnly()", 300);
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
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=ERNav";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "ERN" + currERNav;
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("erNavigatorNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("erNavigatorNameEs").value);
  url = url + "&descEn=" + encodeURIComponent(getElementObject("erNavigatorDescEn").value);
  url = url + "&descEs=" + encodeURIComponent(getElementObject("erNavigatorDescEs").value);
  var callback = saveERNavInfo;
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
    url = url + "&descEn=" + encodeURIComponent(getElementObject("erNavigatorDescEn").value);
    url = url + "&descEs=" + encodeURIComponent(getElementObject("erNavigatorDescEs").value);
    var callback = function(){getERNavInfo()}
    loadFile(url, callback);
  }
  else{
    getERNavInfo();
  }
}

function discoverDeActive()
{
    proDict = [];
	//getElementStyleObject("appBadge").backgroundColor = "";
	//getElementStyleObject("appBadge").color = "";
	selectedStyle.hion = true;
  selectedStyle.clean();
	getElementStyleObject("noitem").display = "none";	
	getElementStyleObject("noitem").backgroundImage = "";
  navPlugin.hide();
  getElementObject("erAssetWrapper").innerHTML = "";
	//getElementObject("erSearch").value = "";
	//getElementObject("aSearch").value = "";
	// setTimeout('getElementStyleObject("erNavigatorList").display = "none"', 0);
	getElementStyleObject("erNavigatorList").display = "none";
	//getElementObject("erNavigatorBrandText").innerHTML = "";
	getElementObject("erNavLocDetails").innerHTML = "";
	//getElementStyleObject("erNavigatorBrand").backgroundImage = "";
	$(".brandWrapper2").removeClass("brandplain");
	getElementStyleObject("backButton").display = "none";
	getElementStyleObject("erAssetBox").display = "none";
  getElementStyleObject("erNavLocs").display = "none";
  getElementStyleObject("socialShare").display = "none";
//  getElementStyleObject("helpButton").display = "block";
  getElementStyleObject("erNavigatorDetailsBox").display = "none";
}


var totalLocs = -1;

function setmyapplettext()
{
	var temp = "no";
	var temp1 = CARESTEAMLOGO;
	if(patLocs.length > 0){
		temp = patLocs.length.toString();
        temp1 = CARESTEAMSLOGO;
	}
	getElementObject("myappletstext").innerHTML = "You have " + temp + " " + temp1 +
		 ' (out of ' + totalLocs.toString() + ' available on '+ CARESLOGO +').'
         + '<br><a href="javascript:addbyAppletID()" class="link addby"> Add using ' + CARESTEAMLOGO + ' ID</a>';
}
function locListToggle()
{
	scrollRefreshAll();
	var opt = getElementObject("locListCheck").checked;
	if (opt){
		$("#locList .myapplet").fadeOut('fast');
	}
	else{
		$("#locList .myapplet").fadeIn('fast');
	}
}


var editSmp = false;
function editRecordsChangeToggle()
{
	if(!editSmp){
		editSmp = false;
	    var temp = getElementObject("showMyRecords").checked;
	    if(!temp){
		  dialogMessage.display('Please enable providers to view your Journal first.', "images/show.png", null, null);
		    getElementObject("editMyRecords").checked = false;
		    return;
	    }
	}

    temp = getElementObject("editMyRecords").checked;
    var url = App.mainURL;
    if(temp){
	    url = url + "addAppletEditLocation";
	    //appletlocs[appletlocs.length] = Location;
    }
    else{
	    url = url + "removeAppletEditLocation";
	    //appletlocs.remove(Location);
    }
    url = url + "?userID=" + encodeURIComponent(userID);
    url = url + "&appletloc=" + Location;
    var callback = function(data){};
    loadFile(url, callback);
}


function showRecordsChangeToggle()
{
    var temp = getElementObject("showMyRecords").checked;
    var url = App.mainURL;
    if(temp){
	    url = url + "addAppletLocation";
	    appletlocs[appletlocs.length] = Location;
    }
    else{
	    url = url + "removeAppletLocation";
	    appletlocs.remove(Location);
    }
    url = url + "?userID=" + encodeURIComponent(userID);
    url = url + "&appletloc=" + Location;
    var callback = function(data){
	    if(!temp){
		getElementObject("editMyRecords").checked = false;
		editSmp = true;
		editRecordsChangeToggle();
	    }
    };
    loadFile(url, callback);
}

function getNotPro()
{
}

var proDict = {};

function getProCarousel(loc, aID, aBox)
{
	var url = App.mainURL;
	  url = url + "getPros";
	    url = url + "?loc=" + loc;
	     var callback = function (data){
		var pInfo = JSON.parse(data);
		  if(data === "[]"){
			getElementStyleObject(aBox).display = "none";
			return;
		  }
		  else{
			getElementStyleObject(aBox).display = "block";
		  }
          proDict = pInfo;
		var outS = "";
		var outTemp = "";
		var name;
		var image;
		for(var i = 0; i < pInfo.length; i++){
			item = pInfo[i];
			outS += getProCard(item, i);
		}

		getElementStyleObject(aID).width = (pInfo.length * 300).toString() + "px";
		getElementObject(aID).innerHTML = outS;
		  setTimeout('handleEmbeddedLinks("' + aID +' .sm")', 200);
		$("#" + aBox).animate({"scrollLeft":"0"}, 200);
		
		getElementStyleObject(aBox).display = "block";
	    }

	            loadFile(url, callback);
	            console.log(url);
}

function getProCard(item, no){
    var kys = Object.keys(item);
			name = "";
			image = "";
			if(kys.indexOf("name")>=0){name = item.name;}
			if(kys.indexOf("image")>=0){image = "background-image:url(" + item.image + ")";}
			
			var outTemp = "<div class='assetItemVC gradientLeftFade'> <div class='proPic' style='" + image + "'> </div> <div class='proDetails'>";
             outTemp +="<div class='actionItems'>";
            if(kys.indexOf("canRecieve") >= 0 && item.canRecieve === "true"){
                if(pushSmp){
                    //outTemp +="<a class='refer actionButton fadeC' href='javascript:refer(" + "'" + item.userID + "')> </a>";
                    outTemp +="<a class='push actionButton fadeC' href='javascript:push(" + '"' + no + '")' + "'> Send a Quick Message </a>";
                }
                else{
                    outTemp +="<a class='pusha actionButton fadeC' href='javascript:addtoNetwork(" + '"' + currApp + '")' + "'" + '> Add as ' + CARESTEAMLOGO + ' to Message </a>';
                }
            }
			outTemp +="</div>"
            outTemp += "<div class='standardFont proTitle'>" ; 
			outTemp += name + "</div>"
			outTemp +="<div class='standardFont proSocial'>";
			outTemp += getProLinks(item);
			outTemp +="</div>"
			outTemp +="</div>"
			outTemp +="</div>"
            return outTemp;
}

function goToSettings(l)
{
    Location = l;
    mainMenuButtons.selected("buttonAppSettings");
}

function push(id)
{
    id = proDict[parseInt(id)];
    currProvider = id.userID;
        dialogInputPush.display("Send Message to <i>" + id.name + "</i>.", null, null, null, pushNow, "Send" , "Cancel");
    currProviderName = id.name;
}

function pushNow()
{
    sendPushPost();
}

var currProvider = "";
var currProviderName = "";

function sendPushPost()
{
    var message = dialogInputPush.value1;
    var pic = dialogInputPush.value2;
    if(pic != "unchanged"){
        pic = "<hr> <img style='width:100%' src='" + pic + "'>";
    }
    else{
        pic = "";
    }
    var obj = {};
    obj.body= message + pic;
    var deliverydate = new Date().getTime().toString();
    activityIndicator.setText("Delivering message...");
    activityIndicator.show();
    var postdate = new Date().getTime().toString();
    var notID = hex_md5(currProvider + ":" + userID + ":" + postdate);
     
     obj.userID= currPushLoc + currProvider;
     obj.sender= userID;
     obj.loc= currPushLoc;
     obj.loctext= Locationtext;
     obj.date= deliverydate;
     obj.postdate= postdate;
     obj.notID= notID;
     obj.message= "Quick message from " + username;
     //if(currtokenDict){
     //obj.token = currtokenDict.toString();
     //}
     obj.archived="false";
     obj.read="false";
     obj.star="false";
     obj.pushed="false";
     obj.topro ="true";
     //obj.locImage = LocImage;
     obj.sendName = username;
     obj.sendNameImage = userimage;
     var fd = new FormData();
     fd.append('obj', JSON.stringify(obj));
     var xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function() {
     if (xhr.readyState != 4) { return; }
      alertHandler.flashNewMessage("Message Sent", "Message is placed in " + currProvider + "'s inbox");
     activityIndicator.hide();
     };
     xhr.open("POST", "/postNotification", true);
     xhr.send(fd);
} 
