Meteor.methods({registerUser: function(options){
  check(options, Object);
  if(Accounts._options.forbidClientAccountCreation)
    throw new Meteor.Error(403, "Registration forbidden.");
  var email = options.email, first_name = options.first_name,
    last_name = options.last_name, title = options.title,
    phone = options.phone, role = options.role;
  var user_id = Accounts.createUser({email:email,
                                   profile:{first_name:first_name,
                                     last_name:last_name,
                                     title: title, phone:phone,
                                     email:email,role:role}});
  if(!user_id)
    throw new Error("createUser failed to insert new user");
  Accounts.sendEnrollmentEmail(user_id,email);
  return user_id;
  }});


