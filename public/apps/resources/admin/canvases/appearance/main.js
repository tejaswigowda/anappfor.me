var appearanceinit = function()
{
 	getElementObject("appTextPreview").innerHTML = "<div><b>Lorem Ipsum </b></div> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
				var outS = "<div class='textLeftDI'> Title Text Color </div>"+
 					"<a href='javascript:btcChange()'>"+
						"<div class='colorSwatch' id='btcPreview'> </div>"+
					"</a>"+
						"<div class='textLeftDI'> Text Color </div>"+
 					"<a href='javascript:tcChange()'>"+
						"<div class='colorSwatch' id='tcPreview'> </div>"+
					"</a>"+
						"<div class='textLeftDI'> Background Color </div>"+
 					"<a href='javascript:bgcChange()'>"+
						"<div class='colorSwatch' id='bgcPreview'> </div>"+
					"</a>"+
					"<div style='font-weight:normal;text-align:left;width: 35%;font-weight:bold;margin-left: 5%;margin-top:10px;margin-bottom:10px' class='titleText leftWrapper'> Font </div>"+
					"<div class='rightWrapper'> <select class='selectInput' onchange='appFontChanged()' id='fontSelect'>";
		var f = Object.keys(webSafeFonts);
		for(var i = 0; i< f.length; i++){
			outS += "<option value='" + i.toString() + "'>" + f[i] + "</option>";
		}
		outS += "</select></div>";
		outS += "<div class='fileUploadWrapper link'>"+
						"<div class='fileUploadText textLeftDI'> Change Icon</div>"+
						'<input type="file" name="iconUpload" id="iconUpload" onchange="iconUploaded()">'+
					"</div>";
        outS += "<p class='iconDetails'> The icon should be in PNG format, 128px in height and width. You can resize your icon here: <a href='http://www.picresize.com/'  class='link' target='_blank'>PicResize.com</a></p>";
 	getElementObject("appearanceInputBox").innerHTML = outS;
					
 // setTimeout('$("#appearanceInputBox .inputSlider").slider(); $(".ui-loader").hide();', 1000);
}

function appFontChanged()
{
	var t = parseInt(getElementObject("fontSelect").value);
	var f = Object.keys(webSafeFonts);
	console.log(t,f);
	getElementStyleObject("appPreview").fontFamily = webSafeFonts[f[t]];
	saveAppearanceInfo();
}

var data89;

function iconUploaded()
{
  var fd = new FormData();
  //getElementObject("iconUploadText").innerHTML = "Loading icon. Please wait";
  var fileObj = $('#iconUpload').get(0).files[0]
  var filename = fileObj.name;
  var size = fileObj.size;
  
  if(size > 256000){
    alertHandler.flashNewMessage("File too large", "please ensure your icon is under 256 Kb");  
    return;
  }
  fd.append('date', (new Date()).toString());
   fd.append('input', fileObj);
  var t = filename.substring(filename.length-4, filename.length).toLowerCase();
  if(t != ".png"){
    alertHandler.flashNewMessage("Incorrect File", "please ensure your icon is a png image");  
    return;
  }

  var fileInput = Location + "icon" + t;
  tempimg1 = fileInput;
  patReg = fileInput;

  var URL = window.URL || window.webkitURL;
  var url = URL.createObjectURL(fileObj);
  var img = new Image;

  img.onload = function() {
      var width = img.width;
      var height = img.height;
      if(width != 128 || height != 128){
        alertHandler.flashNewMessage("Incorrect File Size", "please ensure your icon is a png image of 128px X 128px resolution.");  
        return;
      }
      getElementStyleObject("headerTitlePreview").backgroundImage = "";
      fd.append('fileInput', fileInput);
      activityIndicator.setText("Uploading Icon...");
      activityIndicator.show();
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) { return; }
        activityIndicator.hide();
        getElementObject("iconUpload").value = "";
        saveAppearanceInfo();
        iconUpload_CB2();
      };
      xhr.open("POST", "/uploadFile", true);
      xhr.send(fd); 
  };
  img.src = url;
}

var patReg = "";
function iconUpload_CB2(){
	if(patReg.length == 0){
		return;
	}
	  getElementStyleObject("headerTitlePreview").backgroundImage = "url(" + App.resURL +  patReg + "?t=" + new Date().getTime()  + ")";
}


function appearanceActive()
{
  getAppearanceInfo();
  //iconUpload_CB2();
}

function getAppearanceInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getLocationInfo";
  url = url + "?loc=" + Location;
  var callback = getAppearanceInfo_CB;
  loadFile(url, callback);
}

var data68;

function getAppearanceInfo_CB(data)
{
  activityIndicator.hide();
  var hInfo = JSON.parse(data);
  data68 = hInfo;
  var hIKeys = Object.keys(hInfo);
  var temp;
  var addrstr = "";
  temp = "font";
  getElementObject("fontSelect").value = "0";
  if(hIKeys.contains(temp) >= 0){
    getElementObject("fontSelect").value = decodeURIComponent(hInfo[temp]);
  }
  temp = "name";
  if(hIKeys.contains(temp) >= 0){
    getElementObject("headerTitlePreview0").innerHTML = "<div class='title'>" + decodeURIComponent(hInfo[temp]) + "</div>";
  }
  else{
    getElementObject("headerTitlePreview0").innerHTML = "";
  }
  temp = "addr";
    	    addrstr = addrstr + "<div class='address'>";
    if(hIKeys.contains(temp) >=0){
    	    addrstr = addrstr + decodeURIComponent(hInfo[temp]);
    	      }
//            addrstr += "<div>";
      temp = "city";
        if(hIKeys.contains(temp) >=0){
        	    addrstr = " " + addrstr + decodeURIComponent(hInfo[temp]);
        	      }
          temp = "zip";
            if(hIKeys.contains(temp) >=0){
            	    addrstr = addrstr + " " + decodeURIComponent(hInfo[temp]);
            	      }
            addrstr += "</div>";
          temp = "web";
            if(hIKeys.contains(temp) >=0){
            	    addrstr = addrstr + "<div class='url'>" + decodeURIComponent(hInfo[temp]) + "</div>";
            	      }
                temp = "tel";
                  if(hIKeys.contains(temp) >=0){
                  	      var temp1 = decodeURIComponent(hInfo[temp]).split(",");
                  	          for(var t=0; t< temp1.length; t++){
                  	          	       addrstr = addrstr + "<div class='phoneno'>" + temp1[t] + "</div>";
                  	          	            }
                  	            }
                temp = "email";
                  if(hIKeys.contains(temp) >=0){
                  	      var temp1 = decodeURIComponent(hInfo[temp]).split(",");
                  	          for(var t=0; t< temp1.length; t++){
                  	          	       addrstr = addrstr + "<div class='email'>" + temp1[t] + "</div>";
                  	          	            }
                  	            }
    getElementObject("headerTitlePreview2").innerHTML = addrstr;
  
  temp = "color";
  if(hIKeys.contains(temp) < 0){
    temp = ["0", "0", "0", "100", "100", "100", "255", "255", "255"];
  }
  else{
    temp = JSON.parse(hInfo[temp]);
    if(temp == null){
		temp = ["0", "0", "0", "100", "100", "100", "255", "255", "255"];
	}
  }
   if(hIKeys.contains("image") >=0){
	patReg = hInfo.image;
	iconUpload_CB2();
	patReg = "";
   }

  appNumbers = temp;
  /*for(var i=0; i<appNumbers.length; i++){
    getElementObject(appNumbers[i]).value = temp[i];
  }*/
  // $("#appearanceInputBox .inputSlider").slider("refresh");
  appPreviewUpdate(false);

  dataEdited= false;
  unsavedDataPlugin.hide();
  appFontChanged();
}

function cancelAppearanceClicked()
{
  var t = getAppearanceInfo();
  unsavedDataPlugin.hide();
  dataEdited = false;
}

function saveAppearanceClicked()
{
  var t = appPreviewUpdate(false);
  if(t!=null){
    saveAppearanceInfo();
  }
}


function saveAppearanceInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editLocation";
  url = url + "?loc=" + Location;
  url = url + "&color=" + encodeURIComponent(JSON.stringify(appPreviewUpdate(false)));
  url = url + "&font=" + encodeURIComponent(getElementObject("fontSelect").value);
  if(patReg.length > 0){
	url = url + "&image=" + encodeURIComponent(patReg);
  }
  console.log(url);
  var callback = function(){
    activityIndicator.hide();
  }
  loadFile(url, callback);
}

function appearanceDeActive()
{
  getElementObject("iconUpload").value = "";
//  getElementObject("iconUploadText").innerHTML = "Upload/Change App Icon";
}

function appChanged()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function isNormalInteger(str) {
      var n = ~~Number(str);
      return String(n) === str && n >= 0 && n <=255;
}

var appNumbers = null;

function appPreviewUpdateTrue(){
  appChanged();
  appPreviewUpdate(false);
}

function appPreviewUpdate(flag)
{
  var temp;
  var valid = [true,true,true];
  var redColor = "rgb(209, 72, 54)";
  var colors = new Array();
  if(!appNumbers) return null;

  for(var i=0; i< appNumbers.length; i++){
    temp = appNumbers[i];
    if(isNormalInteger(temp)){
      colors[colors.length] = temp;
    }
    else{
      valid[parseInt(i/3)] = false;
    }
  }
  
  data0 = colors; 
  data1 = valid; 

  if(valid[0]){
    getElementStyleObject("appPreview").backgroundColor = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + ",0)";
    getElementStyleObject("bgcPreview").backgroundColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
  }
  else{
    getElementStyleObject("appPreview").backgroundColor = "";
    getElementStyleObject("bgcPreview").backgroundColor = "";
  }
  if(valid[1]){
    getElementStyleObject("appPreview").color = "rgba(" + colors[3] + "," + colors[4] + "," + colors[5] + ",0)";
    getElementStyleObject("tcPreview").backgroundColor = "rgb(" + colors[3] + "," + colors[4] + "," + colors[5] + ")";
  }
  else{
    getElementStyleObject("appPreview").color = "";
    getElementStyleObject("tcPreview").backgroundColor = "";
  }
  if(valid[2]){
    getElementStyleObject("headerPreview").color = "rgb(" + colors[6] + "," + colors[7] + "," + colors[8] + ")";
    getElementStyleObject("btcPreview").backgroundColor = "rgb(" + colors[6] + "," + colors[7] + "," + colors[8] + ")";
  }
  else{
    getElementStyleObject("headerPreview").color = "";
    getElementStyleObject("btcPreview").backgroundColor = "";
  }

  if(valid[0] && valid[1] && valid[2]){
    return colors;
  }
  else{
    return null;
  }
}

function bgcChange()
{
	colorInput.display(appNumbers[0], appNumbers[1], appNumbers[2], "Applet Background Color", function(){updateBGColor()});
}

function btcChange()
{
	colorInput.display(appNumbers[6], appNumbers[7], appNumbers[8], "Applet Name Text Color", function(){updateBTColor()});
}

function tcChange()
{
	colorInput.display(appNumbers[3], appNumbers[4], appNumbers[5], "Applet Text Color", function(){updateTColor()});
}

function updateBGColor()
{
	appNumbers[0] = colorInput.red.toString();
	appNumbers[1] = colorInput.green.toString();
	appNumbers[2] = colorInput.blue.toString();
	saveAppearanceInfo();
}

function updateBTColor()
{
	appNumbers[6] = colorInput.red.toString();
	appNumbers[7] = colorInput.green.toString();
	appNumbers[8] = colorInput.blue.toString();
	saveAppearanceInfo();
}

function updateTColor()
{
	appNumbers[3] = colorInput.red.toString();
	appNumbers[4] = colorInput.green.toString();
	appNumbers[5] = colorInput.blue.toString();
	saveAppearanceInfo();
}
