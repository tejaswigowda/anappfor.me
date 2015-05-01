    document.getElementById("rovingicon").innerHTML = APPLOGO;
$('#overlayHTML textarea').focus(function(){
		    var _self = this;
		        setTimeout(function(){   _self.select()},100)
			    })

var shareTitle = "";
var data2;
var currentDealList;
var lastLoadedDeal = 0;
var doListReset = true;


var isOpen = ",";
var isFav = ",";
favJSON = "{}";
var styleSmp = false;

var notLocation = "ALL"; 
function applyLocationStyleAux(Loc)
{
  notLocation = Loc;
  if(Loc === "ALL"){
    locAllStyle();
    return;
  }
  var url = App.mainURL;
  url = url + "getLocationInfo";
  url = url + "?loc=" + encodeURIComponent(Loc);
  var callback = applyLocationStyle_CB;
  loadFile(url, callback);
}

function applyLocationStyle()
{
    if(styleSmp){
        styleSmp = false;
        return;
    }
  if(Location === "ALL"){
    locAllStyle();
    return;
  }
  var url = App.mainURL;
  url = url + "getLocationInfo";
  url = url + "?loc=" + encodeURIComponent(Location);
  var callback = applyLocationStyle_CB;
  loadFile(url, callback);
}

function locAllStyle()
{
  $(".brandOpts").fadeOut(0);
  selectedStyle.hilite = "";
  selectedStyle.hilite1 = "";
  $("#" + Canvas.current + " .aList").css({"color":selectedStyle.hilite1});
  getElementStyleObject("body").backgroundColor = "white";
  getElementStyleObject("canvasWrapper").color = "";
  //$(".brandWrapper").fadeOut();
  for(var i= 0; i < App.canvases.length; i++){
	  if(/*App.canvases[i] === "caresuser-healthRecords" ||*/ App.canvases[i][0] === App.maincanvas) continue;
	//getElementStyleObject(App.canvases[i] + "ScrollWrapper").backgroundColor = "white";
	getElementStyleObject(App.canvases[i][0] + "ScrollWrapper").fontFamily = "";
  }

  //if(ENV.screen.smallscreenon){
//	getElementStyleObject("canvasWrapper").backgroundColor = "white";
  //}
  
	  if(Canvas.current === "products"){
    brandID = "hiBrand";
    brandTextID = "hiBrandText";
    brandTitleID = "hiBrandTitle";
   getElementStyleObject(brandID).backgroundImage = "url('images/icon.png')";
   getElementStyleObject(brandTextID).color = '#232323';
   getElementObject(brandTitleID).innerHTML = CARESLOGO + ' Library';
   getElementObject(brandTextID).innerHTML = '<p class="besp"> General information compiled by the ' + CARESLOGO + ' team.</p>'; 
      } 
	  if(Canvas.current === "orders"){
    brandID = "aerBrand";
    brandTextID = "aerBrandText";
    brandTitleID = "aerBrandTitle";
   getElementStyleObject(brandID).backgroundImage = "url('images/icon.png')";
   getElementStyleObject(brandTextID).color = '#232323';
   getElementObject(brandTitleID).innerHTML = CARESLOGO + ' Support';
   getElementObject(brandTextID).innerHTML = '<p class="besp"> Support articles and how-tos on getting most of ' + CARESLOGO + '.</p>';
      } 
	  if(Canvas.current === "notifications"){
    brandID = "notBrand";
    brandTextID = "notBrandText";
   getElementStyleObject(brandID).backgroundImage = "url('images/icon.png')";
   getElementStyleObject(brandTextID).color = '#232323';
getElementObject(brandTextID).innerHTML = '<div class="title">' + CARESLOGO + '</div> <p> A secure, mobile-capable app platform that provides a direct connection between the patient and their healthcare provider. </p>';
      } 
	  
    //  currT =  "";
    // getElementStyleObject("buttonERNavigatorT").backgroundImage = "";
  
  var c2 = 'rgba(110, 124, 159,.85)';
  var c3 = c2 + " soild 2px"
  $(".brandOpts .selected").css({'color':'white', 'background-color':c2})
  $(".brandTitle").css({'color':'white', 'background-color':c2})
  $(".brandWrapper2").css({'border-bottom': c3, 'border-left': c3, 'border-right': c3});
  $(".comictt").css({'color':c2});
}


var CARESLOGO = "<span class='caresLogo'><span class='blue'>CARES</span><span class='red'>app</span>&trade; </span>";
var CARESTEAMLOGO = "<span class='caresLogo'><span class='blue'>CARE</span><span class='red'>team</span>&trade; </span>";
var MYCARESTEAMLOGO = "<span class='caresLogo'><i class='gray'>my</i><span class='blue'>CARE</span><span class='red'>team</span>&trade; </span>";
var CARESTEAMSLOGO = "<span class='caresLogo'><span class='blue'>CARE</span><span class='red'>teams</span>&trade; </span>";

var data55;
var currAddr = "";
var currWebLink = "";

function openAddLink()
{
	cordovaOpenLink("http://maps.apple.com/?q=" + encodeURIComponent(currAddr));
}
function openIHHS()
{
	cordovaOpenLink("http://ihhs-cares.com");
}
function openHelper()
{
	cordovaOpenLink("http://foxyninjastudios.com");
}

function openWebLink()
{
	cordovaOpenLink(currWebLink);
}

function applyLocationStyle_CB(data)
{
  var pInfo = JSON.parse(data);
  data55 = pInfo;
  var pKeys;
  var brandText = "";
  var addrstr = "";
  var title = "";
  pKeys = Object.keys(pInfo);
  var temp = "name";
  if(pKeys.indexOf(temp) >= 0){
    //brandText = brandText + pInfo[temp];
    title = pInfo[temp];
  }
  temp = "addr";
  if(pKeys.indexOf(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]);
  }
  temp = "city";
  if(pKeys.indexOf(temp) >=0){
    addrstr = addrstr + " " + decodeURIComponent(pInfo[temp]);
  }
  temp = "zip";
  if(pKeys.indexOf(temp) >=0){
    addrstr = addrstr + " " + decodeURIComponent(pInfo[temp]);
  }
	currAddr = addrstr;
    brandText = "<div class='title'>" + brandText + "</div>";
  if(tokenize(addrstr).length > 1){
       if(App.embedded === "true"){
			brandText += "<a class='address' href='javascript:openAddLink()'><p>" + addrstr+ "</p></a>";
	   }
	   else{
			brandText += "<a class='address' target='_blank' href='http://maps.apple.com/?q=" + title + " " + addrstr  + "'><p>" + addrstr+ "</p></a>";
	   }
  }
  temp = "web";
  if(pKeys.indexOf(temp) >=0){
		currWebLink = decodeURIComponent(pInfo[temp]);
		if(currWebLink.length > 0){
			if(currWebLink.substring(0,4) != "http"){
				currWebLink = "http://" + currWebLink;	
			}
			if(ENV.embedded){
				brandText += "<a class='url' href='javascript:openWebLink()'>" + currWebLink + "</a>";
			}
			else{
				brandText += "<a class='url' target='_blank' href='"+ currWebLink +"'>" + currWebLink + "</a>";
			}
		}
  }
  temp = "tel";
  if(pKeys.indexOf(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      brandText = brandText + "<a class='phoneno' href='tel:" +  addrstr[t]  + "'>" + addrstr[t] + "</a>";
    }
  }

  temp = "email";
  if(pKeys.indexOf(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      brandText = brandText + "<a class='email' href='mailto:" + decodeURIComponent(addrstr[t])  + "'>" + decodeURIComponent(addrstr[t]) + "</a>";
	}
  }
  brandText += "<div class='sm'>";
  temp = "linkedin";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  LinkedIn  </a>";
  }
  temp = "fb";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Facebook  </a>";
  } 
  temp = "tw";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Twitter  </a>";
  } 
  temp = "gplus";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Google +  </a>";
  }
  brandText += "</div>";
 var f1 = "";
  temp = "font";
  if(pKeys.indexOf(temp) >=0){
	  var ty = parseInt(pInfo[temp])
	var ks = Object.keys(webSafeFonts);
	  f1 = webSafeFonts[ks[ty]];
  }

  temp = "color";
  if(pKeys.indexOf(temp) < 0){
    locAllStyle();
    return;
  }
  temp = JSON.parse(pInfo[temp]);
  var c0 = "rgb(" + temp[0] + "," + temp[1] + "," + temp[2] + ")";
  var c1 = "rgba(" + temp[0] + "," + temp[1] + "," + temp[2] + ",.4)";
  var c2 = "rgba(" + temp[3] + "," + temp[4] + "," + temp[5] + ",.75)";
  var c3 = "rgb(" + temp[6] + "," + temp[7] + "," + temp[8] + ")";

  var brandID = null;
  var brandTextID = null;
  var brandTitleID = null;
  if(Canvas.current === "notifications"){
    brandID = "notBrand";
    brandTextID = "notBrandText";
    getElementObject(brandTextID).innerHTML = "<div class='title'>" + title + "</div>" + brandText;
    handleEmbeddedLinks(brandTextID + " .sm");
    getElementStyleObject(brandTextID).color = c3;
    getElementStyleObject("notBrand").opacity = "0";
    getElementStyleObject(brandID).backgroundImage = "url('" + App.resURL +  notLocation + "icon.png')";
    getElementStyleObject("notBrand").opacity = "1";
  }
  else{
    getElementStyleObject("buttonERNavigatorT").backgroundImage = "url('" + App.resURL +  Location + "icon.png')";
  
    brandID = "hiBrand";
    brandTextID = "hiBrandText";
    brandTitleID = "hiBrandTitle";
    getElementObject(brandTitleID).innerHTML = title;
    getElementObject(brandTextID).innerHTML = brandText;
    handleEmbeddedLinks(brandTextID + " .sm");
    getElementStyleObject(brandTextID).color = c3;
    getElementStyleObject(brandID).backgroundImage = "url('" + App.resURL +  Location + "icon.png')";
  
    brandID = "aerBrand";
    brandTextID = "aerBrandText";
    brandTitleID = "aerBrandTitle";
    getElementObject(brandTitleID).innerHTML = title;
    getElementObject(brandTextID).innerHTML = brandText;
    handleEmbeddedLinks(brandTextID + " .sm");
    getElementStyleObject(brandTextID).color = c3;
    getElementStyleObject(brandID).backgroundImage = "url('" + App.resURL +  Location + "icon.png')";
  
    brandID = "erNavigatorBrand";
    brandTextID = "erNavigatorBrandText";
    brandTitleID = "erNavigatorBrandTitle";
    getElementObject(brandTitleID).innerHTML = title;
    getElementObject(brandTextID).innerHTML = brandText;
    handleEmbeddedLinks(brandTextID + " .sm");
    getElementStyleObject(brandTextID).color = c3;
    getElementStyleObject(brandID).backgroundImage = "url('" + App.resURL +  Location + "icon.png')";
  }
    if(Canvas.current === "appSettings"){
        var temp2 = "desc";
        if(pKeys.indexOf(temp2) >=0){
            getElementObject("erNavLocDetails").innerHTML = pInfo[temp2];
        }
    }
  //$(".brandWrapper").fadeIn();
    var c5 = c2 + " solid 2px";
  getElementStyleObject("body").backgroundColor = c1;
  $(".brandOpts .selected").css({'color':c0, 'background-color':c2})
  $(".brandTitle").css({'color':c0, 'background-color':c2})
  $(".brandWrapper2").css({'border-bottom': c5, 'border-left': c5, 'border-right': c5});
  $(".comictt").css({'color':c2});
  getElementStyleObject("canvasWrapper").color = c2;
  
	selectedStyle.hilite = tinycolor.saturate(c3, amount = 15).toString("rgb");
	selectedStyle.hilite1 = tinycolor.darken(c2, amount = 15).toString("rgb");
  
    /*
  for(var i= 0; i < App.canvases.length; i++){
	  if(App.canvases[i] === App.maincanvas) continue;
	getElementStyleObject(App.canvases[i][0] + "ScrollWrapper").backgroundColor = c1;
	getElementStyleObject(App.canvases[i][0] + "ScrollWrapper").fontFamily = f1;
  }
  */
  $(".brandOpts").fadeIn(0);
  //if(ENV.screen.smallscreenon){
//	  getElementStyleObject("canvasWrapper").backgroundColor = c1;
  //}
}


function isInOpenDeals(dealID){
  var flag = isOpen.indexOf("," + dealID + ",");
  if (flag >= 0){
    return true;
  }

  return false;
}

function addToOpenDeals(dealID){
  isOpen = isOpen + dealID + ",";
}


function removeFromOpenDeals(dealID)
{
  isOpen = isOpen.substring(0,isOpen.indexOf(","+ dealID +",")) + isOpen.substring(isOpen.indexOf(","+ dealID +",") + dealID.length + 1);
}
   

function isInFavDeals(dealID){
  var flag = isFav.indexOf("," + dealID + ",");
  if (flag >= 0){
    return true;
  }

  return false;
}

function addToFavDeals(dealID){
  isFav = isFav + dealID + ",";
  PersistantValue.set("isFav", isFav);
}


function removeFromFavDeals(dealID)
{
  isFav = isFav.substring(0,isFav.indexOf(","+ dealID +",")) + isFav.substring(isFav.indexOf(","+ dealID +",") + dealID.length + 1);
  PersistantValue.set("isFav", isFav);
}

var theURL = "../../../../../../"
//var theURL = "http://alicias.deals.jit.su/";
 
function getTheDeal(guid)
{
//  $(".jspPane")[0].style.top = "0px";
  var url = theURL;
  url = url + "getTheDeal";
  url = url + "?guid=" + guid;
  var callback = getTheDeal_CB;
  loadFile(url, callback);
}

var data17;

function getTheDeal_CB(data)
{
  dealData = JSON.parse(data);
  var currentSelectedDeal = currentSelectedDealArr[dealData.guid];
  var wrapperID = "wrapper" + currentDealList + currentSelectedDeal

  var outS = "<div class='dealDetails'>" + decodeURIComponent(dealData.post.split("%3Cp%3ENever%20miss")[0]) + "</div>";
  outS = outS + "<a class='twShare' href='" + twShare(currentSelectedDeal) + "' target='_blank'>" + "<img height=50 width=50 src='images/twShare.png' /></a>";
  outS = outS + "<a class='fbShare' href='" + fbShare(currentSelectedDeal) + "' target='_blank'>" + "<img height=50 width=50 src='images/fbShare.png' /> </a>";
  outS = outS + "<a class='lkShare' href='" + lkShare(currentSelectedDeal) + "' target='_blank'>" + "<img height=50 width=50 src='images/lkShare.png' /></a>";
  outS = outS + "<a class='cmButton' href='javascript:cmButtonClicked(" + '"' + currentSelectedDeal + '")' + "'>" + "<img height=50 width=50 src='images/cmButton.png' /></a>";
  var favStatus = "";
  if(isInFavDeals(dealData.guid)){
    favStatus = "favButtonActive";
  }
  else{
    favStatus = "favButton";
  }
  outS = outS + "<a class='favButton' href='javascript:favToggle(" + '"' + currentSelectedDeal + '")' + "'> <img" + " id='fav" + currentSelectedDeal + "' height=45 width=45 src='images/" + favStatus + ".png' /> </a>";
  getElementObject(wrapperID).innerHTML = outS;
  data17 = dealData;
//  setTimeout('$("#messagesPluginCWW").jScrollPane({"contentWidth":"0px", "horizontalDragMinWidth": "10000px"})', 500);
  setTimeout("refreshDealScroll(false)", 500);

}

function loadFavDeals()
{
  currentDealList = "msgListFav";
  var url = theURL;
  url = url + "getFavDeals";
  url = url + "?deals=" + isFav.substring(1, isFav.length - 1);
  var callback = favChanged_CB;
  loadFile(url, callback);

}
function loadTheDeals(divID, type, begin, count)
{
  currentDealList = divID;
  getLabelObject(currentDealList + "Load").innerHTML = "Loading ...";
  var url = theURL;
  url = url + "getDeals";
  url = url + "?type=" + type;
  url = url + "&begin=" + begin;
  url = url + "&count=" + count;
  var callback = dateChanged_CB;
  loadFile(url, callback);
  data2 = url;

}

var data1;
var newMsgs;

function favChanged_CB(data)
{
    isOpen = ",";
    var el = document.getElementById(currentDealList);
    while( el.hasChildNodes() ){
          el.removeChild(el.lastChild);
    }
    

  if (data.length < 10){
    alertHandler.flashNewMessage("No Favorite Deals Yet", "Star deals you want to see here")
    return;
  }

  newMsgs = new Array();

  var messages = JSON.parse(data);

  var Parent = getElementObject(currentDealList)
  var msgKeys = Object.keys(messages);

  var x = new Date();
  var temp = x.getTime();

  for (var i = msgKeys.length-1; i >= 0; i--){
    var NewNode = document.createElement("div");
    NewNode.id = currentDealList + messages[msgKeys[i]].guid + "_" + temp;
    NewNode.innerHTML = "<a class='dealTitle' href='javascript:dealSelected(" + '"but' + NewNode.id + '")' + "'>" + "<p id='title" + NewNode.id + "'>" +  decodeURIComponent(messages[msgKeys[i]].title) + "</p>" + "</a>" + "<div id='wrapper" + NewNode.id + "' class='dealWrapper'> <h6>Loading ... </h6></div>" + "<div class='date'>" + messages[msgKeys[i]].date.substring(0,15) + "</div>";
    Parent.appendChild(NewNode);
    newMsgs[newMsgs.length] = NewNode.id;

    var temp1 = messages[msgKeys[i]].guid;
    var classTemp = "aMessage";
    if(isInFavDeals(temp1)){
     classTemp = classTemp + " favorite";
    }
    if(currentDealList != "msgListRec"){
      if(messages[msgKeys[i]].categories.toString().indexOf("RECOMMENDED") >= 0){
       classTemp = classTemp + " recommended";
      }
    }
    NewNode.className = classTemp;

  }
  setTimeout("favChanged_CB2()", 500);
  
  return;
}



function dateChanged_CB(data)
{
  if(doListReset){
    isOpen = ",";
    var el = document.getElementById(currentDealList);
    while( el.hasChildNodes() ){
          el.removeChild(el.lastChild);
    }
    currentSelectedDealArr = new Array();
    lastLoadedDeal = 0;
  }

  if (data === "[]"){
    getLabelObject(currentDealList + "Load").innerHTML = "Load more deals";
    return;
  }

  newMsgs = new Array();

  var messages = JSON.parse(data);

  var Parent = getElementObject(currentDealList)
  var msgKeys = Object.keys(messages);

  if(msgKeys.length < 10){
    getElementStyleObject(currentDealList + "Load").display = "none";
  }
  lastLoadedDeal = lastLoadedDeal + msgKeys.length;

  var x = new Date();
  var temp = x.getTime();

  for (var i = 0; i < msgKeys.length; i++){
    var NewNode = document.createElement("div");
    NewNode.id = currentDealList + messages[msgKeys[i]].guid + "_" + temp;
    NewNode.innerHTML = "<a class='dealTitle' href='javascript:dealSelected(" + '"but' + NewNode.id + '")' + "'>" + "<p id='title" + NewNode.id + "'>" +  decodeURIComponent(messages[msgKeys[i]].title) + "</p>" + "</a>" + "<div id='wrapper" + NewNode.id + "' class='dealWrapper'> <h6>Loading ... </h6></div>" + "<div class='date'>" + messages[msgKeys[i]].date.substring(0,15) + "</div>";
    Parent.appendChild(NewNode);
    newMsgs[newMsgs.length] = NewNode.id;

    var temp1 = messages[msgKeys[i]].guid;
    var classTemp = "aMessage";
    if(isInFavDeals(temp1)){
     classTemp = classTemp + " favorite";
    }
    if(currentDealList != "msgListRec"){
      if(messages[msgKeys[i]].categories.toString().indexOf("RECOMMENDED") >= 0){
       classTemp = classTemp + " recommended";
      }
    }
    if(messages[msgKeys[i]].categories.toString().indexOf("EXPIRED") >= 0){
      classTemp = classTemp + " expired";
    }
    NewNode.className = classTemp;

  }
  setTimeout("dateChanged_CB2()", 500);
  
  return;
}


function favChanged_CB2()
{
  refreshDealScroll(false);
}

function dateChanged_CB2()
{
  getLabelObject(currentDealList + "Load").innerHTML = "Load more deals";
  if(doListReset && !ENV.screen.smallscreenon && !ENV.device.touchSupport){
    for(var j = 0; j < newMsgs.length; j++){
      setTimeout("dealSelected('but" + newMsgs[j] + "')", 100);
    }
    setTimeout("refreshDealScroll(true)", 300);
  }
  else{
    refreshDealScroll(false);
  }
}

function refreshDealScroll(flag)
{
 if(currentDealList == "msgListAll"){ 
   scrollRefresh("aliciasDeals-allDeals", flag);
 }
 else if(currentDealList == "msgListRec"){ 
  scrollRefresh("aliciasDeals-recDeals", flag);
 }
 else if(currentDealList == "msgListAZ"){ 
  scrollRefresh("aliciasDeals-azDeals", flag);
 }
 else if(currentDealList == "msgListFav"){ 
  scrollRefresh("aliciasDeals-favDeals", flag);
 }
}
function makeZoom(canvasID)
{
  scrolls[canvasID].destroy();
  scrolls[canvasID] = null;
	scrolls[canvasID] = new iScroll(canvasID, {/*vScroll:true, hScroll: true,*/ vScrollbar:false, hScrollbar: false});
}

var currentSelectedDealArr = new Array();

function dealSelected(arg)
{
  var temp = arg.split(currentDealList)[1];
  var currentSelectedDeal = temp;
  var guid = temp.split("_")[0];
  currentSelectedDealArr[guid] = currentSelectedDeal;
  var temp1 = currentDealList + currentSelectedDeal;
  var wrapperID = "wrapper" + currentDealList + currentSelectedDeal
  var titleID = "title" + currentDealList + currentSelectedDeal

  if(isInOpenDeals(temp1)){
    removeFromOpenDeals(temp1);
    getElementObject(wrapperID).innerHTML = "<h6> Loading ...</h6>";
    getElementStyleObject(wrapperID).display = "none";
    getElementStyleObject(wrapperID).opacity = "0";
    getElementStyleObject(titleID).backgroundColor = "";
    setTimeout("refreshDealScroll(false)", 500);
  }

  else{
    fadeIn(wrapperID);
    getElementStyleObject(titleID).backgroundColor = "rgb(210, 210, 145)";
    getElementStyleObject("collapseAll").display = "inline-block";
    addToOpenDeals(temp1);
    getTheDeal(guid);
  }
}

var origin = "http://webapp.dealsinaz.com";

function fbShare(arg)
{
  var guid = arg.split("_")[0];
  var url = encodeURIComponent(origin + "/share/share.html#" + guid) 
  var title = getElementObject("title" + currentDealList + arg).innerHTML;
  return("http://www.facebook.com/sharer.php?u=" + url + "&t=" + title);
}

function twShare(arg)
{
  var guid = arg.split("_")[0];
  var url = encodeURIComponent(origin + "/share/share.html#" + guid) 
  var title = encodeURIComponent(getElementObject("title" + currentDealList + arg).innerHTML);
  return("http://www.twitter.com/home?status=" + title + encodeURIComponent(" -- ") + url);
}

function lkShare(arg)
{
  var guid = arg.split("_")[0];
  var url = origin + "/share/share.html#" + guid;
  return(url);
}

function homeButtonAppSpec()
{
    backState = 0;
  locAllStyle();
  getElementObject("helpText").innerHTML = "<p class='helpMain1'> Update status to keep your CARE<i>team</i>s updated."+
	  "Use <i> Journal</i> to keep records of your medical information.</p>"+
	  "<p class='helpMain2'> Browse and manage CARE<i>team</i>s in the <u>CARE<i>team</i>s</u> section."+
	  " View content your CARE<i>team</i> would like you to have in <i>Library</i>."+
	  " View recommended resources in <i>Support &amp; Resources</i>.</p>";
  handlemmdisplay();
//    getElementStyleObject("buttonERNavigatorT").backgroundImage = currT;
  	erNavActiveSmp = true;
}

function cmButtonClicked(arg)
{
  var guid = arg.split("_")[0];
  messagesPlugin.show(guid);
  getElementObject("commentName").value = PersistantValue.get("name");
  getElementObject("commentEmail").value = PersistantValue.get("email");
  loadComments(guid);
  return;
}

function favToggle(arg)
{
  var guid = arg.split("_")[0];
  var temp1 = guid
  var wrapperID = "#wrapper" + currentDealList + arg
  if(isInFavDeals(temp1)){
    removeFromFavDeals(temp1);
    $(wrapperID).removeClass("favorite");
    getElementObject("fav" + arg).src = "images/favButton.png";
  }

  else{
    addToFavDeals(temp1);
    $(wrapperID).addClass("favorite");
    getElementObject("fav" + arg).src = "images/favButtonActive.png";
  }

  if(currentDealList === "msgListFav"){
    favDealsActive(); 
  }

}

function collapseAll()
{
  activityIndicator.show();
  setTimeout('activityIndicator.hide()', 700);
  $(".dealWrapper").fadeOut(0);
  setTimeout("refreshDealScroll(true)", 300);
  getElementStyleObject("collapseAll").display = "none";
}


function getShareLink()
{
	var url = "https://caresapp.me/apps/share.html#";
	var retS = "";
	var lg = "Es";
	if(Language === "English"){
		lg = "En";
	}
    if(Canvas.current === "places"){
      retS = url + "0,";
      retS += Location + ",";
      retS += Location + "ERN" + currERNav + ",";
      retS += lg;
    }
    else if(Canvas.current === "products"){
      retS = url + "1,";
      retS += Location + ",";
      retS += currHealthInfo + ",";
      retS += lg;
    }
    else if(Canvas.current === "orders"){
      retS = url + "2,";
      retS += Location + ",";
      retS += currAfterER + ",";
      //retS += lg;
    }
    return retS;
}


function gotoApps()
{
    mainMenuButtons.selected("buttonERNavigator");
}

function handlemmdisplay()
{
    var n = patLocs.length;
    getElementObject("appBadge").innerHTML = n.toString();
    if(n == 0){
        getElementStyleObject("buttonAppSettings").display = "none";
        getElementStyleObject("buttonERNavigatorT").backgroundImage = "";
        getElementStyleObject("appBadge").opacity = "";
    }
    else{
        getElementStyleObject("buttonAppSettings").display = "inline-block";
        getElementStyleObject("appBadge").opacity = "1";
    }
}


