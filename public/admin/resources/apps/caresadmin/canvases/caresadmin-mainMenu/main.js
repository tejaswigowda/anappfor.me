var dataEdited = false;

function saveData()
{

  dataEdited = false;
}

function cancelData()
{

  dataEdited = false;
}

function caresadminmainMenuinit()
{      
  if(!ENV.screen.smallscreenon){
    setTimeout("mainMenuButtons.__selected('buttonLogin', 'caresadmin-login')", 100);
  }
  else{
      getElementObject("helpWrapper").style.display = "none";
  }

	mainMenuButtons.list = App.mainmenubuttons;
  var outS = "";
	for (i = 0; i < App.mainmenubuttons.length; i++){
		//FNS.addButtonElementAtag(App.mainmenubuttons[i],"mainMenuButtons.selected('" + App.mainmenubuttons[i] + "')"); 
    outS = outS + "<a href='javascript:mainMenuButtons.selected(" + '"' + App.mainmenubuttons[i] + '")' + "'>"
    if( App.mainMenuFlair === mainMenuButtons.getTargetCanvas(mainMenuButtons.list[i])){
      outS = outS + '<div class="listButton" ' + 'id="' + App.mainmenubuttons[i] + '">';
    }
    else{
      outS = outS + '<div class="listButton nonMainButton" ' + 'id="' + App.mainmenubuttons[i] + '">';
    }
    
    outS = outS + '<div class="thumbnail"></div>';
    outS = outS + "<p>" + Canvas.titles[mainMenuButtons.getTargetCanvas(mainMenuButtons.list[i])]  + "</p>";
    outS = outS + "</div></a>";
	}
  getElementObject("mainmenuButtonsWrapper").innerHTML = outS;

  unsavedDataPlugin.initialize();
  messageHandler.initialize();
  helpPlugin.initialize();
/*
  var temp;
  temp = PersistantValue.get("name");
  if(temp == null){
    PersistantValue.set("name", "");
  }
*/
  $(".nonMainButton").fadeOut();
  
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

var mainMenuButtons = {
	list: [],
	getTargetCanvas:function(currentButton){
		for(var i=0; i < App.canvases.length; i++){
			if(App.canvases[i] === App.maincanvas){continue;}
			if(Canvas.connections[App.canvases[i]] === currentButton){
				//console.log(Canvas.connections[App.canvases[i]] + " : " + currentButton)
				return App.canvases[i];
			}
		}
		return null;
	},
	__addSelectedStyle: function(divID){
		var t = getElementStyleObject(divID);
		t.backgroundColor = "rgb(167,2,64)";
		t.backgroundImage = "url(images/glass.png)";
		t.color = "rgb(228, 233, 221)";
    t.textShadow = "rgb(59, 64, 83) 0px 0px 1px"
	}, 

	__removeSelectedStyle: function(divID){   
		var t = getElementStyleObject(divID);
		t.backgroundColor = ""; 
		t.backgroundImage = ""; 
		t.color = ""; 
		t.textShadow = ""; 
	},  

  __selected:function(buttonClicked, canvasID){
		Canvas.showOneCanvasOnly(canvasID);
				
		if(ENV.screen.smallscreenon){  
			getElementStyleObject("maincanvasWrapper").marginLeft = "-700px";
			getElementStyleObject("homeButton").display = "block";
		}
		else{
			for(i=0; i< App.mainmenubuttons.length; i++){ 
				if(App.mainmenubuttons[i] === buttonClicked){
				   mainMenuButtons.__addSelectedStyle(App.mainmenubuttons[i]);
				}   
				else{ 
					mainMenuButtons.__removeSelectedStyle(App.mainmenubuttons[i]);			   
				}
			}
		}

    App.focusonmainmenu = false;
    getElementStyleObject("collapseAll").display = "none";
		setTimeout('getElementStyleObject("headerWrapper").display = "block"', 300);
  },

	selected: function(buttonClicked){
    if(dataEdited){
      messageHandler.flashNewMessage("Unsaved data!","Please save or chancel changes to continue");
      return;
    }
    unsavedDataPlugin.hide();
    /*
    var el = document.getElementById(currentDealList);
    if(el){
      while( el.hasChildNodes() ){
            el.removeChild(el.lastChild);
      }
    }
    */
		var i;
    console.log(buttonClicked);
    var canvasID = mainMenuButtons.getTargetCanvas(buttonClicked);
    mainMenuButtons.__selected(buttonClicked, canvasID);
	}
}

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
  var url = "../";
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
   messageHandler.flashNewMessage('Comment posted!!', "It will appear on the site in a minute");
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
    getElementObject("unsavedDataCancelBBox").innerHTML = "<a href='javascript:unsavedDataPlugin.cancel()'> <div id='unsavedDataCancel' class='unsavedDataCancel' ></div></a>";
    getElementObject("unsavedDataSaveBBox").innerHTML = "<a href='javascript:unsavedDataPlugin.save()'> <div id = 'unsavedDataSave' class='unsavedDataSave'></div></a>";
  },
  show:function(){
    fadeIn("unsavedDataDiv");
  },
  hide:function(){
    fadeOut("unsavedDataDiv");
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
    dataEdited = false;
    unsavedDataPlugin.hide();
    window.scrollTo(0,1);
  },
  cancel:function(){
    dataEdited = false;
    unsavedDataPlugin.hide();
    window.scrollTo(0,1);
    if(Canvas.current === "caresadmin-hospitalInfo"){
      getHospitalInfo();
    }
    else if(Canvas.current === "caresadmin-appearance"){
      cancelAppearanceClicked();
    }
    else if(Canvas.current === "caresadmin-manageProviders"){
      getProviderInfo();
    }
    else if(Canvas.current === "caresadmin-afterER"){
      getAfterERInfo();
    }
    else if(Canvas.current === "caresadmin-healthInfo"){
      getHealthInfoInfo();
    }
    else if(Canvas.current === "caresadmin-notifications"){
      getNotificationsInfo();
    }
    else if(Canvas.current === "caresadmin-reminders"){
      getRemindersInfo();
    }
    else if(Canvas.current === "caresadmin-erNavigator"){
      getERNavInfo();
    }
  }
}
