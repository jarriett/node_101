//populate database with test leads on server startup
Meteor.startup(function() {
  //create admin user if no users created
  if(Meteor.users.find().count() === 0)
    {
      var options = {email:"admin@localhost",password:"development",
        profile:{first_name:"Local", last_name:"Administrator",
          phone:"123-456-7890",title:"Administrator",roles:["admin","manager"],
          is_admin:true
        }};
        Accounts.createUser(options);
    }
  if (Leads.find().count() === 0) {
    var data = [
      {lead:
       ["Richard",
        "Sayer",
        "215-832-3381",
        "401-5832-3820",
        "50 on Red",
        "120 Market St, Suite 3",
        "Philadelphia", 
        "PA",
        "19001",
        "US",
        "richard@50onred.com",
        "Marketing Lead",
        .80
        ],
        products:['OpenX Enterprise','OpenX Market','Hole in Blanket']
      },
      {
       lead:
        ["Josh",
        "Solan",
        "267-371-3810",
        "215-530-5817",
        "XD Developers",
        "13 Basin Dr", 
        "Horsham", 
        "PA",
        "19404",
        "US",
        "josh@xddevelopers.com",
        "CEO",
        .95
        ],
        products:['OpenX Enterprise','OpenX Market','OpenX Lift']
      },
      {
       lead:
        ["Trey",
        "Blazic",
        "401-808-0381",
        "401-382-3815",
        "Chacha",
        "Motor Way", 
        "Detroit", 
        "MI",
        "10871",
        "US",
        "treyb@chacha.com",
        "Advertising Manager",
        .55
        ],
        products:['OpenX Enterprise']
      }
    ];

    for(var i=0; i < data.length; i++)
    {
      var timestamp = +new Date();//.getTime();
      obj = data[i].lead;
      prods = data[i].products;
      lead_id = Leads.insert({first_name:obj[0],last_name:obj[1],
                             phone:obj[2],phone_2:obj[3],company:obj[4],
                             address:obj[5],city:obj[6],
                             state:obj[7], zip_code:obj[8], country:obj[9],
                             email:obj[10],title:obj[11],
                             status:"pending",close_expectation_rate:obj[12],
                             campaigns:[{name:"Enterprise Products",
                                products:["OpenX Enterprise","OpenX Market", 
                                  "OpenX Lift"]}],
                              media:[{type:"image",
                              url:
                                "http://salonkritik.net/08-09/NoPictureAvailableImage.jpg"}],

                              photo_url:"http://salonkritik.net/08-09/NoPictureAvailableImage.jpg",
                              created:timestamp, modified:timestamp});
    }
  }
});

