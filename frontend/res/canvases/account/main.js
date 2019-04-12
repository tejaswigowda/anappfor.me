{
  init: function(){
    document.getElementById("loginInfo").innerHTML = "Logged in as <h5>" + userObj.local.email + "</h5>";
    $("#userThumb input[type=file]").attr("data-targetname", userObj.local.email);
    $("#changePwdWrapper").fadeOut(0);
    $("#cpButton").fadeOut(0);
    this.loadaccount();
  },
  active: function(){
    $("#accountWrapper").fadeIn();
    $("#changePwdWrapper").fadeOut();
  },
  inactive: function(){
  },
  thumbChanged: function(url){
    alert("done!");
  },
  loadAccount: function(){
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
  }
}

