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
        initialize: function() {
            apppush.bindEvents();
        },
        bindEvents: function() {
        },
        setBadge: function(num) {
            var pushNotification = window.plugins.pushNotification;
            var empty = function(){}
            pushNotification.setApplicationIconBadgeNumber(empty, empty, num);
        },
        storeToken:function(token){
            apppush.token = token;
            var url = App.mainURL;
            url = url + "addToken";
            url = url + "?userID=" + encodeURIComponent(userID);
            url = url + "&token=" + encodeURIComponent(token);
            var callback = function(){};
            loadFile(url, callback);
            return;
        },
        token: "unset",
        register: function() {
            var pushNotification = window.plugins.pushNotification;
            var empty = function(){}
            pushNotification.register(
                apppush.storeToken,
                empty,
                {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"apppush.bindEvents"
                });
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
