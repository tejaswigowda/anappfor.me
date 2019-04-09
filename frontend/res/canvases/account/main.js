{
  init: function(){
    document.getElementById("loginInfo").innerHTML = "Logged in as <h5>" + userObj.local.email + "</h5>";
    $("#userThumb input[type=file]").attr("data-targetname", userObj.local.email)
  },
  active: function(){
  },
  inactive: function(){
  },
  thumbChanged: function(url){
    alert("done!");
  }
}

