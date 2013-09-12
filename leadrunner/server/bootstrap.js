//populate database with test leads on server startup
Meteor.startup(function() {
  //create admin user if no users created
  if(Meteor.users.find().count() === 0)
    {
      var options = {email:"admin@localhost",password:"development",
        profile:{first_name:"Local", last_name:"Administrator",
          phone:"123-456-7890",title:"Administrator",role:"admin"
        }};
        Accounts.createUser(options);
    }
  if (Leads.find().count() === 0) {
    var data = [
      {lead:
       ["Richard",
        "Sayer",
        "215-832-3381",
        "50 on Red",
        "120 Market St, Suite 3",
        "Philadelphia", 
        "PA",
        "richard@50onred.com",
        ],
        products:['OpenX Enterprise','OpenX Market','Hole in Blanket']
      },
      {
       lead:
        ["Josh",
        "Solan",
        "267-371-3810",
        "XD Developers",
        "13 Basin Dr", 
        "Horsham", 
        "PA",
        "josh@xddevelopers.com"
        ],
        products:['OpenX Enterprise','OpenX Market','OpenX Lift']
      },
      {
       lead:
        ["Trey",
        "Blazic",
        "401-808-0381",
        "Chacha",
        "Motor Way", 
        "Detroit", 
        "MI",
        "treyb@chacha.com"
        ],
        products:['OpenX Enterprise']
      }
    ];

    for(var i=0; i < data.length; i++)
    {
      var timestamp = (new Date()).getTime();
      obj = data[i].lead;
      prods = data[i].products;
      lead_id = Leads.insert({first_name:obj[0],last_name:obj[1],
                             phone:obj[2],company:obj[3],address:obj[4],city:obj[5],
                             state:obj[6],email:obj[7],
                             products:prods.slice(),
                              timestamp:timestamp});
    }
  }
});

