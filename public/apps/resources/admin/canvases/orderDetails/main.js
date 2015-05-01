var dwstate = false;

function downloadClicked()
{
    if(dwstate){
        dwMsg();
    }
    else{
        dwMsgCurr();
    }
}


var orderDetailsinit = function()
{
  getElementStyleObject("refreshButtonBBox").display = "none";
  getElementStyleObject("backButtonBBox").display = "none";
  getElementStyleObject("dwButtonBBox").display = "none";
  getElementObject("refreshButtonBBox").innerHTML = "<a href='javascript:refMsg()'> <div class='flip0 refreshButton'></div></a>";
  getElementObject("backButtonBBox").innerHTML = "<a href='javascript:backMsg()'> <div style='display:block' class='flip0 backButton'></div></a>";
  getElementObject("dwButtonBBox").innerHTML = "<a href='javascript:downloadClicked()'> <div class='flip0 dwButton'></div></a>";
  getElementObject("secureMessagesDateWrapper").innerHTML = "<select id='smDateDay' class='dateDD' onchange='smChanged()'>" + dayselect + "</select>"+
	"<select id='smDateMonth' onchange='smChanged()' class='dateMM'>" + monthselect + "</select>"+
	"<select id='smDateYear' onchange='smChanged()' class='dateYYYY'>" + yearselect + "</select>";
  getElementObject("secureMessagesTillWrapper").innerHTML = "<select class='selectInput' onchange='smChanged()' id='smTill'>" +
	"<option value='1'> + 1 days </option>" +
	"<option value='3'> + 3 days </option>" +
	"<option value='7'> + 7 days </option>" +
	"<option value='14'> + 14 days </option>" +
  	"</select>";
  /*getElementObject("secureMessagesOptionsBBox0").innerHTML = 
    '<p class="textright">'+
    '<a href="javascript:refMsg()" class="notOptionButton refMsg">Refresh</a>'+
    '<span> | </span>'+
    '<a href="javascript:dwMsg()" class="notOptionButton dwMsg">Download</a>'+
    '</p>';*/
  getElementObject("secureMessagesFromWrapper").innerHTML = "<select onchange='smChanged()' class='selectInput'  id='smFrom'> </select>";
  getElementObject("secureMessagesOptionsBBox").innerHTML = '<a href="javascript:updateSM()"><p style="margin-top:0px" class="deleteNo glassFinish"> Update</p> </a>'+
	'<a href="javascript:clearSM()"> <p id="" class="deleteYes glassFinish"> Cancel</p></a>';
}

function refMsg()
{
    updateSM();
}

function clearSM()
{
	getElementObject("smDateDay").value = lD.dd;
	getElementObject("smDateMonth").value = lD.mm.toString();
	getElementObject("smDateYear").value = lD.yyyy;
	getElementObject("smTill").value = lD.days;
	getElementObject("smFrom").value = lD.pros;
    getElementStyleObject(optDiv).display = "none";
    getElementStyleObject(listDiv).display = "block";
  getElementStyleObject("secureMessagesOptionsBBox0").display = "block";
}

function orderDetailsActive()
{
    dwstate = true;
  getElementObject("secureMessagesDate").innerHTML = "Today is " + days[new Date().getDay()] + ", " + moment().format("MMM Do YYYY") + ".";
	var outS = "";
	outS += "<option value='" + "ALL" + "'>"+ "All" +"</option>";
	for (var i=0; i < providersDict.length; i++){
		outS += "<option value='" + providersDict[i].userID + "'>"+ providersDict[i].name +"</option>";
	}
	getElementObject("smFrom").innerHTML = outS;

	var t = getTodayDS();
	getElementObject("smDateDay").value = t.dd;
	getElementObject("smDateMonth").value = t.mm;
	getElementObject("smDateYear").value = t.yy;
	getElementObject("smTill").value = "1";
    updateSM();
}

var optDiv = 'secureMessagesOptionsBBox';
var listDiv = 'secureMessagesList';
var lD = {};

function getsmdate()
{
	lD.dd = getElementObject("smDateDay").value;
	lD.mm = parseInt(getElementObject("smDateMonth").value);
	lD.yyyy = getElementObject("smDateYear").value;
	lD.days = getElementObject("smTill").value;
	lD.pro = getElementObject("smFrom").value;
	return new Date(lD.yyyy, lD.mm, lD.dd, 0, 0, 0,0);
}


function updateSM()
{
  var temp = getsmdate();
  if(temp.toString() === "Invalid Date"){
    alertHandler.flashNewMessage("Invalid date and time", "Please enter a valid date and time.");
    return;
  }
  var fromdate = temp.getTime().toString();
  var t = parseInt(getElementObject("smTill").value);
  var todate = new Date(temp.getTime() + t*24*60*60*1000).getTime().toString();
  var from = getElementObject("smFrom").value;
  activityIndicator.show();

  var url = App.mainURL;
  url = url + "getSecureMessages";
  url = url + "?loc=" + Location;
  url = url + "&fromdate=" + fromdate;
  url = url + "&todate=" + todate;
  url = url + "&from=" + from;
  var callback = updateSM_CB;
  loadFile(url, callback);
}

var currMsgs = {};

function backMsg()
{
    dwstate = true;
    getElementStyleObject("smListWrapper").display = "block";
    getElementStyleObject("secureMessageDetails").display = "none";
    scrollToLastScroll();
      if(!ENV.device.touchSupport){
           $("#canvasWrapper").animate({"scrollTop":currs}, 200);
       }
      setTimeout("selectedStyle.clean();", 500);
  getElementStyleObject("refreshButtonBBox").display = "block";
  getElementStyleObject("backButtonBBox").display = "none";
  getElementStyleObject("dwButtonBBox").display = "block";
}

function getCurrMsgObj(key)
{
    for (var i = 0; i < currMsgs.length; i++){
        if(currMsgs[i].notID === key){
            return currMsgs[i];
        }
    }
    return null;
}

function getCurrMsgHTML(theObj)
{
    if(theObj == null){
        return "Unable to retrieve message...";
    }
    var pInfo = theObj;
    var pKeys = Object.keys(pInfo);
    var temp;
    var outS = "";

    var bodyT = "<i> This messsage contains no body </i>";
    if(pKeys.contains("body") >=0){
        bodyT = pInfo.body;
    }
    temp = "date";
    var dateSt = "";
    if(pKeys.contains(temp) >=0){
        dateSt = new moment(parseInt(pInfo.date)).format('MMMM Do YYYY, h:mm:ss a');
    }
    temp = "message";
    if(pKeys.contains(temp) >=0){
        var not = pInfo[temp];
    }
                
    outS = "<h1>" + not + "</h1><div style='margin-top: 10px; margin-bottom:10px'>" + bodyT + "</div>";
    outS = outS + "<em>" + dateSt + "</em>" + "<div class='horizontalLine'> </div>";
    return outS;
}


var currM = null;

function smSelected(key)
{
    if(getCurrMsgObj(key).rem){ remalert1 = true}
    else{remalert1 = false}
    dwstate = false;
    var ty = "n" + currl + key;
    selectedStyle.add(ty);
      currs = getElementObject("canvasWrapper").scrollTop;
    getElementStyleObject("smListWrapper").display = "none";
    getElementStyleObject("secureMessageDetails").display = "block";
    currM = getCurrMsgObj(key);
  getElementStyleObject("refreshButtonBBox").display = "none";
  getElementStyleObject("backButtonBBox").display = "block";
  getElementStyleObject("dwButtonBBox").display = "block";


  activityIndicator.show();

  var url = App.mainURL;
  url = url + "getNotification";
  url = url + "?notID=" + key;
  var callback = function (data){
    var outS =
        "<div class='' style='height:70px; width: 70px;background-size: contain;margin-left:0px; border-radius:5px; background-image:url(" + App.resURL + Location + "icon.png)'></div>" +
        "<div class=''>" + getCurrMsgHTML(JSON.parse(data)) + "</div>";
    getElementObject("secureMessageDetails").innerHTML = outS;
	scrollRefreshAll();
    activityIndicator.hide();
  };
  loadFile(url, callback);

}

function dwMsg()
{
    var outS = 
        "<a class='link' href='javascript:dwXML()'> Download as XML </a>" 
       + "<br>"
       + "<br>"
       +"<a class='link' href='javascript:dwJSON()'> Download as JSON </a>" 
       + "<br>"
       + "<br>"
       +"<a class='link' href='javascript:dwCSV()'> Download as CSV </a>" 
       + "<br>"
       + "<br>"
       +"<a class='link' href='javascript:dwHTML()'> Download as HTML </a>" 
       + "<br>"
       + "<br>";
    if(remalert){
        outS += "<i>* You may be downloading unsent reminders. Please be aware that the provider can unset these before they are sent out.</i>";
    }
  dialogMessage.display(outS, "images/dwwhite.png", "Done", "");
}

function dwXML()
{
    activityIndicator.show();
    var x2js = new X2JS();
    var str = x2js.json2xml_str(currMsgs);
    downloadFile(str, "xml");
    activityIndicator.hide();
}

function dwJSON()
{
    activityIndicator.show();
    var str = JSON.stringify(currMsgs);
    downloadFile(str, "json");
    activityIndicator.hide();
}

function dwCSV()
{
    activityIndicator.show();
    var str = JSON2CSV(currMsgs);
    downloadFile(str, "csv");
    activityIndicator.hide();
}

function dwHTML()
{
    activityIndicator.show();
    var str = 
        "<div class='' style='height:70px; width: 70px;background-size: contain;margin-left:0px; border-radius:5px; background-image:url(" + App.resURL + Location + "icon.png)'></div>";
    for(var i = 0; i < currMsgs.length; i++){
        str += getCurrMsgHTML(currMsgs[i]);
    }
    downloadFile(str, "html");
    activityIndicator.hide();
}


function dwMsgCurr()
{
    var outS = 
        "<a class='link' href='javascript:dwXMLCurr()'> Download as XML </a>" 
       + "<br>"
       + "<br>"
       +"<a class='link' href='javascript:dwJSONCurr()'> Download as JSON </a>" 
       + "<br>"
       + "<br>"
       +"<a class='link' href='javascript:dwCSVCurr()'> Download as CSV </a>" 
       + "<br>"
       + "<br>"
       +"<a class='link' href='javascript:dwHTMLCurr()'> Download as HTML </a>" 
       + "<br>"
       + "<br>";
    if(remalert1){
        outS += "<i>* You may be downloading an unsent reminder. Please be aware that the provider can unset this before they are sent out.</i>";
    }
  dialogMessage.display(outS, "images/dwwhite.png", "Done", "");
}

function dwXMLCurr()
{
    var x2js = new X2JS();
    var str = x2js.json2xml_str([currM]);
    downloadFile(str, "xml");
}

function dwJSONCurr()
{
    var str = JSON.stringify(currM);
    downloadFile(str, "json");
}

function dwCSVCurr()
{
    var str = JSON2CSV([currM]);
    downloadFile(str, "csv");
}

function dwHTMLCurr()
{
    var str = getCurrMsgHTML(currM);
    downloadFile(str, "html");
}

function cleanupCurrMsgs()
{
    for (var i = 0; i < currMsgs.length; i++){
        var keys = Object.keys(currMsgs[i]);
        if(keys.indexOf("date") >=0){
            currMsgs[i].date = new moment(parseInt(currMsgs[i].date)).format('MMMM Do YYYY, h:mm:ss a');
        }
        if(keys.indexOf("postdate") >=0){
            currMsgs[i].postdate = new moment(parseInt(currMsgs[i].postdate)).format('MMMM Do YYYY, h:mm:ss a');
        }
        var temp = "token" 
        if(keys.indexOf(temp) >=0){
            delete currMsgs[i][temp];
        }
        temp = "archived" 
        if(keys.indexOf(temp) >=0){
            delete currMsgs[i][temp];
        }
        temp = "read" 
        if(keys.indexOf(temp) >=0){
            delete currMsgs[i][temp];
        }
        temp = "star" 
        if(keys.indexOf(temp) >=0){
            delete currMsgs[i][temp];
        }
        temp = "pushed" 
        if(keys.indexOf(temp) >=0){
            delete currMsgs[i][temp];
        }
        temp = "_id" 
        if(keys.indexOf(temp) >=0){
            delete currMsgs[i][temp];
        }
    }
}

var remalert = false;
var remalert1 = false;
function updateSM_CB(data)
{
  remalert = false;
  activityIndicator.hide();
  getElementStyleObject(optDiv).display = "none";
  getElementStyleObject(listDiv).display = "block";
  if(data === ""){
    return;
  }
  var pInfo = JSON.parse(data);
  currMsgs = pInfo;
  if(pInfo.length == 0){
	    getElementObject("secureMessagesList").innerHTML = "<p class='titleText'>No messages here. Please select a different date/range/" + CARESTEAMLOGO + " members.</p>";
  getElementStyleObject("refreshButtonBBox").display = "none";
  getElementStyleObject("backButtonBBox").display = "none";
  getElementStyleObject("dwButtonBBox").display = "none";
        getElementStyleObject("secureMessagesOptionsBBox0").display = "none";
    return;
  }
    


  getElementStyleObject("secureMessagesOptionsBBox0").display = "block";
  var pKeys;
  var name = "<i>No Subject</i>";
  var city = "";
  var proName = "";
  var date = "";
  var outS = "";
  var classSt = "listItem arrowFinish";
  var count = 0;
  var currDate = new Date().getTime().toString();
  currl = new Date().getTime().toString();

  for(var i = 0; i<pInfo.length; i++){
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
    outS = outS + "<a id='n" + currl + pInfo[i].notID  + "' class='" + classSt+ "' href='javascript:smSelected(" + '"' + pInfo[i].notID + '")' + "'> <div class='notPic' style=" + '"' + "background-image: url(" + App.resURL + pInfo[i].loc + "icon.png)" +'"' + "> </div>";
    if(pInfo[i].date > currDate){
        outS += "<div class='rem msgbadge'></div>";
        remalert = true;
        pInfo[i].rem = true;
    }
    else{
        pInfo[i].rem = false;
    }
    outS +="<div style='height:auto;line-height:20px' class='line1'>" + name + "</div><div class='line2'>" + proName +  city +  "<br>" + date + ".</div></a>";
  }
  getElementObject("secureMessagesList").innerHTML = 
      outS;
  getElementStyleObject("refreshButtonBBox").display = "block";
  getElementStyleObject("backButtonBBox").display = "none";
  getElementStyleObject("dwButtonBBox").display = "block";
  //$("#" + Canvas.current + " .ListWrapper").fadeOut(0).fadeIn(0);
  cleanupCurrMsgs();
}


function smChanged()
{
  getElementStyleObject(optDiv).display = "block";
  getElementStyleObject(listDiv).display = "none";
  getElementStyleObject("refreshButtonBBox").display = "none";
  getElementStyleObject("backButtonBBox").display = "none";
  getElementStyleObject("dwButtonBBox").display = "none";
}

function orderDetailsDeActive()
{
    backMsg();
    currMsgs = {};
  getElementStyleObject("refreshButtonBBox").display = "none";
  getElementStyleObject("backButtonBBox").display = "none";
  getElementStyleObject("dwButtonBBox").display = "none";
}


function JSON2CSV(objArray) {
       var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

       var str = '';
       var line = '';

       var head = array[0];
       if ($("#quote").is(':checked')) {
           for (var index in array[0]) {
               var value = index + "";
               line += '"' + value.replace(/"/g, '""') + '",';
           }
       } else {
           for (var index in array[0]) {
               line += index + ',';
           }
       }

       line = line.slice(0, -1);
       str += line + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            if (true) { //quote values
                for (var index in array[i]) {
                    var value = array[i][index] + "";
                    line += '"' + value.replace(/"/g, '""') + '",';
                }
            } else {
                   for (var index in array[i]) {
                       line += array[i][index] + ',';
                   }
            }
            line = line.slice(0, -1);
            str += line + '\r\n';
        }
        return str;
}
