{
  init: function(){
  },
  active: function(){
      $("#crudProjWrapper").removeClass().addClass("wrapper animated  slideOutRight");
      $("#listProjWrapper").removeClass().addClass("wrapper animated slideInLeft");
      setTimeout(function(){$("#listProjWrapper").removeClass("animated slideInLeft")},350)
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
      data.push({value: list[i].name, data: i, imageUrl:list[i].thumb}) 
    }
    $('#projSearch').devbridgeAutocomplete({
      lookup: data,
      minChars: 0,
      showNoSuggestionNotice: true,
      formatResult: function (suggestion) {
        var ret = '<div><img width=30 height=30 style="vertical-align:middle; margin-right:10px" src="' + suggestion.imageUrl+'" /> '  + suggestion.value + '</div>';
        return ret
      },
      onSelect: function (suggestion) {
          App.projects.selected(parseInt(suggestion.data));
          document.getElementById("projSearch").value = "";
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
     $("#projects ."+this.currID).addClass("selected");
     loadFile("projects/get?id="+ this.currID,function(data){
      var data = JSON.parse(data);
      var name = data.name || "Untitled"
      var desc = data.desc || ""
      var thumb = data.thumb || "res/images/icon.png"
      $("#newPHeading").html("<br>");
      $("#projTitle").val(name);
      $("#projDesc").val(desc);
      document.getElementById("projThumb").style.backgroundImage = "url(" + thumb + ")";
      $("label[for='projTitle']").addClass("active");
      if(desc.length > 0)
        $("label[for='projDesc']").addClass("active");
      $("#crudProjWrapper").removeClass().addClass("wrapper animated slideInRight").css("visibility","");
      $("#listProjWrapper").removeClass().addClass("wrapper animated slideOutLeft");
      setTimeout(function(){$("#crudProjWrapper").removeClass("animated slideInRight")},350)
      $("#deleteProjButton").fadeIn(0);
     });
  },
  deleteNow:function(){
     loadFile("projects/delete?id="+ this.currID,function(data){
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
      $("#crudProjWrapper").removeClass().addClass("wrapper animated slideInRight").css("visibility","");
      $("#listProjWrapper").removeClass().addClass("wrapper animated slideOutLeft");
      setTimeout(function(){$("#crudProjWrapper").removeClass("animated slideInRight")},350)
      $("#deleteProjButton").fadeOut(0);
      this.currID = getUniqueID();
      document.getElementById("projThumb").style.backgroundImage = "url(res/images/icon.png)"
      $("#newPHeading").html("New Project");
      $("#projTitle").val("");
      $("#projDesc").val("");
      $("label[for='projTitle']").removeClass("active");
      $("label[for='projDesc']").removeClass("active");
  },
  goBack: function()
  {
      $("#crudProjWrapper").removeClass().addClass("wrapper animated slideOutRight")
      $("#listProjWrapper").removeClass().addClass("wrapper animated slideInLeft")
      setTimeout(function(){$("#listProjWrapper").removeClass("animated slideInLeft")},350)
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
    });
  },
  updateProject: function(e){
    loadFile("projects/edit?id="+ this.currID 
       + "&userID="+ userObj.local.email
       + "&"+ e.target.dataset.key 
       + "=" + e.target.value, function(data){
        App.projects.loadall();
    });
  }
}


