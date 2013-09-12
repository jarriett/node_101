Leads = new Meteor.Collection("leads");

if (Meteor.isClient) {
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

console.log("In Register....");
        if(Meteor.users.find({email:email_address}).count() < 1)
        {
          options = {first_name: first_name, last_name:last_name,
            email:email_address,title:title,phone:phone, role:role};
console.log(options);
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

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Backbone.history.start({pushState: true});
  });
}
