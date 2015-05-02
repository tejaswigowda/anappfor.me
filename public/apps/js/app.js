var App = {
	version: null,
	name: null,
	appID: null, 
	resURL: null, 
	canvases: null,
	overlays: null,  
	location: null,
	maincanvas: null,
	mainMenuOverlayAllowed: null,
	mainMenuOverlayed: null,
	iPhoneMode:null,
	mainMenuFlair: null, 
	focusonmainmenu: true,
	mainURL : "../"
}

function backToDiscover()
{
    Canvas.showOneCanvasOnly("discover");
}

function bannerLogin()
{
    Canvas.showOneCanvasOnly("login");
    getElementStyleObject("body").backgroundImage = "";
    getElementStyleObject("loginBanner").display = "none";
    showBackButton();
    loginSigninSel();
}

function bannerRegister()
{
    Canvas.showOneCanvasOnly("login");
    getElementStyleObject("body").backgroundImage = "";
    getElementStyleObject("loginBanner").display = "none";
    showBackButton();
    loginRegisterSel();
}

var PV = {};

function scrollRefreshAll(){
  	$("#canvasWrapper").animate({"scrollTop":"0"}, 200);
    //if(ENV.device.touchSupport) return;
  	$("html").animate({"scrollTop":"0"}, 200);
  	$("body").animate({"scrollTop":"0"}, 200);

  return;
   var tempb = Object.keys(scrolls);
   for(var a=0; a<tempb.length; a++){
     scrollRefresh(tempb[a], true);
   }
}

function scrollRefresh(divID, flag)
{
 if(flag){
  	 $("html").animate({"scrollTop":"0"}, 200);
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
    	getElementStyleObject("unsavedDataDiv").marginTop = "-1000px";
    if(Canvas.current!=null){
      setTimeout(Canvas.current + "DeActive()", 100);
    }
    Canvas.current = theCanvas;
    if(Canvas.current!=null){
      setTimeout(Canvas.current + "Active()", 100);
    }
	if(theCanvas!=null){getElementObject("appHeaderTitle").innerHTML = Canvas.titles[theCanvas];}
		for(var i=0; i < App.canvases.length; i++){
			if(App.canvases[i][0] === App.maincanvas){
				scrollRefresh(App.maincanvas, true);
				continue;
			}

			if(App.canvases[i][0] != theCanvas){
				Canvas.doTransition("out", App.canvases[i][0]);
			}
			else{
				Canvas.doTransition("in", App.canvases[i][0]);
			}
			scrollRefresh(App.canvases[i][0], true);
			
		}
    	setTimeout('getElementStyleObject("unsavedDataDiv").marginTop = ""', 1000);
	},
	doTransition: function(inout, theCanvas){
		var type = Canvas.transitions[theCanvas];
		if(inout === "in"){
		//$("#"+theCanvas).css({display: "block", opacity:"0", left:ENV.screen.width.toString() + "px"}, 0).animate({left:"0px", opacity:"1"}, 700);
				//$("#"+theCanvas).fadeIn("slow");
				getElementStyleObject(theCanvas).display = "block";	
		        setTimeout('getElementStyleObject("' + theCanvas + '").opacity = "1"', 50);
		}
		else{
			if(type === "slide-out-right"){
				/*if(ENV.screen.small){
					$("#"+theCanvas).css({display:"none"},0);
				}
				else{
					$("#"+theCanvas).animate({left: ENV.screen.width.toString() + "px"}, 400).animate({display:"none"},0);
				}*/
				//$("#"+theCanvas).fadeOut("fast");
				//getElementStyleObject(theCanvas).display = "none";
				getElementStyleObject(theCanvas).opacity = "0";
		        setTimeout('getElementStyleObject("' + theCanvas + '").display = "none"', Canvas.transitionduration);
			}
		}
		setTimeout('window.scrollTo(0,0)', 500);
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
		small: null,
		height:null,
		width: null
	},
	
	/* for responsive parts */
	
	zoom: 100,        
	embedded: false,        
	embedType: "ios",        
	
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
			ENV.device.android = false;
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
		
		
		
    if(ENV.device.android){
      ENV.screen.height = window.innerHeight;
      ENV.screen.width = window.innerWidth;
    }
    else{
      ENV.screen.height = $(window).height();
      ENV.screen.width = $(window).width();
    }
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
        ENV.screen.small = true;
      }
      else{
        ENV.screen.small = false;
      }
    }
    else{
      ENV.screen.small = false;
    } 
	}
}    

var assets = {
	getImageSrc: function(handle, size){
		return App.location + "resources/" + App.appID + "/assets/img/" + size + "/" + handle + ".png";
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
	loadFile( "./resources/" + App.appID + "/assets/assets.txt",readAssetsList_Aux);	
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

    var mmWidth = 0;
    if(Object.keys(App).indexOf("haslogin") >=0 && App.haslogin != "true"){
        mmWidth = App.mmWidth;
    }
	//mainCW.height = ENV.screen.height + "px";
	canvasW.height = ENV.screen.height + "px";
	servicesW.height = ENV.screen.height + "px";  

	getElementStyleObject("body").minHeight = ENV.screen.height + "px";  
	getElementStyleObject("body").minWidth = ENV.screen.width + "px";  
	$(".ipad .brandTitle").css({"max-width":ENV.screen.width-mmWidth});
	
	if(!ENV.screen.small){
		if(!ENV.device.touchSupport){
			//$(".ListWrapper").css({"max-height":ENV.screen.height-300});
			$(".BoxWrapper").css({"max-width":ENV.screen.width-600});
		}
		if(App.focusonmainmenu){
            $("#maincanvasWrapper").animate({"margin-left":0}, 200)
			//getElementStyleObject("maincanvasWrapper").marginLeft = "0px";
			getElementStyleObject("maincanvasWrapper").width = ENV.screen.width;
		}
		else{
            $("#maincanvasWrapper").animate({"margin-left":"-1200px"}, 200)
			//getElementStyleObject("maincanvasWrapper").marginLeft = "-1200px";
		}
		getElementStyleObject("headerWrapper").width = ENV.screen.width - mmWidth + "px";
		getElementStyleObject("footerWrapper").width = ENV.screen.width - mmWidth + "px";
	}
	else{
	}
	
	//for (i = 0; i < App.canvases.length; i++){
	//	getElementStyleObject(App.canvases[i] + "ScrollWrapper").minHeight = ENV.screen.height + "px";
	//}
	
	//getElementStyleObject(App.maincanvas).height = ENV.screen.height - 100 + "px";
}         
          
function motherofall()
{
	appLoad();

}

function appLoad()
{
	App.appID = theAppID;
  messagesPlugin.initialize();
  //loadAllJSFiles();
  //loadAllLessFiles();

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
	
	//  readAssetsList();
   	readAppManifest();
}

function readAppManifest()
{
	loadFile('resources/' + App.appID + "/appManifest.json",readAppManifest_Aux);
}

function readAppManifest_Aux(data)
{
	var temp;
	var readData = JSON.parse(data); 
	datay = readData;

    var keys = Object.keys(readData);
    for (var i = 0; i < keys.length; i++){
        App[keys[i]] = readData[keys[i]];
    }
	
    App.mainmenubuttons = [];
    for (var i = 0; i < App.canvases.length; i++){
        App.mainmenubuttons[i] = "button" + App.canvases[i][0];
    }
        
    if(App.location.length > 0){
        App.mainURL = App.location;
    }
    if(App.embedded === "true"){
        ENV.embedded = true;
        ENV.embedType = App.embedType;
    }

  
	loadJSfile("resources/" + App.appID + "/main.js");  
	loadLessfile("resources/" + App.appID + "/main.less", false);  
	
	
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
	
	loadFile('resources/' + App.appID + "/canvases.json",loadCanvasSkeleton);
}

function loadPlugin()
{
	  // for sharer/slideshow etc.
	return;
}


function loadCanvasSkeleton(data)
{
	var readData = JSON.parse(removeCarriageReturns(data));
	
    var keys = Object.keys(readData);
    for (var i = 0; i < keys.length; i++){
        Canvas[keys[i]] = readData[keys[i]];
    }
	
    Canvas.connections = {};
	for (i = 0; i < App.canvases.length; i++){
        if(App.canvases[i][0] != 'mainMenu')
            Canvas.connections[App.canvases[i][0]] = "button" + App.canvases[i][0];
    }
	var Parent; 
	var cn;
	var i;
	for (i = 0; i < App.canvases.length; i++){
		if(App.canvases[i][0] === App.maincanvas){
			Parent = getElementObject("maincanvasWrapper");
			cn = "maincanvas fullScreen";
		}
		else{
			Parent = getElementObject("canvasWrapper");
			cn = "canvas fullScreen";			
		}
		
		var NewNode = document.createElement("div");
		NewNode.id = App.canvases[i][0];
		NewNode.className = cn;  
		Parent.appendChild(NewNode);
		
		Parent = NewNode;
		NewNode = document.createElement("div");
		NewNode.id = App.canvases[i][0] + "ScrollWrapper";
		NewNode.className = "fullScreenWrapper";  
		Parent.appendChild(NewNode);
	}
	
	setupEnvironment();
	handleScreenForOverlay();	

	for (i = 0; i < App.canvases.length; i++){
		buildCanvas(App.canvases[i][0]);
	}

  
  if(ENV.device.touchSupport){
    window.onorientationchange=updateOrientation;
    if(ENV.screen.small){
      orientationChanged();
    }
  }
  
	assignBodyClassnames();
	loadCanvasFiles();
	if(ENV.screen.small){  
		getElementStyleObject("maincanvasWrapper").width = "100%";
		getElementStyleObject("canvasWrapper").width = "100%";	
		getElementStyleObject("servicesWrapper").width = "100%";	
		
		/*if(Canvas.mainMenuFocus){
			getElementStyleObject("homeButton").display = "none"; 
		}   
		else{
			getElementStyleObject("homeButton").display = "block";			
		}*/
		
	} 
	else{  	
		getElementStyleObject("homeButton").display = "none"; 
	}
	
}
function loadCanvasFiles()
{
	for (i = 0; i < App.canvases.length; i++){
		loadJSfile("resources/" + App.appID + "/canvases/" + App.canvases[i][0] + "/main.js");  
		loadLessfile("resources/" + App.appID + "/canvases/" + App.canvases[i][0] + "/main.less", false);  
	} 
	less.refresh();
	
	initializeApp();
}                  

function buildHeader()
{   
	getElementObject("headerWrapper").innerHTML = '<div id="appHeaderTitle" class="headerTitle"></div><div id="appHeaderSubTitle" class="headerSubTitle"></div>';
}       

function handleSpecialCanvas(canvasID, canvasSk){
  return;	
}

function buildCanvas(canvasID)
{   
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

    var mmWidth = 0;
    if(Object.keys(App).indexOf("haslogin") && App.haslogin != "true"){
        mmWidth = App.mmWidth;
    }
	if(!ENV.screen.small){ 
        $("#maincanvasWrapper").animate({"margin-left":0}, 0)
		//getElementStyleObject("maincanvasWrapper").marginLeft = "0px";
		mainCW.width = mmWidth + "px";
		mainCW.display = "block";
		canvasW.width = (ENV.screen.width - mmWidth).toString() + "px"; 
		servicesW.width = (ENV.screen.width - mmWidth).toString() + "px"; 
	}   
	else{
		mainCW.width = "100%";
		if(App.classSmall.indexOf("-bottom") > 0){  
            mainCW.display = "block";
        }
		canvasW.width = ENV.screen.width + "px";
		servicesW.width = ENV.screen.width + "px";
		//getElementStyleObject("headerWrapper").width = "100%";			
	}
	if(!ENV.screen.small){ 
	//	getElementStyleObject("theActivityIndicatorWrapper").marginLeft = mmWidth.toString() + "px";
	//	getElementStyleObject("messagesWrapper").maxWidth = (ENV.screen.width - mmWidth).toString() + "px";
	//	getElementStyleObject("messagesWrapper").marginLeft = mmWidth.toString() + "px";
	}
}     
         
function homeButtonClicked()
{
  if(dataEdited){
    alertHandler.flashNewMessage("Unsaved data!","Please save or cancel changes to continue");
    return;
  }
  window.scrollTo(0,0);
	getElementStyleObject("headerWrapper").display = "none";
	$("#maincanvasWrapper").animate({"margin-left":0}, 200)
	//getElementStyleObject("maincanvasWrapper").marginLeft = "0px";
	Canvas.showOneCanvasOnly(null);
	App.focusonmainmenu = true;
  getElementStyleObject("maincanvasWrapper").display = "block";
	getElementStyleObject("homeButton").display = "none";
  homeButtonAppSpec();
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
//if (window.addEventListener)
//    window.addEventListener('DOMMouseScroll', wheel, false);
//window.onmousewheel = document.onmousewheel = wheel;



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
	handleScreenForOverlay();	
      if(SlideShow.active){
        setTimeout('SlideShow.resize()', 1000)
      }
		
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
			//scrolls[SlideShow.canvasIDname].scrollToPage("prev", 0, 500);
       		break;

       case arrow.right:
			wheelMoveSmp = false;
     	 //	scrolls[SlideShow.canvasIDname].scrollToPage("next", 0, 500);
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
	
  getElementObject("homeButtonBBox").innerHTML = "<a href='javascript:homeButtonClicked()'> <div class='homeButton flip1' id='homeButton'></div></a>";
  getElementObject("backButtonBBox").innerHTML = "<a href='javascript:backButtonClicked()'> <span class='hilitetext glyphicons glyphicon-chevron-left leftTopButton'></span> <div class='hilitetext backButton flip0' id='backButton'></div></a>";
	
	//execute canvas js initializations functions  
	for (i = 0; i < App.canvases.length; i++){
		var temp = removeHyphens(App.canvases[i][0]) + "init";
		mustExecute(temp);
	}      
	
	setTimeout('document.getElementById("splashScreen").style.display = "none";', 3200);
	setTimeout('document.getElementById("splashScreen").style.backgroundPosition = "50% 5px";', 1900);
	//setTimeout('document.getElementById("splashScreen").style.opacity = "0";document.getElementById("rovingicon").style.top= "0px";document.getElementById("rovingicon").style.position= "relative";hideBackButton();', 2200);
	setTimeout('document.getElementById("splashScreen").style.opacity = "0";document.getElementById("rovingicon").style.top= "-100px";document.getElementById("rovingicon").style.display= "none";hideBackButton();', 2200);
	
	setTimeout('Canvas.showOneCanvasOnly(App.mainMenuFlair)', 2000);

  if(ENV.screen.small){
    setTimeout('getElementStyleObject("maincanvasWrapper").display = "none"', 200);
  }
	//initializeButtonClicks();
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
    //Helper.addTapElement("mpPluginDone", messagesPlugin.doneClicked);
    //Helper.addTapElement("postComment", messagesPlugin.postComment);
    //getElementStyleObject("messagesPluginCWW").height = window.innerHeight - 240 + "px"
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
    //setTimeout("resizeend()", 500);
    orientationChanged();
}

//window.addEventListener("focus", function(event) { handleLockScreen(); if(ENV.device.touchSupport){setTimeout(orientationChanged2, 200)} }, false);

function orientationChanged2()
{
	setupEnvironment();
	if(!ENV.screen.small){
		handleScreenForOverlay();
	}
}

function orientationChanged()
{
    setTimeout(orientationChanged2, 200);
	return;
    var orientation=window.orientation;

    /*
    if(!ENV.screen.small){
      activityIndicator.show();
      setTimeout('activityIndicator.hide()', 700);
      return;
    }

    */
    /*
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
    */
}


var lastScrollPosition = 0;
getDocumentScroll= function(){
	 if(window.pageYOffset!= undefined){
	 	   return pageYOffset;
	 	    }
	  else{
	  	    var sx, sy, d= document, r= d.documentElement, b= d.body;
	  	      sx= r.scrollLeft || b.scrollLeft || 0;
	  	        sy= r.scrollTop || b.scrollTop || 0;
	  	          return sy;
	  	           }
}

function logoutConfirm()
{
	dialogConfirm.display("Are you sure you want to logout now?", "images/logoutFlairhover.png", null, 'logoutClicked()', null, null);
}

function handleImageLinks(id)
{
    var $a = $("#"+ id +" img");

    $a.click(function(x) {
        x.preventDefault();
        var url = $(this).attr('src');
        imagePreview.display("", url); // where launchUrl is your function that calls window.open, etc
    });
    return;
}


function handleEmbeddedLinks(id)
{
	if(App.embedded === "true" && App.embedType === "ios"){
		var $a = $("#"+ id +" a");

		$a.click(function(x) {
			x.preventDefault();
			var url = $(this).attr('href');
			cordovaOpenLink(url); // where launchUrl is your function that calls window.open, etc
		});
		return;
	}
	$('#' + id + ' a').each(function() {
		$(this).attr("target","_blank");
		$(this).attr("class","link");
	});
	$('#' + id + ' li span').each(function() {
		$(this).attr("style","");
	});
}

var webSafeFonts =
{
	'Default': '',
	'Georgia': 'Georgia, serif',
	'Book Antique': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
	'Courier New':'"Courier New", Courier, monospace',
	'Lucida Console':'"Lucida Console", Monaco, monospace',
	'Arial Black':'"Arial Black", Gadget, sans-serif',
	'Impact':'Impact, Charcoal, sans-serif',
	'Times New Roman':'"Times New Roman", Times, serif'
}



function getStatusStrings(howN, whereN, howT, whereT)
{
	var howRet = "";
	var whereRet = "";
	if(howN === "0"){
		howRet = howT;
	}
	else if(howN === "1"){
		howRet = "I need a ride";
	}
	else if(howN === "2"){
		howRet = "Feeling better";
	}
	else if(howN === "3"){
		howRet = "No change";
	}
	else if(howN === "4"){
		howRet = "I feel worse";
	}
	
	if(whereN === "0"){
		whereRet = whereT;
	}
	else if(whereN === "1"){
		whereRet = "Home";
	}
	else if(whereN === "2"){
		whereRet = "Hospital";
	}
	else if(whereN === "3"){
		whereRet = "Emergency Department";
	}
	
	return [howRet, whereRet];

}


var mainMenuButtons = {
	list: [],
	getTargetCanvas:function(currentButton){
		for(var i=0; i < App.canvases.length; i++){
			if(App.canvases[i][0] === App.maincanvas){continue;}
			if(Canvas.connections[App.canvases[i][0]] === currentButton){
				return App.canvases[i][0];
			}
		}
		return null;
	},
	__addSelectedStyle: function(divID){
		$("#" + divID + "T").removeClass("thumbnailB");
		$("#" + divID + "T").addClass("thumbnailA");
		$("#" + divID).addClass("active");
		var t = getElementStyleObject(divID);
	}, 

	__removeSelectedStyle: function(divID){   
		$("#" + divID + "T").removeClass("thumbnailA");
		$("#" + divID + "T").addClass("thumbnailB");
		$("#" + divID).removeClass("active");
	},  

  __selected:function(buttonClicked, canvasID){
		Canvas.showOneCanvasOnly(canvasID);
				
		if(ENV.screen.small && App.classSmall.indexOf("-bottom") < 0){  
			setTimeout('getElementStyleObject("maincanvasWrapper").display = "none"', 200);
            showHomeButton();
            backState = 1;
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
	//	setTimeout('getElementStyleObject("headerWrapper").display = "block"', 300);
		setTimeout('getElementStyleObject("headerWrapper").opacity = "1"', 300);
  },

	selected: function(buttonClicked){
        if(dataEdited){
          alertHandler.flashNewMessage("Unsaved data!","Please update or cancel changes to continue...");
          return;
        }
        activityIndicator.show();
        var canvasID = mainMenuButtons.getTargetCanvas(buttonClicked);
        mainMenuButtons.__selected(buttonClicked, canvasID);
        unsavedDataPlugin.hide();
	}
}


