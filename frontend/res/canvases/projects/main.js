{
  init: function(){
  },
  active: function(){
    $("#crudProjWrapper").fadeOut(0);
    this.loadProjects();
  },
  inactive: function(){
    document.getElementById("projList").innerHTML = "";
    $("#crudProjWrapper").fadeOut();
    $("#listProjWrapper").fadeIn();
  },
  currProj:null,
  loadProjects: function()
  {
    loadFile("projects/all", function(data){
      var projects = JSON.parse(data);
      console.log(projects);
      if(projects.length == 0){
        document.getElementById("projList").innerHTML = "<h4 style='opacity:.5' class='textcenter'> No projects yet <br> </h4>"
        return;
      }
      document.getElementById("projList").innerHTML = acMU;
      for(var i = 0; i < projects.length; i++){
      }
    });
  },
  addNewProject: function()
  {
      $("#crudProjWrapper").fadeIn();
      $("#listProjWrapper").fadeOut();
      this.currProj = getUniqueID();
  },
  goBack: function()
  {
    $("#crudProjWrapper").fadeOut();
    $("#listProjWrapper").fadeIn();
    this.loadProjects();
  },
  updateProject: function(e){
    console.log(e.target);
  }
}


