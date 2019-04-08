var App = {};
function buildApp()
{
  loadMenu();
  loadCanvases();
  mainMenuButtons.selected(0);
}


var doLogout = function()
{
  var x = confirm("Logout now?")
  if(x){
    loadFile("./logout", function(d){window.location.reload()})
  }
}

function getInputMethod(){
		var agent = navigator.userAgent.toLowerCase();

		if( agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1) {
      $("body").addClass("touchSupport")
		}
		else if( agent.indexOf('ipad') != -1) {
      $("body").addClass("touchSupport")
		}
		else if( agent.indexOf('android') != -1) {
      $("body").addClass("touchSupport")
		}
    else{
      $("body").addClass("mouseSupport")
    }
}

var start = function()
{
  $(".app-container").fadeOut(0);
  $('.sidenav').sidenav();
  getInputMethod();
  buildApp();
  $(".app-container").fadeIn();
}
function loadMenu()
{
  App.mainmenubuttons = [];
  console.log(App);
  for (i = 0; i < App.canvases.length; i++){
    App.mainmenubuttons[i] = "button" + App.canvases[i][0];
	  var Parent = document.getElementById("canvasWrapper");
	  var cn = "canvas";
		var NewNode = document.createElement("div");
		NewNode.id = App.canvases[i][0];
		NewNode.className = cn;
		Parent.appendChild(NewNode);
  }
  mainMenuButtons.list = App.mainmenubuttons;
    var outS = "";

    for (i = 0; i < App.mainmenubuttons.length; i++){
      outS += '<li class="bold"><a href="javascript:mainMenuButtons.selected('+ i + ')" class="waves-effect waves-teal">' + App.canvases[i][1] + '</a></li>'
    }
    $(".sidenav").html($(".sidenav").html() + outS);
}

function loadCanvases()
{
  for (i = 0; i < App.canvases.length; i++){
    (function (x){
      loadFile("res/canvases/" + x + "/index.html", function(data){
        $("#canvasWrapper #" + x).html(data)
      });
    })(App.canvases[i][0]);
    (function (x){
      loadFile("res/canvases/" + x + "/main.js", function(data){
         try{
           eval("App." + x + " = " + data);
         }
         catch(e){
          console.log("Canvas '" + x + "' JavaScript did not load --- " + e);
         }
         App[x].init();
         App[x].active();
      });
    })(App.canvases[i][0]);
		loadLessfile("res/canvases/" + App.canvases[i][0] + "/main.less", false);
	}
	less.refresh();
}

function loadJSfile(filename, callback){
  	var fileref=document.createElement('script')
  	fileref.setAttribute("type","text/javascript")
  	fileref.setAttribute("src", filename)

 	if (typeof fileref!="undefined"){
  		document.getElementsByTagName("head")[0].appendChild(fileref);
	}

	if(callback == null){ return; }

	fileref.onreadystatechange = function () {
        if (fileref.readyState == 'complete') {
            eval(callback+"()");
        }
    }

    // js.onload = function () {alert('JS onload fired');}


	return;
}

function loadLessfile(filename, refresh){
  var d = "";
  //d = "?t=" + new Date().getTime();
  	var fileref=document.createElement('link')
  	fileref.setAttribute("type","text/less")
  	fileref.setAttribute("rel","stylesheet/less")
  	fileref.setAttribute("href", filename + d)

 	if (typeof fileref!="undefined"){
  		var ret = document.getElementsByTagName("head")[0].appendChild(fileref);
		less.sheets.push(ret);
	}

	if(refresh){
		less.refresh();
	}

	return ret;
}

function loadCSSfile(filename, refresh){
  	var fileref=document.createElement('link')
  	fileref.setAttribute("type","text/css")
  	fileref.setAttribute("rel","stylesheet/css")
  	fileref.setAttribute("href", filename)

 	if (typeof fileref!="undefined"){
  		var ret = document.getElementsByTagName("head")[0].appendChild(fileref);
	}

	return ret;
}


var mainMenuButtons = {
	list: [],
	selected: function(n){
      activityIndicator.show();
      $(".menuMarkup li").removeClass("active");
      $(".menuMarkup li:nth-of-type(" + (n+2) + ")").addClass("active");
      goToCanvas(n);
      activityIndicator.hide();
	}
}

function goToCanvas(n)
{
  try{
    App[App.canvases[App.currCanvas][0]].inactive();
  }
  catch{}
  App.currCanvas = n;
  try{
    App[App.canvases[App.currCanvas][0]].active()
  }
  catch{}
  $('.sidenav').sidenav('close');
  $("#canvasWrapper .canvas").fadeOut("fast");
  $("#canvasWrapper .canvas:nth-of-type(" + (n+1) + ")").stop().fadeIn("slow");
}

var acMU = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" style="margin:auto; display:block"> <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle> </svg>';

var activityIndicator = {
  show:function(){
    $("body").append('<div style="position: fixed;height: 100vh;width: 100vw;text-align: center;background-color: rgba(255,255,255,.8);z-index: 100000;" class="ac"><svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" style="margin-top: 45vh;"> <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle> </svg></div>');
  },
  hide: function(){
    $(".ac").remove();
  }
}

var getUniqueID = function()
{
  return md5(userObj.local.email + new Date().getTime()).split("").sort(function(a,b){return -.5 + Math.random(0,1)}).toString().replace(/,/g,"")
}

var getLImarkup = function(item,cbSt){
  var thumb = item.thumb || "res/images/icon.png";
  var name = item.name || "Untitled";
  var desc = item.desc || "<br>";
  var mu =   '<li><a href="javascript:' + cbSt + '" class="inner">'+
      '<div class="li-img" style="background-image:url('+ thumb + ')">'+
      '</div>'+
      '<div class="li-text">'+
        '<h3 class="li-head">'+ name +'</h3>'+
        '<div class="li-sub">'+
         desc+
        '</div>'+
      '</div>'+
    '</a></li>'
  return mu;
}

var fileUploaded = function()
{
   var file = $('#theFileUploader').get(0);
   var fileObj = $('#theFileUploader').get(0).files[0]
   var filename = fileObj.name;
   var ext = filename.split(".");
   ext = ext[ext.length-1];
   console.log(ext);

   var fd = new FormData();
   var fileInput = "s3Upload_" + new Date().getTime().toString() + "." + ext;
   fd.append('fileInput', fileInput);
   fd.append('input', file.files[0]);
   fd.append('date', (new Date()).toString());

    //fd.append('data', data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState != 4) { return; }
        // callback logic
       document.getElementById("preview").src = "https://s3-us-west-2.amazonaws.com/ame470s2017tg/" + fileInput;
    };
    xhr.open("POST", "/uploadFile", true);
    xhr.send(fd);
}
