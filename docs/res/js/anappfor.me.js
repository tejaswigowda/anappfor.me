var App = {};
function buildApp()
{
  loadMenu();
  loadCanvases();
}


var doLogout = function()
{
  var x = confirm("Logout now?")
  if(x){
    loadFile("./logout", function(d){window.location.reload()})
  }
}

var start = function()
{
  $('.sidenav').sidenav();
  buildApp();
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
      outS += '<li class="bold"><a href="javascript:mainMenuButtons.selected('+ App.mainmenubuttons[i] + ')" class="waves-effect waves-teal">' + App.canvases[i][2] + '</a></li>'
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
	__addSelectedStyle: function(divID){
		$("#" + divID).addClass("active");
	},

	__removeSelectedStyle: function(divID){
		$("#" + divID).removeClass("active");
	},

  __selected:function(buttonClicked, canvasID){
		if(ENV.screen.small && App.classSmall.indexOf("-bottom") < 0){
            $('#maincanvasWrapper').removeClass("slideInLeft slideInRight").addClass('animated slideOutLeft').delay(300).fadeOut(0);
            showButton("home");
            backState = 1;
		}
		else{
			for(i=0; i< App.mainmenubuttons.length; i++){
				if(App.mainmenubuttons[i] === buttonClicked){
				   mainMenuButtons.__addSelectedStyle(App.mainmenubuttons[i]);
				}
				else{
					mainMenuButtons.__removeSelectedStyle(App.mainmenubuttons[i]);
				}
			}
		}

		Canvas.showOneCanvasOnly(canvasID);
  },

	selected: function(buttonClicked){
      activityIndicator.show();
      var canvasID = mainMenuButtons.getTargetCanvas(buttonClicked);
      mainMenuButtons.__selected(buttonClicked, canvasID);
	}
}

var activityIndicator = {
  show:function(){
    $("body").append('<div style="position: fixed;height: 100vh;width: 100vw;text-align: center;background-color: rgba(255,255,255,.8);z-index: 100000;" class="ac"><svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" style="margin-top: 45vh;"> <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle> </svg></div>');
  },
  hide: function(){
    $(".ac").remove();
  }
}
