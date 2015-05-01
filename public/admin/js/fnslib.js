var color =
{
	selected: "#53a6cc",
	gold: "gold",
	white: "white",	
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
	show: function(){
		getElementStyleObject("activityIndicator").display = "block";  
    setInterval("activityIndicator.end(" + activityIndicator.no + ")", 60000);
	},
	hide: function(){
		getElementStyleObject("activityIndicator").display = "none";  
    activityIndicator.no = activityIndicator.no + 1;
	},
  end: function(n){
    if(n == activityIndicator.no){
      // reload code;
      window.location.href = "../logout.html#admin"
    }
  }
}   

var messageHandler =
{
	lastMessageDiv : 0,
	duration: 4500, 
	msgSemaphore: false, 
	
	outAnimation: "",
	inAnimation: "",
	
	initialize: function(){
		FNS.goDown('message_0'); 
		this.msgSemaphore = false;
		this.lastMessageDiv = 0;
	},
	     
	
	flashNewMessage : function(msg, msgAux){  
	   
        FNS.goDown('message_' + messageHandler.lastMessageDiv);

		if (this.msgSemaphore){ 
			this.msgSemaphore = false;
			return;
		}          
		
		this.lastMessageDiv++;
		
		var Parent = document.getElementById("messagesWrapper");
		var NewLI = document.createElement("LI");
		NewLI.innerHTML =  "<h1>" +  msg + "</h1>" +  "<p>" +  msgAux + "</p>" ;

		NewLI.id = "message_" + this.lastMessageDiv;
		NewLI.className = "message";
		Parent.appendChild(NewLI);	
		                               
		FNS.addTapElement("message_" + messageHandler.lastMessageDiv, messageHandler.bringItDownNow);
		
		this.__bringItDown(this.lastMessageDiv);
		this.bringItUpNow(this.lastMessageDiv);
		
	},
	
	__bringItDown: function(aMsgDiv){
		setTimeout('FNS.goDown("message_' + aMsgDiv + '")', this.duration);
	},
	
	bringItDownNow: function(){
		FNS.goDown('message_' + messageHandler.lastMessageDiv);
	},  
	    
	bringItUpNow: function(aMsgDiv){
		FNS.goCenter('message_' + aMsgDiv);
	}
	
	
	
	
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
  console.log(divID);
	var divPos = FNS.buttonElements.contains(divID);
	
	posTouchStart = getiScrollState(); 

	if (divPos < 0){
		return;
	}
	
	FNS.buttonElementsStatus[divPos] = "touched";
	
	
	
}



function appWrapperTouchMove()
{
	
}


function appWrapperTouchEnd(event)
{        
	//if(FNS.noOfTouchesOnScreen > 1){return;}
	
	var divID = event.target.id;
	var divPos = FNS.buttonElements.contains(divID);
	
	FNS.lastTouchEnd = divID;
    
	posTouchEnd = getiScrollState(); 
	
	if (divPos >= 0){

		if (FNS.buttonElementsStatus[divPos] === "touched"){			
			if (posTouchEnd == posTouchStart){
				FNS.buttonElementsTarget[divPos]();
			}
		}
	}
	
	for (var j = 0; j < FNS.buttonElementsStatus.length; j++){
		FNS.buttonElementsStatus[j] = "none";
	}
	
}


function appWrapperTouchCancel()
{
	for (var j = 0; j < FNS.buttonElementsStatus.length; j++){
		FNS.buttonElementsStatus[j] = "none";
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
		FNS.goDown("confMessage");
	},                                                       
	
	yesCallback : null,
	noCallback : null,
	
	alert: function(message){     
		getElementObject("confMessageQ").innerHTML = message;  
        FNS.goCenter("confMessage"); 	
	}
}


/* the master object that holds important variables that can dictate app behavior */

var FNS = {  
    
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
        if(FNS.device.android){
            return;
        }
        getElementObject(divID).blur();
    },  
    
    focus:function(divID){
        if(FNS.device.android){
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
		
		FNS.zoom = zoomPercent;

	},
	
	identifyDevice: function(){
		var agent = navigator.userAgent.toLowerCase();

		if( agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1) {
			FNS.device.iOS = true;
			FNS.device.android = false;
			FNS.device.iPad = false;
			FNS.device.touchSupport = true;
		}

		else if( agent.indexOf('ipad') != -1) {
			FNS.device.iOS = false;
			FNS.device.android = true;
			FNS.device.iPad = true;
			FNS.device.touchSupport = true;
		}

		else if( agent.indexOf('android') != -1) {
			FNS.device.iOS = false;
			FNS.device.android = true;
			FNS.device.iPad = false;
			FNS.device.touchSupport = true;
		}		
	},

	goUp: function(divID)
	{
		getElementStyleObject(divID).webkitTransform = "translate3d(0px,-1340px,0)";
        setTimeout('getElementStyleObject("' + divID + '").display = "none"', 600);
	},

	goDown: function(divID)
	{
		getElementStyleObject(divID).webkitTransform = "translate3d(0px,1340px,0)";	
        setTimeout('getElementStyleObject("' + divID + '").display = "none"', 600);

	},
	
	goCenter: function(divID)
	{
        getElementStyleObject(divID).display = "block";
        setTimeout('getElementStyleObject("' + divID + '").webkitTransform = "translate3d(0px,0,0)"', 100);
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



		if(FNS.buttonEVClass == null){
			getElementObject(divID).innerHTML =	getElementObject(divID).innerHTML + '<div id="' + divID + '__eventListener"' + ' class="eventListener"></div>';
		}
		else{
			getElementObject(divID).innerHTML =	getElementObject(divID).innerHTML + '<div id="' + divID + '__eventListener"' + ' class="eventListener ' + FNS.buttonEVClass +'"></div>';			
			FNS.buttonEVClass = null;
		}
		
		
		if (!this.device.touchSupport){
			setTimeout('document.getElementById("' + divID + '__eventListener' + '").addEventListener("click",' + targetFunction + ', false)', 1000);
		}

		document.getElementById(divID).style.position = "relative";
		
	},
	
addButtonElementAtag: function (divID, targetFunction)
	{
   console.log(targetFunction);
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
		//FNS.addTapElement("alphaLabel", listFilter.alphaLabelClicked);
		FNS.addTapElement("alphaRight", listFilter.alphaRightClicked);
		FNS.addTapElement("alphaLeft", listFilter.alphaLeftClicked);   
		
		//FNS.addTapElement("tagsLabel", listFilter.tagsLabelClicked);
		
		FNS.addTapElement("filterTagsButton", listFilter.tagsClicked);
		FNS.addTapElement("filterAddNewButton", listFilter.addNewClicked);
		FNS.addTapElement("filterSearchButton", listFilter.searchClicked);
		FNS.addTapElement("filterAZButton", listFilter.azClicked);

		FNS.addTapElement("filterSearchGoButton", listFilter.searchNow);
		FNS.addTapElement("searchLabel", listFilter.searchClicked);

		
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
		FNS.applyStyle.focus("selectAlpha");
		document.body.scrollTop = 0;
		document.body.scrollLeft = 0;  
	},   
         
    tagsLabelClicked: function()
	{
		FNS.applyStyle.focus("selectTags");
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
		
		FNS.applyStyle.focus("filterSearchInput");  
		
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
