// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");
if (Meteor.isClient) {
  Session.set('sort', 1);
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: Session.get('sort'), name: 1}});
  };
  
  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.leaderboard.events({
    'click input.inc': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.toggle_sort': function(){
      if(Session.get('sort') == -1)
      {
        Session.set('sort',1);
      }
      else
      {
        Session.set('sort',-1);
      }
      Template.leaderboard.players();
    },
    'click input.reset_scores': function(){
      Players.update({},{score: Math.floor(Random.fraction()*10)*7});
      Template.leaderboard.players();
    },
    'click input.remove': function()
    {
      Players.remove(Session.get('selected_player'));
      Template.leaderboard.players();
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}
