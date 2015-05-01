var data2;
var currentDealList;
var lastLoadedDeal = 0;
var doListReset = true;

var isOpen = ",";
var isFav = ",";
favJSON = "{}";

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
    console.log(messages[msgKeys[i]].categories.toString());
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

function homeButtonAppSpec()
{
	hideAddButton();
	hideEditButton();
}

function getShareLink(lg)
{
	var url = "https://caresapp.me/apps/share.html#";
	var retS = "";
    if(Canvas.current === "caresadmin-erNavigator"){
      retS = url + "0,";
      retS += Location + ",";
      retS += Location + "ERN" + currERNav + ",";
      retS += lg;
    }
    else if(Canvas.current === "caresadmin-healthInfo"){
      retS = url + "1,";
      retS += Location + ",";
      retS += currHealthInfo + ",";
      retS += lg;
    }
    else if(Canvas.current === "caresadmin-afterER"){
      retS = url + "2,";
      retS += Location + ",";
      retS += currAfterER + ",";
      //retS += lg;
    }
    return retS;
}

var CARESLOGO = "<span class='caresLogo'><span class='blue'>CARES</span><span class='red'>app</span>&trade; </span>";
var CARESTEAMLOGO = "<span class='caresLogo'><span class='blue'>CARE</span><span class='red'>team</span>&trade; </span>";
var CARESTEAMSLOGO = "<span class='caresLogo'><span class='blue'>CARE</span><span class='red'>teams</span>&trade; </span>";

