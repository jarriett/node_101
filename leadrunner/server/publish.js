//Leads  
Leads = new Meteor.Collection("leads");

//publish a complete set to all clients
Meteor.publish('leads', function() {
  return Leads.find();
});

