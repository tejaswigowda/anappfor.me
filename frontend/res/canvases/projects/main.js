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
      $("#crudProjWrapper").fadeIn();
      $("#listProjWrapper").fadeOut();
  },
  addNew: function()
  {
      $("#crudProjWrapper").fadeIn();
      $("#listProjWrapper").fadeOut();
      this.currID = getUniqueID();
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


