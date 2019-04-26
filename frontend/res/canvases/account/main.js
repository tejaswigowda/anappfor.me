{
  init: function(){
    document.getElementById("loginInfo").innerHTML = "Logged in as <h5>" + userObj.local.email + "</h5>";
    document.getElementById("userThumb").dataset.targetname = getUniqueID();
    $("#changePwdWrapper").fadeOut(0);
    $("#cpButton").fadeOut(0);
    this.loadAccount();
  },
  active: function(){
    $("#accountWrapper").fadeIn();
    $("#changePwdWrapper").fadeOut();
  },
  inactive: function(){
  },
  thumbChanged: function(url){
    loadFile("userid/edit?id="+ userObj.local.email
       + "&userID="+ userObj.local.email
       + "&thumb="+ url
       , function(data){
        var x = document.getElementById("userThumb");
        var y = x.innerHTML;
        x.innerHTML = y;
    });
  },
  updateAccount: function(e){
    loadFile("userid/edit?id="+userObj.local.email
       + "&userID="+ userObj.local.email
       + "&"+ e.target.dataset.key 
       + "=" + e.target.value, function(data){
    });
  },
  changePwd: function(){
    $("#accountWrapper").fadeOut();
    $("#changePwdWrapper").fadeIn();
    $("#changePwdWrapper input").val("");
    $("#cpButton").fadeOut(0);
  },
  goBack: function(){
    $("#accountWrapper").fadeIn();
    $("#changePwdWrapper").fadeOut();
  },
  loadAccount: function(){
    loadFile("userid/all", function(data){
      var u = JSON.parse(data);
      var thumb = "";
      var fname = "";
      var lname = "";
      if(u.length > 0){
        user = u[0];
        thumb = user.thumb || "res/images/icon.png";
        fname = user.fname || "";
        lname = user.lname || "";
      }
      document.getElementById("userThumb").style.backgroundImage = "url(" + thumb + ")";
      document.getElementById("first_name").value = fname;
      document.getElementById("last_name").value = lname;
      $("label[for=first_name], label[for=last_name]").addClass("active")
    });
  }
}

