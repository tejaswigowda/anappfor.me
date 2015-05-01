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

var hourselect = '<option disabled value="label"> - Hour - </option>'+
'<option value="1">1</option>'+
'<option value="2">2</option>'+
'<option value="3">3</option>'+
'<option value="4">4</option>'+
'<option value="5">5</option>'+
'<option value="6">6</option>'+
'<option value="7">7</option>'+
'<option value="8">8</option>'+
'<option value="9">9</option>'+
'<option value="10">10</option>'+
'<option value="11">11</option>'+
'<option value="12">12</option>';

var minselect = '<option disabled value="label"> - Min - </option>'+
'<option value="0">00</option>'+
'<option value="1">01</option>'+
'<option value="2">02</option>'+
'<option value="3">03</option>'+
'<option value="4">04</option>'+
'<option value="5">05</option>'+
'<option value="6">06</option>'+
'<option value="7">07</option>'+
'<option value="8">08</option>'+
'<option value="9">09</option>'+
'<option value="10">10</option>'+
'<option value="11">11</option>'+
'<option value="12">12</option>'+
'<option value="13">13</option>'+
'<option value="14">14</option>'+
'<option value="15">15</option>'+
'<option value="16">16</option>'+
'<option value="17">17</option>'+
'<option value="18">18</option>'+
'<option value="19">19</option>'+
'<option value="20">20</option>'+
'<option value="21">21</option>'+
'<option value="22">22</option>'+
'<option value="23">23</option>'+
'<option value="24">24</option>'+
'<option value="25">25</option>'+
'<option value="26">26</option>'+
'<option value="27">27</option>'+
'<option value="28">28</option>'+
'<option value="29">29</option>'+
'<option value="30">30</option>'+
'<option value="31">31</option>'+
'<option value="32">32</option>'+
'<option value="33">33</option>'+
'<option value="34">34</option>'+
'<option value="35">35</option>'+
'<option value="36">36</option>'+
'<option value="37">37</option>'+
'<option value="38">38</option>'+
'<option value="39">39</option>'+
'<option value="40">40</option>'+
'<option value="41">41</option>'+
'<option value="42">42</option>'+
'<option value="43">43</option>'+
'<option value="44">44</option>'+
'<option value="45">45</option>'+
'<option value="46">46</option>'+
'<option value="47">47</option>'+
'<option value="48">48</option>'+
'<option value="49">49</option>'+
'<option value="50">50</option>'+
'<option value="51">51</option>'+
'<option value="52">52</option>'+
'<option value="53">53</option>'+
'<option value="54">54</option>'+
'<option value="55">55</option>'+
'<option value="56">56</option>'+
'<option value="57">57</option>'+
'<option value="58">58</option>'+
'<option value="59">59</option>';


var dayselect = '<option disabled value="label"> - Day - </option>'+
'<option value="1">1</option>'+
'<option value="2">2</option>'+
'<option value="3">3</option>'+
'<option value="4">4</option>'+
'<option value="5">5</option>'+
'<option value="6">6</option>'+
'<option value="7">7</option>'+
'<option value="8">8</option>'+
'<option value="9">9</option>'+
'<option value="10">10</option>'+
'<option value="11">11</option>'+
'<option value="12">12</option>'+
'<option value="13">13</option>'+
'<option value="14">14</option>'+
'<option value="15">15</option>'+
'<option value="16">16</option>'+
'<option value="17">17</option>'+
'<option value="18">18</option>'+
'<option value="19">19</option>'+
'<option value="20">20</option>'+
'<option value="21">21</option>'+
'<option value="22">22</option>'+
'<option value="23">23</option>'+
'<option value="24">24</option>'+
'<option value="25">25</option>'+
'<option value="26">26</option>'+
'<option value="27">27</option>'+
'<option value="28">28</option>'+
'<option value="29">29</option>'+
'<option value="30">30</option>'+
'<option value="31">31</option>';
  var monthselect = '<option disabled value="label"> - Month - </option>'+
'<option value="0">Jan</option>'+
'<option value="1">Feb</option>'+
'<option value="2">Mar</option>'+
'<option value="3">Apr</option>'+
'<option value="4">May</option>'+
'<option value="5">Jun</option>'+
'<option value="6">Jul</option>'+
'<option value="7">Aug</option>'+
'<option value="8">Sep</option>'+
'<option value="9">Oct</option>'+
'<option value="10">Nov</option>'+
'<option value="11">Dec</option>';
  var yearselect = '<option disabled value="label"> - Year - </option>'+
'<option value="2025">2025</option>'+
'<option value="2024">2024</option>'+
'<option value="2023">2023</option>'+
'<option value="2022">2022</option>'+
'<option value="2021">2021</option>'+
'<option value="2020">2020</option>'+
'<option value="2019">2019</option>'+
'<option value="2018">2018</option>'+
'<option value="2017">2017</option>'+
'<option value="2016">2016</option>'+
'<option value="2015">2015</option>'+
'<option value="2014">2014</option>'+
'<option value="2013">2013</option>'+
'<option value="2012">2012</option>'+
'<option value="2011">2011</option>'+
'<option value="2010">2010</option>'+
'<option value="2009">2009</option>'+
'<option value="2008">2008</option>'+
'<option value="2007">2007</option>'+
'<option value="2006">2006</option>'+
'<option value="2005">2005</option>'+
'<option value="2004">2004</option>'+
'<option value="2003">2003</option>'+
'<option value="2002">2002</option>'+
'<option value="2001">2001</option>'+
'<option value="2000">2000</option>'+
'<option value="1999">1999</option>'+
'<option value="1998">1998</option>'+
'<option value="1997">1997</option>'+
'<option value="1996">1996</option>'+
'<option value="1995">1995</option>'+
'<option value="1994">1994</option>'+
'<option value="1993">1993</option>'+
'<option value="1992">1992</option>'+
'<option value="1991">1991</option>'+
'<option value="1990">1990</option>'+
'<option value="1989">1989</option>'+
'<option value="1988">1988</option>'+
'<option value="1987">1987</option>'+
'<option value="1986">1986</option>'+
'<option value="1985">1985</option>'+
'<option value="1984">1984</option>'+
'<option value="1983">1983</option>'+
'<option value="1982">1982</option>'+
'<option value="1981">1981</option>'+
'<option value="1980">1980</option>'+
'<option value="1979">1979</option>'+
'<option value="1978">1978</option>'+
'<option value="1977">1977</option>'+
'<option value="1976">1976</option>'+
'<option value="1975">1975</option>'+
'<option value="1974">1974</option>'+
'<option value="1973">1973</option>'+
'<option value="1972">1972</option>'+
'<option value="1971">1971</option>'+
'<option value="1970">1970</option>'+
'<option value="1969">1969</option>'+
'<option value="1968">1968</option>'+
'<option value="1967">1967</option>'+
'<option value="1966">1966</option>'+
'<option value="1965">1965</option>'+
'<option value="1964">1964</option>'+
'<option value="1963">1963</option>'+
'<option value="1962">1962</option>'+
'<option value="1961">1961</option>'+
'<option value="1960">1960</option>'+
'<option value="1959">1959</option>'+
'<option value="1958">1958</option>'+
'<option value="1957">1957</option>'+
'<option value="1956">1956</option>'+
'<option value="1955">1955</option>'+
'<option value="1954">1954</option>'+
'<option value="1953">1953</option>'+
'<option value="1952">1952</option>'+
'<option value="1951">1951</option>'+
'<option value="1950">1950</option>'+
'<option value="1949">1949</option>'+
'<option value="1948">1948</option>'+
'<option value="1947">1947</option>'+
'<option value="1946">1946</option>'+
'<option value="1945">1945</option>'+
'<option value="1944">1944</option>'+
'<option value="1943">1943</option>'+
'<option value="1942">1942</option>'+
'<option value="1941">1941</option>'+
'<option value="1940">1940</option>'+
'<option value="1939">1939</option>'+
'<option value="1938">1938</option>'+
'<option value="1937">1937</option>'+
'<option value="1936">1936</option>'+
'<option value="1935">1935</option>'+
'<option value="1934">1934</option>'+
'<option value="1933">1933</option>'+
'<option value="1932">1932</option>'+
'<option value="1931">1931</option>'+
'<option value="1930">1930</option>'+
'<option value="1929">1929</option>'+
'<option value="1928">1928</option>'+
'<option value="1927">1927</option>'+
'<option value="1926">1926</option>'+
'<option value="1925">1925</option>'+
'<option value="1924">1924</option>'+
'<option value="1923">1923</option>'+
'<option value="1922">1922</option>'+
'<option value="1921">1921</option>'+
'<option value="1920">1920</option>'+
'<option value="1919">1919</option>'+
'<option value="1918">1918</option>'+
'<option value="1917">1917</option>'+
'<option value="1916">1916</option>'+
'<option value="1915">1915</option>'+
'<option value="1914">1914</option>'+
'<option value="1913">1913</option>'+
'<option value="1912">1912</option>'+
'<option value="1911">1911</option>'+
'<option value="1910">1910</option>'+
'<option value="1909">1909</option>'+
'<option value="1908">1908</option>'+
'<option value="1907">1907</option>'+
'<option value="1906">1906</option>'+
'<option value="1905">1905</option>'+
'<option value="1904">1904</option>'+
'<option value="1903">1903</option>'+
'<option value="1902">1902</option>'+
'<option value="1901">1901</option>'+
'<option value="1900">1900</option>';

/*

function tinyMCEinitializeP()
{ 
 	tinymce.init({
		selector: "textarea.textareaTMCE",
  		plugins: "paste,paintweb",
		 mode : "specific_textareas",
		     editor_selector : "textareaTMCE",
		     theme : "advanced",
		theme_advanced_buttons1 : "bold,italic,underline, separator,justifyleft, justifycenter,justifyright, separator,formatselect,bullist, numlist, seperator, link",
		     theme_advanced_toolbar_location : "top",
		     theme_advanced_toolbar_align : "left",
		     paste_text_sticky : true,
		     paste_text_sticky_default : true,
		paintweb_config : {
			configFile: "config-example.json",
			    tinymce: {
				      paintwebFolder: "js/paintweb/build/",
				    imageSaveDataURL: true,
				    dblclickHandler: true
			    }
		    },
  		menubar: false,
  		browser_spellcheck : true,
  		height: 300,
  	//	paste_as_text: true,
		paste_data_images: true,
  		toolbar_items_size: 'small',
  		statusbar : false,
  		target_list: [
  		],
  		toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link "
	});
}

*/
function tinyMCEinitializeP()
{ 
  	tinymce.init({
		selector: "textarea.textareaTMCE",
  		plugins: [
			"paste", "link"
  		],
  		menubar: false,
  		browser_spellcheck : true,
  	//	paste_as_text: true,
		paste_data_images: true,
  		toolbar_items_size: 'small',
  		statusbar : false,
  		height: 260,
  		target_list: [
  		],
		setup : setTMCFontSize,
  		toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link"
	});
}

function setTMCFontSize(ed) {
	ed.on('init', function() 
	{
		this.getDoc().body.style.fontSize = '14px';
	});
}
	
function tinyMCEinitializesmallP()
{ 
  	tinymce.init({
		selector: "textarea.textareaTMCE",
  		plugins: [
			"paste"
  		],
  		menubar: false,
  		browser_spellcheck : true,
  	//	paste_as_text: true,
		paste_data_images: true,
  		toolbar_items_size: 'small',
  		statusbar : false,
  		height: 200,
  		target_list: [
  		],
		setup : setTMCFontSize,
  		toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist"
	});
}

function tinyMCEinitialize()
{ 
 	tinymce.init({
		selector: "textarea.textareaTMCE",
  		plugins: [
			"paste link"
  		],
  		menubar: false,
  		browser_spellcheck : true,
  		height: 300,
  		paste_as_text: true,
  		toolbar_items_size: 'small',
  		statusbar : false,
  		target_list: [
  		],
		setup : setTMCFontSize,
  		toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link "
	});
}
function tinyMCEinitializesmall()
{ 
  	tinymce.init({
		selector: "textarea.textareaTMCE",
  		plugins: [
			"paste"
  		],
  		menubar: false,
  		browser_spellcheck : true,
  		paste_as_text: true,
  		toolbar_items_size: 'small',
  		statusbar : false,
  		height: 200,
  		target_list: [
  		],
		setup : setTMCFontSize,
  		toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist"
	});
}

function tinyMCEinitializeuser()
{ 
  	tinymce.init({
		selector: "textarea.textareaTMCE",
  		plugins: [
			"paste link"
  		],
  		menubar: false,
  		browser_spellcheck : true,
  		paste_as_text: true,
  		toolbar_items_size: 'small',
  		height: 200,
  		statusbar : false,
  		target_list: [
  		],
		setup : setTMCFontSize,
  		toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link "
	});

	/*tinyMCE.init({
     mode : "specific_textareas",
     editor_selector : "textareaTMCE",
     theme : "advanced",
     theme_advanced_buttons1 : "bold,italic,underline, separator,justifyleft, justifycenter,justifyright, separator,bullist, numlist",
     theme_advanced_buttons2: "",
     theme_advanced_buttons3: "",
     theme_advanced_buttons4: "",
     theme_advanced_toolbar_location : "top",
     theme_advanced_toolbar_align : "left",
     paste_text_sticky : true,
     paste_text_sticky_default : true,
     plugins: "paste",
     width: "100%",
     height: "320"
  });*/
}


function getTodayDS()
{
	var ret = {
		dd:0,
		mm:0,
		yy:0
	};
	var temp = new Date();
	ret.dd = temp.getDate();	
	ret.mm = temp.getMonth();	
	ret.yy = temp.getFullYear();	
	return ret;
}

var selectedStyle = {
	hilite: "",
	hilite1: "",
	hion: false,
	add: function(t){
		selectedStyle.id = t;
		 if(ENV.device.touchSupport){
			setTimeout('var r = getElementStyleObject(selectedStyle.id);r.backgroundColor = "#6E7C9F";r.color = "#EEEEEE";', 200);
			$("#" + t).addClass("tr500");	
		 }
		 else{
			 var r = getElementStyleObject(selectedStyle.id);
			 r.backgroundImage = "url(images/arrow.png)";
			 if(selectedStyle.hion){
				r.color = selectedStyle.hilite;
				 r.borderLeft = "10px solid";// #6E7C9F";
			 }
			 else{
				 r.borderLeft = "10px solid #6E7C9F";
			 }
		 }
		
	     },
	clean: function(){
		var t = selectedStyle.id;
		if(t == null){ return}
        if (!document.getElementById(t)) { return }
		var r = getElementStyleObject(selectedStyle.id);
		 if(ENV.device.touchSupport){
			setTimeout('$("#' + t + '").removeClass("tr500")', 500);	
			r.backgroundColor = "";
			r.color = "";
		 }
		 else{
			r.borderLeft = "";
			 r.backgroundImage = "";
			$("#" + selectedStyle.id).css({"border-left":"none"});
			r.color = "";
		 }
		selectedStyle.id = null;
	       },
	id: null
}

function fontsizeChanged()
{
    getElementStyleObject("body").fontSize = getElementObject("fontsize").value;
    var t = parseInt(getElementObject("fontsize").value) - 16;
    navPlugin.offset = t*10;
}

var data555 = null;
function getProLinks(pInfo)
{
  var pKeys = Object.keys(pInfo)
  var brandText = "";
  var addrstr;
  temp = "email";
  if(pKeys.indexOf(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      brandText = brandText + "<a target='_blank' class='email link' href='mailto:" + decodeURIComponent(addrstr[t])  + "'>" + decodeURIComponent(addrstr[t]) + "</a>";
	}
  }
  temp = "phone";
  if(pKeys.indexOf(temp) >=0){
    addrstr = decodeURIComponent(pInfo[temp]).split(",");
    for(var t=0; t< addrstr.length; t++){
      brandText = brandText + "<a class='phoneno link' href='tel:" +  addrstr[t]  + "'>" + addrstr[t] + "</a>";
    }
  }


  brandText += "<div class='sm'>";
  temp = "web";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Website  </a>";
  }
  temp = "linkedin";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  LinkedIn  </a>";
  }
  temp = "fb";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Facebook  </a>";
  } 
  temp = "tw";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Twitter  </a>";
  } 
  temp = "gplus";
  if(pKeys.indexOf(temp) >=0 && pInfo[temp].length > 0){
      brandText = brandText + "<a class='link' target='_blank' href='" + gethttpPrefix(decodeURIComponent(pInfo[temp]))  + "'>  Google +  </a>";
  }
  brandText += "</div>";
  data555 = pInfo;
	return brandText;
}

function gethttpPrefix(id)
{
	if(id.substring(0,4) != "http"){
		id = "http://" + id;
	}
	return id;
}

function hoveraddclass(id){
  $(".assetWrapper .assetItemImage").hover(
    function () {
        $(this).addClass("hoveraddclass");
    },
    function () {
        $(this).removeClass("hoveraddclass");
    }
  );
}

String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
}
