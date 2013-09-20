Leads = new Meteor.Collection("leads");


if (Meteor.isClient) {
  //add the routes
  Meteor.Router.add({
    "/" : "dashboard",
    "/leads":"leads",
    "/leads/add":"lead_add",
    "/leads/:id": function(id)
        {
          Session.set("lead_id", id);
          return "lead_view";
        },
    "/leads/edit/:id": function(id)
        {
          Session.set("lead_id", id);
          return "lead_edit";
        }
  });

  //User / Roles
  if(Meteor.userId() && !Session.get("user_role"))
    {
      var user_role = Meteor.user();
      console.log("User Profile");
      console.log(Meteor.user());
    }

  ////////// Leads //////////

  Template.leads.loading = function() {
    return !leadsHandle.ready();
  };
  
  Template.leads.leads = function() {
    return Leads.find({}, {sort: {last_name: 1}});
  };
  Template.salesPeople.salesPeople = function(){
    return Meteor.users.find({}, {sort:{'profile.last_name':1}});
  };
  Template.leads.events({
    'click .list': function(evt){
      //prevent clicks on anchor <a> from refreshing the page
      evt.preventDefault();
    }
  });
  Template.lead_view.lead = function() {
    var lead_id = Session.get("lead_id");
    return  Leads.findOne({_id:lead_id});
  };
  Template.lead_edit.lead = function() {
    var lead_id = Session.get("lead_id");
    return  Leads.findOne({_id:lead_id});
  };


  Template.register.events({
    'submit #register-form': function(e,t)
    {
      e.preventDefault();
      var first_name = t.find('#first_name').value.trim(),
        last_name = t.find('#last_name').value.trim(),
        email_address = t.find('#email').value.trim(),
        title = t.find('#title').value.trim(), 
        phone = t.find('#phone').value.trim(),
        role = t.find('#role').value; 

        if(Meteor.users.find({email:email_address}).count() < 1)
        {
          options = {first_name: first_name, last_name:last_name,
            email:email_address,title:title,phone:phone, role:role};
          var result = Meteor.call('registerUser',options);

          if(result)
          {
            console.log("Success: User ID{" + result + "}");
          }
        }
        else
        {
          console.log("Email already exists");
          alert("Email address already registered.");
        }
    }
  });

  Template.lead_add.events({
    'submit #lead_add-form': function(e,t)
    {
      e.preventDefault();
      var first_name = t.find('#first_name').value.trim(),
        last_name = t.find('#last_name').value.trim(),
        phone = t.find('#phone').value.trim(), 
        phone_2 = t.find('#phone_2').value.trim(), 
        email = t.find('#email').value.trim(), 
        address = t.find('#address').value.trim(), 
        address_2 = t.find('#address_2').value.trim(),
        city = t.find('#city').value.trim(),
        state = t.find('#state').value.trim(),
        zip_code = t.find('#zip_code').value.trim(),
        country = t.find('#country').value.trim(),
        company = t.find('#company').value.trim(),
        title = t.find('#title').value.trim(),
        status = t.find('#status').value.trim(),
        close_expectation_rate = t.find('#close_expectation_rate').value.trim(),
        notes = t.find('#notes').value.trim();
      var options = {first_name:first_name, last_name:last_name, email:email,
        title:title, company:company, phone:phone, phone_2:phone_2,
        address:address, address_2:address_2,city:city,state:state,
        zip_code:zip_code,country:country,status:status,notes:notes,
        close_expectation_rate:close_expectation_rate};

      var lead_id = Meteor.call('createLead',options,
                function(err, result)
                {
                  if(err)
                  {
                    console.log("ERROR - Could not create lead.");
                    console.log(err);
                    return false;
                  }
                  else
                  {
                    console.log("Successfully created lead");
                    return result;
                  }
                }
          );
      return false;
    }
  });


}



