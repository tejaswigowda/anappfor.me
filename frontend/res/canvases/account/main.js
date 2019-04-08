{
  init: function(){
    document.getElementById("loginInfo").innerHTML = "Logged in as <h5>" + userObj.local.email + "</h5>";
  },
  active: function(){
  },
  inactive: function(){
  },
  thumbChanged: function(url){
    alert("done!");
  }
}

