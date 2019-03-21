function buildApp()
{
  	loadFile("res/config.json",readAppManifest_Aux);
}

var App = {};

function readAppManifest_Aux(data)
{
	var temp;
	var readData = JSON.parse(data);

  var keys = Object.keys(readData);
  for (var i = 0; i < keys.length; i++){
      App[keys[i]] = readData[keys[i]];
  }
  App.mainmenubuttons = [];
  for (var i = 0; i < App.canvases.length; i++){
     App.mainmenubuttons[i] = "button" + App.canvases[i][0];
   }

  loadMenu();
  loadViews();
}

function loadMenu()
{
  	mainMenuButtons.list = App.mainmenubuttons;
    var outS = "";

    for (i = 0; i < App.mainmenubuttons.length; i++){
      outS += '<li class="bold"><a href="javascript:mainMenuButtons.selected('+ App.mainmenubuttons[i] + ')" class="waves-effect waves-teal">' + App.canvases[i][2] + '</a></li>'
    }
    $(".sidenav").html($(".sidenav").html() + outS);
}

function loadViews()
{
  for (i = 0; i < App.canvases.length; i++){
	  var Parent = document.getElementById("canvasWrapper");
	  var cn = "canvas fullScreen";
		var NewNode = document.createElement("div");
		NewNode.id = App.canvases[i][0];
		NewNode.className = cn;
		Parent.appendChild(NewNode);

		Parent = NewNode;
		NewNode = document.createElement("div");
		NewNode.id = App.canvases[i][0] + "ScrollWrapper";
		NewNode.className = "fullScreenWrapper";
		Parent.appendChild(NewNode);
  }

	for (i = 0; i < App.canvases.length; i++){
		buildCanvas(App.canvases[i][0]);
	}
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
	getTargetCanvas:function(currentButton){
		return currentButton.replace("button","");
	},
	__addSelectedStyle: function(divID){
		$("#" + divID + "T").removeClass("thumbnailB");
		$("#" + divID + "T").addClass("thumbnailA");
		$("#" + divID).addClass("active");
	},

	__removeSelectedStyle: function(divID){
		$("#" + divID + "T").removeClass("thumbnailA");
		$("#" + divID + "T").addClass("thumbnailB");
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
    App.focusonmainmenu = false;
  },

	selected: function(buttonClicked){
      activityIndicator.show();
      var canvasID = mainMenuButtons.getTargetCanvas(buttonClicked);
      mainMenuButtons.__selected(buttonClicked, canvasID);
	}
}
