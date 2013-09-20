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
  },

  //---- Leads ----

  //create lead
  createLead: function(options){
  console.log("User----");
  console.log(Meteor.user());
    var user = Meteor.user();
    if(user == null)
    {
      console.log("[createLead] ERROR - Null user object");
      return null;
    }
   // check(options, Object);
    if(user.profile.roles.indexOf('admin') > -1 ||
        user.profile.roles.indexOf('manager') > -1)
      {
        var first_name = options.first_name,
          last_name = options.last_name, email = options.email,
          title = options.title, company = options.company,
          address = options.address, address_2 = options.address_2,
          city = options.city, state = options.state, zip_code = options.zip_code,
          country = options.country, phone = options.phone, 
          phone_2 = options.phone_2,
          notes = options.notes, timestamp = +new Date(),
          status = options.status, 
          close_expectation_rate = options.close_expectation_rate;

          var close_rate = close_expectation_rate;

          if(close_expectation_rate.indexOf('%') > -1)
          {
            close_rate = parseInt(close_expectation_rate.replace('%','')) / 100;
          }
          else if(parseInt(close_expectation_rate) > 1)
          {
            close_rate = parseInt(close_expectation_rate) / 100;
          }
          else
          {
            close_rate = parseInt(close_expectation_rate);
          }

          if(close_rate > 1)
          {
            close_rate = 1;
          }
        var lead_id = Leads.insert({first_name:first_name, last_name:last_name,
                                   email:email, title:title, company:company,
                                   address:address, address_2:address_2,city:city,
                                   state:state,zip_code:zip_code,country:country,
                                   phone:phone, phone_2:phone_2,notes:notes,
                                   created:timestamp, modified:timestamp,
                                   status:status, 
                                   close_expectation_rate:close_rate},
                      function(err, _id)
                      {
                        if(err)
                        {
                          console.log("ERROR: " + err);
                          return null;
                        }
                        else
                          return _id;
                      }
                  );
        return lead_id;
      }
      else
      {
        console.log("ERROR - User cannot create lead");
        return null;
      }
    },

    //save media from leads to S3
    saveLeadMedia: function(url, context)
    {
      console.log("S3 URL: " + url);
      console.log("Context");
      console.log(context);
      var user = Meteor.user();
      if(user == null)
        return null;

      var uid = Meteor.uuid();
      
      UserSession.set('upload_link', uid, userId=user._id);
//      var form_id = UserSession.get('lead_form', userId=user._id);
    
      console.log("USER Form ID: " + uid);
    }

});


//Amazon S3 Settings
Meteor.call("S3config",
            {
              key:"AKIAJ6QDGY3MCGIV6TRQ",
              secret:"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",
              bucket:"lead_runner",
              directory:"/lead_media/"
            }
           );





