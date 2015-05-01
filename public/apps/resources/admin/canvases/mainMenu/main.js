function addButtonClicked()
{
	    if(Canvas.current === "caresadmin-afterER"){
			addNewAfterER();
	    }
	    else if(Canvas.current === "caresadmin-healthInfo"){
			addNewHealthInfo();
		}
	    else if(Canvas.current === "caresadmin-notifications"){
			addNewNotifications();
		}
	    else if(Canvas.current === "caresadmin-reminders"){
			addNewReminders();
		}
	    else if(Canvas.current === "caresadmin-manageProviders"){
			addNewProvider();
		}
}

function mainMenuinit()
{      
  	getElementObject("addButtonBBox").innerHTML = "<a href='javascript:addButtonClicked()' class='addButton'></a>";
 // 	getElementObject("logoutFlairBBox").innerHTML = "<a href='javascript:logoutConfirm()' class='logoutFlair'></a>";
  setTimeout("getElementStyleObject('homeButton').display = 'none'", 3000);
 	activityIndicator.hide(); 
  if(!ENV.screen.smallscreenon){
    setTimeout("mainMenuButtons.__selected('buttonLogin', 'login')", 100);
  }
  /*else{
      getElementObject("helpWrapper").style.display = "none";
  }*/
     getElementObject("helpWrapper").style.display = "none";

	mainMenuButtons.list = App.mainmenubuttons;
  var outS = "";
    //outS = outS + "<div class='horizontalLine'></div>";

    for (i = 0; i < App.mainmenubuttons.length; i++){
        if(App.mainmenubuttons[i] === "buttonmainMenu") continue;
        if(App.canvases[i][2].length > 0){
            outS += "<div class='bgrpname'>" + App.canvases[i][2] + "</div>";
        }
        //outS = outS + "<a tooltip='" + Canvas.tooltips[App.canvases[i]] + "' href='javascript:mainMenuButtons.selected(" + '"' + App.mainmenubuttons[i] + '")' + "'>"
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
        outS = outS + "<div class='chevron hilitecolor'></div>";
        outS = outS + "<div class='tooltip'>" + Canvas.tooltips[App.canvases[i][0]] + "</div>";
        outS = outS + "</div></a>";
	}
  
    outS = outS + "<div class='horizontalLine'></div>";
  getElementObject("mainmenuButtonsWrapper").innerHTML = outS;
  /*
  if(!ENV.device.touchSupport){
    $("#mainmenuButtonsWrapper a .listButton").mouseover(function() {
        this.getElementsByClassName("tooltip")[0].style.display = "block"
        }).mouseout(function() {
            this.getElementsByClassName("tooltip")[0].style.display = ""
    });
  }
  */


  unsavedDataPlugin.initialize();
  alertHandler.initialize();
  helpPlugin.initialize();
/*
  var temp;
  temp = PersistantValue.get("name");
  if(temp == null){
    PersistantValue.set("name", "");
  }
*/
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

function handleAllDealsLoad()
{
  
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
    if(ENV.screen.smallscreenon){
      fadeOut("helpButton");
      fadeOut("helpBox");
      return;
    }
    getElementObject("helpButtonBBox").innerHTML = "<a href='javascript:helpPlugin.show()'> <div id='helpButton' class='helpButton' ></div></a>";
    getElementObject("helpCloseButtonBBox").innerHTML = "<a href='javascript:helpPlugin.hide()'> <div class='helpCloseButton'>&times;</div></a>";
    setTimeout('helpPlugin.hide()', 500);
  },
  show:function(){
    getElementObject("helpText").innerHTML = "";
    fadeOut("helpButton");
    fadeIn("helpBox");
  },
  hide:function(){
    fadeIn("helpButton");
    fadeOut("helpBox");
    getElementObject("helpText").innerHTML = "";
  }
}

var unsavedDataPlugin = {
  initialize: function(){
    getElementObject("unsavedDataCancelBBox").innerHTML = "<a href='javascript:unsavedDataPlugin.cancel()'> <div id='unsavedDataCancel' class='glassFinish unsavedDataCancel'>Cancel</div></a>";
    getElementObject("unsavedDataSaveBBox").innerHTML = "<a href='javascript:unsavedDataPlugin.save()'> <div id='unsavedDataSave' class='glassFinish unsavedDataSave'>Save</div></a>";
  },
  show:function(){
	getElementStyleObject("homeButton").display = "none";
    fadeIn("unsavedDataDiv");
    hideAddButton();
  },
  hide:function(){
    if(ENV.screen.smallscreenon){
		getElementStyleObject("homeButton").display = "block";
    }
    fadeOut("unsavedDataDiv");
    showAddButton();
  },
  save:function(){
    if(Canvas.current === "caresadmin-hospitalInfo"){
      saveHospitalInfo();
    }
    else if(Canvas.current === "caresadmin-appearance"){
      saveAppearanceClicked();
    }
    else if(Canvas.current === "caresadmin-manageProviders"){
      saveProviderClicked();
    }
    else if(Canvas.current === "caresadmin-afterER"){
      saveAfterERClicked();
    }
    else if(Canvas.current === "caresadmin-healthInfo"){
      saveHealthInfoClicked();
    }
    else if(Canvas.current === "caresadmin-notifications"){
      saveNotificationsClicked();
    }
    else if(Canvas.current === "caresadmin-reminders"){
      saveRemindersClicked();
    }
    else if(Canvas.current === "caresadmin-erNavigator"){
      saveERNavClicked();
    }
    else if(Canvas.current === "caresadmin-subdomain"){
      setMenuTitles();
    }
    
    dataEdited = false;
    unsavedDataPlugin.hide();
    //$("html").animate({"scrollTop":"0"}, 200);
    scrollToLastScroll();
       if(!ENV.device.touchSupport){
           $("#canvasWrapper").animate({"scrollTop":currs}, 200);
       }
      setTimeout("selectedStyle.clean();", 500);
  },
  cancel:function(){
    dataEdited = false;
    unsavedDataPlugin.hide();
    if(Canvas.current === "caresadmin-hospitalInfo"){
      getHospitalInfo();
    }
    else if(Canvas.current === "caresadmin-appearance"){
      cancelAppearanceClicked();
    }
    else if(Canvas.current === "caresadmin-manageProviders"){
      getProviderInfoA();
    }
    else if(Canvas.current === "caresadmin-afterER"){
      getAfterERInfoA();
    }
    else if(Canvas.current === "caresadmin-healthInfo"){
      getHealthInfoInfoA();
    }
    else if(Canvas.current === "caresadmin-notifications"){
      getNotificationsInfoA();
    }
    else if(Canvas.current === "caresadmin-reminders"){
      getRemindersInfoA();
    }
    else if(Canvas.current === "caresadmin-erNavigator"){
      getERNavInfoA();
    }
    else if(Canvas.current === "caresadmin-subdomain"){
      subdomainActive2();
    }
    scrollToLastScroll();
      if(!ENV.device.touchSupport){
           $("#canvasWrapper").animate({"scrollTop":currs}, 200);
       }
      setTimeout("selectedStyle.clean();", 500);
  }
}

function scrollToLastScroll()
{
   $("body").animate({"scrollTop":lastScrollPosition}, 200)
   lastScrollPosition = 0;
} 
