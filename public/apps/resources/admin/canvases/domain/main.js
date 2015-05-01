var domaininit = function()
{
  getElementObject("domainMenu").innerHTML = 
	  "<div onchange='sdEC' onkeypress='sdEC()' class='titleText'> Domain Menu names </div>"+
	  "<label for='mi1'> 'Getting Started' </label>"+
     '<input onchange="sdEC" onkeypress="sdEC()" autocapitalize="off" autocorrect="off" type="text" class="input" placeholder="" id="mi1">'+ 
	  "<label for='mi2'> 'Library' </label>"+
	 '<input autocapitalize="off" autocorrect="off" type="text"  onchange="sdEC" onkeypress="sdEC()" class="input" placeholder="" id="mi2">'+ 
	  "<label for='mi3'> 'Resources' </label>"+
	 '<input autocapitalize="off" autocorrect="off" type="text" onchange="sdEC" onkeypress="sdEC()" class="input" placeholder="" id="mi3">'+ 
	  "<label for='mi4'> 'Providers' </label>"+
	 '<input autocapitalize="off" autocorrect="off" type="text" onchange="sdEC" onkeypress="sdEC()" class="input" placeholder="" id="mi4">'; 
  $("#domainMenu :input").focus(function() {
  		    $("label[for='" + this.id + "']").addClass("labelfocus");
			}).blur(function() {
				  $("label").removeClass("labelfocus");
				  });

}

var domainActive= function()
{
    subdomainActive1();
    subdomainActive2();
    scrollRefreshAll();
}

var subdomainActive1= function()
{ 
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "getDomain";
  url = url + "?loc=" + Location;
  var callback = function(data){
	  activityIndicator.hide();
	  if(data === "1"){
		  getElementObject("domainText").innerHTML = 
			  '<p class="titleText"> No sub domain set </p>'+
			  '<a class="titleText link" href="javascript:editDomain()">Set now </a>';
	  }
	  else if(data === "0"){
		  getElementObject("domainText").innerHTML = 
			  '<p class="titleText"> Something went wrong. Please try after a few minutes.</p>';
	  }
	  else{
		  var t = "https://" + data + ".caresapp.me";
		  getElementObject("domainText").innerHTML = 
			  '<a class="link titleText" target="_blank" href="' + t + '">' + t  + '</a>'+
			  '<a style="margin-top:0px" href="javascript:editDomain()" class="glassFinish deleteNo">Change</a>';
	  }
  };
  loadFile(url, callback);
}

var subdomainActive2= function()
{ 
  var url = App.mainURL;
  url = url + "getLocationInfo";
  url = url + "?loc=" + Location;
  var callback = function(data){
      activityIndicator.hide();
      var obj = JSON.parse(data);
      var keys = Object.keys(obj);
      var temp = "";
      for(var i = 1; i <= 4; i++){
          temp = "mi" + i.toString();
          if(keys.indexOf(temp) >=0){
              getElementObject(temp).value = decodeURIComponent(obj[temp]);
          }
          else{
              getElementObject(temp).value = "";
          }
      }
  }
  loadFile(url, callback);
}

var domainDeActive= function()
{
  getElementObject("domainText").innerHTML = "";
}


function editDomain()
{
	dialogInput.display("Preferred <i>subdomain</i> of CARESapp.me.","", setDomainNow, "Continue", "Cancel");
}

function setDomainNow()
{
  activityIndicator.show();
  var url = App.mainURL;
  url = url + "checkDomain";
  url = url + "?domain=" + dialogInput.value;
  var callback = setDomainNow_CB;
  console.log(url);
  loadFile(url, callback);
}

function setDomainNow_CB(data)
{
	//alert(data);
	if(data === "1" || data === Location){
	  var url = App.mainURL;
	  url = url + "editLocation";
	  url = url + "?loc=" + Location;
	  url = url + "&domain=" + dialogInput.value;
	  var callback = function(data){subdomainActive1()}
	  loadFile(url, callback);
	  return;
	}
	else{
		activityIndicator.hide();
	     alertHandler.flashNewMessage("Something went wrong", "Please try again");
	}
}


function setMenuTitles()
{
		activityIndicator.show();
	  var url = App.mainURL;
	  url = url + "editLocation";
	  url = url + "?loc=" + Location;
	  url = url + "&mi1=" + encodeURIComponent(getElementObject("mi1").value);
	  url = url + "&mi2=" + encodeURIComponent(getElementObject("mi2").value);
	  url = url + "&mi3=" + encodeURIComponent(getElementObject("mi3").value);
	  url = url + "&mi4=" + encodeURIComponent(getElementObject("mi4").value);
	  var callback = function(data){subdomainActive2()}
	  loadFile(url, callback);
	  return;
}


function sdEC()
{
  dataEdited = true;
  unsavedDataPlugin.show();
}


