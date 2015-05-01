var dialogYes = 'dialogYes blueFillButton';
var dialogNo = 'dialogNo redFillButton';

var color =
{
	selected: "#53a6cc",
	gold: "gold",
	white: "white"	
}
   
function pausecomp(millis) 
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); } 
while(curDate-date < millis);
}
    

var allListWrappers =  ["diseaseContainerWrapper", "healthInfoListWrapper", "medProbListWrapper", "medicationListWrapper", "medAlgListWrapper", "surgListWrapper", "insListWrapper"];

    
var activityIndicator = {
  no: 1,
	setText: function(msg){
		getElementObject("theActivityIndicatorText").innerHTML = msg;
	},
	show: function(){
		$("#activityIndicator").fadeIn(10);
		getElementStyleObject("noitem").opacity = "0";  
	//	$(".theActivityIndicatorWrapper").animate({"margin-top":"-10px"}, "slow");
	    setInterval("activityIndicator.end(" + activityIndicator.no + ")", 30000);
	},
	hide: function(){
		$("#activityIndicator").fadeOut(400);
		setTimeout('getElementObject("theActivityIndicatorText").innerHTML = "Loading...";  ', 500); 
		
	//	$(".theActivityIndicatorWrapper").animate({"margin-top":"-500px"}, "slow");
		getElementStyleObject("noitem").opacity = "1";  
    activityIndicator.no = activityIndicator.no + 1;
	},
  end: function(n){
    if(n == activityIndicator.no){
      // reload code;
      // window.location.href = "../logout.html#admin"
      //logoutClicked();
	  dialogMessage.display('<div class="textleft">Unable to load server data... <ol> <li>Check your internet connection. </li><li>Try again after a few minutes. </li><li>If the above steps fail logout and login again.</li></ol></div>', "images/alertwhite.png", "Continue", "activityIndicator.hide();dialogMessage.done();");
    }
  }
}   

var alertHandler =
{
	lastMessageDiv : 0,
	duration: 4500, 
	msgSemaphore: false, 
	
	outAnimation: "",
	inAnimation: "",
	
	initialize: function(){
		Helper.goDown('message_0'); 
		this.msgSemaphore = false;
		this.lastMessageDiv = 0;
	},
	     
	
	flashNewMessage : function(msg, msgAux,msgImage){  
	    msgImage = msgImage || "glyphicons glyphicon-envelope"; 
        alert(msgImage);
        Helper.goDown('message_' + alertHandler.lastMessageDiv);

		if (this.msgSemaphore){ 
			this.msgSemaphore = false;
			return;
		}          
		
		this.lastMessageDiv++;
		
		var Parent = document.getElementById("messagesWrapper");
		var NewLI = document.createElement("LI");
		var outS =  "<h1>" +  msg + "</h1>" +  "<p>" +  msgAux + "</p>" ;
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >=0 ){
            outS = "<div class='messageThumb' style='url(" + msgImage + ")'></div>" + outS;
        }
        else{
            outS = "<div class='messageThumb " + msgImage + "'></div>" + outS;
        }

		NewLI.innerHTML =  outS;
        NewLI.className = "message hilitetext";
		NewLI.id = "message_" + this.lastMessageDiv;
		NewLI.className = "message " + alertHandler.class;
		alertHandler.class = "";
		Parent.appendChild(NewLI);	
		                               
		Helper.addTapElement("message_" + alertHandler.lastMessageDiv, alertHandler.bringItDownNow);
		
		this.__bringItDown(this.lastMessageDiv);
		this.bringItUpNow(this.lastMessageDiv);
		
	},
	
	__bringItDown: function(aMsgDiv){
		setTimeout('Helper.goDown("message_' + aMsgDiv + '")', this.duration);
	},
	
	bringItDownNow: function(){
		Helper.goDown('message_' + alertHandler.lastMessageDiv);
	},  
	    
	bringItUpNow: function(aMsgDiv){
		Helper.goCenter('message_' + aMsgDiv);
	}
	
	
	
	
}
Array.prototype.remove = function() {
	    var what, a = arguments, L = a.length, ax;
	        while (L && this.length) {
			        what = a[--L];
				        while ((ax = this.indexOf(what)) !== -1) {
						            this.splice(ax, 1);
							            }
					    }
		    return this;
};

if(!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function(what, i) {
		            i = i || 0;
			            var L = this.length;
				            while (i < L) {
						                if(this[i] === what) return i;
								            ++i;
									            }
					            return -1;
						        };
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return i;
        }
    }
    return -1;
}


function initializeButtonClicks()
{
	document.getElementById("body").addEventListener('touchstart', appWrapperTouchStart, false);
	document.getElementById("body").addEventListener('touchmove', appWrapperTouchMove, false);
	document.getElementById("body").addEventListener('touchend', appWrapperTouchEnd, false);
	document.getElementById("body").addEventListener('touchcancel', appWrapperTouchCancel, false);

	return;
}

var posTouchStart;
var posTouchEnd;
                            

function getiScrollState(){
    //return 0;
	return getiScrollStateSpec();
}

function appWrapperTouchStart(event)
{           	
	var divID = event.target.id;
  //console.log(divID);
	var divPos = Helper.buttonElements.contains(divID);
	
	posTouchStart = getiScrollState(); 

	if (divPos < 0){
		return;
	}
	
	Helper.buttonElementsStatus[divPos] = "touched";
	
	
	
}



function appWrapperTouchMove()
{
	
}


function appWrapperTouchEnd(event)
{        
	//if(Helper.noOfTouchesOnScreen > 1){return;}
	
	var divID = event.target.id;
	var divPos = Helper.buttonElements.contains(divID);
	
	Helper.lastTouchEnd = divID;
    
	posTouchEnd = getiScrollState(); 
	
	if (divPos >= 0){

		if (Helper.buttonElementsStatus[divPos] === "touched"){			
			if (posTouchEnd == posTouchStart){
				Helper.buttonElementsTarget[divPos]();
			}
		}
	}
	
	for (var j = 0; j < Helper.buttonElementsStatus.length; j++){
		Helper.buttonElementsStatus[j] = "none";
	}
	
}


function appWrapperTouchCancel()
{
	for (var j = 0; j < Helper.buttonElementsStatus.length; j++){
		Helper.buttonElementsStatus[j] = "none";
	}	
}


function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft;// - el.scrollLeft;
        _y += el.offsetTop;// - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
          

var confirmation = {  
	initialize: function(){
		Helper.goDown("confMessage");
	},                                                       
	
	yesCallback : null,
	noCallback : null,
	
	alert: function(message){     
		getElementObject("confMessageQ").innerHTML = message;  
        Helper.goCenter("confMessage"); 	
	}
}


/* the master object that holds important variables that can dictate app behavior */

var Helper = {  
    
    startTop: null,
    startLeft: null,
    endTop: null,
    endLeft: null,
    
	noOfTouchesOnScreen:0, 
	              
	getHTMLsansLabel: function(divID){
		var t = getElementObject(divID).innerHTML;
		var pos = 0;
		for(var i=0; i<t.length; i++){
			if(t[i] === "<"){
				return t.substring(i);
			}
		}                                
		return outS;
	},
	
	applyStyle : {
    blur:function(divID){
        if(Helper.device.android){
            return;
        }
        getElementObject(divID).blur();
    },  
    
    focus:function(divID){
        if(Helper.device.android){
            return;
        }
        getElementObject(divID).focus();
    },  
        
    markRead: function(divID){
        getElementObject(divID).innerHTML = "Mark as unread";
    },  
        
    markUnread: function(divID){
        getElementObject(divID).innerHTML = "Mark as read";
    },  
        
    isBooked: function(divID){
        var t = getElementStyleObject(divID);
        t.backgroundColor = "transparent";
    },     
    isNotBooked: function(divID){
        var t = getElementStyleObject(divID);
        t.backgroundColor = "";
    },
        
        isMyPatient: function(divID){
            var t = getElementStyleObject(divID);
            t.backgroundColor = color.gold;
        },     
        isNotMyPatient: function(divID){
            var t = getElementStyleObject(divID);
            t.backgroundColor = "";  
        },
        
        selected: function(divID){
			 var t = getElementStyleObject(divID);
			 t.backgroundImage = "url('images/fns/tick.png')";
		},     
		unselected: function(divID){
			 var t = getElementStyleObject(divID);   
			 t.backgroundImage = "";  
		}, 
        
        unreadMail: function(divID){
            var t = getElementStyleObject(divID);
            t.backgroundImage = "url('images/fns/newMail.png')";
        },     
        readMail: function(divID){
            var t = getElementStyleObject(divID);   
            t.backgroundImage = "";
        }, 
        
		activity: function(divID){
			 var t = getElementStyleObject(divID);
			 t.backgroundImage = "url(images/pulse.png)";
			 t.backgroundPosition = "50%";
			 t.backgroundRepeat = "repeat-x"; 
		},   
		reqisNotSet: function(divID){
			 var t = getElementStyleObject(divID);
			 t.backgroundColor = color.gold;
		},
		reqisSet: function(divID){
			 var t = getElementStyleObject(divID);
			 t.backgroundColor = "";
		}
	},

	buttonElements : new Array(),
	buttonElementsStatus : new Array(),
	buttonElementsTarget : new Array(),
	
	initialize: function(){
		this.setZoom();
	},
	
	
	defaultScreenSize: {
		height: 920,
		width: 640
	},
		
	/* identify if any of the popular devices*/
 	device : {
		iOS : false,
		android : false,
		iPad : false,
		touchSupport: false
	},
	
	/* zoom percent -- useful to adjust drag-drop events and to scale appWrapper to fill the screen */
	
	zoom: 100,
	
	lastTouchEnd: null,
    
	
	setZoom: function(){
		var screenHeight = window.innerHeight;
		var screenWidth = window.innerWidth;
		var realHeight;
		var realWidth;
		
		var heightToWidthRatio = this.defaultScreenSize.height / this.defaultScreenSize.width;
		

		if (screenHeight < heightToWidthRatio * screenWidth){
			realHeight = screenHeight-0;
			realWidth = (1/heightToWidthRatio) * realHeight;
		}
		else{
			realWidth = screenWidth-0;
			realHeight = heightToWidthRatio * realWidth;
		}

		var zoom = realHeight/this.defaultScreenSize.height;

		zoomPercent = zoom * 100;
		document.getElementById('appWrapper').style.zoom = zoomPercent.toString() + "%";
		
		Helper.zoom = zoomPercent;

	},
	
	identifyDevice: function(){
		var agent = navigator.userAgent.toLowerCase();

		if( agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1) {
			Helper.device.iOS = true;
			Helper.device.android = false;
			Helper.device.iPad = false;
			Helper.device.touchSupport = true;
		}

		else if( agent.indexOf('ipad') != -1) {
			Helper.device.iOS = false;
			Helper.device.android = true;
			Helper.device.iPad = true;
			Helper.device.touchSupport = true;
		}

		else if( agent.indexOf('android') != -1) {
			Helper.device.iOS = false;
			Helper.device.android = true;
			Helper.device.iPad = false;
			Helper.device.touchSupport = true;
		}		
	},

	goUp: function(divID)
	{
		getElementStyleObject(divID).webkitTransform = "translate3d(0px,-1340px,0)";
		setTimeout('getElementStyleObject("' + divID + '").display = "none"', 600);
	},

    bringin: function(divID, dir, type, outdir)
	{
        dir = dir.capitalize();
        outdir = outdir.capitalize();
        getElementStyleObject( divID ).display = "block";
        $('#' + divID).removeClass(type + "Out" + outdir).addClass('animated ' + type + 'In' + dir);
	},
	
	takeout: function(divID, dir, type, indir)
	{
        dir = dir.capitalize();
        indir = indir.capitalize();
        getElementStyleObject( divID ).display = "block";
        $('#' + divID).removeClass(type + "In" + indir).addClass('animate ' + type + 'Out' + dir);
        //$('#' + divID).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
            setTimeout('getElementStyleObject("' + divID + '").display = "none"', 500);
	},
	
	goDown: function(divID)
	{
		getElementStyleObject(divID).webkitTransform = "translate3d(0px,1340px,0)";	
		getElementStyleObject(divID).mozTransform = "translate3d(0px,1340px,0)";	
		getElementStyleObject(divID).msTransform = "translate3d(0px,1340px,0)";	
		getElementStyleObject(divID).transform = "translate3d(0px,1340px,0)";	
		setTimeout('getElementStyleObject("' + divID + '").display = "none"', 600);
	},
	
	goCenter: function(divID)
	{
		getElementStyleObject(divID).display = "block";
		setTimeout('getElementStyleObject("' + divID + '").webkitTransform = "translate3d(0px,0,0)"', 100);
		setTimeout('getElementStyleObject("' + divID + '").mozTransform = "translate3d(0px,0,0)"', 100);
		setTimeout('getElementStyleObject("' + divID + '").msTransform = "translate3d(0px,0,0)"', 100);
		setTimeout('getElementStyleObject("' + divID + '").transform = "translate3d(0px,0,0)"', 100);
	},
	
	buttonEVClass: null,
	
	addButtonElement: function (divID, targetFunction)
	{
		// console.log(divID);
		
		if (this.buttonElements.indexOf(divID) < 0){
            this.buttonElements[this.buttonElements.length] = divID +'__eventListener';
            this.buttonElementsStatus[this.buttonElementsStatus.length] = "none";
            this.buttonElementsTarget[this.buttonElementsTarget.length] = targetFunction;
		}



		if(Helper.buttonEVClass == null){
			getElementObject(divID).innerHTML =	getElementObject(divID).innerHTML + '<div id="' + divID + '__eventListener"' + ' class="eventListener"></div>';
		}
		else{
			getElementObject(divID).innerHTML =	getElementObject(divID).innerHTML + '<div id="' + divID + '__eventListener"' + ' class="eventListener ' + Helper.buttonEVClass +'"></div>';			
			Helper.buttonEVClass = null;
		}
		
		
		if (!this.device.touchSupport){
			setTimeout('document.getElementById("' + divID + '__eventListener' + '").addEventListener("click",' + targetFunction + ', false)', 1000);
		}

		document.getElementById(divID).style.position = "relative";
		
	},
	
addButtonElementAtag: function (divID, targetFunction)
	{
   //console.log(targetFunction);
	getElementObject(divID).innerHTML =	getElementObject(divID).innerHTML + '<a href="javascript:' + targetFunction + '"' + ' class="eventListener"></a>';
		document.getElementById(divID).style.position = "relative";
		
	},
	
	
	
	addTapElement: function(divID, targetFunction){
		if (this.device.touchSupport){
			document.getElementById(divID).addEventListener('touchstart', targetFunction, false);
		}
		else{
			document.getElementById(divID).addEventListener('click', targetFunction, false);
		}
	}
	
};



/*
window.onresize = function() {
	setZoom();	
	return;
}
*/

function getElementById( name ) {
return getElementById.cache[ name ] = getElementById.cache[name] ||
document.getElementById(name); }
   getElementById.cache = {};



function getElementStyleObject( name ) {
  //console.log(name);
return getElementById.cache[ name ] = getElementById.cache[ name ] ||
document.getElementById( name ).style; }
   getElementStyleObject.cache = {};




function getElementObject( name ) {
return getElementObject.cache[ name ] = getElementObject.cache[ name ] ||
document.getElementById( name ); }
   getElementObject.cache = {};




function getLabelObject( name ) {
return getLabelObject.cache[ name ] = getLabelObject.cache[ name ] ||
getElementObject( name ).getElementsByTagName('p')[0]; }
   getLabelObject.cache = {};


var releaseItemIDs = ["ERNavRelease"];

function pullDownAction()
{
	return;
	for (var i=0; i < releaseItemIDs.length; i++){
		getElementStyleObject(releaseItemIDs[i]).webkitTransform = "rotate(0deg)";
		setTimeout('pullDownAction_Aux', 700);
	}
}

function pullDownAction_Aux(){
	for (var i=0; i < releaseItemIDs.length; i++){
		getElementStyleObject(releaseItemIDs[i]).webkitTransform = "rotate(180deg)";
	}
}	


function fadeOut(divID)
{
	getElementStyleObject(divID).opacity = "0";
	setTimeout('getElementStyleObject("' + divID + '").display = "none";', 500);	
}

function fadeIn(divID)
{
    getElementStyleObject(divID).display = "block";
	setTimeout('getElementStyleObject("' + divID + '").opacity = "1";', 20);		
}


function getStringAfter_(str)
{
    for (i=0; i< str.length; i++){
        if (str[i] === "_"){
            return str.substring(i+1);
        }
    }
    return "";
}


function getStringBefore_(str)
{
    var retS = "";
    for (i=0; i< str.length; i++){
        if (str[i] === "_"){
            break;
        }
        retS = retS + str[i];
    }
    
    return retS;
}

function getStringAfterColon(str)
{
    for (i=0; i< str.length; i++){
        if (str[i] === ":"){
            return str.substring(i+1);
        }
    }
    return "";
}


function getStringUptoColon(str)
{
    var retS = "";
    for (i=0; i< str.length; i++){
        if (str[i] === ":"){
            break;
        }
        retS = retS + str[i];
    }
    
    return retS;
}


var DateSlider = {
	callbackFn: null,
	dayValue: -1,
	monthValue: -1,
	yearValue: -1,
	
	dayPercent: 20,
	monthPercent: 20,
	yearPercent: 20,
	
	
	
	initialize: function(){

		
	},
	
	daysInMonth: function (month,year) {
	    return new Date(year, month, 0).getDate();
	},
	
	valueChangedYY: function(){
		DateSlider.yearPercent = parseFloat(getElementById("yearSlider").value);
		DateSlider.yearValue = parseInt(1900 + DateSlider.yearPercent *120 / 100);
		
		DateSlider.setDate();
	},
	
	valueChangedMM: function(){
		DateSlider.monthPercent = parseFloat(getElementById("monthSlider").value);
		DateSlider.monthValue = parseInt(1 + DateSlider.monthPercent *11 / 100);
		
		DateSlider.valueChangedDD();
	},
	
	valueChangedDD: function(){
		DateSlider.dayPercent = parseFloat(getElementById("daySlider").value);
		DateSlider.dayValue = parseInt(1 + DateSlider.dayPercent * (DateSlider.daysInMonth(DateSlider.monthValue, DateSlider.yearValue) - 0 ) / 100);
		
		DateSlider.setDate();
	},
	
	dateDivID: "theDate",

	setPersistantDate: function(){
		PV.dayPercent = DateSlider.dayPercent;
		PV.monthPercent = DateSlider.monthPercent;
		PV.yearPercent = DateSlider.yearPercent;
		
		PersistantValue.set("dayPercent", DateSlider.dayPercent.toString());
		PersistantValue.set("monthPercent", DateSlider.monthPercent.toString());
		PersistantValue.set("yearPercent", DateSlider.yearPercent.toString());
		//PersistantValue.refreshGlobals();
		PV.dayPercent
	},
	
	setDate: function(){
		var monthString = this.__getMonthString(this.monthValue);		
		var dayString = this.dayValue.toString(); 		
		var yearString = this.yearValue.toString(); 
		
		getElementObject(DateSlider.dateDivID).innerHTML = monthString + " " + dayString + ", " + yearString;		
		
	},

	__getMonthString: function(month){
		var ret = "";
		
		switch(month)
		{
		case 1:
			ret = "January";
		  	break;
		case 2:
			ret = "February";
		  	break;
		case 3:
			ret = "March";
			break;
		case 4:
			ret = "April";
		  	break;
		case 5:
			ret = "May";
		 	break;
		case 6:
			ret = "June";
		  	break;
		case 7:
			ret = "July";
		 	break;
		case 8:
			ret = "August";
	  		break;
		case 9:
			ret = "September";
		  	break;
		case 10:
			ret = "October";
		  	break;
		case 11:
			ret = "November";
		  	break;
		case 12:
			ret = "December";
		  	break;
		
		default:
			ret = "** error **";
		}
		
		return ret;
	}
	
	
}


var PersistantValue = {
	refreshGlobals: null,
	
	set: function (handle, value)
	{
	    localStorage.removeItem(handle);
	    localStorage.setItem(handle, value.toString());
    
	    return;
	},

	get: function (handle)
	{
	    if (localStorage.getItem(handle) == null){
	        return null;
	    }
	    else{
	        return localStorage.getItem(handle);
	    }
	},

	check: function (handle)
	{
	    if (localStorage.getItem(handle) == null){
	        return false;
	    }
	    else{
	        return true;
	    }
	}
}



function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
                (
                        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
                );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[ 1 ];

                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (
                        strMatchedDelimiter.length &&
                        (strMatchedDelimiter != strDelimiter)
                        ){

                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push( [] );

                }


                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[ 2 ]){

                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        var strMatchedValue = arrMatches[ 2 ].replace(
                                new RegExp( "\"\"", "g" ),
                                "\""
                                );

                } else {

                        // We found a non-quoted value.
                        var strMatchedValue = arrMatches[ 3 ];

                }


                // Now that we have our value string, let's add
                // it to the data array.
                arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
}


function loadFile(filename, callback)
{
    var aXMLHttpRequest = getXMLHTTPRequest();
    var	allData;

    if (aXMLHttpRequest)
    {
        aXMLHttpRequest.open("GET", filename, true);
        
	    aXMLHttpRequest.onreadystatechange = function (aEvt) {
    		if(aXMLHttpRequest.readyState == 4){
	 			allData = aXMLHttpRequest.responseText;
				callback(allData)
		    }
	    };
	    
	    //Lets fire off the request
        aXMLHttpRequest.send(null);
    }
    else
    {
        //Oh no, the XMLHttpRequest object couldn't be instantiated.
        alert("A problem occurred instantiating the XMLHttpRequest object.");
    }
}


/*
This method uses a couple different methods of instantiating the
XMLHttpRequest object. The reason we do this is so we can support
multiple browser (I've only tested in IE and Firefox).
*/
function getXMLHTTPRequest()
{
    var request;
    
    // Lets try using ActiveX to instantiate the XMLHttpRequest object
    try{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(ex1){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(ex2){
            request = null;
        }
    }

    // If the previous didn't work, lets check if the browser natively support XMLHttpRequest 
    if(!request && typeof XMLHttpRequest != "undefined"){
        //The browser does, so lets instantiate the object
        request = new XMLHttpRequest();
    }

    return request;
}


function tokenize(str)
{
	while(str[0] === " " || str[0] === "\t"){
		str = str.substring(1);
	}
	
	while(str[str.length - 1 ] === " " || str[0] === "\t"){
		str = str.substring(0,str.length-1);
	}
	
	return str;
}      


var listFilter = {
	currentList: null, 
	currentOption: "az",
	currentAlpha: "A", 
	currentTag: "All", 
	searchTerm: "", 
	
	initialize: function(){          
		//Helper.addTapElement("alphaLabel", listFilter.alphaLabelClicked);
		Helper.addTapElement("alphaRight", listFilter.alphaRightClicked);
		Helper.addTapElement("alphaLeft", listFilter.alphaLeftClicked);   
		
		//Helper.addTapElement("tagsLabel", listFilter.tagsLabelClicked);
		
		Helper.addTapElement("filterTagsButton", listFilter.tagsClicked);
		Helper.addTapElement("filterAddNewButton", listFilter.addNewClicked);
		Helper.addTapElement("filterSearchButton", listFilter.searchClicked);
		Helper.addTapElement("filterAZButton", listFilter.azClicked);

		Helper.addTapElement("filterSearchGoButton", listFilter.searchNow);
		Helper.addTapElement("searchLabel", listFilter.searchClicked);

		
		this.currentList = null;
		this.currentOption = "az";
		this.updateDisplay();
		listFilter.azClicked(); 
		listFilter.hide(); 
		
		document.getElementById("selectAlpha").addEventListener('change', listFilter.alphaChanged2, false);
	   
	 	document.getElementById("selectTags").addEventListener('change', listFilter.tagsChanged, false); 
	
		listFilter.azClicked();
		
	},   
	 
    alphaLabelClicked: function()
	{
		Helper.applyStyle.focus("selectAlpha");
		document.body.scrollTop = 0;
		document.body.scrollLeft = 0;  
	},   
         
    tagsLabelClicked: function()
	{
		Helper.applyStyle.focus("selectTags");
		document.body.scrollTop = 0;
		document.body.scrollLeft = 0;  
	},
	
	alphaRightClicked: function()
	{
		if (listFilter.currentAlpha === "Z"){
			return;
		}         
		listFilter.currentAlpha =  String.fromCharCode(listFilter.currentAlpha.charCodeAt(0) + 1);      
		listFilter.alphaChanged();   	
	},   

	alphaLeftClicked: function()
	{
		if (listFilter.currentAlpha === "A"){
			return;
		}         
		listFilter.currentAlpha =  String.fromCharCode(listFilter.currentAlpha.charCodeAt(0) - 1);      
		listFilter.alphaChanged();
  	},
	    
	searchNow: function(){  
		     
		activityIndicator.show();
		      
		getElementObject("filterSearchInput").blur();
		listFilter.showiScrolls();
		
		listFilter.searchTerm = getElementObject("filterSearchInput").value;
		getElementObject("searchLabel").innerHTML = "<h1> Search results for </h1> <h2>" + listFilter.searchTerm + "</h2> <h3> tap to change </h3>"
		
		if (listFilter.currentList == "healthInfo"){
        	searchHI(listFilter.searchTerm); 
		}  
		
		if (listFilter.currentList == "afterER"){
        	searchAER(listFilter.searchTerm); 
		}     
		if (listFilter.currentList == "medProbs"){                        
			searchMedProbs(listFilter.searchTerm); 
		}  
		if (listFilter.currentList == "surgs"){                        
			searchSurgs(listFilter.searchTerm); 
		}  
		
		if (listFilter.currentList == "meds"){
			searchMeds(listFilter.searchTerm);  
		}
		
		if (listFilter.currentList == "medAlgs"){
			searchMedAlgs(listFilter.searchTerm);  
		}       
		  
		if (listFilter.currentList == "ins"){
			searchIns(listFilter.searchTerm);  
		}
		
		getElementStyleObject("filterSearchInput").display = "none";
		getElementStyleObject("filterSearchGoButton").display = "none";
		getElementStyleObject("searchLabel").display = "block";  
		
		handleInputFocus();
		               
		activityIndicator.hide();
		
	},
	 
	alphaChanged: function(){
		var newS = listFilter.currentAlpha;
		getElementObject("selectAlpha").value = newS;
		listFilter.__newAlphabetSelected(); 
		//getElementObject("alphaLabel").innerHTML = newS;
	},  
	   
	alphaChanged2: function(){
		listFilter.currentAlpha = getElementObject("selectAlpha").value;
		listFilter.__newAlphabetSelected(); 
		//getElementObject("alphaLabel").innerHTML = listFilter.currentAlpha;
	},
	     
	__newAlphabetSelected: function(){

            
		var letter = listFilter.currentAlpha;
		
		if (listFilter.currentList == "healthInfo"){
        	alphabetSelectedHI(letter); 
		}  
		
		if (listFilter.currentList == "afterER"){
        	alphabetSelectedAER(letter); 
		}  
		
		if (listFilter.currentList == "medProbs"){
        	alphabetSelectedMedProbs(letter); 
		}
		
		if (listFilter.currentList == "surgs"){
			alphaSurgs(letter);  
		}
		  
		if (listFilter.currentList == "meds"){
			alphaMeds(letter);  
		}
		
		if (listFilter.currentList == "medAlgs"){
			alphaMedAlgs(letter);  
		}    
		
		if (listFilter.currentList == "ins"){
			alphaIns(letter);  
		}
	},
	
	tagsChanged: function(){
		listFilter.currentTag = getElementObject("selectTags").value;
		listFilter.__newTagSelected(); 
		//getElementObject("tagsLabel").innerHTML = listFilter.currentTag;
	},   
	
	tagsChanged2: function(){
		var newS = listFilter.currentTag;
		getElementObject("selectTags").value = newS;
		listFilter.__newTagSelected(); 
		//getElementObject("tagsLabel").innerHTML = newS;
	},
	
	__newTagSelected: function(){
            
		var letter = listFilter.currentTag;
		
		if (listFilter.currentList === "afterER"){
        	tagSelected(letter); 
		}
	},                                   
	

	
	setCurrentList: function(aList){
		listFilter.currentList = aList;
		listFilter.currentOption = "az";  
        listFilter.currentAlpha = "A";

		if(aList === "healthInfo"){
			 getElementStyleObject("filterTagsButton").display = "none";
			 getElementStyleObject("filterAddNewButton").display = "none";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		}   
		if(aList === "afterER"){
			 getElementStyleObject("filterTagsButton").display = "block";
			 getElementStyleObject("filterAddNewButton").display = "none";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		} 
		
		if(aList === "medProbs"){
			 getElementStyleObject("filterTagsButton").display = "none";
			 getElementStyleObject("filterAddNewButton").display = "block";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		}
		
		if(aList === "meds"){
			 getElementStyleObject("filterTagsButton").display = "none";
			 getElementStyleObject("filterAddNewButton").display = "block";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		}
		
		if(aList === "medAlgs"){
			 getElementStyleObject("filterTagsButton").display = "none";
			 getElementStyleObject("filterAddNewButton").display = "block";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		}
		
		if(aList === "surgs"){
			 getElementStyleObject("filterTagsButton").display = "none";
			 getElementStyleObject("filterAddNewButton").display = "block";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		}
		
		if(aList === "ins"){
			 getElementStyleObject("filterTagsButton").display = "none";
			 getElementStyleObject("filterAddNewButton").display = "none";
			 getElementStyleObject("filterSearchButton").display = "block";
			 getElementStyleObject("filterAZButton").display = "block";
		}     
		
        
		listFilter.azClicked();
		 	
	},   
	                
	
	azClicked: function(){ 
		activityIndicator.show();
		        
		getElementObject("filterSearchInput").blur();
		getElementObject("filterAddNewInput").blur();
		getElementObject("selectTags").blur();
		                         
		setTimeout("listFilter.showiScrolls()", 20);
   		 
		 getElementStyleObject("filterAZButton").backgroundColor = color.gold;
		 getElementStyleObject("filterTagsButton").backgroundColor = "transparent";
		 getElementStyleObject("filterAddNewButton").backgroundColor = "transparent";
		 getElementStyleObject("filterSearchButton").backgroundColor = "transparent";
                
		 
		 getElementStyleObject("azFilterScreen").display = "block";
		 getElementStyleObject("searchFilterScreen").display = "none";
		 getElementStyleObject("addNewFilterScreen").display = "none";
		 getElementStyleObject("tagsFilterScreen").display = "none";
 
   
		
		listFilter.alphaChanged();  
		
		activityIndicator.hide();
		
		
	},
	
	searchClicked: function(){  
		activityIndicator.show();
		
		
		getElementObject("filterAddNewInput").blur();
		getElementObject("selectTags").blur();
		getElementObject("selectAlpha").blur();
		 
		 getElementStyleObject("filterSearchButton").backgroundColor = color.gold; 
		 getElementStyleObject("filterAZButton").backgroundColor = "transparent";
		 getElementStyleObject("filterTagsButton").backgroundColor = "transparent";
		 getElementStyleObject("filterAddNewButton").backgroundColor = "transparent";
		  
		
		 getElementStyleObject("azFilterScreen").display = "none";
		 getElementStyleObject("searchFilterScreen").display = "block";
		 getElementStyleObject("addNewFilterScreen").display = "none";
		 getElementStyleObject("tagsFilterScreen").display = "none";
		
		setTimeout("listFilter.hideiScrolls()", 200); 
		                                                
		            
		getElementStyleObject("filterSearchInput").display = "block";
		getElementStyleObject("filterSearchGoButton").display = "block";
		getElementStyleObject("searchLabel").display = "none";
		
		Helper.applyStyle.focus("filterSearchInput");  
		
		activityIndicator.hide();
		

	},
	
	addNewClicked: function(){  
		getElementObject("filterSearchInput").blur();
		getElementObject("selectTags").blur();
		getElementObject("selectAlpha").blur();
		
		 getElementStyleObject("filterAddNewButton").backgroundColor = color.gold;  
		 getElementStyleObject("filterSearchButton").backgroundColor = "transparent"; 
		 getElementStyleObject("filterAZButton").backgroundColor = "transparent";
		 getElementStyleObject("filterTagsButton").backgroundColor = "transparent";
		       		
		 getElementStyleObject("azFilterScreen").display = "none";
		 getElementStyleObject("searchFilterScreen").display = "none";
		 getElementStyleObject("addNewFilterScreen").display = "block";
		 getElementStyleObject("tagsFilterScreen").display = "none";
		
		setTimeout("listFilter.hideiScrolls()", 200);

		
	},
	
	tagsClicked: function(){        
		getElementObject("filterSearchInput").blur();
		getElementObject("filterAddNewInput").blur();
		getElementObject("selectAlpha").blur();
		
		setTimeout("listFilter.showiScrolls()", 20);  
		
		 getElementStyleObject("filterAddNewButton").backgroundColor = "transparent";  
		 getElementStyleObject("filterSearchButton").backgroundColor = "transparent"; 
		 getElementStyleObject("filterAZButton").backgroundColor = "transparent";
		 getElementStyleObject("filterTagsButton").backgroundColor = color.gold;
		
		 getElementStyleObject("azFilterScreen").display = "none";
		 getElementStyleObject("searchFilterScreen").display = "none";
		 getElementStyleObject("addNewFilterScreen").display = "none";
		 getElementStyleObject("tagsFilterScreen").display = "block";
		
		
		listFilter.tagsChanged2();  
		listFilter.tagsLabelClicked();
		
	   
	},
	    
	hideiScrolls: function(){
	   	for (var a=0; a < allListWrappers.length; a++){
			getElementStyleObject(allListWrappers[a]).display = "none";      
		} 
	},
	   
	showiScrolls: function(){
	   	for (var a=0; a < allListWrappers.length; a++){
			getElementStyleObject(allListWrappers[a]).display = "block";      
		} 
	},
	
	hide: function(){     
		getElementObject("filterSearchInput").blur();
		getElementObject("filterAddNewInput").blur();
		getElementObject("selectTags").blur();
		getElementObject("selectAlpha").blur();

        fadeOut("theFilterDiv");
        //getElementStyleObject("theFilterDiv").opacity = "0";
        //setTimeout('getElementStyleObject("theFilterDiv").display = "none"', 900);

		listFilter.showiScrolls();
	},
	
	
	show: function(){                                                
        fadeIn("theFilterDiv");
        //getElementStyleObject("theFilterDiv").display = "block"
        //setTimeout('getElementStyleObject("theFilterDiv").opacity = "1"', 100);
	},
	
	
	updateDisplay: function(){     
		currentList = listFilter.currentOption;
		
		if (currentList === "az"){
			 this.azClicked();
		} 
		if (currentList === "search"){
			 this.searchClicked();
		}
		if (currentList === "add"){
			 this.addClicked();
		}
		if (currentList === "tags"){
			 this.tagsClicked();
		}        
		
	}
	
}


function getStringuptoUS(str)
{
    var retS = "";
    for(var i = 0; i < str.length; i++){
        if(str[i] === "_"){
            break;
        }
        retS = retS + str[i];
    }
    return retS;
}

function getStringUptoLT(str)
{
    var retS = "";
    for(var i = 0; i < str.length; i++){
        if(str[i] === "<"){
            break;
        }
        retS = retS + str[i];
    }
    return retS;
}


function countCommas(str)
{
    var retS = 0;
    if(str.length > 0){
        retS++;
    }
    
    for (var i=0; i < str.length; i++){
        if(str[i] === ","){
            retS++
        }
    }
    
    return retS;
}

function handleInputFocus()
{
  setTimeout('window.scrollTo(0, 0);document.body.scrollTop = 0;document.body.scrollLeft = 0', 500);
}


var overlayWrapper = {
    smp:false,
	set: function(msgHTML){
			  getElementObject("overlayHTML").innerHTML = msgHTML
		 },
	show:function(){
		$("#overlayWrapper").fadeIn("fast");
		$(".dialogWrapper").animate({"margin-top":""}, "slow");
		 },
	hide:function(){
        if(overlayWrapper.smp){
            overlayWrapper.smp = false;
            overlayWrapper.clean();
            return;
        }
		$(".dialogWrapper").animate({"margin-top":"-500px"}, "slow");
		setTimeout('$("#overlayWrapper").fadeOut("fast");overlayWrapper.clean();', 500);
		},
	clean:function(){
			  getElementObject("overlayHTML").innerHTML = "";
              dialogInputPush.value1 = "";
              dialogInputPush.value2 = "";
              dialogInputPush.value3 = "";
              dialogInputImg.value1 = "";
              dialogInputImg.value2 = "";
              dialogInputImg.value3 = "";
              dialogInput.value = "";
              dialogInput2.value1 = "";
              dialogInput2.value2 = "";
              dialogInput2.ph1 = "";
              dialogInput2.ph2 = "";
		 }
}

var videoPreview = {
	display: function(msg, msgImage){
		getElementStyleObject("overlayWrapper").backgroundColor = "white";
		msg = msg || "Untitled";
		msgImage = msgImage || "images/novideo.mp4";
		yesCB = "overlayWrapper.hide()";

		var outS = "";
		outS += "<div class='titleText'>" + msg + "</div>";
		outS += "<a class='closeButton' href='javascript:videoPreview.done()'> </a>";
		outS += "<div class='imageWrapper'>";
		outS += "<video class='aVideo' controls> <source src='" + msgImage + "'> </source></video>";
		outS += "</div>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	done: function(){
		getElementStyleObject("overlayWrapper").backgroundColor = "";
		getElementStyleObject("overlayWrapper").display = "none";
		overlayWrapper.hide();
	}

}

var embedPreview = {
	display: function(msg, msgImage){
		getElementStyleObject("overlayWrapper").backgroundColor = "white";
		msg = msg || "Untitled";
		msgImage = msgImage || "images/novideo.mp4";
		yesCB = "overlayWrapper.hide()";

		var outS = "";
		outS += "<div class='titleText'>" + msg + "</div>";
		outS += "<a class='closeButton' href='javascript:videoPreview.done()'> </a>";
		outS += "<div class='imageWrapper'>";
		outS += "<iframe class='aVideo' src='" + msgImage + "'>";
		outS += "</div>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	done: function(){
		getElementStyleObject("overlayWrapper").backgroundColor = "";
		getElementStyleObject("overlayWrapper").display = "none";
		overlayWrapper.hide();
	}

}
var graphPreview = {
    max: 3.0,
    min: 1,
    scale: 1.0,
    rotation: 0,
    width: 100,
    handleAxisText: function () {
        $('#overlayWrapper svg text').each(function() {
			var url = $(this).html();
            url = url.split("|");
            if(url.length > 1){
                var outS = url[0] + "</br>" + url[1];
                $(this).html(outS);
            }
        });
    },
    handlePinch: function () {
        graphPreview.width = 100;
        var dom = getElementObject("x", graphPreview.wrapID);
        dom.addEventListener("gesturestart", graphPreview.gestureStart, false);
        dom.addEventListener("gesturechange", graphPreview.gestureChange, false);
        dom.addEventListener("gestureend", graphPreview.gestureEnd, false);
        dom.scale = 1.0;
        dom.rotation = 0;
    },
    gestureStart: function (e) {
        e.preventDefault();
    },
    gestureChange: function (e) {
        var target = e.target;
        e.preventDefault();
        target.style.webkitTransform =
             'scale(' + (graphPreview.scale * e.scale) + ') '// +
        //     'rotate(' + (graphPreview.rotation + e.rotation) + 'deg)';
    },
    gestureEnd: function (e) {
        var target = e.target;
        e.preventDefault();
        graphPreview.scale *= e.scale;
      //  graphPreview.rotation += e.rotation;
    },
    wrapID:null,
    imgID:null,
	display: function(msg, msgImage){
		getElementStyleObject("overlayWrapper").backgroundColor = "black";
		getElementStyleObject("overlayFrame").minWidth = "100%";
		msg = msg || "Untitled";
		msgImage = msgImage || "images/none.png";
		yesCB = "overlayWrapper.hide()";
        var tr = new Date().getTime().toString();
		graphPreview.wrapID = "wrap" + tr.toString();
		graphPreview.imgID = "img" + (tr+1).toString();

		var outS = "";
		outS += "<div class='imageWrapper' id='" + graphPreview.wrapID + "'>";
		outS += "<div class='image' id='" + graphPreview.imgID + "'> </div>";
		outS += "<div class='dontSteal'> </div>";
		outS += "</div>";
		outS += "<div style='font-size:120%' class='titleText'>" + msg + "</div>";
		outS += "<a class='closeButton fadeC' href='javascript:graphPreview.done()'> </a>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
       // graphPreview.handlePinch();
        graphPreview.getGraph(msgImage);
	},
	getGraph: function(gdata){
        var chart = new google.visualization.LineChart(document.getElementById(graphPreview.imgID));
        chart.draw(google.visualization.arrayToDataTable(gdata), {pointSize: 5});
	},
	done: function(){
		getElementStyleObject("overlayWrapper").backgroundColor = "";
		getElementStyleObject("overlayWrapper").display = "none";
		getElementStyleObject("overlayFrame").minWidth = "";
		overlayWrapper.hide();
	}
}

var imagePreview = {
    max: 3.0,
    min: 1,
    scale: 1.0,
    rotation: 0,
    width: 100,
    handlePinch: function () {
        imagePreview.width = 100;
        var dom = getElementObject(imagePreview.imgID);
        dom.addEventListener("gesturestart", imagePreview.gestureStart, false);
        dom.addEventListener("gesturechange", imagePreview.gestureChange, false);
        dom.addEventListener("gestureend", imagePreview.gestureEnd, false);
        dom.scale = 1.0;
        dom.rotation = 0;
    },
    gestureStart: function (e) {
        e.preventDefault();
    },
    gestureChange: function (e) {
        var target = e.target;
        e.preventDefault();
        target.style.webkitTransform =
             'scale(' + (imagePreview.scale * e.scale) + ') ' +
             'rotate(' + (imagePreview.rotation + e.rotation) + 'deg)';
    },
    gestureEnd: function (e) {
        var target = e.target;
        e.preventDefault();
        imagePreview.scale *= e.scale;
        imagePreview.rotation += e.rotation;
    },
    wrapID:null,
    imgID:null,
	display: function(msg, msgImage, flag, callback){
		getElementStyleObject("overlayWrapper").backgroundColor = "black";
		getElementStyleObject("overlayFrame").minWidth = "100%";
		msg = msg || "Untitled";
		msg = msg || false;
		msgImage = msgImage || "images/none.png";
		yesCB = "overlayWrapper.hide()";
        var tr = new Date().getTime().toString();
		imagePreview.wrapID = "wrap" + tr.toString();
		imagePreview.imgID = "img" + (tr+1).toString();

		var outS = "";
		outS += "<div class='imageWrapper' id='" + imagePreview.wrapID + "'>";
		outS += "<div class='image' id='" + imagePreview.imgID + "' style='background-image:url(" + msgImage + ")'> </div>";
		outS += "<div class='dontSteal'> </div>";
		outS += "</div>";
		outS += "<div style='font-size:120%' class='titleText'>" + msg + "</div>";
		outS += "<a class='closeButton fadeC' href='javascript:imagePreview.done()'> </a>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
        imagePreview.handlePinch();
	},
	done: function(){
		getElementStyleObject("overlayWrapper").backgroundColor = "";
		getElementStyleObject("overlayWrapper").display = "none";
		getElementStyleObject("overlayFrame").minWidth = "";
		overlayWrapper.hide();
	}
}

function getembedvideoURL(url)
{
	var retS = "";
	var t = parseVideoURL(url);
	if( t == null){
		return url;
	}
	else if(t.provider === "youtube"){
		return "https://www.youtube.com/embed/" + t.id;
	}
	else if(t.provider === "vimeo"){
		return "https://player.vimeo.com/video/" + t.id;
	}
	return url;
		
}

var embedvideoPreview = function(name,url){
	var t = getembedvideoURL(url);
	embedPreview.display(name,t);
}

var dialogFrame = {
	display: function(msg, msgImage){
		msg = msg || "<Question> ?";
		msgImage = msgImage || "privacy.html";
        activityIndicator.show();
        var outS = "";
        outS += "<div class='headerWrapper'>" + msg;
        outS += "<a class='closeButton' href='javascript:dialogFrame.done()'>X</a>";
        outS += "</div>";
        outS += "<iframe class='dialogFrame' src='" + msgImage + "'></iframe>";
        outS += "</div>";
        overlayWrapper.set(outS);
        overlayWrapper.show();
        activityIndicator.hide();
	},
	done: function(){
		overlayWrapper.hide();
	}

}

var dialogMessage = {
	display: function(msg, msgImage, yesText, yesCB){
		msg = msg || "<Question> ?";
		msgImage = msgImage || "images/message.png";
		yesText = yesText || "OK";
		yesCB = yesCB || "overlayWrapper.hide()";

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase())){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "</div>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	done: function(){
		overlayWrapper.hide();
	}

}
var dialogConfirm = {
	display: function(msg, msgImage, yesText, yesCB, noText, noCB){
		msg = msg || "<Question> ?";
		msgImage = msgImage || "glyphicon-envelope";
		yesText = yesText || "Yes";
		noText = noText || "No";
		noCB = noCB || "overlayWrapper.hide()";
		yesCB = yesCB || "overlayWrapper.hide()";

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >= 0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	done: function(){
		overlayWrapper.hide();
	}

}


var fileInput= {
	id: null,
	success:null,
	failure:null,
	filename:"",
	display: function(callback, target, filename, msg){
		fileInput.callback = callback;
		fileInput.filename = filename;
		fileInput.id = new Date().getTime().toString();
		msg = msg || "Upload file";

		var outS = "";
		outS += '<input type="button" class="fileUpload" value="'+ msg +'" name="fileUpload' + fileInput.id + '" id="fileUpload' + fileInput.id + '">';
		getElementObject(target).innerHTML = outS;
		setTimeout("fileInput.initialize()", 1000);
	},
	handle: null,
	ext: null,
	initialize: function(){
		fileInput.handle = $("#fileUpload" + fileInput.id).upload({
			name: 'fileUpload' + fileInput.id,
			action: '/uploadFile',
			enctype: 'multipart/form-data',
			params: {setname:fileInput.filename},
			autoSubmit: true,
			onSubmit: function() {
				activityIndicator.show();
				var t = fileInput.handle.filename();
				fileInput.ext = t.substring(t.length-4);
			},
			onComplete: function() {
				activityIndicator.hide();
				if(fileInput.callback){
					fileInput.callback();
				}
			},
			onSelect: function() {}
		});
	},
	done: function(){
		overlayWrapper.hide();
	}
}


var colorInput= {
	id: null,
	color: null,
	callback:null,
	display: function(red, green, blue, msg, callback){
		activityIndicator.show();
		colorInput.id = new Date().getTime().toString();
		msg = msg || "Choose Color";
		msgImage = msgImage || "glyphicon-brush";
		var yesText = "Choose";
		var noText = "Cancel";
		var noCB = "overlayWrapper.hide()";
		var yesCB = "colorInput.done()";
		colorInput.callback = callback;
		colorInput.red = red;
		colorInput.green = green;
		colorInput.blue = blue;

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >= 0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div style='' class='dialogText'>" + msg + "</div>";
		outS += "<div class='colorSwatchBig' id='cs" + colorInput.id + "'> </div>";
		outS += "<div class='colorChooseWrapper'>"
		outS += '<div class="textright" id="lred' + colorInput.id + '"></div>';
		outS += '<input type="range" oninput="colorInput.changed()" min="0" max="255" style="margin-top: 15px" class="rangeInput" id="red' + colorInput.id + '">';
		outS += '<div class="textright" id="lgreen' + colorInput.id + '"></div>';
		outS += '<input type="range" oninput="colorInput.changed()" min="0" max="255" style="margin-top: 15px" class="rangeInput" id="green' + colorInput.id + '">';
		outS += '<div class="textright" id="lblue' + colorInput.id + '"></div>';
		outS += '<input type="range" oninput="colorInput.changed()" min="0" max="255" style="margin-top: 15px" class="rangeInput" id="blue' + colorInput.id + '">';
		outS += "</div>";
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		overlayWrapper.set(outS);
		overlayWrapper.show();
		setTimeout("activityIndicator.hide();colorInput.update()", 100);
	},
	update:function(){
		getElementObject("red" + colorInput.id).value = colorInput.red;
		getElementObject("green" + colorInput.id).value = colorInput.green;
		getElementObject("blue" + colorInput.id).value = colorInput.blue;

		getElementObject("lred" + colorInput.id).innerHTML = "Red: " + colorInput.red;
		getElementObject("lgreen" + colorInput.id).innerHTML = "Green: " + colorInput.green;
		getElementObject("lblue" + colorInput.id).innerHTML = "Blue: " + colorInput.blue;
		
        getElementStyleObject("cs" + colorInput.id).backgroundColor = "rgb(" + colorInput.red + "," + colorInput.green + "," + colorInput.blue + ")";
		getElementStyleObject("cs" + colorInput.id).opacity = "1";
	},
	changed:function(){
		setTimeout("colorInput.__changed()", 100);
	},
	__changed:function(){
		var red = getElementObject("red" + colorInput.id).value;
		var green = getElementObject("green" + colorInput.id).value;
		var blue = getElementObject("blue" + colorInput.id).value;
		getElementStyleObject("cs" + colorInput.id).opacity = "0";
		if(colorInput.isValid(red) && colorInput.isValid(green) && colorInput.isValid(blue)){
			colorInput.red = parseInt(getElementObject("red" + colorInput.id).value);
			colorInput.green = parseInt(getElementObject("green" + colorInput.id).value);
			colorInput.blue = parseInt(getElementObject("blue" + colorInput.id).value);
			colorInput.update();
		}
	},
	isValid:function(str){
		var n = ~~Number(str);
		return String(n) === str && n >= 0 && n <=255;
	},
	done: function(){
		var red = getElementObject("red" + colorInput.id).value;
		var green = getElementObject("green" + colorInput.id).value;
		var blue = getElementObject("blue" + colorInput.id).value;

		if(colorInput.isValid(red) && colorInput.isValid(green) && colorInput.isValid(blue)){
			colorInput.red = parseInt(getElementObject("red" + colorInput.id).value);
			colorInput.green = parseInt(getElementObject("green" + colorInput.id).value);
			colorInput.blue = parseInt(getElementObject("blue" + colorInput.id).value);
		}
		else{
			alertHandler.flashNewMessage("Please enter valid color","Red, Green and Blue values should be between 0-255");
			return;
		}


		if(colorInput.callback){
			colorInput.callback();
		}
		overlayWrapper.hide();
	}
}


var dialogInputPush = {
	id1: null,
	id2: null,
	idI: null,
	callback: null,
	value1: "",
	value2: "",
	value3: "",
	to: "",
     onchange: function() {
         getElementStyleObject(dialogInputPush.idI).display = "";
               var file = $('#input' + dialogInputPush.id2).get(0);
               if(file.files[0].type.split("/")[0].toLowerCase() != "image"){
                   alertHandler.flashNewMessage("Incorrect file type","Please snsure you are uploading an image file.");
               }
                if ( file.files && file.files[0] && file.files[0].type.split("/")[0].toLowerCase() === "image") {
                var FR= new FileReader();
                FR.onload = function(e) {
                    var data = e.target.result;
                    var canvas = document.createElement("canvas");
                   // var canvas1 = document.createElement("canvas");
                    var img = document.createElement("img");
                    img.onload= function(){
                         var MAX_WIDTH = 800;
                         var MAX_HEIGHT = 600;
                         var width = img.width;
                         var height = img.height;
                         var w2 = width;
                         var h2 = height;

                         if (width > height) {
                             if (width > MAX_WIDTH) {
                                h2 = height * MAX_WIDTH / width;
                                w2 = MAX_WIDTH;
                            }
                         } else {
                             if (height > MAX_HEIGHT) {
                                w2 = width * MAX_HEIGHT / height;
                                h2 = MAX_HEIGHT;
                            }
                        }
                        canvas.width = w2;
                        canvas.height = h2;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, w2, h2);
                        dialogInputPush.value2 = canvas.toDataURL("image/png");
                        dialogInputPush.value3 = "";

                         /*MAX_WIDTH = 100;
                         MAX_HEIGHT = 100;
                         if (width > height) {
                             if (width > MAX_WIDTH) {
                                h3 = height * MAX_WIDTH / width;
                                w3 = MAX_WIDTH;
                            }
                         } else {
                             if (height > MAX_HEIGHT) {
                                w3 = width * MAX_HEIGHT / height;
                                h3 = MAX_HEIGHT;
                            }
                        }
                        canvas1.width = w3;
                        canvas1.height = h3;
                        var ctx1 = canvas1.getContext("2d");
                        ctx1.drawImage(img, 0, 0, w3, h3);

                        dialogInputPush.value3 = canvas1.toDataURL("image/png"); */
                        getElementStyleObject(dialogInputPush.idI).backgroundImage = "url(" + dialogInputPush.value2  + ")";
                        getElementStyleObject(dialogInputPush.idI).display = "";
                        $("#overlayHTML .fileUploadText").html("Change Photo")
                        activityIndicator.hide();
                    }
                    img.src = data;
                };  
                activityIndicator.setText("Uploading....");
                activityIndicator.show();
                FR.readAsDataURL( file.files[0] );
            }
        },
	display: function(msg, val1, val2, val3, callback, yesText, noText, msgImage){
		var tr = new Date().getTime();
		dialogInputPush.idI = "I" + tr.toString();
		dialogInputPush.id1 = tr.toString();
		dialogInputPush.id2 = (tr+1).toString();
		callback = callback || null;
		dialogInputPush.callback = callback;
		msg = msg || "Send message to " + dialogInputPush.value3;
		val1 = val1 || "Enter your message...";
		val2 = val2 || "unchanged";
		val3 = val3 || "images/camerawhite.png";
		var msgImage = msgImage || "glyphicon-envelope";
		var yesText = yesText || "Send";
		var noText = noText || "Cancel";
		var noCB = "dialogInputPush.cancel()";
		var yesCB = "dialogInputPush.done()";

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >= 0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += '<textarea autocapitalize="off" autocorrect="off" class="input dialogWrapperinput textareasmall" placeholder="Enter your message..." id="input' + dialogInputPush.id1 + '"></textarea>';
        outS += '<div style="height:20px;text-align:right;color: white;width:95%" class="fileUploadWrapper link"><div class="fileUploadText" style="text-align:right;color: white;width:95%">' + 'Add Photo</div>';
		outS += '<input type="file" onchange="dialogInputPush.onchange()" name="input' + dialogInputPush.id2 + '" id="input' + dialogInputPush.id2 + '">';
        outS += '</div>';
		outS += "<div style='display:none' class='imgPrevThumb' id='" + dialogInputPush.idI + "'>" + "</div>";
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		setTimeout("dialogInputPush.set('" + val1 + "','" + val2 + "','" + val3 + "')", 100);
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	set: function(val1, val2, val3){
		dialogInputPush.value1 = val1;
		dialogInputPush.value2 = "unchanged";
		dialogInputPush.value3 = val3;
		//getElementObject("input" + dialogInputPush.id1).value = val1;
        getElementStyleObject(dialogInputPush.idI).backgroundImage = "url(" + val2 + ")";
	},
	done: function(){
		dialogInputPush.value1 = getElementObject("input" + dialogInputPush.id1).value;
        if(dialogInputPush.value1.length < 10){
            alertHandler.flashNewMessage("Message too short!", "Enter a longer message...");
            return;
        }
		if(dialogInputPush.callback){
			dialogInputPush.callback();
		}
		dialogInputPush.value1 = "";
		dialogInputPush.value2 = "";
		dialogInputPush.value3 = "";
		overlayWrapper.hide();
	},
    cancel: function(){
		overlayWrapper.hide();
		dialogInputPush.value1 = "";
		dialogInputPush.value2 = "";
		dialogInputPush.value3 = "";
    }
}



var dialogInputImg = {
	id1: null,
	id2: null,
	idI: null,
	callback: null,
	value1: "",
	value2: "",
	value3: "",
     onchange: function() {
               var file = $('#input' + dialogInputImg.id2).get(0);
               if(file.files[0].type.split("/")[0].toLowerCase() != "image"){
                   alertHandler.flashNewMessage("Incorrect file type","Please snsure you are uploading an image file.");
               }
                if ( file.files && file.files[0] && file.files[0].type.split("/")[0].toLowerCase() === "image") {
                var FR= new FileReader();
                FR.onload = function(e) {
                    var data = e.target.result;
                    var canvas = document.createElement("canvas");
                    //var canvas1 = document.createElement("canvas");
                    var img = document.createElement("img");
                    //var img1 = document.createElement("img");
                    img.onload= function(){
                         var MAX_WIDTH = 800;
                         var MAX_HEIGHT = 600;
                         var width = img.width;
                         var height = img.height;
                         var w2 = width;
                         var h2 = height;

                         if (width > height) {
                             if (width > MAX_WIDTH) {
                                h2 = height * MAX_WIDTH / width;
                                w2 = MAX_WIDTH;
                            }
                         } else {
                             if (height > MAX_HEIGHT) {
                                w2 = width * MAX_HEIGHT / height;
                                h2 = MAX_HEIGHT;
                            }
                        }
                        canvas.width = w2;
                        canvas.height = h2;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, w2, h2);
                        dialogInputImg.value2 = canvas.toDataURL("image/png");
                        dialogInputImg.value3 = "";
                        getElementStyleObject(dialogInputImg.idI).backgroundImage = "url(" + dialogInputImg.value2  + ")";
                        getElementStyleObject(dialogInputImg.idI).display = "";
                        $("#overlayHTML .fileUploadText").html("Change Photo")
                        activityIndicator.hide();
                    }
                    /*
                    img1.onload= function(){
                         var MAX_WIDTH = 100;
                         var MAX_HEIGHT = 100;
                         var width = img1.width;
                         var height = img1.height;
                         var w2, h2, w3, h3;

                         if (width > height) {
                             if (width > MAX_WIDTH) {
                                h3 = height * MAX_WIDTH / width;
                                w3 = MAX_WIDTH;
                            }
                         } else {
                             if (height > MAX_HEIGHT) {
                                w3 = width * MAX_HEIGHT / height;
                                h3 = MAX_HEIGHT;
                            }
                        }
                        canvas1.width = w3;
                        canvas1.height = h3;
                        var ctx1 = canvas1.getContext("2d");
                        ctx1.drawImage(img1, 0, 0, w3, h3);

                        dialogInputImg.value3 = canvas1.toDataURL("image/png");
                        getElementStyleObject(dialogInputImg.idI).backgroundImage = "url(" + dialogInputImg.value3  + ")";
                        activityIndicator.hide();
                    }
                    */
                    img.src = data;
                //    img1.src = data;
                };       
                activityIndicator.setText("Uploading....");
                activityIndicator.show();
                FR.readAsDataURL( file.files[0] );
            }
        },
	display: function(msg, val1, val2, val3, callback, yesText, noText, msgImage, flag){
		var tr = new Date().getTime();
		dialogInputImg.idI = "I" + tr.toString();
		dialogInputImg.id1 = tr.toString();
		dialogInputImg.id2 = (tr+1).toString();
		callback = callback || null;
		dialogInputImg.callback = callback;
		msg = msg || "Add photo";
		val1 = val1 || "Untitled";
		val2 = val2 || "";
		flag = flag || "";
        var flag1 = "Upload";
        if(flag.length == 0){
            flag1 = "Change";
        }
		val3 = val3 || "images/camerawhite.png";
		var msgImage = msgImage || "glyphicon-camera";
		var yesText = yesText || "Upload";
		var noText = noText || "Cancel";
		var noCB = "dialogInputImg.cancel()";
		var yesCB = "dialogInputImg.done()";

		var outS = "";

        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >= 0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += '<input autocapitalize="off" autocorrect="off" class="input dialogWrapperinput" placeholder="" id="input' + dialogInputImg.id1 + '">';
        outS += '<div style="height:20px;text-align:right;color: white;width:95%" class="fileUploadWrapper link"><div class="fileUploadText" style="text-align:right;color: white;width:95%">' + flag1 + ' Photo</div>';
		outS += '<input type="file" onchange="dialogInputImg.onchange()" name="input' + dialogInputImg.id2 + '" id="input' + dialogInputImg.id2 + '">';
        outS += '</div>';
		outS += "<div style='" + flag + "' class='imgPrevThumb' id='" + dialogInputImg.idI + "'>" + "</div>";
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		setTimeout("dialogInputImg.set('" + val1 + "','"  + val3 + "','" + val3 + "')", 100);
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	set: function(val1, val2, val3){
		dialogInputImg.value1 = val1;
		dialogInputImg.value2 = val2
		dialogInputImg.value3 = val3;
		getElementObject("input" + dialogInputImg.id1).value = val1;
        getElementStyleObject(dialogInputImg.idI).backgroundImage = "url(" + val3 + ")";
	},
	done: function(){
		dialogInputImg.value1 = getElementObject("input" + dialogInputImg.id1).value;
		if(dialogInputImg.callback){
			dialogInputImg.callback();
		}
		dialogInputImg.value1 = "";
		dialogInputImg.value2 = "";
		dialogInputImg.value3 = "";
		overlayWrapper.hide();
	},
	cancel: function(){
		overlayWrapper.hide();
		dialogInputImg.value1 = "";
		dialogInputImg.value2 = "";
		dialogInputImg.value3 = "";
    }
}



var dialogInput2 = {
	id1: null,
	id2: null,
	callback: null,
	value1: "",
	value2: "",
	display: function(msg, val1, val2, callback, yesText, noText, msgImage, phval1, phval2){
		var tr = new Date().getTime();
		dialogInput2.id1 = tr.toString();
		dialogInput2.id2 = (tr+1).toString();
		callback = callback || null;
		dialogInput2.callback = callback;
		msg = msg || "Enter text";
		val1 = val1 || "";
		val2 = val2 || "";
		phval1 = phval1 || "";
		phval2 = phval2 || "";
		var msgImage = msgImage || "glyphicon-edit";
		var yesText = yesText || "Yes";
		var noText = noText || "No";
		var noCB = "overlayWrapper.hide()";
		var yesCB = "dialogInput2.done()";

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >= 0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += '<input onkeypress="dialogInput2.keypress0(event)" autocapitalize="off" autocorrect="off" class="input dialogWrapperinput" placeholder="' + phval1 + '" id="input' + dialogInput2.id1 + '">';
		outS += '<input onkeypress="dialogInput2.keypress(event)" autocapitalize="off" autocorrect="off" class="input dialogWrapperinput" placeholder="' + phval2 + '" id="input' + dialogInput2.id2 + '">';
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		setTimeout("dialogInput2.set('" + val1 + "','" + val2 + "')", 100);
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
    keypress0: function (event)
    {
            var t = event.charCode || event.keyCode;
            if(t == 13){
                getElementObject("input" + dialogInput2.id2).focus();
            }
            if(t == 27){
                dialogInput2.cancel();
            }
    },
    keypress: function (event)
    {
            var t = event.charCode || event.keyCode;
            if(t == 13){
                dialogInput2.done();
            }
            if(t == 27){
                dialogInput2.cancel();
            }
    },
	set: function(val1, val2){
		dialogInput2.value1 = val1;
		dialogInput2.value2 = val2;
		getElementObject("input" + dialogInput2.id1).value = val1;
		getElementObject("input" + dialogInput2.id2).value = val2;
	},
	done: function(){
		dialogInput2.value1 = getElementObject("input" + dialogInput2.id1).value;
		dialogInput2.value2 = getElementObject("input" + dialogInput2.id2).value;
		if(dialogInput2.callback){
			dialogInput2.callback();
		}
		overlayWrapper.hide();
	}
}

var dialogInputPassword = {
	id: null,
	callback: null,
    pwHash: null,
    lastlogin: null,
	value: "",
	value1: "",
	value2: "",
	display: function(msg, callback, yesText, noText, msgImage){
        dialogInputPassword.lastlogin = null;
		getElementStyleObject("overlayWrapper").backgroundColor = "white";
		dialogInputPassword.id = new Date().getTime().toString();
		callback = callback || null;
		dialogInputPassword.callback = callback;
		msg = msg || "Change passowrd";
		msgImage = msgImage || "glyphicon-lock";
		var yesText = yesText || "OK";
		var noText = noText || "Cancel";
		var noCB = "dialogInputPassword.cancel()";
		var yesCB = "dialogInputPassword.done()";

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >=0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += '<input autocapitalize="off" onkeypress="dialogInputPassword.keypress(event)" autocorrect="off" class="input dialogWrapperinput" type="password" placeholder="Current Password" id="input' + dialogInputPassword.id + '">';
		outS += '<input autocapitalize="off" onkeypress="dialogInputPassword.keypress(event)" autocorrect="off" class="input dialogWrapperinput" type="password" placeholder="New Password" id="input' + dialogInputPassword.id + '1">';
		outS += '<input autocapitalize="off" onkeypress="dialogInputPassword.keypress(event)" autocorrect="off" class="input dialogWrapperinput" type="password" placeholder="Retype New Password" id="input' + dialogInputPassword.id + '2">';
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		setTimeout("dialogInputPassword.set()", 100);
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	set: function(){
		getElementObject("input" + dialogInputPassword.id).value = "";
	},
    keypress: function (event)
    {
            var t = event.charCode || event.keyCode;
            if(t == 13){
                getElementObject("input" + dialogInputPassword.id + "1").focus();
            }
            if(t == 27){
                dialogInputPassword.cancel();
            }
    },
    keypress1: function (event)
    {
            var t = event.charCode || event.keyCode;
            if(t == 13){
                getElementObject("input" + dialogInputPassword.id + "2").focus();
            }
            if(t == 27){
                dialogInputPassword.cancel();
            }
    },
    keypress2: function (event)
    {
            var t = event.charCode || event.keyCode;
            if(t == 13){
                dialogInputPassword.done();
            }
            if(t == 27){
                dialogInputPassword.cancel();
            }
    },
	done: function(){
		var val = getElementObject("input" + dialogInputPassword.id).value;
        dialogInputPassword.value1 = getElementObject("input" + dialogInputPassword.id + "1").value;
        dialogInputPassword.value2 = getElementObject("input" + dialogInputPassword.id + "2").value;
        if(hex_md5(val) != dialogInputPassword.pwHash){
            alertHandler.flashNewMessage("Incorrect Password", "Try Again");
            return;
        }
        if(dialogInputPassword.value1 != dialogInputPassword.value2){
            alertHandler.flashNewMessage("Passwords do not match!", "Re-enter password");
            return;
        }
		getElementStyleObject("overlayWrapper").backgroundColor = "";
        dialogInputPassword.lastlogin = new Date().getTime();
		if(dialogInput.callback){
			dialogInput.callback();
		}
		overlayWrapper.hide();
	},
    cancel: function(){
		overlayWrapper.hide();
    }
}

var dialogInput= {
	id: null,
	callback: null,
	value: "",
    keypress: function(event)
    {
            var t = event.charCode || event.keyCode;
            if(t == 13){
                dialogInput.done();
            }
            if(t == 27){
                dialogInput.cancel();
            }
    },
	display: function(msg, val, callback, yesText, noText, msgImage, phval){
		dialogInput.id = new Date().getTime().toString();
		callback = callback || null;
		dialogInput.callback = callback;
		msg = msg || "Enter text";
		val = val || "";
		phval = phval || "";
		var msgImage = msgImage || "images/edithover.png";
		var yesText = yesText || "Yes";
		var noText = noText || "No";
		var noCB = "overlayWrapper.hide()";
		var yesCB = "dialogInput.done()";

		var outS = "";
        if( ['.png', '.jpg', 'jpeg', '.gif'].indexOf(msgImage.substring(msgImage.length-4, msgImage.length).toLowerCase()) >= 0){
            outS += "<div class='dialogWrapper' style='background-image:url(" + msgImage + ")'>";
        }
        else{
            outS += "<div class='dialogWrapper'>"
            outS += "<div class='dialogThumb " + msgImage + "'> </div>";
        }
		outS += "<div class='dialogText'>" + msg + "</div>";
		outS += '<input onkeypress="dialogInput.keypress(event)" autocapitalize="off" autocorrect="off" class="input dialogWrapperinput" placeholder="' + phval + '" id="input' + dialogInput.id + '">';
		outS += "<a class='" + dialogYes + "' href='javascript:" + yesCB + "'> "+ yesText + "</a>";
		outS += "<a class='" + dialogNo + "' href='javascript:" + noCB + "'> "+ noText + "</a>";
		outS += "</div>";
		setTimeout("dialogInput.set('" + val + "')", 100);
		overlayWrapper.set(outS);
		overlayWrapper.show();
	},
	set: function(val){
		dialogInput.value = val;
		getElementObject("input" + dialogInput.id).value = val;
	},
	done: function(){
		dialogInput.value = getElementObject("input" + dialogInput.id).value;
		if(dialogInput.callback){
			dialogInput.callback();
		}
		overlayWrapper.hide();
	}
}

function systemOpenLink(link)
{
	window.open(link, "_system");
}


function cordovaOpenLink(link)
{
	window.open(link, "_blank");
}

var socialShare = 
{
	url: "",
	initialize: function(){
		getElementObject("socialShare").innerHTML = "<a href='javascript:socialShare.facebookShare()' class='fbButton'> </a>" +
			"<a href='javascript:socialShare.twitterShare()' class='twButton'> </a>" +
			"<a href='javascript:socialShare.emailShare()' class='emButton'> </a>" ;
	},
	facebookShare: function(){
			window.open("", "_blank");
	}

}

var assetManager =
{
	isAsset:true,
	renameSt: "Rename",
	listObject: null,
	assetID: null,
	currID:null,
	initialize: function(obj){
		assetManager.listObject = JSON.parse(obj.data);
		assetManager.currID = obj.id;
	},
	isKey: function(key){
		if(!assetManager.listObject){
			return null;
		}
		var list = assetManager.listObject;
		for(var i = 0; i < list.length; i++){
			if(list[i].id === key){
				return i;
			}
		}
		return null;
	},
	remove: function(key){
		delete assetManager.listObject[id=key];	
	},		
	getAdminHTML: function(pf){
		var outS = "";
		var isinss = false;
		var list = assetManager.listObject;
		for(var i=0; i < list.length; i++){
			var temp = Object.keys(list[i]);
			isinss = false;
			if(temp.indexOf("ss") >=0 && list[i]["ss"] === "true"){
				isinss = true;
			}
			outS += "<div class='listItem'>"+
					"<div class='text1'> "+ list[i]["name"] + "</div>"+
					"<div class='text'>";
					if(assetManager.isAsset){
					outS +=	"<a class='link inlinebutton view fadeC' href='javascript:" + pf + "view(" + '"' + list[i]["id"] + '")' + "'> </a>";
					}
					outS +=	"<a class='link inlinebutton edit fadeC' href='javascript:" + pf + "rename(" + '"' + list[i]["id"] + '")' + "'>" + "</a>"+
						"<a class='link inlinebutton delete fadeC' href='javascript:" + pf + "delete(" + '"' + list[i]["id"] + '")' + "'> </a>"+
					"</div>"+
				"<div class='text incss'>";
				if(isinss){
					outS += "<a class='link' href='javascript:" + pf + "removefromss(" + '"' + list[i]["id"] + '")' + "'><i> Remove from home slideshow</i></a>";
				}
				else{
					outS += "<a class='link' href='javascript:" + pf + "addtoss(" + '"' + list[i]["id"] + '")' + "'> <i>Add to home slideshow</i> </a>";
				}
				outS += "</div>"+
				"</div>";
		}
		return outS;
	},
	preview:function(id){
		var key = assetManager.isKey(id);
			if(key==null){
				return;
			}

		var list = assetManager.listObject;
		if(list[key].type==="image"){
			imagePreview.display(list[key].name, App.resURL + list[key].url);
		}
		else if(list[key].type==="video"){
			videoPreview.display(list[key].name, App.resURL + list[key].url);
		}
		else if(list[key].type==="embedvideo"){
			embedvideoPreview(list[key].name, list[key].url);
		}
		else if(list[key].type==="embedimage"){
			imagePreview.display(list[key].name, list[key].url);
		}
		else if(list[key].type==="embedfile"){
			window.open(list[key].url, "_blank");
		}
		else{
			window.open(App.resURL + list[key].url, "_blank");
		}
	},
	add: function(key, data){
		assetManager.remove(key);
		assetManager.listObject[assetManager.listObject.length] = data;
	}

}



function getCatString(cat){
	if(cat === "0"){
		return "ERNav";
	}
	else if(cat === "1"){
		return "HealthInfo";
	}
	else if(cat === "2"){
		return "AfterER";
	}
	return "HealthInfo";

}

function shareURL(url, media, title)
{
	if(media === "fb"){
		return "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(url) + "&p[title]=" + encodeURIComponent(title);
	}
	else if(media === "tw"){
		return "http://twitter.com/home?status=" + encodeURIComponent(title + " | " + url);
	}
	else if(media === "in"){
		return "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
	}
	else if(media === "em"){
		return "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(url);
	}
	else if(media === "g+"){
		return "" + encodeURIComponent(url) + "&p[title]=" + encodeURIComponent(title);
	}
	else{
		return url;
	}
}

function fbShare()
{
	var url = window.location.href;
	var title = document.title;
	var link;
	return shareURL(url, "fb", title);
}
function twShare()
{
	var url = window.location.href;
	var title = document.title;
	var link;
	return shareURL(url, "tw", title);
}
function inShare()
{
	var url = window.location.href;
	var title = document.title;
	var link;
	return shareURL(url, "in", title);
}
function emShare()
{
	var url = window.location.href;
	var title = document.title;
	var link;
	return shareURL(url, "em", title);
}

var isPreview = false;
var shareLang = "En";
var shareTitleID = null;
var shareID = null;
var assetID = null;
var assetBox = null;
var shareBrandID = null;
var shareBrandTitleID = null;
var shareBrandContactID = null;



var data661;
function getAssetCarousel(cat,loc, id)
{
	var url = App.mainURL;
	  url = url + "getAssets";
	    url = url + "?cat=" + id;
	     var callback = getAssetCarousel_CB;
	            loadFile(url, callback);
	            console.log(url);
}

var data66;
function getAssetCarousel_CB(data){
	var pInfo = JSON.parse(data);
	data66 = pInfo;
	  if(data === "[]"){
	  	assetManager.listObject = [];
		if(assetBox != null)
		getElementStyleObject(assetBox).display = "none";
		return;
	  }
	  else{
		if(assetBox != null)
			getElementStyleObject(assetBox).display = "block";
		assetManager.listObject = pInfo;
	  }
	var outS = "";
	var outTemp = "";
	var item;
	var type;
	for(var i = 0; i < pInfo.length; i++){
		item = pInfo[i];
		type = "none";
		if(Object.keys(item).contains("type") >= 0){
			type = item.type;
		}
		switch(type){
			case "image":
			 outTemp = "<div class='assetItemImage' style='background-image:url(" + '"' + App.resURL + item.url + '")' + "'> <div class='standardFont imageTitle'>" + item.name + " </br>(" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div></div>"
				if(!isPreview){
					outTemp = "<a class='link' href='javascript:assetManager.preview(" + '"' + item["id"] + '")' + "'>" + outTemp + "</a>";
				}
				break;
			case "video":
				outTemp = "<div class='assetItemVideo'> <div class='standardFont videoTitle'>" + item.name + "  </br>(" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div><video class='aVideo' controls> <source src='" + App.resURL + item.url + "'> </source></video></div>"
				break;
			case "embedfile":
				 outTemp = "<div class='assetItemImage dw'> <div class='standardFont imageTitle'>" + item.name + "  </br>(" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div></div>";
				if(!isPreview){
					outTemp = "<a class='link' href='javascript:assetManager.preview(" + '"' + item["id"] + '")' + "'>" + outTemp + "</a>";
				}
				break;
			case "embedvideo":
				outTemp = "<iframe class='assetItemVideo' src='" + getembedvideoURL(item.url) + "'></iframe>";  
				break;
			case "embedimage":
				 outTemp = "<div class='assetItemImage' style='background-image:url(" + '"' + item.url + '")' + "'> <div class='standardFont imageTitle'>" + item.name + "  </br>(" + (i+1).toString() + " of " + pInfo.length.toString() + ")</div></div>"
				if(!isPreview){
					outTemp = "<a class='link' href='javascript:assetManager.preview(" + '"' + item["id"] + '")' + "'>" + outTemp + "</a>";
				}
				break;
			default:
				break;

		}
		outS += outTemp;
		outTemp = "";
		
	}

	getElementStyleObject(assetID).width = (pInfo.length * 300).toString() + "px";
	getElementObject(assetID).innerHTML = outS;
	getElementStyleObject(assetBox).display = "block";
	$("#" + assetBox).animate({"scrollLeft":"0"}, 200);
    hoveraddclass("#" + assetID + ' .assetItemImage');
	assetBox = null;
	assetID = null;
}

function applyShareStyle(cat, loc)
{
	if(loc === "ALL"){
		if(shareBrandID){
			getElementStyleObject(shareBrandID).backgroundImage = "url('images/icon.png')";
		}
		if(shareBrandTitleID){
			getElementObject(shareBrandTitleID).innerHTML = "CARES<i>app</i>.me Support/Library";
		}
		if(shareBrandContactID){
			getElementObject(shareBrandContactID).innerHTML = "Information compiled by the CARES<i>app</i>.me Team";
		}
	    getElementStyleObject("body").color = "#A70240";
	    getElementStyleObject(shareBrandTitleID).color = "#0039A6";
		return;
	}
	var url = App.mainURL;
	  url = url + "getLocationInfo";
	    url = url + "?loc=" + loc;
	          var callback = applyShareStyle_CB;
	            loadFile(url, callback);
}

var data77;
function applyShareStyle_CB(data)
{
	var pInfo = JSON.parse(data);
	data77 = pInfo;
	var brandText = "";
	var brandName = "";
	 var addrstr = "";
	 pKeys = Object.keys(pInfo);
	 var temp = "name";
	 if(pKeys.contains(temp) >= 0){
	    brandName = pInfo[temp];
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
	 // currAddr = addrstr;
	 if(addrstr.length > 1){
		brandText = "<div class='title'>" + brandText + "</div><a class='address' target='_blank' href='http://maps.apple.com/?q=" + brandText + " " + addrstr  + "'>" + "<p>" + addrstr+ "</p></a>";
	 }
	 temp = "web";
	 if(pKeys.contains(temp) >=0){
	 webLink = decodeURIComponent(pInfo[temp]);
		if(webLink.length > 0){
			if(webLink.substring(0,4) != "http"){
				webLink = "http://" + webLink;	
			}
			brandText += "<a class='url' target='_blank' href='"+ webLink +"'>" + webLink + "</a>";
		}
	}
	  temp = "tel";
	  if(pKeys.contains(temp) >=0){
		addrstr = decodeURIComponent(pInfo[temp]).split(",");
	    for(var t=0; t< addrstr.length; t++){
			brandText = brandText + "<a class='phoneno' target='_blank' href='tel:" +  addrstr[t]  + "'>" + addrstr[t] + "</a>";
	    }
	  }
	  temp = "email";
	  if(pKeys.contains(temp) >=0){
	     brandText = brandText + "<a class='email' target='_blank' href='mailto:" + decodeURIComponent(pInfo[temp])  + "'>" + decodeURIComponent(pInfo[temp]) + "</a>";
	  }

	  getElementObject(shareBrandTitleID).innerHTML = brandName;
	  getElementObject(shareBrandContactID).innerHTML = brandText;

	  temp = "font";
	  if(pKeys.contains(temp) >=0){
		var t = parseInt(pInfo.font);
		var f = Object.keys(webSafeFonts);
		document.getElementsByTagName("body").fontFamily = webSafeFonts[f[t]];
	  }

	  temp = "color";
	    
	    if(pKeys.contains(temp) < 0){
	    	return;
	    }
	    temp = JSON.parse(pInfo["color"]);
	     var c1 = "rgb(" + temp[0] + "," + temp[1] + "," + temp[2] + ")";
	       var c2 = "rgb(" + temp[3] + "," + temp[4] + "," + temp[5] + ")";
	         var c3 = "rgb(" + temp[6] + "," + temp[7] + "," + temp[8] + ")";
	           getElementStyleObject("body").backgroundColor = c1;
	           getElementStyleObject("body").color = c2;
	           getElementStyleObject(shareBrandTitleID).color = c3;
			  getElementStyleObject(shareBrandID).backgroundImage = "url('" + App.resURL + loc + "icon.png')";

}

function getShareContent(cat, loc, id)
{
	var url = App.mainURL;
	  url = url + "getRowInfo";
	    url = url + "?category=" + getCatString(cat);
	      url = url + "&loc=" + loc;
	        url = url + "&rowID=" + id;
	          var callback = getShareContent_CB;
	            console.log(url);
	            loadFile(url, callback);
}

var dat67;
function getShareContent_CB(data){
	var obj = JSON.parse(data);
	dat67 = obj;
	if(shareTitleID)
	{
		getElementObject(shareTitleID).innerHTML = obj['name' + shareLang];
		document.title = obj['name' + shareLang];
	}
	if(shareID)
	{
		getElementObject(shareID).innerHTML = obj['desc' + shareLang] + getShareContentAux(obj);
	}
	  setTimeout('handleEmbeddedLinks("' + shareID + '")', 200);
}

function getShareContentAux(pInfo)
{
	var pKeys = Object.keys(pInfo);
	var brandText = "";
	var addrstr = "";
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
	 // currAddr = addrstr;
	 if(addrstr.length > 1){
		brandText = "<div class='title'>" + brandText + "</div><a class='address' target='_blank' href='http://maps.apple.com/?q=" + brandText + " " + addrstr  + "'>" + "<p>" + addrstr+ "</p></a>";
	 }
	 temp = "web";
	 if(pKeys.contains(temp) >=0){
	 webLink = decodeURIComponent(pInfo[temp]);
		if(webLink.length > 0){
			if(webLink.substring(0,4) != "http"){
				webLink = "http://" + webLink;	
			}
			brandText += "<a class='url' target='_blank' href='"+ webLink +"'>" + webLink + "</a>";
		}
	}
	  temp = "tel";
	  if(pKeys.contains(temp) >=0){
		addrstr = decodeURIComponent(pInfo[temp]).split(",");
	    for(var t=0; t< addrstr.length; t++){
			brandText = brandText + "<a class='phoneno' target='_blank' href='tel:" +  addrstr[t]  + "'>" + addrstr[t] + "</a>";
	    }
	  }

	  temp = "email";
	  if(pKeys.contains(temp) >=0){
	     brandText = brandText + "<a class='email' target='_blank' href='mailto:" + decodeURIComponent(pInfo[temp])  + "'>" + decodeURIComponent(pInfo[temp]) + "</a>";
	  }

	return brandText;
}


function assignBodyClassnames()
{
  var classTemp = "body " + " " + App.ID;
  if(App.embedded === "true"){
    classTemp = classTemp + " embedded";
      if(ENV.device.iOS){
        classTemp = classTemp + " iosembedded";
      }
  }
  else{
    classTemp = classTemp + " webapp";
  }
  if(ENV.screen.small){
    classTemp = classTemp + " smallScreen";
    if(Object.keys(App).indexOf("classSmall") >= 0){
        document.getElementsByTagName("html")[0].className =
         document.getElementsByTagName("html")[0].className + " " + App.classSmall;
    }
  }
  else{
    classTemp = classTemp + " bigScreen";
    if(Object.keys(App).indexOf("classBig") >= 0){
        document.getElementsByTagName("html")[0].className =
         document.getElementsByTagName("html")[0].className + " " + App.classBig;
    }
  }

  if(ENV.device.touchSupport){
    classTemp = classTemp + " touchSupport";
  }
  else{
    classTemp = classTemp + " web";
  }
    getElementObject("body").className = classTemp;
}


function parseVideoURL(url) {

	    function getParm(url, base) {
		            var re = new RegExp("(\\?|&)" + base + "\\=([^&]*)(&|$)");
			            var matches = url.match(re);
				            if (matches) {
						                return(matches[2]);
								        } else {
										            return("");
											            }
					        }

	        var retVal = {};
	       
		    var matches;

		        if (url.indexOf("youtube.com/watch") != -1) {
				        retVal.provider = "youtube";
					        retVal.id = getParm(url, "v");
						    } else if (matches = url.match(/vimeo.com\/(\d+)/)) {
							            retVal.provider = "vimeo";
								            retVal.id = matches[1];
									        }
			if(retVal.provider == undefined){
				retval = null;
			}
			    return(retVal);
}


function matchVimeoUrl(url){
	var p = 
	/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
	 return (url.match(p)) ? RegExp.$1 : false ;
}

function matchYoutubeUrl(url){
	var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	 return (url.match(p)) ? RegExp.$1 : false ;
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	    var dLat = deg2rad(lat2-lat1);  // deg2rad below
	      var dLon = deg2rad(lon2-lon1); 
	        var a = 
			    Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
				    Math.sin(dLon/2) * Math.sin(dLon/2)
				        ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		    var d = R * c; // Distance in km
		      return d;
}

function deg2rad(deg) {
	  return deg * (Math.PI/180)
}

function scaleDown(data, h, w, prefix, suffix, target, TMCE)
{
    var canvas = document.createElement("canvas");
    var img = document.createElement("img");
    img.onload= function(){
        var MAX_WIDTH = h
        var MAX_HEIGHT = w;
        var width = img.width;
        var height = img.height;

        if (width > height) {
              if (width > MAX_WIDTH) {
                 height *= MAX_WIDTH / width;
                 width = MAX_WIDTH;
              }
        } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
              }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        var dataurl = canvas.toDataURL("image/png");
        //var dataurl = canvas.toDataURL();

        var temp = prefix + dataurl + suffix;
        
        if(TMCE){
            tinyMCE.get(target).setContent(temp);
        }
        else{
            getElementObject(target).innerHTML = temp;
        }
   }
   img.src = data;
}

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


function downloadFile(data, mime)
{
         if (document.execCommand) {
             var oWin = window.open("about:blank", "_blank");
             oWin.document.write(data);
             oWin.document.close();
             var success = oWin.document.execCommand('SaveAs', true, "download." + mime);
             oWin.close();
             if (!success){
               window.open("data:text/" + mime + ";charset=utf-8," + escape(data));
             } 
         }
         else{
             window.open("data:text/" + mime + ";charset=utf-8," + escape(data))
         }
                 
         return;
} 



 function HandleBackFunctionality()
{
        if(window.event)
        {
           if(window.event.clientX < 40 && window.event.clientY < 0)
           {
               alert("Browser back button is clicked...");
           }
           else
           {
               alert("Browser refresh button is clicked...");
           }
       }
       else
       {
           if(event.currentTarget.performance.navigation.type == 1)
           {
                alert("Browser refresh button is clicked...");
           }
           if(event.currentTarget.performance.navigation.type == 2)
           {
                alert("Browser back button is clicked...");
           }
       }
}


if (!Object.keys) {
      Object.keys = function(obj) {
              var keys = [];

                  for (var i in obj) {
                            if (obj.hasOwnProperty(i)) {
                                        keys.push(i);
                                              }
                                }

                      return keys;
                        };
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
  offset: 0,
  currID: null,
  currList: [],
  show:function(){
    getElementStyleObject("arrowButtonsBBox").display = "block";
    navPlugin.refreshDisplay();
  },
  hide:function(){
    getElementStyleObject("arrowButtonsBBox").display = "none";
//    if(ENV.screen.small){
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
    lastScrollPosition = lastScrollPosition - 43
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
    else if(Canvas.current === "caresuser-appSettings"){
	  getElementObject("erAssetWrapper").innerHTML = "";
      stepSelected(temp);
      bsScrollERNav();
    }
    else if(Canvas.current === "caresuser-notifications"){
	    lastScrollPosition = lastScrollPosition - 25;
      notificationsSelected(temp);
      bsScrollNot();
    }
    else if(Canvas.current === "caresprovider-notifications"){
	   lastScrollPosition = lastScrollPosition - 25;
      notificationsSelected(temp);
      //bsScrollNot();
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
    else if(Canvas.current === "caresuser-appSettings"){
	  getElementObject("erAssetWrapper").innerHTML = "";
      stepSelected(temp);
      bsScrollERNav();
    }
    else if(Canvas.current === "caresuser-notifications"){
    lastScrollPosition = lastScrollPosition + 25;
      notificationsSelected(temp);
      bsScrollNot();
    }
  }
}


function showBackButton()
{
    backState = 2;
    getElementStyleObject("backButtonBBox").display = "block";
    hideHomeButton();
}
function hideBackButton()
{
	$(".brandWrapper2").removeClass("brandplain");
	getElementStyleObject("backButtonBBox").display = "none";
	if(ENV.screen.small){
        showHomeButton();
	}
}
function scrollToLastScroll()
{
	$("body").animate({"scrollTop":lastScrollPosition}, 200)
  	lastScrollPosition = 0;
}

var dataEdited = false;

function saveData()
{

  dataEdited = false;
}

function cancelData()
{

  dataEdited = false;
}

function showAddButton()
{
	getElementStyleObject("addButtonBBox").display = "block";
}

function hideAddButton()
{
	getElementStyleObject("addButtonBBox").display = "none";
}



