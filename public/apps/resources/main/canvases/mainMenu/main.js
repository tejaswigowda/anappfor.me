function backButtonClicked()
{
    if(Canvas.current === "places" || Canvas.current === "appSettings"){
      backtoNavList();
    }
    else if(Canvas.current === "login"){
      backToDiscover();
    }
    else if(Canvas.current === "notifications"){
      backtoNotList();
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
      saveUserInfo();
    }
  },
  cancel:function(){
    dataEdited = false;
    unsavedDataPlugin.hide();
    if(Canvas.current === "login"){
      loadPatientInfo();
    }
  }
}
