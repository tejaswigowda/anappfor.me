var checkforbott = false;
var alertsDispOption = 1;
function alertsAllClicked()
{
	alertsDispOption = 1;
  getElementObject("alertsAll").className = "glassFinish optionsDivLeft redbg";
  getElementObject("alertsRide").className = "glassFinish optionsDivTile";
  getElementObject("alertsWorse").className = "glassFinish optionsDivRight";
}

function alertsRideClicked()
{
	alertsDispOption = 2;
  getElementObject("alertsAll").className = "glassFinish optionsDivLeft";
  getElementObject("alertsRide").className = "glassFinish optionsDivTile redbg";
  getElementObject("alertsWorse").className = "glassFinish optionsDivRight";
}

function alertsWorseClicked()
{
	alertsDispOption = 3;
  getElementObject("alertsAll").className = "glassFinish optionsDivLeft";
  getElementObject("alertsRide").className = "glassFinish optionsDivTile";
  getElementObject("alertsWorse").className = "glassFinish optionsDivRight redbg";
}


function loadMoreMessages(){
	getNotificationsInfo();
}

function checkforNewNots()
{
  var url = App.mainURL;
  url = url + "getLastNotDate";
  url = url + "?userID=" + encodeURIComponent(userID);
  var callback = checkforNewNots_CB;
  loadFile(url, callback);
}

function checkforNewNots_CB(data)
{
	if(data > currNotDate){
		getElementStyleObject("newNotFlair").display = "block";
		  setNotBadge();
	}
	else{
		getElementStyleObject("newNotFlair").display = "none";
	}
}

function notFlairClicked()
{
    mainMenuButtons.selected("buttonNotifications");
}
var notificationsinit = function()
{
	  getElementObject("newNotFlair").innerHTML = "<a href='javascript:notFlairClicked()'> <div class='flip0' id='nfButton'></div></a>";
	getElementObject("loadMoreNot").innerHTML = "<a class='link titleText' style='margin-top: 20px; padding-bottom: 10px;' href='javascript:loadMoreMessages()'> Load more ... </a>";
//	getElementObject("addNotifications").innerHTML = "<a href='javascript:alertsAllClicked()'> <div id='alertsAll' class='glassFinish optionsDivLeft'>All</div></a><a href='javascript:alertsAllClicked()'> </a><a href='javascript:alertsRideClicked()'> <div id='alertsRide' class='glassFinish optionsDivTile'>Flagged</div></a><a href='javascript:alertsWorseClicked()'> <div class='glassFinish optionsDivRight' id='alertsWorse'>Unread</div></a>";
  getElementObject("buttonnotifications").innerHTML = getElementObject("buttonnotifications").innerHTML + '<div class="hilitebg badge" id="notBadge"> </div>';
 	
 getElementObject("notificationsInputBoxOptions").innerHTML = "<a href='javascript:notificationRead()' id='markRead' class='notOptionButton'>Mark as Read</a>"+
"<a href='javascript:notificationUnread()' id='markUnread' class='notOptionButton'>Mark as Unread</a>"+
"<span> | </span>"+
"<a href='javascript:notificationStar()' id='flagFav' class='notOptionButton'>Add Star</a>"+
"<a href='javascript:notificationUnstar()' id='flagUnfav' class='notOptionButton'>Remove Star</a>";
// getElementStyleObject("notificationsInputBoxOptions").display = 'none';
	getElementStyleObject("refreshButtonBBox").display = "none";

  getElementObject("notOptions").innerHTML = "<a href='javascript:notRead()' id='notReadLink' class='notLink'> </a>"+
												"<a href='javascript:notUnread()' id='notUnreadLink' class='notLink'> </a>"+
												"<span> </span>"+
												"<a href='javascript:notFav()' id='notFavLink' class='notLink'> </a>"+
												"<a href='javascript:notUnfav()' id='notUnfavLink' class='notLink'> </a>";
  getElementObject("refreshButtonBBox").innerHTML = "<a href='javascript:notificationRefresh()'> <div class='flip0 refreshButton'></div></a>";
  getElementObject("notificationsDelete").innerHTML = "<a href='javascript:notificationsDeleteClicked()'> <div class='fadeC deleteYesFull'>Delete Message</div></a>";
  getElementObject("notificationsDeleteYes").innerHTML = "<a href='javascript:notificationsDeleteYesClicked()'> <div class='glassFinish deleteYes'>Yes, delete now.</div></a>";
  getElementObject("notificationsDeleteNo").innerHTML = "<a href='javascript:notificationsDeleteNoClicked()'> <div style='margin-top: -40px' class='glassFinish deleteNo'>No, not now.</div></a>";
  setTimeout('notificationsAux()', 1000);
}

var readOption = true;
var starOption = true;

function notificationRead()
{
	readOption = true;
	$("#markRead").hide();
	$("#markUnread").show();
    $('#n' + currNotID + currNotifications).removeClass("notseen").addClass("seen");
	editNotification();
}


function notificationUnread()
{
	readOption = false;
	$("#markRead").show();
	$("#markUnread").hide();
    $('#n' + currNotID + currNotifications).removeClass("seen").addClass("notseen");
	editNotification();
}


function notificationStar()
{
	starOption = true;
	$("#flagFav").hide();
	$("#flagUnfav").show();
	    $('#n' + currNotID + currNotifications).removeClass("nofavorite").addClass("favorite");
	editNotification();
}


function notificationUnstar()
{
	starOption = false;
	$("#flagFav").show();
	$("#flagUnfav").hide();
	    $('#n' + currNotID + currNotifications).removeClass("favorite").addClass("nofavorite");
	editNotification();
}

function editNotification()
{ 
  //activityIndicator.show();
 // var read = getElementObject("isRead").checked;
 // var star = getElementObject("isStar").checked;
  var url = App.mainURL;
  url = url + "editNotification";
  url = url + "?notID=" + currNotifications;
  url = url + "&read=" + readOption.toString();
  url = url + "&star=" + starOption.toString();
  var callback = editNotifications_CB;
  loadFile(url, callback);
}
function editNotifications_CB(data)
{
	return;
  //activityIndicator.hide();
}

function notificationsAux()
{
}
function notificationRefresh()
{
		getElementStyleObject("newNotFlair").display = "none";
  getElementObject("notificationsList").innerHTML = "";
  getNotificationsInfo();
}

function notificationsDeleteClicked()
{
  getElementStyleObject("notificationsDeleteConf").display = "block";
  getElementStyleObject("notificationsDelete").display = "none";
}

function setNotBadge()
{
	getElementStyleObject("notBadge").opacity = "0";
  var url = App.mainURL;
  url = url + "getNotificationCount";
  url = url + "?userID=" + encodeURIComponent(userID);
  var callback = setNotBadge_CB;
  loadFile(url, callback);
}

function setNotBadge_CB(data)
{
	var n = parseInt(data);
	if(n.toString() === "NaN"){
		n = 0;
	}
	getElementObject("notBadge").innerHTML = n.toString();
	if(n > 0){
		getElementStyleObject("notBadge").opacity = "1";
	}
	if(ENV.embedded){ 
		handleBadge(n);
	}
}

function handleBadge(n){
	if(App.embedType === "ios"){ 
		apppush.setBadge(n.toString());
		return;
	}
}


function notificationsDeleteYesClicked()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editNotification";
  url = url + "?notID=" + currNotifications;
  url = url + "&archived=true";
  var callback = deleteNotifications_CB;
  loadFile(url, callback);
}

function deleteNotifications_CB(data)
{
    getElementStyleObject('n' + currNotID + currNotifications).display = "none";
 // getNotificationsInfo();
  backButtonClicked();
  activityIndicator.hide();
}

function notificationsDeleteNoClicked()
{
  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "block";
}


function notificationsEC()
{
}

function notificationsActive()
{
	selectedStyle.hion = false;
	getElementStyleObject("noitem").backgroundImage = "url(images/noitem1.png)";
	  getElementStyleObject("notificationsBoxWrapper").display = "none";
	getElementStyleObject("noitem").display = "block";	
		getElementStyleObject("newNotFlair").display = "none";
  	getElementObject("helpText").innerHTML = "<p class='helpM1'>Check private messages sent to you from your CARE<i>team</i>s. </p><p class='helpM2'>Install CARES<i>app</i>.me on your iOS/Android device to get push notifications.</p>";
  locAllStyle();
  lastScrollPosition = 0;
  getElementObject("notificationsList").innerHTML = "";
  getNotificationsInfo();
  cleanNotBrand();
  activityIndicator.hide();
}

function getNotificationsInfo()
{
  //getElementStyleObject("notificationsBoxWrapper").display = "none";
  getElementStyleObject("notificationsListWrapper").display = "block";
    activityIndicator.setText("Loading messages...");
  getElementObject("loadMoreNot").getElementsByTagName('a')[0].innerHTML = "<h6 class='ac'> </h6>";

 // activityIndicator.show();
  var url = App.mainURL;
  url = url + "getUserNotifications";
  url = url + "?userID=" + userID;
  url = url + "&skip=" + $("#notificationsList .listItem").length.toString();
	  if($("#notificationsList .listItem").length == 0){
		currNotList = [];
		  currNotDate = new Date().getTime().toString();
		  currNotID = new Date().getTime().toString();
            selnotsmp = true;
	  }
  url = url + "&currdate=" + currNotDate;

	getElementStyleObject("refreshButtonBBox").display = "block";
  var callback = getNotificationsInfo_CB;
  loadFile(url, callback);
}

function cleanNotBrand()
{
   var brandID = "notBrand";
   var  brandTextID = "notBrandText";
   getElementStyleObject(brandID).backgroundImage = "";
   getElementStyleObject(brandTextID).color = '';
	getElementObject(brandTextID).innerHTML = '';
}

var data63;
var currNotID = new Date().getTime().toString();
var currNotDate = new Date().getTime().toString();
var currNotList = [];


function getNotificationsInfo_CB(data)
{
  activityIndicator.hide();
  getElementObject("loadMoreNot").getElementsByTagName('a')[0].innerHTML = "Load more...";
  getElementObject("notStatus").innerHTML = "";
  data63 = data;
  if(data === ""){
    return;
  }
  var pInfo = JSON.parse(data);
  if(pInfo.length == 0){
	  if($("#notificationsList .listItem").length == 0){
	    getElementObject("notificationsList").innerHTML = "<p class='titleText'>No messages here. Please check back later.</p>";
	  }
	getElementStyleObject("loadMoreNot").display = "none";
    checkforbott = false;
    return;
  }
  if(pInfo.length < 20){
	getElementStyleObject("loadMoreNot").display = "none";
    checkforbott = false;
  	//getElementObject("notStatus").innerHTML = "Your archived messages are saved securely. Only the latest 200 messages are displayed here.";
  }
  else{
	getElementStyleObject("loadMoreNot").display = "block";
    checkforbott = true;
  }
  var pKeys;
  var name = "<i>No Subject</i>";
  var city = "";
  var proName = "";
  var date = "";
  var outS = "";
  var classSt = "listItem arrowFinish";
  var count = 0;
  for(var i = 0; i<pInfo.length; i++){
	  if(currNotList.indexOf(pInfo[i].notID) >= 0){
		 continue;
	  }
	classSt = "listItem arrowFinish";
  name = "<i>No Subject</i>";
  city = "";
  proName = "";
  date = "";
    pKeys = Object.keys(pInfo[i]);
    if(pKeys.contains("sendName") >=0){
      proName = pInfo[i].sendName + ", ";
    }
    if(pKeys.contains("message") >=0){
      name = pInfo[i].message;
    }
    if(pKeys.contains("loctext") >=0){
      city = pInfo[i].loctext;
    }
    if(pKeys.contains("date") >=0){
      date = moment(parseInt(pInfo[i].date)).fromNow();
    }
    if(pKeys.contains("star") >=0){
      if(pInfo[i].star === "true"){
        classSt = classSt + " favorite";
      }
	  else{
        classSt = classSt + " nofavorite";
	  }
    }
	else{
        classSt = classSt + " nofavorite";
	}
    if(pKeys.contains("read") >=0){
      if(pInfo[i].read === "true"){
        classSt = classSt + " seen";
      }
	  else{
        classSt = classSt + " notseen";
        count++;
	  }
    }
	else{
		classSt = classSt + " notseen";
        count++;
	}
    outS = outS + "<a id='n" + currNotID + pInfo[i].notID  +"' class='" + classSt+ "' href='javascript:notificationsSelected(" + '"' + pInfo[i].notID + '")' + "'> <div class='notPic' style=" + '"' + "background-image: url(" + App.resURL + pInfo[i].loc + "icon.png)" +'"' + "> </div> <div class='new msgbadge'></div><div class='star msgbadge'></div><div class='staralt msgbadge'></div><div class='newalt msgbadge'></div><div class='line1'>" + name + "</div><div class='line2'>" + proName +  city +  "<br>" + date + ".</div></a>";
	//if(i==0){console.log(outS);}
	currNotList[currNotList.length] = pInfo[i].notID;
  }
  navPlugin.currList = currNotList;
  //navPlugin.currID = null;
  getElementObject("notificationsList").innerHTML += outS;
  $("#" + Canvas.current + " .ListWrapper").fadeOut(0).fadeIn(0);
  navPlugin.refreshDisplay();
  if(!ENV.device.touchSupport && selnotsmp){
    selnotsmp = false;
    notificationsSelected(currNotList[0]);
  }
notificationsInfoCB2();
    checkforbott = true;
//setNotBadge_CB(count.toString());
}

var selnotsmp = false;

function notificationsInfoCB2()
{

  	$("html").animate({"scrollTop":lastScrollPosition}, 200)
  	lastScrollPosition = 0;
 // scrollRefresh("caresuser-notifications", flag);

}

var isNewNotifications = false;
function addNewNotifications(pID)
{
  isNewNotifications = true;
  getElementObject("notificationsText").innerHTML = "Adding New Notification";
  getElementStyleObject("notificationsBoxWrapper").display = "block";
  getElementStyleObject("notificationsListWrapper").display = "none";

  getElementObject("notificationsNameEn").value = "";
  getElementObject("notificationsNameEs").value = "";

  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "none";
}

function notificationsSelected(pID)
{
	getElementStyleObject("notBrand").opacity = "0";	
  selectedStyle.clean();
  navPlugin.show();
	getElementStyleObject("noitem").display = "none";	
    activityIndicator.setText("Loading message...");
  activityIndicator.show();
   if(ENV.device.touchSupport){
	getElementStyleObject("refreshButtonBBox").display = "none";
	  setTimeout('getElementStyleObject("notificationsListWrapper").display = "none"', 200);
   }
   //else{
   //}
	if(navPlugin.smp){
	    navPlugin.smp = false;
	}
	else{
		lastScrollPosition = getDocumentScroll();
	}
  scrollRefreshAll();
  showBackButton();
  if(ENV.device.touchSupport){
	  	$("#" + Canvas.current + " .searchInput").fadeOut(0);
  }
  currNotifications = pID;
  navPlugin.currID = pID;
  navPlugin.show();
  isNewNotifications = false;
  getElementStyleObject("notificationsBoxWrapper").display = "block";

  getElementStyleObject("notificationsDeleteConf").display = "none";
  getElementStyleObject("notificationsDelete").display = "block";
 // getElementObject("isRead").checked = true;
  var url = App.mainURL;
  url = url + "getNotification";
  url = url + "?notID=" + pID;
  url = url + "&userID=" + userID;
  var callback = notificationsSelected_CB;
  loadFile(url, callback);
    selectedStyle.add('n' + currNotID + currNotifications);
}

var data78;
function notificationsSelected_CB(data)
{
  data78 = data;
  checkforbott = false;
  var pInfo = JSON.parse(data);
  var pKeys = Object.keys(pInfo);
  var temp;
  var outS = "";

  temp = "star";
  if(pKeys.contains(temp) >=0){
     if(pInfo[temp] === "true"){
     	 starOption = true;
     	 $("#flagFav").hide();
     	 $("#flagUnfav").show();
     }
     else{
     	 starOption = false;
     	 $("#flagFav").show();
     	 $("#flagUnfav").hide();
     }
  }
  else{
	starOption = false;
	$("#flagFav").show();
	$("#flagUnfav").hide();
  }
  /*temp = "read";
  if(pKeys.contains(temp) >=0){
     if(pInfo[temp] === "true"){
		readOption = true;
		$("#markRead").hide();
		$("#markUnread").show();
     }
     else{
		readOption = false;
		$("#markRead").show();
		$("#markUnread").hide();
     }
  }
  else{*/
    $('#n' + currNotID + currNotifications).removeClass("notseen").addClass("seen");
	readOption = true;
	$("#markRead").hide();
	$("#markUnread").show();
  //}
  var bodyT = "<i> This messsage contains no body </i>";
    if(pKeys.contains("body") >=0){
      bodyT = pInfo.body;
    }
  temp = "date";
  var dateSt = "";
  if(pKeys.contains(temp) >=0){
    dateSt = moment(parseInt(pInfo[temp])).format("dddd, MMMM Do YYYY, h:mm a");
  }
  temp = "message";
  if(pKeys.contains(temp) >=0){
    var not = pInfo[temp];
  }
    var outS = "";
    outS = "<div class='notTitle'>" + not + "</div><div style='margin-top: 10px; margin-bottom:10px'>" + bodyT + "</div>";
    outS = outS + "<em>" + dateSt + "</em>";// <div class='horizontalLine'> </div>";
    getElementObject("theNotText").innerHTML = outS;

  getElementObject("theNotProText").innerHTML = "";
  temp = "loc";
  if(pKeys.contains(temp) >=0){
    applyLocationStyleAux(pInfo[temp]);
	var url = App.mainURL;
	url = url + "getPro";
	url = url + "?loc=" + pInfo.loc;
	url = url + "&userID=" + pInfo.sender;
    loadFile(url, proCard_CB);
  }
  else{
    locAllStyle();
  }
  setTimeout('handleEmbeddedLinks("theNotText")',200);
  setTimeout('handleImageLinks("theNotText")',200);
  scrollRefreshAll();
  activityIndicator.hide();
}

function proCard_CB(data1){
        var pInfo1 = JSON.parse(data1);
        proDict = [ pInfo1 ];
    if(patLocs.indexOf(pInfo1.loc) >= 0){
        pushSmp = true; 
    }
    else{
        pushSmp = false; 
    }
    checkinloc = pInfo1.loc
    currApp = pInfo1.loc
        getElementObject("theNotProText").innerHTML = getProCard(pInfo1, "0");
    setTimeout('handleEmbeddedLinks("theNotProText .sm")',200);
}

var currNotifications;

function saveNotificationsClicked()
{
  if(isNewNotifications){
    addNotifications();
  }
  else{
    saveNotificationsInfo();
  }
}

function addNotifications()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "addRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + Location + "HI" + new Date().getTime();
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("notificationsNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("notificationsNameEs").value);
  var callback = function(){getNotificationsInfo()}
  loadFile(url, callback);
}

function saveNotificationsInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editRow";
  url = url + "?category=CannedNotifications";
  url = url + "&loc=" + Location;
  url = url + "&rowID=" + encodeURIComponent(currNotifications);
  url = url + "&nameEn=" + encodeURIComponent(getElementObject("notificationsNameEn").value);
  url = url + "&nameEs=" + encodeURIComponent(getElementObject("notificationsNameEs").value);
  var callback = function(){getNotificationsInfo()}
  loadFile(url, callback);
}

function notificationsDeActive()
{
    checkforbott = false;
    proDict = [];
    activityIndicator.hide();
	selectedStyle.hion = true;
  navPlugin.hide();
  getElementObject("notBrand").innerHTML = "";
  getElementStyleObject("notBrandText").backgroundImage = "none";
	getElementStyleObject("refreshButtonBBox").display = "none";
  getElementStyleObject("backButton").display = "none";
	getElementStyleObject("noitem").display = "none";	
	getElementStyleObject("noitem").backgroundImage = "";
}

function backtoNotList()
{
  navPlugin.hide();
  $("#" + Canvas.current + " .searchInput").fadeIn(0);
  getElementStyleObject("notificationsListWrapper").display = "block";
  getElementStyleObject("refreshButtonBBox").display = "block";
  getElementObject("notBrand").innerHTML = "";
  
  setTimeout('getElementStyleObject("notificationsBoxWrapper").display = "none";getElementStyleObject("notBrandText").backgroundImage = "none";getElementObject("theNotText").innerHTML = "";locAllStyle();', 200);
  
  
  //getNotificationsInfo();
  $(".notLink").hide();
    setTimeout('selectedStyle.clean()', 800);
  setNotBadge();

}
