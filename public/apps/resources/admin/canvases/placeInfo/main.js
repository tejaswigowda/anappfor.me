var placeInfoinit = function()
{
 getElementObject("hospitalInfoInputBox").innerHTML = '<p class="titleTextLeft" id="appstatusTitle"> ' + CARESTEAMLOGO + ' Status </p> <div class="text" id="appletStatus"> </div>'+
	 '<div id="giTitle" class="titleTextLeft"> General Information </div><label for="hospitalName">' + CARESTEAMLOGO + ' Name</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalName"> <label for="hospitalDesc"> Brief Description </label> <textarea class="textarea" onkeypress="hospitalInfoEC()" id="hospitalDesc"> </textarea> <label for="hospitalAddr"> Street Address </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalAddr"> <label for="hospitalCity" > City </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalCity"> <label for="hospitalZip" > ZIP Code </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalZip"> <label  for="hospitalTel"> Phone Number </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalTel"><label  for="hospitalWeb"> Website </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalWeb"><label for="hospitalEmail"> Email</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="hospitalEmail">'+
	 '<label for="appLinkedin"> LinkedIn</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="appLinkedin">'+
	 '<label for="appGplus"> Google+ </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="appGplus">'+
	 '<label for="appFB"> Facebook</label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="appFB">'+
	 '<label for="appTW"> Twitter </label> <input autocapitalize="off" autocorrect="off" class="input" onkeypress="hospitalInfoEC()" id="appTW">';

getElementObject("hospitalInfoWaitTime").innerHTML = '<div class="titleTextLeft" id="wtTitle"> Wait Time</div> <select onChange="hospitalInfoEC()" class="selectInput" id="waitTime"> <option value="NA"> Do not specify </option><option value="0"> No wait time</option><option value="30"> 30 minutes</option><option value="60">60 minutes</option> <option value="90"> 90 minutes</option> <option value="100">More than 90 minutes</option></select>';
	getElementObject("hospitalInfoOptions").innerHTML = 
        '<div class="titleTextLeft" id="catTitle">Categories</div>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption0" type="checkbox"> <label for="hiOption0"> Care Coordination </label> <p>Transitional Care, Palliative Care, Hospice</p>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption1" type="checkbox"> <label for="hiOption1">Community Living </label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption2" type="checkbox"> <label for="hiOption2">Dental </label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption3" type="checkbox"> <label for="hiOption3"> General Medicine/ Primary Care </label> <p>Concierge Medicine, Family Practice, Home Care, Internal Medicine, Pediatric Medicine</p>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption4" type="checkbox"> <label for="hiOption4"> Healthy Living/Self Discovery</label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption5" type="checkbox"> <label for="hiOption5"> Pet Care</label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption6" type="checkbox"> <label for="hiOption6"> Pharmacies</label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption7" type="checkbox"> <label for="hiOption7">Preventative/Rehabilitation/Therapeutic Medicine </label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption8" type="checkbox"> <label for="hiOption8">Specialities </label> <p>Cardiology, Emergency Medicine, Hospital Care, Orthopedic Medicine, Sports Medicine, Urgent Care</p>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption9" type="checkbox"> <label for="hiOption9"> Vendors</label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption10" type="checkbox"> <label for="hiOption10"> Vision</label>'+
		'<input onChange="hospitalInfoEC()" autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption11" type="checkbox"> <label for="hiOption11">Collective Impact and Sustainability</label>';
		//'<input autocapitalize="off" autocorrect="off" class="inputcheck" id="hiOption5" type="checkbox"> <label for="hiOption5"> </label>'+

  $("#hospitalInfoInputBox :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });
}

function getCategoryString()
{
	var outS = "";
	for (var i = 0; i < 12; i++){
		if(getElementObject("hiOption" + i.toString()).checked){
			outS += "1";
		}
		else{
			outS += "0";
		}
	}
	return outS;
}

function setCategoryString(catSt)
{
	for (var i = 0; i < 12; i++){
		getElementObject("hiOption" + i.toString()).checked = false;
	}
	for (var i = 0; i < catSt.length; i++){
		if(i==10){
			break;
		}
		if(catSt[i] === "1"){
			getElementObject("hiOption" + i.toString()).checked = true;
		}
	}
}


function hospitalInfoEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}

function placeInfoActive()
{
  placeInfoInfo();
  //unsavedDataPlugin.show();
}

function placeInfoInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getLocationInfo";
  url = url + "?loc=" + Location;
  var callback = getHospitalInfo_CB;
  loadFile(url, callback);
}

function getHospitalInfo_CB(data)
{
  activityIndicator.hide();
  var hInfo = JSON.parse(data);
  var hIKeys = Object.keys(hInfo);
  var temp;
  temp = "published";
  if(hIKeys.contains(temp) >=0 && hInfo[temp] === "true"){
    getElementObject("appletStatus").innerHTML = "Your " + CARESTEAMLOGO + " is now LIVE."+
	    "</br>"+
	    "&hearts; " + CARESTEAMLOGO + " ID: " + Location;
  }
  else{
    getElementObject("appletStatus").innerHTML = "Your " + CARESTEAMLOGO + " is now ON HOLD."+
	    "</br>"+
	    CARESTEAMLOGO + " ID: " + Location;
  }
  temp = "catSt";
  if(hIKeys.contains(temp) >=0){
    setCategoryString(decodeURIComponent(hInfo[temp]));
  }
  else{
	setCategoryString("00000");
  }
  
  temp = "waitTime";
  if(hIKeys.contains(temp) >=0){
    getElementObject("waitTime").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("waitTime").value = "NA";
  } 
 
  temp = "name";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalName").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalName").value = "";
  } 

  temp = "fb";
  if(hIKeys.contains(temp) >=0){
    getElementObject("appFB").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("appFB").value = "";
  }


  temp = "tw";
  if(hIKeys.contains(temp) >=0){
    getElementObject("appTW").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("appTW").value = "";
  }


  temp = "gplus";
  if(hIKeys.contains(temp) >=0){
    getElementObject("appGplus").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("appGplus").value = "";
  }

 
  temp = "linkedin";
  if(hIKeys.contains(temp) >=0){
    getElementObject("appLinkedin").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("appLinkedin").value = "";
  }

  temp = "desc";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalDesc").value = hInfo[temp];
  }
  else{
    getElementObject("hospitalDesc").value = "";
  }

  temp = "addr";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalAddr").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalAddr").value = "";
  }

  temp = "city";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalCity").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalCity").value = "";
  }

  temp = "zip";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalZip").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalZip").value = "";
  }

  temp = "tel";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalTel").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalTel").value = "";
  }

  temp = "web";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalWeb").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalWeb").value = "";
  }

  temp = "email";
  if(hIKeys.contains(temp) >=0){
    getElementObject("hospitalEmail").value = decodeURIComponent(hInfo[temp]);
  }
  else{
    getElementObject("hospitalEmail").value = "";
  }
}

function saveHospitalInfo()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "editLocation";
  url = url + "?loc=" + Location;
  url = url + "&name=" + encodeURIComponent(getElementObject("hospitalName").value);
  url = url + "&fb=" + encodeURIComponent(getElementObject("appFB").value);
  url = url + "&tw=" + encodeURIComponent(getElementObject("appTW").value);
  url = url + "&gplus=" + encodeURIComponent(getElementObject("appGplus").value);
  url = url + "&linkedin=" + encodeURIComponent(getElementObject("appLinkedin").value);
  url = url + "&desc=" + encodeURIComponent(getElementObject("hospitalDesc").value);
  url = url + "&addr=" + encodeURIComponent(getElementObject("hospitalAddr").value);
  url = url + "&city=" + encodeURIComponent(getElementObject("hospitalCity").value);
  url = url + "&zip=" + encodeURIComponent(getElementObject("hospitalZip").value);
  url = url + "&tel=" + encodeURIComponent(getElementObject("hospitalTel").value);
  url = url + "&web=" + encodeURIComponent(getElementObject("hospitalWeb").value);
  url = url + "&email=" + encodeURIComponent(getElementObject("hospitalEmail").value);
  url = url + "&catSt=" + encodeURIComponent(getCategoryString());
  url = url + "&waitTime=" + encodeURIComponent(getElementObject("waitTime").value);
    url = url + "&waitTimeDate=" + encodeURIComponent(new Date().getTime().toString());
  var callback = function(){
    activityIndicator.hide();
  }
  loadFile(url, callback);
}

function hospitalInfoDeActive()
{
  getElementObject("hospitalName").value = "";
  getElementObject("hospitalDesc").value = "";
  getElementObject("hospitalAddr").value = "";
  getElementObject("hospitalCity").value = "";
  getElementObject("hospitalZip").value = "";
  getElementObject("appFB").value = "";
  getElementObject("appTW").value = "";
  getElementObject("appGplus").value = "";
  getElementObject("appLinkedin").value = "";
  getElementObject("hospitalTel").value = "";
  getElementObject("hospitalWeb").value = "";
  getElementObject("hospitalEmail").value = "";
}
