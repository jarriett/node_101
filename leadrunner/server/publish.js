//Leads  
Leads = new Meteor.Collection("leads");

//publish a complete set to all clients
Meteor.publish('leads', function() {
  if(Meteor.user().roles.indexOf('admin') > -1 ||
     Meteor.user().roles.indexOf('manager') > -1)
    {
      return Leads.find();
    }
    else //only return the current user, minus the roles value
      {
        return Leads.find({_id:Meteor.user()._id},{roles:0});
      }
});
  

