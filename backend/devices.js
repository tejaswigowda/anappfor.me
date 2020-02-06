var url = require("url"),
	querystring = require("querystring");
//var home = "https://127.0.0.1:8443";
var home = "https:/foxden.xyz";
var Client = require('node-rest-client').Client;
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./backend/aws/credentials.json');
var s3 = new AWS.S3()//.client;
var iot = new AWS.Iot();
var iotdata = new AWS.IotData({endpoint: 'a1utoox4w9oy4a.iot.us-west-2.amazonaws.com'});
var Color = require('color');

var docClient = new AWS.DynamoDB.DocumentClient();

var demoBulbs = {
  'rgb2016-cartel1':0,
  'rgb2016-cartel3':0
}

var express = require('express')
  , router = express.Router()


module.exports = function(app, db) {

app.get('/unlinkamzn', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;

    db.collection('users').findOne({"email":userID}, function(err, result) {
      if(result){
        delete result.amazon; 
        db.collection('users').save(result, function(errn) {
         res.send("1");
        }); 
      }
      else{
         res.send("0");
      }
    });
  });
  app.get('/getalink', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;

    db.collection("alink").findOne({id:userID}, function(err, result) {
      if (result){
        result.token = "";
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(JSON.stringify(result));
        res.end();
      }
      else{
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("0");
        res.end();
      }
    });
  });

  app.get('/alexa-control', function (req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
	switch(info.action){
		case 'turnon':
		    var params = {
		      thingName: info.id,
		      payload: '{"state":{ "desired": {"on": true, "reset": false}}}'
		    };
		    iotdata.updateThingShadow(params, function(err, data) {
			if (err) {console.log(err);res.send('0');}
			else  { 
			  res.send('1');
			}
		    });
		    break;
		case 'turnoff':
		    var params = {
		      thingName: info.id,
		      payload: '{"state":{ "desired": {"on": false, "reset": false}}}'
		    };
		    iotdata.updateThingShadow(params, function(err, data) {
			if (err) {console.log(err);res.send('0');}
			else  { 
			  res.send('1');
			}
		    });
		    break;
		case 'setPercent':
		    var p = parseInt(info.p);
		    var params = {
			 thingName: info.id,
		    };
		    iotdata.getThingShadow(params, function(err, data) {
			if (err) res.send('0');
			else{    
			   var x = JSON.parse(data.payload).state.desired;
				var w = Math.ceil(x.w * p /100);
				var r = Math.ceil(x.r * p /100);
				var g = Math.ceil(x.g * p /100);
				var b = Math.ceil(x.b * p /100);
			    var params = {
			      thingName: info.id,
			      payload: '{"state":{ "desired": {"on": true, "w": ' + w + ', "r":' + r + ', "g":' + g + ', "b": '+ b + ', "reset": false}}}'
			    };
			    iotdata.updateThingShadow(params, function(err, data) {
				if (err) {console.log(err);res.send('0');}
				else  { 
				  res.send('1');
				}
			    });		
			}
		    });
		    break;
		case 'decPercent':
		    var p = parseInt(info.d);
		    var params = {
			 thingName: info.id,
		    };
		    iotdata.getThingShadow(params, function(err, data) {
			if (err) res.send('0');
			else{    
			   var x = JSON.parse(data.payload).state.desired;
				var w = Math.ceil(x.w * (1 - p /100));
				var r = Math.ceil(x.r * (1 - p /100));
				var g = Math.ceil(x.g * (1 - p /100));
				var b = Math.ceil(x.b * (1 - p /100));
			    var params = {
			      thingName: info.id,
			      payload: '{"state":{ "desired": {"on": true, "w": ' + w + ', "r":' + r + ', "g":' + g + ', "b": '+ b + ', "reset": false}}}'
			    };
			    iotdata.updateThingShadow(params, function(err, data) {
				if (err) {console.log(err);res.send('0');}
				else  { 
				  res.send('1');
				}
			    });		
			}
		    });
		    break;	
		case 'incPercent':
		    var p = parseInt(info.d);
		    var params = {
			 thingName: info.id,
		    };
		    iotdata.getThingShadow(params, function(err, data) {
			if (err) res.send('0');
			else{    
			   var x = JSON.parse(data.payload).state.desired;
				var w = Math.ceil(x.w * (1 + p /100));
				var r = Math.ceil(x.r * (1 + p /100));
				var g = Math.ceil(x.g * (1 + p /100));
				var b = Math.ceil(x.b * (1 + p /100));
			    var params = {
			      thingName: info.id,
			      payload: '{"state":{ "desired": {"on": true, "w": ' + w + ', "r":' + r + ', "g":' + g + ', "b": '+ b + ', "reset": false}}}'
			    };
			    iotdata.updateThingShadow(params, function(err, data) {
				if (err) {console.log(err);res.send('0');}
				else  { 
				  res.send('1');
				}
			    });		
			}
		    });
		    break;
		case 'color':
		    var colors = HSBtoRGB(parseInt(info.h), parseFloat(info.s)*100, parseFloat(info.b)*100)
		    var params = {
		      thingName: info.id,
		      payload: '{"state":{ "desired": {"on": true, "w": 0, "r":' + colors[0] + ', "g":' + colors[1] + ', "b": '+ colors[2] + ', "reset": false}}}'
		    };
		    iotdata.updateThingShadow(params, function(err, data) {
			if (err) {console.log(err);res.send('0');}
			else  { 
			  res.send('1');
			}
		    });
		    break;
		default:
		    res.send('0');
		    break;

	}
  });

  app.get('/alexa-discover', function (req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var token = info.token;
	console.log(token);
    var client = new Client();
    var args = {
      data: { test: "hello" },
      headers: { "Content-Type": "application/json",
        "Authorization": "bearer " + info.token
      }
    };

    client.get("https://api.amazon.com/user/profile", args, function (data, response) {
      console.log(data);
      var aID = data.email;
      console.log(aID);

	    db.collection('users').findOne({"amazon.email":aID}, function(err, result) {
	      if(result){
		var userID = result.email;	
		      console.log(userID);
		    db.collection("devices").find({userID:userID}).sort({sortID:1}).toArray(function(err1, result1) {
		      if (result1){
			      console.log(result1);
			var result2 = [];
			for(var i=0; i < result1.length; i++){
			      console.log(result1[i].type);
				result2[i] = JSON.parse(JSON.stringify(alexaDevicePT[result1[i].type]));
				result2[i].applianceId = result1[i].id;
				result2[i].modelName = result1[i].type;
				result2[i].friendlyName = result1[i].id;
				result2[i].friendlyDescription = "No desc";
				if(result1[i].name)
					result2[i].friendlyName = result1[i].name;
				if(result1[i].desc)
					result2[i].friendlyDescription = result1[i].desc;
			}
			      console.log(result2);
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.write(JSON.stringify(result2));
			res.end();
		      }
		      else{
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.write("[]");
			res.end();
		      }
		    });
	      }
	      else{
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.write("[]");
			res.end();
	
	      }
	    });
    });    

  });

  app.get('/amznlogin', isLoggedIn, function (req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    console.log(info);
    var client = new Client();
    var args = {
      data: { test: "hello" },
      headers: { "Content-Type": "application/json",
        "Authorization": "bearer " + info.access_token
      }
    };

    client.get("https://api.amazon.com/user/profile", args, function (data, response) {
    var userID = req.headers.email;
      data.id = userID;
   //   data.token = info.access_token;
      console.log(data);

	    db.collection('users').findOne({"email":userID}, function(err, result) {
	      if(result){
		var temp = Object.keys(data);
		var key;
		result.amazon = {};//{"token": info.access_token};
		for(var t = 0; t <  temp.length; t++){
		  key = temp[t];
		  result.amazon[key] = data[key];
		}
		db.collection('users').save(result, function(errn) {
		 res.redirect("amznlogin.html?t=" + new Date().getTime());
		}); 
	      }
	      else{
		 res.redirect("amznlogin.html?t=" + new Date().getTime());
	      }
	    });
	    

    });

});


  app.get('/addOrEditDevice', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    var outS = "";

    db.collection('devices').findOne({id:info.id}, function(err, result) {
      if(result){
        info["_id"] = result._id;
        var temp = Object.keys(info);
        var key;
        for(var t = 0; t <  temp.length; t++){
          key = temp[t];
          result[key] = info[key];
        }
        result.userID = userID;
        db.collection('devices').save(result, function(errn) {
          if (!errn) {
            res.end("1");
          } else {        
            res.end("0");            
          }   
        }); 
      }
      else{
        db.collection('devices').insert(info, function(err, result2) {
          if (result2) {
            res.end("1");
          }
           else {       
            res.end("0");            
          }   
        });
      }
    });
  });

  app.get('/getDevice', function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);

    db.collection("devices").findOne({id:info.id}, function(err, result) {
      if (result){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(JSON.stringify(result));
        res.end();
      }
      else{
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("[]");
        res.end();
      }
    });
  });
 
  app.get('/updateDeviceAttr', function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);

    var params = {
      thingName: 'STRING_VALUE', /* required */
      attributePayload: {
        attributes: info.attr,
        merge: true
      }//,
      //expectedVersion: 0,
      //removeThingType: true || false,
      //thingTypeName: 'STRING_VALUE'
    };

    iot.updateThing(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
    });
  });
   		
	app.get('/deviceResort', isLoggedIn, function(req, res){
      var incoming = url.parse(req.url).query;
      var info = querystring.parse(incoming);

      console.log(info.newOrder);
      var rows = info.newOrder.split(",");
      for(var i = 0; i < rows.length; i++){   
          db.collection("devices").update({id:rows[i]}, {$set:{sortID:i}}, function(err, result) {});
      }
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("1");
      res.end();
  });

  app.get('/getDevices', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    console.log(userID);

    db.collection("devices").find({userID:userID}).sort({sortID:1}).toArray(function(err, result) {
      if (result){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(JSON.stringify(result));
        res.end();
      }
      else{
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("[]");
        res.end();
      }
    });
  });
  


  app.get('/getDevicesInGroup', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    var group = info.groupID;

    db.collection("devices").find({tags:{$regex: group}}).sort({sortID:1}).toArray(function(err, result) {
      if (result){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(JSON.stringify(result));
        res.end();
      }
      else{
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("[]");
        res.end();
      }
    });
  });
  


  app.get('/getDeviceShadow', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    var params = {
      thingName: info.id,
    };
    iotdata.getThingShadow(params, function(err, data) {
        if (err) res.send('0');
          else     res.send(JSON.stringify(data));           // successful response
    });

  });
  


  app.get('/getDeviceOnOff', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    var params = {
      thingName: info.id,
    };
    iotdata.getThingShadow(params, function(err, data) {
        if (err) res.send('0');
        else res.send(JSON.parse(data.payload).state.desired.on);           // successful response
    });

  });
  

	
  app.get('/toggleDevice', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    console.log(userID);
    var params = {
      thingName: info.id,
    };
    iotdata.getThingShadow(params, function(err, result) {
        if (err) res.send('0');
        else  {
          result = JSON.parse(result.payload);
            if(result.state.desired.on){
              result.state.desired.on = false;
            }
            else{
              result.state.desired.on = true;
            };
            delete result.state.delta;
            params.payload = JSON.stringify(result);
            iotdata.updateThingShadow(params, function(err, data) {
                if (err) {console.log(err);res.send('0');}
                else  { 
                  res.send(JSON.stringify(result));
                }
            });
          }
    });
  });
  

	
  app.get('/updateDevice', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    console.log(userID);
    var params = {
      thingName: info.id,
      attributePayload: {attributes: info.payload}
    };
    iot.updateThing(params, function(err, data) {
        if (err) {console.log(err);res.send('0');}
        else  { 
          res.send('1');
        }
    });

  });
  


  app.get('/debugtest',  function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var things = info.thing.split(",");
    console.log(things);
    for(var i = 0; i < things.length; i++){
      var params = {
        thingName: things[i],
        payload: info.payload
      };
      iotdata.updateThingShadow(params, function(err, data) {
          if (err) {console.log(err);res.send('0');}
          else  { 
             res.send("1"); 
          }
      });
    }
  });
  

	
  app.get('/updateDeviceShadow', isLoggedIn, function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    var userID = req.headers.email;
    if(info.id.split("__")[0] === "G" &&  info.id.split("__").length > 2){
      var group = info.id.split("__")[2];
      var model = info.id.split("__")[1];
      db.collection("devices").find({tags:{$regex: group}, type:model}).sort({sortID:1}).toArray(function(err, result) {
        if (result){
          for(var i = 0; i<result.length; i++){
            var params = {
              thingName: result[i].id,
              payload: info.payload
            };
            iotdata.updateThingShadow(params, function(err, data) {
                if (err) {console.log(err);}
            });
          }
          res.send('1');
        }
        else{
          res.send('0');
        }
      });
    }
    else{
     var params = {
        thingName: info.id,
        payload: info.payload
      };
      iotdata.updateThingShadow(params, function(err, data) {
          if (err) {console.log(err);res.send('0');}
          else  { 
            var params = {
              thingName: info.id,
            };
            iotdata.getThingShadow(params, function(err1, data1) {
              console.log(err1);
                if (err) res.send('[]');
                  else     res.send(JSON.stringify(data1));           // successful response
            });
          }
      });
    }
  });
  
function isLoggedIn(req, res, next) {// route middleware to ensure user is logged in
  var cn = "auth"
  if(req.headers.sessionid && req.headers.email){
    db.collection(cn).findOne({email:req.headers.email}, function (err,result){
      if(result && result.sessions){
        var sessionid = req.headers.sessionid;
        if(Object.keys(result.sessions).indexOf(sessionid) >= 0){
          var ts = result.sessions[sessionid];
          var now = new Date().getTime();
          if((now - ts) <= 24*60*60*1000){
            return next();
          }
          else{
            res.send("noauth");
          }
        }
        else{
          res.send("noauth");
        }
      }
      else{
        res.send("noauth");
      }
    });
  }
  else{
    res.send("noauth");
  }
}
  app.get('/updateColor', function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    sendM(info.id, res, info.r, info.g, info.b);
	res.send("1");
  });
 
  app.get('/updateColor2', function(req, res){
    var incoming = url.parse(req.url).query;
    var info = querystring.parse(incoming);
    sendM(info.id, res, info.r*255, info.g*255, info.b*255);
    res.send("1");
  });
 
}





function HSBtoRGB(h, s, b)
{
	return Color.hsv(h,s, b).rgb().color;
}

var alexaDevicePT = {
     'PTH2017':{
        applianceId: '',
        manufacturerName: 'FoxDen IoT',
        version: '1.0',
        friendlyName: '',
        friendlyDescription: '',
        isReachable: true,
        actions: ['turnOn', 'turnOff'],
        additionalApplianceDetails: {
        }
    },
     'WSOC2017':{
        applianceId: '',
        manufacturerName: 'FoxDen IoT',
        version: '1.0',
        friendlyName: '',
        friendlyDescription: '',
        isReachable: true,
        actions: ['turnOn', 'turnOff'],
        additionalApplianceDetails: {
        }
    },
    'RGBS2017':{
        applianceId: '',
        manufacturerName: 'FoxDen IoT',
        version: '1.0',
        friendlyName: '',
        friendlyDescription: '',
        isReachable: true,
        actions: ['turnOn', 'turnOff', 'setPercentage', 'incrementPercentage', 'decrementPercentage', 'setColor'],
        additionalApplianceDetails: {
        }
    },
    'RGB2016':{
        applianceId: '',
        manufacturerName: 'FoxDen IoT',
        version: '1.0',
        friendlyName: '',
        friendlyDescription: '',
        isReachable: true,
        actions: ['turnOn', 'turnOff', 'setPercentage', 'incrementPercentage', 'decrementPercentage', 'setColor'],
        additionalApplianceDetails: {
        }
    },
    'RGB2017':{
        applianceId: '',
        manufacturerName: 'FoxDen IoT',
        version: '1.0',
        friendlyName: '',
        friendlyDescription: '',
        isReachable: true,
        actions: ['turnOn', 'turnOff', 'setPercentage', 'incrementPercentage', 'decrementPercentage', 'setColor'],
        additionalApplianceDetails: {
        }
    }
};
//runDKron();setInterval(runDKron, 30000);

function getRandomInt(min, max) {
    min = Math.ceil(min);
      max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
}

function runDKron()
{
  var delay =  5 * 60 * 1000;
  var list = Object.keys(demoBulbs);
  for(var i = 0; i < list.length; i++){
     var params = {
       thingName: list[i]
     };
     var ltime = demoBulbs[list[i]];
     var now = new Date().getTime();
     console.log(now, ltime);
     if(now - ltime > delay){
        var p= {};
        p.state = {};
        p.state.desired = {w:0, r:getRandomInt(0,100), g:getRandomInt(0,100), b:getRandomInt(0,100), on: true }
        params.payload = JSON.stringify(p);
        console.log(params);
        iotdata.updateThingShadow(params, function(err, data) {
         // rc1 = now;
        });
     }
  }
}


