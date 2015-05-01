gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';

window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.plugins.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};

setTimeout("onDeviceStart()", 5000);

function onDeviceStart() {
  gApp.deviceready = true;  
  window.plugins.GCM.register("368554841631", "GCM_Event", GCM_Success, GCM_Fail );
}


function
GCM_Event(e)
{
  switch( e.event )
  {
  case 'registered':
    apppush.token = e.regid;
    break;

  case 'message':
    //notFlairClicked();
    break;

  case 'error':
    break;

  default:
    break;
  }
}

function GCM_Success(e)
{

}

function GCM_Fail(e)
{

}

var apppush = {
	register:function(){
	        token = apppush.token;
			if(token === "unset") {return}
			
	        var url = App.mainURL;
	        url = url + "addProToken";
	        url = url + "?userID=" + encodeURIComponent(userID);
	        url = url + "&token=" + encodeURIComponent(token);
            url = url + "&loc=" + encodeURIComponent(Location);
			var callback = function(){};
			loadFile(url, callback);
	        return;
	    },
	    token: "unset"
}

