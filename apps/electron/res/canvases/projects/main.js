{
  init: function(){
  },
  active: function(){
      swipe.right("crudProjWrapper");
      swipe.center("listProjWrapper");
    this.loadall();
  },
  inactive: function(){
    document.getElementById("projList").innerHTML = "";
  },
  currID :null,
  list:[],
  setAC: function(){
    var list = this.list;
    var data = [];
    for(var i = 0; i < list.length; i++){
      var x = list[i].thumb100||"";
      var y = list[i].name || "no title";
      if(y){
        data.push({value: y, data: i, imageUrl:x});
      }
    }

    try{
    $('#projSearch').devbridgeAutocomplete("dispose");
    }
    catch{noop;}
    $('#projSearch').devbridgeAutocomplete({
      lookup: data,
      minChars: 0,
      showNoSuggestionNotice: true,
      formatResult: function (suggestion) {
        var ret = '<div><img width=50 height=50 style="border-radius:50%; vertical-align:middle; margin-right:10px" src="' + suggestion.imageUrl+'" /> '  + suggestion.value + '</div>';
        return ret
      },
      onSelect: function (suggestion) {
          App.projects.selected(parseInt(suggestion.data));
          document.getElementById("projSearch").value = "";
          $('#projSearch').devbridgeAutocomplete("hide");
      }
    });

  },
  loadall: function()
  {
    loadFile("projects/all", function(data){
      var projects = JSON.parse(data);
      App.projects.list = JSON.parse(data);
      if(projects.length == 0){
        document.getElementById("projList").innerHTML = "<h4 style='opacity:.5' class='textcenter'> No projects yet <br> </h4>"
        return;
      }
      document.getElementById("projList").innerHTML = acMU;
      var markup = "";
      for(var i = 0; i < projects.length; i++){
        markup += getLImarkup(projects[i], "App.projects.selected("+i+")");
      }
      document.getElementById("projList").innerHTML = markup;
      App.projects.setAC();
    });
  },
  selected: function(i)
  {
    this.isNew = false;
     this.currID = App.projects.list[i].id;
      document.getElementById("projThumb").dataset.targetname = this.currID;
      document.getElementById("projThumb").name = getUniqueID();
     $("#projects ."+this.currID).addClass("selected");
     loadFile("projects/get?id="+ this.currID,function(data){
      var data = JSON.parse(data);
      var name = data.name || "Untitled"
      var desc = data.desc || ""
      var thumb = data.thumb100 || "res/images/icon.png"
      $("#newPHeading").html("<br>");
      $("#projTitle").val(name);
      $("#projDesc").val(desc);
      document.getElementById("projThumb").style.backgroundImage = "url(" + thumb + ")";
      $("label[for='projTitle']").addClass("active");
      if(desc.length > 0)
        $("label[for='projDesc']").addClass("active");
      swipe.center("crudProjWrapper");
      swipe.left("listProjWrapper");
      $("#deleteProjButton").fadeIn(0);
     });
  },
  deleteNow:function(){
     loadFile("projects/delete?id="+ App.projects.currID,function(data){
       modal.hide();
       App.projects.goBack();
       $("#projects li.selected").hide("slow");
       if(App.projects.list.length == 1)
        this.loadall();
     });
  },
  delete:function(){
    modal.show("Delete?", "Are you sure?", "modal.hide", 
      "App.projects.deleteNow", "No", "Yes"
    ); 
  },
  isNew: false,
  addNew: function()
  {
    this.isNew = true;
      swipe.center("crudProjWrapper");
      swipe.left("listProjWrapper");
      $("#deleteProjButton").fadeOut(0);
      this.currID = getUniqueID();
      document.getElementById("projThumb").dataset.targetname = this.currID;
      document.getElementById("projThumb").name = getUniqueID();
      document.getElementById("projThumb").style.backgroundImage = "url(res/images/icon.png)"
      $("#newPHeading").html("New Project");
      $("#projTitle").val("");
      $("#projDesc").val("");
      $("label[for='projTitle']").removeClass("active");
      $("label[for='projDesc']").removeClass("active");
  },
  goBack: function()
  {
      swipe.right("crudProjWrapper");
      swipe.center("listProjWrapper");
    var x = function(){$("#projects .list li").removeClass("selected")}
    setTimeout(x, 500);
    if(this.isNew)
      this.loadall();
  }, 
  thumbChanged: function(url){
    loadFile("projects/edit?id="+ App.projects.currID
       + "&userID="+ userObj.local.email
       + "&thumb="+ url
       , function(data){
        App.projects.loadall();
        var x = document.getElementById("projThumb");
        var y = x.innerHTML;
        x.innerHTML = y;
    });
  },
  thumbChanged100: function(url){
    loadFile("projects/edit?id="+ App.projects.currID
       + "&userID="+ userObj.local.email
       + "&thumb100="+ url
       , function(data){
         document.getElementById("projThumb").style.backgroundImage = "url(" + url + "?"+ new Date().getTime() + ")";
    });
  },
  updateProject: function(e){
    loadFile("projects/edit?id="+ App.projects.currID 
       + "&userID="+ userObj.local.email
       + "&"+ e.target.dataset.key 
       + "=" + e.target.value, function(data){
        App.projects.loadall();
    });
  }
}


