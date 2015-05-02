var discoverinit = function()
{
  getElementObject("buttondiscover").innerHTML = getElementObject("buttonplaces").innerHTML + '<div class="hilitebg badge" id="appBadge"> </div>';
}

var GPS = {
	lat:null,
	lng: null,
	time: null
}

function updateGPS()
{
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(updateGPSPosition);
	}
	else{
		GPS.lat = null;
		GPS.lng = null;
		GPS.time = null;
	}
}

function updateGPSPosition(pos)
{
	GPS.lat = pos.coords.latitude;
	GPS.lng = pos.coords.longitude;
	GPS.time = new Date().getTime();
}

function discoverDeActive()
{
}

function discoverActive()
{
    if(App.haslogin === 'true'){
        getElementStyleObject("loginBanner").display = "block";
    }
    hideBackButton();
    getElementStyleObject("body").backgroundImage = "none";
}

