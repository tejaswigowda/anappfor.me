
function authenticate(name, pass, collection, userType, db, fn) {
	db.collection(collection).findOne({userID:name, password:pass, userType:userType}, function(err, user) {
		if (err) {
			return fn(err);
		}
		
		if(user) {
			return fn(null, user);

		}else{
			return fn(null, null);
		}
	});
}

function isApproved(approvedUsers, session)
{
    for(var i = 0; i < approvedUsers.length; i++){
      if(session[approvedUsers[i]] === "true"){
         return true;
      }
    }
    return false;
}


function restrict(req, res, db, approvedUsers, fn) {
     db.collection(req.session.collection).findOne({userID:req.session[userID + req.session.collection]}, function(err, result) {
         if(result) { 
            if (result.userID == req.session.userID && result.password == req.session.password && isApproved(approvedUsers)) {
                ret = true;
            }else {
                ret = false;
            }
            return fn(ret);
          } else{
              return fn(false);
          }
      });

}

		

exports.authenticate = authenticate;
exports.restrict = restrict;
