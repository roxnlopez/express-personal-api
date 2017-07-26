// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_profile = 
	{
		name: "Roxann",
		hobbies: "eating, baking, peopl-watching, camping.",
		description: "I love laying in the sun."
	};

db.Profile.create(new_profile, function(err, profile){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new profile", profile._id);
  process.exit(); // we're all done! Exit the program.
});
