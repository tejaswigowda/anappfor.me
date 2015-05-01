/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var apppush = {
    // Application Constructor
    initialize: function() {
        apppush.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', apppush.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        apppush.receivedEvent('deviceready');
          appush.register();
    },
    setBadge: function(num) {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.setApplicationIconBadgeNumber(num);
    },
    storeToken:function(token){
        apppush.token = token;
        var url = App.mainURL;
        url = url + "addProToken";
        url = url + "?userID=" + encodeURIComponent(userID);
        url = url + "&token=" + encodeURIComponent(token);
        url = url + "&loc=" + encodeURIComponent(Location);
		var callback = function(){};
		loadFile(url, callback);
        return;
    },
    token: "unset",
    register: function() {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.registerDevice({alert:true, badge:true, sound:true}, function(status) {
                                        apppush.storeToken(status.deviceToken);
                                        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
	   // notFlairClicked();
    }
};





function getDocHeight() {
	    var D = document;
	        return Math.max(
			document.getElementById(Canvas.current + "ScrollWrapper").clientHeight
	    );
}

// document.addEventListener('touchmove', function(e){handleTouchMove(e)}, false)
// document.addEventListener('touchend', function(e){handleTouchEnd(e)}, false)
		 
		
function handleTouchEnd(e) {
	document.getElementById("headerWrapper").style.marginTop = "0px";
	document.getElementById("footerWrapper1").style.bottom = "-200px";
}


function handleTouchMove(e) {
	var y_scroll_pos = window.pageYOffset;
	var ht = getDocHeight();
	var scroll_pos_test = 0;             
	if(y_scroll_pos <= scroll_pos_test) {
		document.getElementById("headerWrapper").style.boxShadow = "0px 1px 10px";
	}
	else
	{
		document.getElementById("headerWrapper").style.boxShadow = "";
	}	
	if(y_scroll_pos >= ht-20) {
		document.getElementById("footerWrapper1").style.boxShadow = "0px -1px 10px";
	}
	else
	{
		document.getElementById("footerWrapper1").style.boxShadow = "";
	}
}
