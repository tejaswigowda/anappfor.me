var App = {
	version: null,
	name: null,
	appID: null, 
	canvases: null,
	overlays: null,  
	location: null,
	maincanvas: null,
	mainMenuOverlayAllowed: null,
	mainMenuOverlayed: null,
	iPhoneMode:null,
	mainMenuFlair: null, 
	focusonmainmenu: true,
}

var PV = {};

function scrollRefreshAll(){
  window.scrollTo(0,1);
  return;
   var tempb = Object.keys(scrolls);
   for(var a=0; a<tempb.length; a++){
     scrollRefresh(tempb[a], true);
   }
}

function scrollRefresh(divID, flag)
{
 if(flag){
  window.scrollTo(0,1);
 }
  return;
   if(ENV.device.touchSupport){
     console.log(divID);
     scrolls[divID].refresh();
     if(flag){
        scrolls[divID].scrollTo(0,0,0);
      }
   }
   else{
      scrolls[divID].reinitialise(0);
      if(flag){
          scrolls[divID].scrollTo(0,0,true);
      }
   }
}

var Canvas = {
	list : null,
	ready : null,
	skeletons : null,
	mainMenuFocus: null,
	connections: null,
	transitions: null,
	titles: null,
	current: null,
	transitionduration : 500,
	showOneCanvasOnly: function(theCanvas){
    if(Canvas.current!=null){
      setTimeout(Canvas.current.split("-")[1] + "DeActive()", 100);
    }
    Canvas.current = theCanvas;
    if(Canvas.current!=null){
      setTimeout(Canvas.current.split("-")[1] + "Active()", 100);
    }
		if(theCanvas!=null){getElementObject("appHeaderTitle").innerHTML = Canvas.titles[theCanvas];}
		for(var i=0; i < App.canvases.length; i++){
			if(App.canvases[i] === App.maincanvas){
         scrollRefresh(App.maincanvas, true);
         continue;
      }

			if(App.canvases[i] === theCanvas){
				Canvas.doTransition("in", App.canvases[i]);
				scrollRefresh(App.canvases[i], true);
			}
			else{
				Canvas.doTransition("out", App.canvases[i]);
			}
			
		}
	},
	doTransition: function(inout, theCanvas){
		var type = Canvas.transitions[theCanvas];
		if(inout === "in"){
				getElementStyleObject(theCanvas).display = "block";	
		        setTimeout('getElementStyleObject("' + theCanvas + '").opacity = "1"', 50);
		}
		else{
			if(type === "slide-out-right"){
				getElementStyleObject(theCanvas).opacity = "0";
		        setTimeout('getElementStyleObject("' + theCanvas + '").display = "none"', Canvas.transitionduration);
			}
		}
	}
}

var ENV = {
	/* identify if any of the popular devices*/
 	device : {
		iOS : false,
		android : false,
		iPad : false,
		touchSupport: true 
	},      
	
	screen: {
		orientation:null,
		smallscreenon: null,
		height:null,
		width: null
	},
	
	/* for responsive parts */
	
	zoom: 100,        
	
	setup: function(){
		var agent = navigator.userAgent.toLowerCase();

		if( agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1) {
			ENV.device.iOS = true;
			ENV.device.android = false;
			ENV.device.iPad = false;
			ENV.device.touchSupport = true;
		}

		else if( agent.indexOf('ipad') != -1) {
			ENV.device.iOS = false;
			ENV.device.android = true;
			ENV.device.iPad = true;
			ENV.device.touchSupport = true;
		}

		else if( agent.indexOf('android') != -1) {
			ENV.device.iOS = false;
			ENV.device.android = true;
			ENV.device.iPad = false;
			ENV.device.touchSupport = true;
		}  
    else{
			ENV.device.iOS = false;
			ENV.device.android = false;
			ENV.device.iPad = false;
			ENV.device.touchSupport = false;
    }
		
		
		
		ENV.screen.height = window.innerHeight;
		ENV.screen.width = window.innerWidth;
		var realHeight;
		var realWidth;

		var aspectRatio = ENV.screen.width / ENV.screen.height;


		if (aspectRatio > 1){
			ENV.screen.orientation = "landscape";
		}
		else{
			ENV.screen.orientation = "portrait";
		} 

		if(ENV.device.touchSupport){
      if (ENV.screen.width < 640 || ENV.screen.height < 480){
        ENV.screen.smallscreenon = true;
      }
      else{
        ENV.screen.smallscreenon = false;
      }
    }
    else{
      ENV.screen.smallscreenon = false;
    } 
	}
}    

var assets = {
	getImageSrc: function(handle, size){
		return App.location + "resources/apps/" + App.appID + "/assets/img/" + size + "/" + handle + ".png";
	}
}

var dateChanged = null;
var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];

var data7;

var specialCanvas = {
	slideShow: {
		id: "spCanvasslideShow",
		wrapper: "spCanvasslideShowScrollWrapper"
	}
}

var Gallery = {
	create: function(canvasID, data){
		var galleries = CSVToArray(data, ":");
		var Parent = getElementObject(canvasID+"ScrollWrapper");
		
		for (var i=0; i < galleries.length; i++){
			data7 = galleries;
			var temp = galleries[i];
			var title = temp[0];
			var desc = temp[1];
			var piclist = temp[2].split(",");
			var NewNode = document.createElement("div");
			NewNode.id = canvasID+"GalleryItem";
			NewNode.className = "galleryItem"; 
				
			var innerhtml = "<div class='thumbnailWrapper'> ";
			
			var temp1;
			
			for(var j=0; j < 3; j++){
				temp1 = tokenize(piclist[j]);
				
				innerhtml = innerhtml + "<img src='" + assets.getImageSrc(temp1, "thumbnail") + "' class='thumbnail thumbnail" + j.toString() + "'>";
				
		 
			}
			innerhtml = innerhtml + "</div> <div class='titleWrapper'> <p>" + title + "</p> <em>" + desc + "</em> <div>" 
			
			NewNode.innerHTML = innerhtml;
			
			Parent.appendChild(NewNode);				
		}
	}
	
}

var Services = {
	hide: function(){
		fadeOut("servicesWrapper");
	},
	
	show: function(){
		fadeIn("servicesWrapper");
	}
}
var SlideShow = {
	list: [],
	busy: false,
	beingCreated: false,
	active: false,
	canvasIDname: "spCanvasslideShow",
	currImageList: null,
	
	hide: function(){
		fadeOut("spCanvasslideShow");
	},
	
	show: function(){
		fadeIn("spCanvasslideShow");
	},
	
	create: function(imagelist){
		if(imagelist == null){return}
		
		SlideShow.active = true;
		SlideShow.busy = true;
		SlideShow.beingCreated = true;
		getElementStyleObject("splashScreenSW").opacity = "1";
		getElementStyleObject("splashScreenSW").display = "block";
		
		SlideShow.currImageList = imagelist;
		var canvasID = SlideShow.canvasIDname;
		if(scrolls[canvasID]!=null){
			scrolls[canvasID].destroy();
			scrolls[canvasID] = null;
		}
		
		//scrolls[canvasID] = new iScroll(canvasID, {wheelAction:"none", bounce: true, snapThreshold: 1, snap: 'div',	momentum: false,hScrollbar: false,vScrollbar: false, vScroll:false });
	scrolls[canvasID] = new iScroll(canvasID, {wheelAction:"none", bounce: true, snapThreshold: 1, snap: 'div',	momentum: false,hScrollbar: false,vScrollbar: false, vScroll:false/*, onScrollEnd: SlideShow.doneScroll */});
	
	
		var funcargs = imagelist;
		var Parent = getElementObject(canvasID+"ScrollWrapper");
		Parent.innerHTML = "";
		
		var width = getElementObject(canvasID).offsetWidth;
		var height = getElementObject(canvasID).offsetHeight;
		
		Parent.style.height = height + "px";
		Parent.style.width = width*funcargs.length + "px";
		
		for (var i=0; i < funcargs.length; i++){
			var NewNode = document.createElement("div");
			NewNode.id = tokenize(funcargs[i])+"imageWrapper";
			NewNode.className = "imageWrapper"; 
			NewNode.innerHTML = "<img src='" + assets.getImageSrc(tokenize(funcargs[i]), "slideshow") + "' class='image'> <span class='dontStealDiv'> </span> <p>" + assetCaptions[tokenize(funcargs[i])] + "   </p><em>" +  (i+1).toString() + " / " + funcargs.length.toString() + "</em>"
		 
			NewNode.style.width = width;
			NewNode.style.height = height;
			
			Parent.appendChild(NewNode);
			
		}
		setTimeout("SlideShow.resize()", 100);
	},
	
	resize: function(){
		SlideShow.busy = true;
		getElementStyleObject("splashScreenSW").opacity = "1";
		getElementStyleObject("splashScreenSW").display = "block";

		fadeIn("servicesWrapper");
		fadeIn("spCanvasslideShow");
		
		var imagelist = SlideShow.currImageList;
		var canvasID = SlideShow.canvasIDname;
		
		var Parent = getElementStyleObject(canvasID+"ScrollWrapper");
		var width = getElementObject(canvasID).offsetWidth;
		var height = getElementObject(canvasID).offsetHeight;

		$(".imageWrapper").css("height", height-0 + "px");
		$(".imageWrapper").css("width", width + "px");
		
		var t = height-120;
		if(t>500)t = 500;
		
		var r = (height-t-100)/2;
		
		$(".imageWrapper .image").css("height", t + "px");
		$(".imageWrapper .image").css("margin-top", r + "px");
		
		Parent.height = height + "px";
		Parent.width = width*imagelist.length + "px";
		
		var x = 200;		
		if(SlideShow.beingCreated){
			x = x + SlideShow.currImageList.length * 25;
		}
		setTimeout("SlideShow.__resize()",x);
	},
	
	__resize: function(){		
		var theScroll = scrolls[SlideShow.canvasIDname];
		theScroll.refresh();
		theScroll.scrollToPage(theScroll.currPageX, 0, 0);

		if(SlideShow.beingCreated){
			SlideShow.beingCreated = false;
			setTimeout('fadeOut("splashScreenSW"); SlideShow.busy = false;', 100);
		}
		else{
			setTimeout('getElementStyleObject("splashScreenSW").display = "none"; SlideShow.busy = false;', 100);
		}
		wheelMoveSmp = false;
	}
	
}

var scrolls = {};
var scrollIDs = [];

var debug = {  
	list: "",
	log: {
		add: function(log){
			 debug.list = debug.list + "\n" + log;
		}
	}     
}         
  
function getiScrollStateSpec()
{
	var retS = "";
	for(var i = 0; i < scrollIDs.length; i++){
		retS = retS + getElementStyleObject(scrollIDs[i] + "ScrollWrapper").webkitTransform; 
	}
	return retS;
}

var assetsIDs = [];
var assetCaptions = {};
var assetTypes = {};

var galleryCategories = [];
var galleryPictures = {}
var galleryTitles = {}


function readAssetsList()
{
	loadFile( "./resources/apps/" + App.appID + "/assets/assets.txt",readAssetsList_Aux);	
}

var data13;

function readAssetsList_Aux(data)
{
	data13 = data;
  if (data === "none"){return}
	 var rows = CSVToArray(data,":");
	 for (var i=0; i < rows.length; i++){
		 var tokens = rows[i];
		 if (tokens.length < 4){
			 continue;
		 }
		 
		 var id = tokenize(tokens[1]);
		 assetsIDs[assetsIDs.length] = id;
		 assetTypes[id] = tokenize(tokens[3]);
		 assetCaptions[id] = tokenize(tokens[3]);
		 var catgs = tokens[2].split(",");
		 for(var j=0; j<catgs.length; j++){
			 var temp = tokenize(catgs[j]);
			 if(galleryCategories.indexOf(temp) < 0){
				 galleryCategories[galleryCategories.length] = temp;
				 galleryPictures[temp] = [];			 	
			 }
			 galleryPictures[temp][galleryPictures[temp].length] = id;
		 }		 
	 }
}



function setupEnvironment(){
	ENV.setup(); 
	var mainCW = getElementStyleObject("maincanvasWrapper");
	var canvasW = getElementStyleObject("canvasWrapper");
	var servicesW = getElementStyleObject("servicesWrapper");

	mainCW.height = ENV.screen.height;
	canvasW.height = ENV.screen.height;
	servicesW.height = ENV.screen.height;  
	
	if(ENV.screen.smallscreenon){
		if(App.focusonmainmenu){
			getElementStyleObject("maincanvasWrapper").marginLeft = "0px";
			getElementStyleObject("maincanvasWrapper").width = ENV.screen.width;
		}
		else{
			getElementStyleObject("maincanvasWrapper").marginLeft = "-1200px";
		}
	}
	else{
		handleScreenForOverlay();	
	}
	
	for (i = 0; i < App.canvases.length; i++){
		getElementStyleObject(App.canvases[i]).height = ENV.screen.height + "px";
	}
	
	getElementStyleObject(App.maincanvas).height = ENV.screen.height - 100 + "px";
}         
          
function motherofall()
{
	appLoad();

}

function appLoad()
{
	//App.appID = removeLeadingHash(window.location.hash);  
	App.appID = "caresadmin";
	getElementStyleObject("splashScreen").backgroundImage = 'url(resources/apps/' + App.appID + "/icon.png)";
  messagesPlugin.initialize();

	if(!ENV.device.touchSupport){
		$('#spCanvasslideShow').mouseover(function(){
			getElementStyleObject("slideShowNext").display = "block";
			getElementStyleObject("slideShowPrev").display = "block";
		});

		$('#spCanvasslideShow').mouseout(function(){
			getElementStyleObject("slideShowNext").display = "none";
			getElementStyleObject("slideShowPrev").display = "none";
		});
		
		
		$('#slideShowNext').mouseover(function(){
			getElementStyleObject("slideShowNext").display = "block";
			//getElementStyleObject("slideShowPrev").display = "block";
		});

		$('#slideShowNext').mouseout(function(){
			getElementStyleObject("slideShowNext").display = "none";
			//getElementStyleObject("slideShowPrev").display = "none";
		});
		
		$('#slideShowPrev').mouseover(function(){
			//getElementStyleObject("slideShowNext").display = "block";
			getElementStyleObject("slideShowPrev").display = "block";
		});

		$('#slideShowPrev').mouseout(function(){
			//getElementStyleObject("slideShowNext").display = "none";
			getElementStyleObject("slideShowPrev").display = "none";
		});
		
	}
	
	  readAssetsList();
   	readAppManifest();
}

function readAppManifest()
{
	loadFile('resources/apps/' + App.appID + "/appManifest.json",readAppManifest_Aux);
}

var data7;

function readAppManifest_Aux(data)
{
	data7 = data;
	var i;
	var temp;
	var readData = JSON.parse(data); 
	App.appID = readData.appID;
	App.name = readData.name;
	App.version = readData.version;
	App.location = readData.location;
	App.canvases = readData.canvases;
	App.overlays = readData.overlays;  
	App.maincanvas = readData.maincanvas;   
	App.mainMenuOverlayAllowed = Boolean(readData.mainMenuOverlayAllowed);
	App.plugins = readData.plugins; 
	App.mainmenubuttons = readData.mainmenubuttons; 
	App.header = readData.header; 
	App.mainMenuFlair = readData.mainMenuFlair;
  App.scrolls = readData.scrolls;
  
	loadJSfile("resources/apps/" + App.appID + "/main.js");  
	loadLessfile("resources/apps/" + App.appID + "/main.less", false);  
	
	
	buildHeader();
	 
	Canvas.list = readData.canvases;  
	Canvas.mainMenuFocus = true;  
	                                    
	
	
	if(PersistantValue.check(App.appID + "App.mainMenuOverlayed")){
		App.mainMenuOverlayed = Boolean(PersistantValue.get(App.appID + "App.mainMenuOverlayed"));
	}
	else{
		App.mainMenuOverlayed = true;
		PersistantValue.set(App.appID + "App.mainMenuOverlayed", "true");
	} 
 
	 //Load plugins	   
	temp = App.plugins;
	for(i = 0; i < temp.length; i++){
		loadPlugin(temp[i]);
	}    
	
	// Load canvas file  
	
	loadFile('resources/apps/' + App.appID + "/canvases.json",loadCanvasSkeleton);
	
	
	
	
	
}

function loadPlugin()
{
	  // for sharer/slideshow etc.
	return;
}

var data3;

function loadCanvasSkeleton(data)
{
	data3 = data;
	var readData = JSON.parse(removeCarriageReturns(data));
	
	Canvas.titles = readData.titles;  
	Canvas.skeletons = readData.skeletons;
	Canvas.connections = readData.connections;  
	Canvas.transitions = readData.transitions;  
	
	var Parent; 
	var cn;
	var i;
	for (i = 0; i < App.canvases.length; i++){
		if(App.canvases[i] === App.maincanvas){
			Parent = getElementObject("maincanvasWrapper");
			cn = "maincanvas fullScreen";
		}
		else{
			Parent = getElementObject("canvasWrapper");
			cn = "canvas fullScreen";			
		}
		
		var NewNode = document.createElement("div");
		NewNode.id = App.canvases[i];
		NewNode.className = cn;  
		Parent.appendChild(NewNode);
		
		Parent = NewNode;
		NewNode = document.createElement("div");
		NewNode.id = App.canvases[i] + "ScrollWrapper";
		NewNode.className = "fullScreenWrapper";  
		Parent.appendChild(NewNode);
						
	}
	
	setupEnvironment();

	for (i = 0; i < App.canvases.length; i++){
		buildCanvas(App.canvases[i]);
	}
	
  /*if(ENV.device.touchSupport){
    window.onorientationchange=updateOrientation;
    if(ENV.screen.smallscreenon){
      orientationChanged();
    }
  }*/

  var classTemp = "body";
  if(ENV.screen.smallscreenon){
    classTemp = classTemp + " smallScreen";
  }
  else{
    classTemp = classTemp + " bigScreen";
  }

  if(ENV.device.touchSupport){
    classTemp = classTemp + " touchSupport";
  }
  else{
    classTemp = classTemp + " web";
  }
    getElementObject("body").className = classTemp;

	loadCanvasFiles();
	if(ENV.screen.smallscreenon){  
		getElementStyleObject("maincanvasWrapper").width = "100%";
		getElementStyleObject("canvasWrapper").width = "100%";	
		getElementStyleObject("servicesWrapper").width = "100%";	
		getElementStyleObject("appMenuToggle").display = "none"; 
		
		/*if(Canvas.mainMenuFocus){
			getElementStyleObject("homeButton").display = "none"; 
		}   
		else{
			getElementStyleObject("homeButton").display = "block";			
		}*/
		
	} 
	else{  	
		getElementStyleObject("appMenuToggle").display = "block"; 
		getElementStyleObject("homeButton").display = "none"; 
		
		//handleScreenForOverlay();
	}
	
}

function loadCanvasFiles()
{
	for (i = 0; i < App.canvases.length; i++){
		loadJSfile("resources/apps/" + App.appID + "/canvases/" + App.canvases[i] + "/main.js");  
		loadLessfile("resources/apps/" + App.appID + "/canvases/" + App.canvases[i] + "/main.less", false);  
	} 
	less.refresh();
	
	initializeApp();
}                  

function buildHeader()
{   
	var i;
	var temp; 
	var Parent;
	var canvasSk = App.header; 
	
	var pathAlongDOM = new Array(); 
	
	Parent = getElementObject("headerWrapper");
	pathAlongDOM.push(Parent); 
	
	for (i = 0; i < canvasSk.length; i++){
		var temp = canvasSk[i].split("?");
		var cn = temp[2];
		var id = temp[3];
		var tag = temp[1];
		var innerhtml = temp[4];
		var depth = temp[0].length;
		
		if(tag === ""){ tag = "div"; }
		
	   while(pathAlongDOM.length > depth){
			 pathAlongDOM.pop();
		}     
		
		Parent = pathAlongDOM[pathAlongDOM.length-1];                  
		
		var NewNode = document.createElement(tag);
		if(id.length>0){NewNode.id = id;}
		NewNode.className = cn; 
		if(innerhtml.length>0){NewNode.innerHTML = innerhtml;}
		 
		Parent.appendChild(NewNode);   
		
		pathAlongDOM.push(NewNode); 
		 
	}                               
}       

function handleSpecialCanvas(canvasID, canvasSk){
  return;	
}

function buildCanvas(canvasID)
{   
	//console.log(canvasID);
	var i;
	var temp; 
	var Parent;
	var canvasSk = Canvas.skeletons[canvasID];  
	
  /*
  if(ENV.device.touchSupport){
     scrolls[canvasID] = new iScroll(canvasID, {}); 
  }
  else{
     var element = $('#' + canvasID).jScrollPane({"contentWidth":"0px"});
     scrolls[canvasID] = element.data('jsp');
  }

	scrollIDs[scrollIDs.length] = canvasID;
  */
	
	if(canvasSk[0] === "specialCanvas"){  
		handleSpecialCanvas(canvasID, canvasSk);
		return;
	}   
	
	var pathAlongDOM = new Array(); 
	
	Parent = getElementObject(canvasID+"ScrollWrapper");
	pathAlongDOM.push(Parent); 
	
	for (i = 0; i < canvasSk.length; i++){
		var temp = canvasSk[i].split("?");
		var cn = temp[2];
		var id = temp[3];
		var tag = temp[1];
		var innerhtml = temp[4];
		var depth = temp[0].length;
		
		if(tag === ""){ tag = "div"; }
		
	   while(pathAlongDOM.length > depth){
			 pathAlongDOM.pop();
		}     
		
		Parent = pathAlongDOM[pathAlongDOM.length-1];                  
		
		var NewNode = document.createElement(tag);
		if(id.length>0){NewNode.id = id;}
		NewNode.className = cn; 
		if(innerhtml.length>0){NewNode.innerHTML = innerhtml;}
		 
		Parent.appendChild(NewNode);   
		
		pathAlongDOM.push(NewNode); 
		 
	
	}                               
	
	
	
}

function loadOverlays()
{
	
}
         
   

function removeLeadingHash(str)
{
    if(str[0] === "#"){ str = str.substring(1);}
	return str;
}     
 

function removeCarriageReturns(str)
{       
	var retS = "";
	for(var i = 0; i < str.length; i++){
		 if(str[i]!= "\n"){
			retS = retS + str[i]
		}
	}           
	return retS;
}             
           

function toggleMainMenuOverlay()
{   
	getElementObject("loadingTextSW").innerHTML = "resizing ...";         
	getElementStyleObject("splashScreenSW").display = "block";
	getElementStyleObject("splashScreenSW").opacity = "1";
	
	 
	App.mainMenuOverlayed = !App.mainMenuOverlayed;
	handleScreenForOverlay();
  if(SlideShow.active){
    setTimeout('SlideShow.resize()', 1000)
  }
	return;
}

function handleScreenForOverlay(){ 
	var mainCW = getElementStyleObject("maincanvasWrapper");
	var canvasW = getElementStyleObject("canvasWrapper");
	var servicesW = getElementStyleObject("servicesWrapper");

  var mmWidth = 200;
	if(App.mainMenuOverlayed){ 
		getElementStyleObject("maincanvasWrapper").marginLeft = "0px";
		getElementObject("appMenuToggle").className = "menuVisible";
		mainCW.width = mmWidth + "px";
		mainCW.display = "block";
		canvasW.width = (ENV.screen.width - mmWidth).toString() + "px"; 
		servicesW.width = (ENV.screen.width - mmWidth).toString() + "px"; 
		//getElementStyleObject("headerWrapper").width = (ENV.screen.width - mmWidth).toString() + "px";
	}   
	else{
		getElementObject("appMenuToggle").className = "menuHidden";
		mainCW.width = "0px";
		canvasW.width = ENV.screen.width + "px";
		servicesW.width = ENV.screen.width + "px";
		//getElementStyleObject("headerWrapper").width = "100%";			
	}
	
}     
         
function homeButtonClicked()
{
  if(dataEdited){
    messageHandler.flashNewMessage("Unsaved data!","Please save or chancel changes to continue");
    return;
  }
	getElementStyleObject("headerWrapper").display = "none";
	getElementStyleObject("homeButton").display = "none";
	getElementStyleObject("maincanvasWrapper").marginLeft = "0px";
	Canvas.showOneCanvasOnly(null);
	App.focusonmainmenu = true;
  getElementStyleObject("monthYearWrapper").display = "none";
  getElementStyleObject("collapseAll").display = "none";
  getElementStyleObject("maincanvasWrapper").display = "block";
}   


function handleWheelAux(dirc)
{
	scrolls[SlideShow.canvasIDname].scrollToPage(dirc, 0, 500);
	setTimeout('wheelMoveSmp = false', 1000);
}

function handleWheel(delta) {
	//var delta1 = Math.abs(scrolls[SlideShow.canvasIDname].x) % getElementObject("servicesWrapper").offsetWidth;
	if(!wheelMoveSmp){return}
	
	
	if (delta < 0){
		setTimeout("handleWheelAux('next')", 250);
    }
	else{
		setTimeout("handleWheelAux('prev')", 250);
	}
}
 
var wheelMoveSmp = false;

function wheel(event){
	if(wheelMoveSmp){return}
	
	wheelMoveSmp = true;
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDeltaX) {
        delta = event.wheelDeltaX/320; 
    }
    if (delta){
        handleWheel(delta);
	}
	
	return false;
}
 
/* Initialization code. */
if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;



var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;
$(window).resize(function() {
    
	if(ENV.device.touchSupport){return;}
	
	rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
		
	getElementStyleObject("splashScreenSW").opacity = "1";
	getElementStyleObject("splashScreenSW").display = "block";
	getElementObject("loadingTextSW").innerHTML = "resizing ..."
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    }
    else {
      timeout = false;
      //alert('Done resizing');
      activityIndicator.show();
      setupEnvironment();
      if(SlideShow.active){
        setTimeout('SlideShow.resize()', 1000)
      }
		
      scrollRefreshAll();
      activityIndicator.hide();
    }               
}



var data14;

$(document).keydown(function (e) {
	//if(!SlideShow.active){return}
	
     var keyCode = e.keyCode || e.which,
         arrow = {left: 37, up: 38, right: 39, down: 40 };

     switch (keyCode) {
       case arrow.left:
			wheelMoveSmp = false;
			scrolls[SlideShow.canvasIDname].scrollToPage("prev", 0, 500);
       		break;

       case arrow.right:
			wheelMoveSmp = false;
     	 	scrolls[SlideShow.canvasIDname].scrollToPage("next", 0, 500);
       	 	break;
     }
   });

function slideShowPrevClicked()
{
	scrolls[SlideShow.canvasIDname].scrollToPage("prev", 0, 500);
}

function slideShowNextClicked()
{
	scrolls[SlideShow.canvasIDname].scrollToPage("next", 0, 500);
}

function mustExecute(func)
{
	if(typeof(window[func]) === "function"){
		setTimeout(func + '()', 100);		
	}
	else{
		setTimeout('mustExecute("' + func + '")', 500);
	}
}

function slideShowFBClicked(){}
function slideShowTWClicked(){}
function slideShowEMClicked(){}
function slideShowLKClicked(){}

function initializeApp() {  
	var i;
	
  /*
	FNS.addButtonElement("slideShowPrev",slideShowPrevClicked); 
	FNS.addButtonElement("slideShowNext",slideShowNextClicked); 

	FNS.addButtonElement("slideShowFacebook",slideShowFBClicked); 
	FNS.addButtonElement("slideShowTwitter",slideShowTWClicked); 
	FNS.addButtonElement("slideShowEmail",slideShowEMClicked); 
	FNS.addButtonElement("slideShowLink",slideShowLKClicked); 
	

	FNS.addButtonElement("appMenuToggle",toggleMainMenuOverlay); 
	FNS.addTapElement("homeButton",homeButtonClicked); 
	*/
	
  getElementObject("homeButtonBBox").innerHTML = "<a href='javascript:homeButtonClicked()'> <div class='homeButton' id='homeButton'></div></a>";
	//execute canvas js initializations functions  
	
	for (i = 0; i < App.canvases.length; i++){
		var temp = removeHyphens(App.canvases[i]) + "init";
		mustExecute(temp);
	}      
	
	setTimeout('document.getElementById("splashScreen").style.display = "none";', 3000);
	setTimeout('document.getElementById("splashScreen").style.opacity = "0";', 2500);
	
	Canvas.showOneCanvasOnly(App.mainMenuFlair);
  if(ENV.screen.smallscreenon){
    getElementStyleObject("maincanvasWrapper").display = "none";
    getElementStyleObject("homeButton").display = "block";
    getElementStyleObject("helpButton").display = "none";
    getElementStyleObject("headerWrapper").display = "block";
  }

	initializeButtonClicks();
  setTimeout('scrollRefreshAll();', 3000);

}   

function removeHyphens(str)
{
	var ret = "";
	for(var i=0; i < str.length; i++){
		if(str[i] != "-"){ 
			ret = ret + str[i];
		}         
	}
	return ret;
}

var messagesPlugin = {
  scroll:null,
  scrollRefresh: function(){
    if(ENV.device.touchSupport){
      messagesPlugin.scroll = new iScroll("messagesPluginCWW");
    }
    else{
     var element = $('#messagesPluginCWW').jScrollPane({"contentWidth":"0px"});
    // messagesPlugin.scroll = element.data('jsp');
    }
  },
  show: function(arg){
    fadeOut(currentDealList);
    messagesPlugin.current = arg;
    fadeIn("messagesPluginScreen");
  },
  hide: function(){
    fadeIn(currentDealList);
    messagesPlugin.current = null;
    activityIndicator.show();
    getElementObject("commentName").focus();
    setTimeout('getElementObject("commentName").blur();fadeOut("messagesPluginScreen");activityIndicator.hide()', 500);
  },
  initialize:function(){
    //FNS.addTapElement("mpPluginDone", messagesPlugin.doneClicked);
    //FNS.addTapElement("postComment", messagesPlugin.postComment);
    getElementStyleObject("messagesPluginCWW").height = window.innerHeight - 240 + "px"
  },
  current: null,
  doneClicked:function(){
    messagesPlugin.hide();
  },
  shareClicked:function(){
  },
  commentsClicked:function(){
  },
  favClicked:function(){
  },
  prevClicked:function(){
  },
  nextClicked:function(){
  },
  postComment: null

}



function updateOrientation()
{   
    setTimeout("resizeend()", 500);
    orientationChanged();
}

function orientationChanged()
{
    var orientation=window.orientation;

    if(!ENV.screen.smallscreenon){
      activityIndicator.show();
      setTimeout('activityIndicator.hide()', 700);
      return;
    }

    switch(orientation)
    {
    case 0:
      getElementStyleObject("portraitOnly").display = "none";
      break;  

    case 90:
      getElementStyleObject("portraitOnly").display = "block";
      break;

    case -90:   
      getElementStyleObject("portraitOnly").display = "block";
      break;
    }
}


