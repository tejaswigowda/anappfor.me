{
  init: function(){
  },
  active: function(){
    $("#crudProjWrapper").fadeOut(0);
    this.loadall();
  },
  inactive: function(){
    document.getElementById("projList").innerHTML = "";
    $("#crudProjWrapper").fadeOut();
    $("#listProjWrapper").fadeIn();
  },
  currID :null,
  list:[],
  loadall: function()
  {
    loadFile("./projects/all", function(data){
      var projects = JSON.parse(data);
      App.projects.list = JSON.parse(data);
      console.log(projects);
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
    });
  },
  selected: function(i)
  {
     console.log(this.list[i]);
     this.currID = App.projects.list[i].id;
     loadFile("./projects/get?id="+ this.currID,function(data){
      var data = JSON.parse(data);
      var name = data.name || "Untitled"
      var desc = data.desc || ""
      $("#newPHeading").html("<br>");
      $("#projTitle").html(name);
      $("#projDesc").html(desc);
      $("label[for='projTitle']").addClass("active");
      if(desc.length > 0)
        $("label[for='projDesc']").addClass("active");
      $("#crudProjWrapper").fadeIn();
      $("#listProjWrapper").fadeOut();
     });
  },
  addNew: function()
  {
      $("#crudProjWrapper").fadeIn();
      $("#listProjWrapper").fadeOut();
      this.currID = getUniqueID();
      $("#newPHeading").html("New Project");
      $("#projTitle").html("");
      $("#projDesc").html("");
      $("label[for='projTitle']").removeClass("active");
      $("label[for='projDesc']").removeClass("active");
  },
  goBack: function()
  {
    $("#crudProjWrapper").fadeOut();
    $("#listProjWrapper").fadeIn();
    this.loadall();
  },
  updateProject: function(e){
    console.log(e.target);
    loadFile("./projects/edit?id="+ this.currID 
             + "&userID="+ userObj.local.email
             + "&"+ e.target.dataset.key 
             + "=" + e.target.value, function(data){
                                    });
  }
}


