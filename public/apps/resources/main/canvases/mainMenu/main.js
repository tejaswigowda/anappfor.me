function backButtonClicked()
{
    if(Canvas.current === "places" || Canvas.current === "appSettings"){
      backtoNavList();
    }
    else if(Canvas.current === "products"){
      backtoHIList();
    }
    else if(Canvas.current === "orders"){
      backtoAERList();
    }
    else if(Canvas.current === "login"){
      backToDiscover();
    }
    else if(Canvas.current === "notifications"){
      backtoNotList();
    }
    else if(Canvas.current === "caresuser-hipaa"){
      backFromHipaa();
    }
    hideBackButton();
    backState = 1;
}

function fbShareA(){
	cordovaOpenLink(shareURL(getShareLink(), "fb", shareTitle))
}
function twShareA(){
	cordovaOpenLink(shareURL(getShareLink(), "tw", shareTitle))
}
function inShareA(){
	cordovaOpenLink(shareURL(getShareLink(), "in", shareTitle))
}
function emShareA(){
	window.open(shareURL(getShareLink(), "em", shareTitle), "_blank");
}
function lkShareA(){
	var temp = "lk" + new Date().getTime().toString();
  dialogMessage.display('Share URL ...<br> <i>Copy link below for sharing.</i> <textarea style="max-height: 55px;margin-right: 0px;margin-top: 10px;" id="'+ temp +'" class="textareasmall" readonly> </textarea>', "images/lk.png", "OK");
	setTimeout("getElementObject('" + temp + "').value = '" + getShareLink() + "';", 200);
}

function mainMenuinit()
{      
  	 document.getElementById("socialShare").innerHTML = 
  	 	 "<a href='javascript:fbShareA()' class='fbShare shareButton' target='_blank'> </a>"+
  	 	 "<a href='javascript:twShareA()' class='twShare shareButton' target='_blank'> </a>"+
  	 	 "<a href='javascript:inShareA()' class='inShare shareButton' target='_blank'> </a>"+
  	 	 "<a href='javascript:emShareA()' class='emShare shareButton' target='_blank'> </a>"+
  	 	 "<a href='javascript:lkShareA()' class='lkShare shareButton' target='_blank'> </a>";
  getElementStyleObject("socialShare").display = "none";
  setTimeout("hideHomeButton()", 2100);

	mainMenuButtons.list = App.mainmenubuttons;
  var outS = "";//'<div id="maincanvasImage" class="maincanvasImage" style="background-image: url(' + + '"></div>';

    for (i = 0; i < App.mainmenubuttons.length; i++){
        if(App.mainmenubuttons[i] === "buttonmainMenu") continue;
        if(App.canvases[i][2].length > 0){
            outS += "<div class='bgrpname'>" + App.canvases[i][2] + "</div>";
        }
        outS = outS + "<a href='javascript:mainMenuButtons.selected(" + '"' + App.mainmenubuttons[i] + '")' + "'>"
        if( App.mainMenuFlair === mainMenuButtons.getTargetCanvas(mainMenuButtons.list[i])){
          outS = outS + '<div class="listButton" ' + 'id="' + App.mainmenubuttons[i] + '">';
        }
        else{
          outS = outS + '<div class="listButton nonMainButton" ' + 'id="' + App.mainmenubuttons[i] + '">';
        }
        
        var y = (i%2).toString();
        outS = outS + '<div class="thumbnail thumbnailB tilt' + y + " " + App.canvases[i][1] + '" id="' + App.mainmenubuttons[i] + 'T"></div>';
        outS = outS + "<p>" + Canvas.btitles[mainMenuButtons.getTargetCanvas(mainMenuButtons.list[i])]  + "</p>";
        outS = outS + "<div class='chevron'></div>";
        outS = outS + "<div class='tooltip'>" + Canvas.tooltips[App.canvases[i][0]] + "</div>";
        outS = outS + "</div></a>";
	}
  
  getElementObject("mainmenuButtonsWrapper").innerHTML = outS;

  alertHandler.initialize();
  navPlugin.initialize();
}

function maincanvasImageClicked()
{
	if(ENV.screen.smallscreenon){ return; }
	Canvas.showOneCanvasOnly(App.mainMenuFlair);
	getElementStyleObject("headerWrapper").display = "none";
	
	for(var i=0; i< App.mainmenubuttons.length; i++){ 
		mainMenuButtons.__removeSelectedStyle(App.mainmenubuttons[i]);			   
	}
	
	getElementObject("appHeaderTitle").innerHTML = "";
}



var data4;
var currentCat;

function hideHomeButton()
{
    getElementStyleObject("homeButton").display = "none";
}

function showHomeButton()
{
    if(App.classSmall.indexOf('-bottom-') >= 0){
        getElementStyleObject("homeButton").display = "block";
    }
}

var assetPath = "";

function handleImageAssets(category)
{
  document.getElementById(category + 'Image').style.backgroundImage = "url(" + assetPath + category + ".png"  + ")";
}

var data0;
function handleRemindersScreen_CB(data)
{
  var t = JSON.parse(data);
  data0 = t;
  document.getElementById('remindersImage').style.backgroundImage = "url(" + t[0].message + ")";
}


function handleCalendarScreen_CB(data)
{
  var t = JSON.parse(data);
  data0 = t;
  document.getElementById('calendarImage').style.backgroundImage = "url(" + t[0].message + ")";
}

function handleScheduleScreen()
{
  var category = "schedule";
  var url = App.mainURL;
  url = url + "getSessionInfo";
  url = url + "?category=" + category;
  var callback = handleScheduleScreen_CB;
  loadFile(url, callback);
}

function handleScheduleScreen_CB(data)
{
  var t = JSON.parse(data);
  data0 = t;
  document.getElementById('scheduleImage').style.backgroundImage = "url(" + t[0].message + ")";
}

function postComment(){
 addComment(messagesPlugin.current, getElementObject("commentText").value, getElementObject("commentName").value, getElementObject("commentEmail").value); 
}

function addComment(guid, comment, name, email)
{
  var date = new Date().toString().substring(0, 15);
  var userID = new Date().getTime();
  var url = "../../../../../";
  url = url + "generateSession";
  url = url + "?userID=" + userID+guid;
  url = url + "&category=" + guid;
  url = url + "&datestamp=" + encodeURIComponent(date);
  url = url + "&message=" + encodeURIComponent(comment);
  url = url + "&name=" + encodeURIComponent(name);
  url = url + "&email=" + encodeURIComponent(email);
  var callback = postComment_CB;
  loadFile(url, callback);
}

function postComment_CB(data)
{
   alertHandler.flashNewMessage('Comment posted!!', "It will appear on the site in a minute");
   getElementObject("commentText").value = "";
   var temp;
   temp = PersistantValue.get("name");
   PersistantValue.set("name", getElementObject("commentName").value);
   PersistantValue.set("name", getElementObject("commentEmail").value);


}

function loadComments(guid)
{
  var url = "../../../../../";
  url = url + "getSessionInfo";
  url = url + "?category=" + guid;
  var callback = loadComment_CB;
  loadFile(url, callback);
}

var data22;
function loadComment_CB(data)
{
  if(data.length < 60){
    getElementObject("messagesPluginCW").innerHTML = "<h6> No Comments Yet </h6>";
    return;
  }
    var el = document.getElementById("messagesPluginCW");
    while( el.hasChildNodes() ){
          el.removeChild(el.lastChild);
    }
  var comments = JSON.parse(data);
  var outS = "";
  for (var i = comments.length - 1; i >=0; i--){
    outS = outS + "<div class='aComment'> <p> " + comments[i].message + "</p> <em>by <b>" + decodeURIComponent(comments[i].name) + "</b> on " + decodeURIComponent(comments[i].datestamp) + "</em> </div>"; 
  }
  
  getElementObject("messagesPluginCW").innerHTML = outS;

  setTimeout("messagesPlugin.scrollRefresh()", 500);

}

function showHelp()
{
  $(".helpBox").show();
  $(".helpButton").hide()
}

function hideHelp()
{
  $(".helpBox").hide();
  $(".helpButton").show()
}

var helpPlugin = {
  initialize: function(){
//    if(ENV.screen.smallscreenon){return}
    getElementObject("helpButtonBBox").innerHTML = "<a href='javascript:helpPlugin.show()'> <div style='display:none' id='helpButton' class='flip0 helpButton' ></div></a>";
    getElementObject("helpCloseButtonBBox").innerHTML = "<a href='javascript:helpPlugin.hide()'> <div class='helpCloseButton'>&times;</div></a>";
    return;
    setTimeout('helpPlugin.hide()', 500);
  },
  show:function(){
    //getElementObject("helpText").innerHTML = "";
    getElementStyleObject("helpButton").display = "none";
    getElementStyleObject("helpBox").display = "block";
  },
  hide:function(){
    getElementStyleObject("helpButton").display = "block";
    getElementStyleObject("helpBox").display = "none";
    //getElementObject("helpText").innerHTML = "";
  }
}

function bsScrollApp()
{
   if(!ENV.device.touchSupport){
	 $("#locList").animate({"scrollTop":currApps.indexOf(currApp)*52}, 200);
	}
}
function bsScrollERNav()
{
   if(!ENV.device.touchSupport){
	 $("#erNavigatorListWrapper").animate({"scrollTop":currERNav*30}, 200);
	}
}

function bsScrollHI()
{
   if(!ENV.device.touchSupport){
	$("#healthInfoListWrapper").animate({"scrollTop":navPlugin.currList.indexOf(selectedStyle.id.split(currHIsf)[1])*30}, 200);
   }
}

function bsScrollAER()
{
   if(!ENV.device.touchSupport){
	   $("#afterERListWrapper").animate({"scrollTop":navPlugin.currList.indexOf(selectedStyle.id.split(currAERsf)[1])*30}, 200);
   }
}

function bsScrollNot()
{
   if(!ENV.device.touchSupport){
	   $("#notificationsListWrapper").animate({"scrollTop":currNotList.indexOf(selectedStyle.id.split(currNotID)[1])*85}, 200);
   }
}



var unsavedDataPlugin = {
  initialize: function(){
    getElementObject("unsavedDataCancelBBox").innerHTML = "<a href='javascript:unsavedDataPlugin.cancel()'> <div id='unsavedDataCancel' class='glassFinish unsavedDataCancel'>Cancel</div></a>";
    getElementObject("unsavedDataSaveBBox").innerHTML = "<a href='javascript:unsavedDataPlugin.save()'> <div id='unsavedDataSave' class='glassFinish unsavedDataSave'>Save</div></a>";
  },
	goBackCanvas: null,
  show:function(){
      hideHomeButton();
    getElementStyleObject("unsavedDataDiv").display = "block";
  },
  hide:function(){
    getElementStyleObject("unsavedDataDiv").display = "none";
    if(ENV.screen.smallscreenon){
        showHomeButton();
	}
  },
  save:function(){
    if(Canvas.current === "login"){
      savePatientInfo();
    }
    else if(Canvas.current === "caresuser-appearance"){
      saveAppearanceClicked();
    }
    else if(Canvas.current === "caresuser-healthRecords"){
      savePatientInfo2();
    }
    else if(Canvas.current === "caresuser-afterER"){
      saveAfterERClicked();
    }
    else if(Canvas.current === "caresuser-healthInfo"){
      saveHealthInfoClicked();
    }
    else if(Canvas.current === "notifications"){
      saveNotificationsClicked();
    }
    else if(Canvas.current === "caresuser-reminders"){
      saveRemindersClicked();
    }
    else if(Canvas.current === "caresuser-erNavigator"){
      saveERNavClicked();
    }
    else if(Canvas.current === "caresuser-status"){
      saveStatus();
    }
    else if(Canvas.current === "caresuser-hipaa"){
      registerNow();
    }
  },
  cancel:function(){
    dataEdited = false;
    unsavedDataPlugin.hide();
    if(Canvas.current === "caresuser-login"){
      loadPatientInfo();
    }
    else if(Canvas.current === "caresuser-appearance"){
      cancelAppearanceClicked();
    }
    else if(Canvas.current === "caresuser-healthRecords"){
      loadPatientInfo2();
    }
    else if(Canvas.current === "caresuser-afterER"){
      getAfterERInfo();
    }
    else if(Canvas.current === "caresuser-healthInfo"){
      getHealthInfoInfo();
    }
    else if(Canvas.current === "caresuser-notifications"){
      getNotificationsInfo();
    }
    else if(Canvas.current === "caresuser-reminders"){
      getRemindersInfo();
    }
    else if(Canvas.current === "caresuser-erNavigator"){
      getERNavInfo();
    }
    else if(Canvas.current === "caresuser-status"){
      cancelStatus();
    }
    else if(Canvas.current === "caresuser-hipaa"){
      backFromHipaa();
    }
  }
}
