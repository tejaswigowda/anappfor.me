var Language = "English";
var App = {
	resURL: "https://s3-us-west-1.amazonaws.com/caresappme/",
		reshttpURL: "http://s3-us-west-1.amazonaws.com/caresappme/",
		location: "./",
		appID: "",
		loc: "",
		font: "",
		c1: "",
		c2: "",
		c3: "",
		currPage: 0,
		lat: 0,
		long: 0,
		name: "",
		cdnURL: "http://cdn.filter.to/"
}


function setHomeSlideShow()
{
	var url = App.location;
	url = url + "getHomeSlideshow";
	url = url + "?loc=" + App.loc;
	var callback = setHSS_CB;
	loadFile(url, callback);
}

function setHSS_CB(data)
{
	if(data === "[]"){
		getElementStyleObject("assetBoxHome").display = "none";
		return;
	}
	assetManager.listObject = JSON.parse(data);
	pInfo = assetManager.listObject;
	var outS = "";
	for(var i = 0; i < pInfo.length; i++){
		item = pInfo[i];
		type = "none";
		if(Object.keys(item).contains("type") >= 0){
			type = item.type;
		}
		switch(type){
			case "image":
			 outTemp = "<div class='slideshowItem' style='background-image:url(" + '"' + App.resURL + item.url + '")' + "'> <div class='standardFont imageTitle'>" + item.name + " (" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div></div>"
				break;
			case "video":
				outTemp = "<div class='slideshowItem'> <div class='standardFont videoTitle'>" + item.name + " (" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div><video class='aVideo' controls> <source src='" + App.resURL + item.url + "'> </source></video></div>"
				break;
			case "embedfile":
				 outTemp = "<div class='slideshowItem'> <div class='standardFont imageTitle'>" + item.name + " (" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div></div>";
				break;
			case "embedvideo":
				outTemp = "<iframe  frameborder='0' style='border:0' class='slideshowItem' src='" + getembedvideoURL(item.url) + "'></iframe>";  
				break;
			case "embedimage":
				 outTemp = "<div class='slideshowItem' style='background-image:url(" + '"' + item.url + '")' + "'> <div class='standardFont imageTitle'>" + item.name + "</div></div>"
				break;
			default:
				break;

		}
		outS += outTemp;
		outTemp = "";
	}
	getElementObject("assetWrapperHome").innerHTML = outS;
}

function initializeDomain(domname)
{
	App.appID = appID;
	var url = App.location;
	url = url + "getDomainInfo";
	url = url + "?domain=" + domname;
	var callback = intDom_CB;
	loadFile(url, callback);
}

function intDom_CB(data)
{
	if(data === "[]"){
		//window.location.href="./home.html";
		return;
	}
	setTimeout('document.getElementById("splashScreen").style.backgroundPosition= "0px 0px";', 600);
	setTimeout('document.getElementById("splashScreen").style.display = "none";', 2400);
	setTimeout('document.getElementById("splashScreen").style.opacity = "0";', 1800);
	setupEnvironment();
	assignBodyClassnames();
	changeHashOnLoad();
	socialShare.initialize();
	$("#socialShare").hide();
	$("#helpWrapper").hide();
	messageHandler.initialize();
	applyLocationStyle_CB(data);
}

function setContactMap()
{
	var link = '<iframe '+
		 ' width="100%"'+
		   ' height="100%"'+
		  '  frameborder="0" style="border:0"'+
		      '  src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBcXc9hyNRz4eOucwtNZ_EOXri6KEyqufY'+
		   '&center=' + App.lat + "," + App.long + "&maptype=satellite&zoom=18" +
	'"> </iframe>';
	console.log(link);
	getElementObject("mapPC").innerHTML = link;
}


function applyLocationStyle_CB(data)
{
  var pInfo = JSON.parse(data);
  var pKeys;
  brandText = "";
  var addrstr = "";
  pKeys = Object.keys(pInfo);
  var temp = "lat";
  if(pKeys.contains(temp) >= 0){
    App.lat = parseFloat(pInfo[temp]);
  }
  var temp = "long";
  if(pKeys.contains(temp) >= 0){
    App.long = parseFloat(pInfo[temp]);
  }
  var temp = "name";
  if(pKeys.contains(temp) >= 0){
    App.name = pInfo[temp];
    getElementObject("theHeaderTitle").innerHTML = pInfo[temp];
  }
  temp = "loc";
  if(pKeys.contains(temp) >=0){
    App.loc = pInfo[temp];
	getElementStyleObject("splashScreen").backgroundImage = 'url(' + App.cdnURL + "100x100/" + App.reshttpURL + App.loc + "icon.png)";
	getElementStyleObject("theIcon").backgroundImage = 'url(' + App.cdnURL + "100x100/" + App.reshttpURL + App.loc + "icon.png)";
		var ss1 = document.createElement("link");
		var ss2 = document.createElement("link");
		var ss3 = document.createElement("link");
		var ss4 = document.createElement("link");
		ss1.sizes= "72x72";
		ss2.sizes= "114x114";
		ss3.sizes= "144x144";
		ss1.rel = "apple-touch-icon-precomposed";
		ss2.rel = "apple-touch-icon-precomposed";
		ss3.rel = "apple-touch-icon-precomposed";
		ss4.rel = "apple-touch-icon-precomposed";
		ss1.href = App.cdnURL + "72x72/" + App.reshttpURL + App.loc + "icon.png"
		ss2.href = App.cdnURL + "114x114/" + App.reshttpURL + App.loc + "icon.png"
		ss3.href = App.cdnURL + "144x144/" + App.reshttpURL + App.loc + "icon.png"
		ss4.href = App.cdnURL + "57x57/" + App.reshttpURL + App.loc + "icon.png"
		document.getElementsByTagName("head")[0].appendChild(ss1);
		document.getElementsByTagName("head")[0].appendChild(ss2);
		document.getElementsByTagName("head")[0].appendChild(ss3);
		document.getElementsByTagName("head")[0].appendChild(ss4);
  }
  temp = "desc";
  if(pKeys.contains(temp) >=0){
    getElementObject("locDesc").innerHTML = decodeURIComponent(pInfo[temp]);
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
	currAddr = addrstr;
  if(addrstr.length > 1){
       if(App.embedded === "true"){
			brandText =  brandText + "<a class='link address' href='javascript:openAddLink()'>" + addrstr+ "</a>";
	   }
	   else{
			brandText =  brandText + "<a class='link address' target='_blank' href='http://maps.apple.com/?q=" + brandText + " " + addrstr  + "'>" + "<p>" + addrstr+ "</p></a>";
	   }
  }
  temp = "web";
  if(pKeys.contains(temp) >=0){
		currWebLink = decodeURIComponent(pInfo[temp]);
		if(currWebLink.length > 0){
			if(currWebLink.substring(0,4) != "http"){
				currWebLink = "http://" + currWebLink;	
			}
			if(ENV.embedded){
				brandText += "<a class='link url' href='javascript:openWebLink()'>" + currWebLink + "</a>";
			}
			else{
				brandText += "<a class='link url' target='_blank' href='"+ currWebLink +"'>" + currWebLink + "</a>";
			}
		}
  }
  temp = "tel";
  if(pKeys.contains(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      brandText = brandText + "<a class='link phoneno' href='tel:" +  addrstr[t]  + "'>" + addrstr[t] + "</a>";
    }
  }

  temp = "email";
  if(pKeys.contains(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      brandText = brandText + "<a class='link  email' href='mailto:" + decodeURIComponent(addrstr[t])  + "'>" + decodeURIComponent(addrstr[t]) + "</a>";
	}
  }
  getElementObject("mapDetails").innerHTML = brandText;
 var f1 = "";
  temp = "font";
  if(pKeys.contains(temp) >=0){
	  var ty = parseInt(pInfo[temp])
	var ks = Object.keys(webSafeFonts);
	  f1 = webSafeFonts[ks[ty]];
	    App.font = pInfo[temp];
  }

  temp = "color";
  if(pKeys.contains(temp) < 0){
    return;
  }
  var brandID = null;
  var brandTextID = null;
  
  temp = JSON.parse(pInfo[temp]);
  var c1 = "rgba(" + temp[0] + "," + temp[1] + "," + temp[2] + ",.4)";
  var c2 = "rgb(" + temp[3] + "," + temp[4] + "," + temp[5] + ")";
  var c3 = "rgb(" + temp[6] + "," + temp[7] + "," + temp[8] + ")";
    App.c1 = c1;
    App.c2 = c2;
    App.c3 = c3;
  getElementStyleObject("body").backgroundColor = c1;
  getElementStyleObject("body").color = c2;
  getElementStyleObject("theHeaderTitle").color = c3;
  getElementStyleObject("theSubHeader").color = c3;
  activityIndicator.hide();
  setTimeout(setContactMap,100);
  setTimeout(setHomeSlideShow,100);
  pageSelected(0);
  $(".footer").html('<div class=""><div class="horizontalLine"></div><div id="devText" class="text">Developed by</div><div id="ihhsImageWrapper" class=""><div class="ihhsImage"> </div> <a class="titleText link" href="http://ihhs-cares.com" target="_blank">IHHS-CARES.com </a></div><div class="text">Made by</div><div id="fnsImageWrapper" class=""><div class="fnsImage"> </div> <a class="titleText link" href="http://foxyninjastudios.com" target="_blank"> FoxyNinjaStudios.com</a></div><div class="text smalltext">©2013 Innovative HITECH Healthcare Solutions.</div><div class="text smalltext">All rights reserved.</div><div class="horizontalLine"></div></div>');
} 

function pageSelected(n)
{
	$("#topButton" + App.currPage.toString()).css({color:"", "font-weight":"","padding-top":"", "padding-bottom":"", "border-left":""});
	App.currPage = n;
	$("#topButton" + App.currPage.toString()).css({color:App.c2, "font-weight": "bold","padding-top":"5px", "padding-bottom":"8px", "border-left":"10px solid"});
	$(".page").fadeOut();	
	$("#page" + n.toString()).stop().fadeIn();	
	if(n == 1){loadGS()}
	else if(n == 2){loadLib()}
	else if(n == 3){loadAER()}
	else if(n == 4){loadPro()}
	setTimeout(scrollRefreshAll,200);
}

function loadLib()
{
  var url = App.location;
  url = url + "getRows";
  url = url + "?category=HealthInfo";
  url = url + "&loc=" + App.loc;
  var callback = getHealthInfoInfo_CB;
  loadFile(url, callback);
}


var data89;
var currHIsf = new Date().getTime().toString();
function getHealthInfoInfo_CB(data)
{
	currHIsf = new Date().getTime().toString();
  activityIndicator.hide();
  if(data === ""){
    return;
  }
  var ac = {};
  ac.suggestions = [];
  ac.data = [];
  var pInfo = JSON.parse(data);
  data89 = pInfo;
  var pKeys;
  var name;
  var city;
  var outS = "";
  for(var i = 0; i<pInfo.length; i++){
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
    outS = outS + "<a id='hi" + currHIsf + pInfo[i].rowID + "' class='listItem arrowFinish' href='javascript:healthInfoSelected(" + '"' + pInfo[i].rowID + '")' + "'> <p>" + name + "</p>";
    ac.suggestions[ac.suggestions.length] = name;
    ac.data[ac.data.length] = pInfo[i].rowID;
  }
  if(outS.length < 5){
    outS = "<p class='titleText'> No items to show </p>";
  }
  getElementObject("list2").innerHTML = outS;
  $("#" + Canvas.current + " .ListWrapper").fadeOut(0).fadeIn(0);
 // navPlugin.currList = ac.data;
 // navPlugin.currID = null;
 // hiAC.setOptions({"lookup":ac});
}


function healthInfoSelected(pID)
{
  activityIndicator.show();
    selectedStyle.clean();
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
  getElementStyleObject("helpButton").display = "none";
  //$("#healthInfoBoxWrapper").fadeIn();
  //$("#healthInfoListWrapper").fadeOut();
  getElementStyleObject("healthInfoBoxWrapper").display = "block";
   if(ENV.device.touchSupport){
	  	$("#" + Canvas.current + " .searchInput").fadeOut(0);
	  getElementStyleObject("HILoc").display = "none";
	  setTimeout('getElementStyleObject("healthInfoListWrapper").display = "none";',200);
   }
  navPlugin.show();
  var pInfo = JSON.parse(data);
 

  var pKeys = Object.keys(pInfo);
  var temp;
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

var navPlugin= {
  initialize: function(){
    getElementStyleObject("arrowButtonsBBox").display = "none";
    getElementObject("arrowButtonsBBox").innerHTML = "<a href='javascript:navPlugin.prev()' id='navPrev' class='navPrev navButton flip0'></a>"
						    +"<a href='javascript:navPlugin.next()' id='navNext' class='navNext navButton flip0'></a>";
  },
  refreshDisplay: function(){
	if(navPlugin.getNext() == null){
		getElementStyleObject("navNext").opacity = ".2";
		$("#navNext").removeClass("flip0");
	}
	else{
		getElementStyleObject("navNext").opacity = "1";
		$("#navNext").addClass("flip0");
	}
	if(navPlugin.getPrev() == null){
		getElementStyleObject("navPrev").opacity = ".2";
		$("#navPrev").removeClass("flip0");
	}
	else{
		getElementStyleObject("navPrev").opacity = "1";
		$("#navPrev").addClass("flip0");
	}
  },
  currID: null,
  currList: [],
  show:function(){
    getElementStyleObject("arrowButtonsBBox").display = "block";
    navPlugin.refreshDisplay();
  },
  hide:function(){
    getElementStyleObject("arrowButtonsBBox").display = "none";
//    if(ENV.screen.smallscreenon){
//		getElementStyleObject("homeButton").display = "block";
//	}
  },
  getPrev: function(){
	if(navPlugin.currID == null){
		return null;
	}
	var t = navPlugin.currList.indexOf(navPlugin.currID);
	if(t <= 0){
		return null;
	}
	return navPlugin.currList[t-1];
  },
  getNext: function(){
	if(navPlugin.currID == null){
		return null;
	}
	var t = navPlugin.currList.indexOf(navPlugin.currID);
	if(t >= navPlugin.currList.length-1){
		return null;
	}
	return navPlugin.currList[t+1];
  },
  smp:false,
  prev:function(){
    var temp = navPlugin.getPrev();
    if(temp == null)
    {
	    navPlugin.refreshDisplay();
	    return;
    }
    
    selectedStyle.clean();
    navPlugin.smp = true;
    lastScrollPosition = lastScrollPosition - 43;
    if(Canvas.current === "caresuser-afterER"){
      //lastScrollPosition +=  getElementObject("aer" + currAERsf + currAfterER).clientHeight;
	  getElementObject("aerAssetWrapper").innerHTML = "";
      afterERSelected(temp);
      bsScrollAER();
    }
    else if(Canvas.current === "caresuser-healthInfo"){
      //lastScrollPosition +=  getElementObject("hi" + currHIsf + currHealthInfo).clientHeight;
	  getElementObject("hiAssetWrapper").innerHTML = "";
      healthInfoSelected(temp);
      bsScrollHI();
    }
    else if(Canvas.current === "caresuser-erNavigator"){
	  getElementObject("erAssetWrapper").innerHTML = "";
      stepSelected(temp);
      bsScrollERNav();
    }
    else if(Canvas.current === "caresuser-notifications"){
	    lastScrollPosition = lastScrollPosition - 15;
      notificationsSelected(temp);
      bsScrollNot();
    }
  },
  next:function(){
    var temp = navPlugin.getNext();
    if(temp == null)
    {
	    navPlugin.refreshDisplay();
	    return;
    }
    
    selectedStyle.clean();
    navPlugin.smp = true;
    lastScrollPosition = lastScrollPosition + 43;
    if(Canvas.current === "caresuser-afterER"){
	  getElementObject("aerAssetWrapper").innerHTML = "";
      afterERSelected(temp);
      bsScrollAER();
    }
    else if(Canvas.current === "caresuser-healthInfo"){
	  getElementObject("hiAssetWrapper").innerHTML = "";
      healthInfoSelected(temp);
      bsScrollHI();
    }
    else if(Canvas.current === "caresuser-erNavigator"){
	  getElementObject("erAssetWrapper").innerHTML = "";
      stepSelected(temp);
      bsScrollERNav();
    }
  }
}


