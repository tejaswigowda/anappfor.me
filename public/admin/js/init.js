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
  	var fileref=document.createElement('link')
  	fileref.setAttribute("type","text/less")
  	fileref.setAttribute("rel","stylesheet/less")
  	fileref.setAttribute("href", filename)

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

function loadAllJSFiles()
{
	loadFile('js/LIST.txt',loadAllJSFiles_Aux);
}    
           
function loadAllJSFiles_Aux(data)
{
	var allFiles = CSVToArray(data, "\n")[0]
   	                 
	for(var i = 0; i < allFiles.length; i++){
		loadJSfile(allFiles[i], null);		
	} 	
}

function loadAllLessFiles()
{
	loadFile('less/LIST.txt',loadAllLessFiles_Aux);
}         


function loadAllLessFiles_Aux(data)
{                 
	var allFiles = CSVToArray(data, "\n")[0];
   	
	for(var i = 0; i < allFiles.length; i++){
		var temp = tokenize(allFiles[i]);
		loadLessfile(allFiles[i], false);		
	}                                  
	
	less.refresh();
}   


var kronSemaphore = false;
var kronInit = false;
function runKron()
{
	if(kronSemaphore){
		return;
	}
	
	if(!kronInit){
		kronInit = true;
		setInterval("runKron()", 500);
	}
}
