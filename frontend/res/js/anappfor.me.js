var App = {};
function buildApp()
{
  loadMenu();
  loadCanvases();
  mainMenuButtons.selected(0)
}


function logoutNow(){loadFile("./logout", function(d){window.location.reload()})}

var doLogout = function()
{
  modal.show("Logout?", "Are you sure?", "modal.hide", 
    "logoutNow", "No", "Yes"
  ); 
}

function lostPwd(){
  modal.hide();
  $("body").append(
     '<div style="z-index: 1002; display: block; opacity: 1;" class="modal-overlay"> </div>'+
       '<div class="modal menutextColor brandBG" style="border-radius: 10px; box-shadow: 0px 0px 10px;overflow:hidden;z-index: 1003; display: block; opacity: 1; max-width: 400px;top: 10%; transform: scaleX(1) scaleY(1);">'+
          '<div class="iconBlock"></div><h4 class="textcenter">LOST PASSWORD</h4>'+
 //      '<form name="login" action="/lostPwd" method="post">'+
  '<form>'+
        '<div class="row">'+
              '<div class="input-field col s12">'+
                '<input onblur="storeEmail()" id="emailLP" type="email" class="validate" name="email">'+
                '<label for="emailLP" class="">Email</label>'+
                '<span class="helper-text" data-error="" data-success=""></span>'+
              '</div>'+
        '</div>'+ 
        '<button onclick="doLostPwd()" class="btn waves-effect waves-light accentBG" name="action" style="margin:auto;display: block;margin-bottom:30px">Submit'+
              '<i class="material-icons left">location_disabled</i>'+
          '</button>'+
          '</form>'+
                '<a href="javascript:loadGetLoginModal()" style="display: block;color: inherit;" class="btn-flat textcenter">Have Account? Login</a>'+
      '</div>'+
    '</div>'
  );
  $(".modal input[type='email']").focus();
}


function doRegister(){
  modal.hide();
  $("body").append(
     '<div style="z-index: 1002; display: block; opacity: 1;" class="modal-overlay"> </div>'+
       '<div class="modal menutextColor brandBG" style="border-radius: 10px; box-shadow: 0px 0px 10px;overflow:hidden;z-index: 1003; display: block; opacity: 1; max-width: 400px;top: 10%; transform: scaleX(1) scaleY(1);">'+
          '<div class="iconBlock"></div><h4 class="textcenter">REGISTER</h4>'+
      // '<form name="login" action="/tryRegisterInline" method="post">'+
  '<form>'+
        '<div class="row">'+
              '<div class="input-field col s12">'+
                '<input onblur="" id="emailR" type="email" class="validate" name="email">'+
                '<label for="emailR" class="">Email</label>'+
                '<span class="helper-text" data-error="" data-success=""></span>'+
              '</div>'+
        '</div>'+
        '<div class="row">'+
              '<div class="input-field col s12">'+
                '<input id="passwordR" type="password" name="password" class="validate">'+
                '<label for="passwordR" class="">Password</label>'+
                '<span class="helper-text" data-error="" data-success=""></span>'+
              '</div>'+
         '</div>'+
          '<button onclick="registerNow()" class="btn waves-effect waves-light accentBG" name="action" style="margin:auto;display: block;margin-bottom:30px">Signup'+
              '<i class="material-icons left">create</i>'+
          '</button>'+
          '</form>'+
                '<a href="javascript:loadGetLoginModal()" style="display: block;color: inherit;" class="btn-flat textcenter">Have Account? Login</a>'+
      '</div>'+
    '</div>'
  );
  $(".modal input[type='email']").focus();
}


function loginNow()
{
  $.ajax({
    url:"/tryLoginInline ",
    method:"POST", //First change type to method here
    data:{
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    },
    success:function(response) {
     window.location.hash = "fail"
     window.location.reload();
   },
   error:function(){
     window.location.hash = "fail"
     window.location.reload();
   }
 });
}


function registerNow()
{
  $.ajax({
    url:"/tryRegisterInline ",
    method:"POST", //First change type to method here
    data:{
      emailR: document.getElementById("emailR").value,
      passwordR: document.getElementById("passwordR").value
    },
    success:function(response) {
     window.location.hash = "regf"
     window.location.reload();
   },
   error:function(){
     window.location.hash = "regf"
     window.location.reload();
   }
 });
}


function doLostPwd()
{
  $.ajax({
    url:"/tryRegisterInline ",
    method:"POST", //First change type to method here
    data:{
      emailLP: document.getElementById("emailLP").value,
    },
    success:function(response) {
     window.location.hash = "lpwds"
     window.location.reload();
   },
   error:function(){
     window.location.hash = "lpwdf"
     window.location.reload();
   }
 });
}

function loadGetLoginModal(){
  modal.hide();
  $("body").append(
     '<div style="z-index: 1002; display: block; opacity: 1;" class="modal-overlay"> </div>'+
       '<div class="modal menutextColor brandBG" style="min-height: 555px;border-radius: 10px; box-shadow: 0px 0px 10px;overflow:hidden;z-index: 1003; display: block; opacity: 1; max-width: 400px;top: 10%; transform: scaleX(1) scaleY(1);">'+
          '<div class="iconBlock"></div><h4 class="textcenter">LOGIN</h4>'+
      // '<form name="login" action="/tryLoginInline" method="post">'+
  '<form>'+
        '<div class="row">'+
              '<div class="input-field col s12">'+
                '<input onblur="storeEmail()" id="email" type="email" class="validate" name="email">'+
                '<label for="email" class="">Email</label>'+
                '<span class="helper-text" data-error="" data-success=""></span>'+
              '</div>'+
        '</div>'+
        '<div class="row">'+
              '<div class="input-field col s12">'+
                '<input id="password" type="password" name="password" class="validate">'+
                '<label for="password" class="">Password</label>'+
                '<span class="helper-text" data-error="" data-success=""></span>'+
              '</div>'+
         '</div>'+
          '<button onclick="loginNow()" class="btn waves-effect waves-light accentBG" name="action" style="margin:auto;display: block;margin-bottom:30px">Login'+
              '<i class="material-icons right">arrow_forward</i>'+
          '</button>'+
          '</form>'+
                '<a href="javascript:doRegister()" style="display: block;color: inherit;" class="btn-flat textcenter">No Account? Sign up</a>'+
                '<a href="javascript:lostPwd()" style="display:block;color: inherit;" class="btn-flat textcenter">Lost Password?</a>'+
      '</div>'+
    '</div>'
  );
  $(".modal input[type='email']").focus();
  $(".modal input[type='email']").val(localStorage.getItem("email"));
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
  localStorage.setItem("email", "");
  window.location.hash = "";
}
function loadMenu()
{
  App.mainmenubuttons = [];
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
  document.getElementById("nav-mobile").style.transform = "";
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


var modal = {
  show:function(title,subtitle, noCB, yesCB, noText, yesText){
    title = title || "No Title"; 
    subtitle = subtitle || "No Subtitle"; 
    yesCB = yesCB || "modal.hide"; 
    noText = noText || "Cancel"; 
    yesText = yesText || "OK"; 
    var flag = "";
    if(noCB){
     flag = '<a href="javascript:' + noCB + '()" class="modal-close waves-effect waves-red btn-flat">'+ noText + '</a>';
    }
    $("body").append('<div class="modal-overlay" style="z-index: 1002; display: block; opacity: 0.5;"></div><div id="" class="modal" tabindex="0" style="z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);">'+
          '<div class="modal-content">'+
            '<h4>'+title+'</h4>'+
            '<p>' + subtitle + '</p>'+
          '</div>'+
          '<div class="modal-footer">'+ flag +
            '<a href="javascript:' + yesCB + '()" class="modal-close waves-effect waves-green btn-flat">'+ yesText + '</a>'+
          '</div>'+
        '</div>'
                    );
  },
  hide: function(){
    $(".modal-overlay,.modal").remove();
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
  var mu =   '<li class="' + item.id + '"><a href="javascript:' + cbSt + '" class="inner">'+
      '<div class="li-img" style="background-image:url('+ thumb + ')">'+
      '</div>'+
      '<div class="li-text">'+
        '<h3 class="li-head">'+ name +'</h3>'+
        '<div class="li-sub">'+
         desc +
        '</div>'+
      '</div>'+
    '</a></li>'
  return mu;
}

var doFileUpload = function(e,cb)
{
   
  var thumbID = e.target.parentNode.id;
  var fileObj = $("#" + thumbID + " input[type=file]").get(0).files[0];
   var filename = fileObj.name;
   var ext = filename.split(".");
   ext = ext[ext.length-1];

   var fd = new FormData();
   var fileInput = (document.getElementById(thumbID).dataset.targetname || "s3Upload_" + new Date().getTime().toString()) + "." + ext;
   fd.append('fileInput', fileInput);
   fd.append('file', fileObj);
   fd.append('date', (new Date()).toString());

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState != 4) { return; }
      document.getElementById(thumbID).style.backgroundImage = "url(" + App.resURL + fileInput + "?"+ new Date().getTime() + ")";
      cb(App.resURL + fileInput);
    };
    xhr.open("POST", "/uploadFile", true);
    xhr.send(fd);
}

var doImageUpload = function(e,cb)
{
   
  var thumbID = e.target.parentNode.id;
  var fileObj = $("#" + thumbID + " input[type=file]").get(0).files[0];
  var filename = fileObj.name;
  var ext = filename.split(".");
  ext = ext[ext.length-1];
  var MAX_HEIGHT = parseInt(e.target.dataset.height || "100");
  var MAX_WIDTH = parseInt(e.target.dataset.width || "100");
  
   if(fileObj.type.split("/")[0].toLowerCase() != "image"){
      modal.show("Incorrect file type", "Please ensure you are uploading an image file.");
      return;
   }

    // Uploads image and sets it to the appropriate width and height.
    // Uses dimensions from selectChanged function.
     if ( fileObj && fileObj.type.split("/")[0].toLowerCase() === "image") {
         var fileInput = (document.getElementById(thumbID).dataset.targetname || "imageUpload_" + new Date().getTime().toString()) + "." + ext;
          var FR = new FileReader();
          FR.onload = function(e) {
              var data = e.target.result;
              var canvas = document.createElement("canvas");
              var img = document.createElement("img");

              img.onload = function(){

                 var width = img.width;
                 var height = img.height;
                 var w2 = width;
                 var h2 = height;

                 if (width > height) {
                     if (width > MAX_WIDTH) {
                        h2 = height * MAX_WIDTH / width;
                        w2 = MAX_WIDTH;
                     }
                 } else {
                     if (height > MAX_HEIGHT) {
                        w2 = width * MAX_HEIGHT / height;
                        h2 = MAX_HEIGHT;
                     }
                 }
				  // Canvas
                  canvas.width = w2;
                  canvas.height = h2;
                  var ctx = canvas.getContext("2d");
                  ctx.drawImage(img, 0, 0, w2, h2);
                var base64St = canvas.toDataURL("image/png");
               var fd = new FormData();
               fd.append('fileInput', fileInput);
               fd.append('data', base64St);
               fd.append('date', (new Date()).toString());

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(e) {
                  if (xhr.readyState != 4) { return; }
                  document.getElementById(thumbID).style.backgroundImage = "url(" + App.resURL + fileInput + "?"+ new Date().getTime() + ")";
                  cb(App.resURL + fileInput);
                };
                xhr.open("POST", "/uploadImage", true);
                xhr.send(fd);                 
              }
              img.src = data;
          };

          FR.readAsDataURL( fileObj );
     }

}


function storeEmail()
{
    var x = $(".modal input[type='email']").val();
    localStorage.setItem("email", x);
}

var swipe ={
  interval: 500,
  left:function(id){
    $("#"+id).addClass("animated")
    document.getElementById(id).style.transform = "translateX(-105vw)"
    setTimeout(function(){$("#" + id).removeClass("animated")},this.interval);
  },
  center:function(id){
    $("#"+id).addClass("animated")
    document.getElementById(id).style.transform = "";
    setTimeout(function(){$("#" + id).removeClass("animated")},this.interval);
  },
  right: function(id){
    $("#"+id).addClass("animated")
    document.getElementById(id).style.transform = "translateX(105vw)"
    setTimeout(function(){$("#" + id).removeClass("animated")},this.interval);
  }
}
