// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

//var db = require('./models');

var profile = [
  {
    name: "Roxann Lopez",
    github_link: "https://github.com/roxnlopez",
    github_profile_image: "",
    current_city: "Denver",
    pets: [
      {name: "Marley", type: "dog", breed: "chi/terrier"}
    ]
  }
];

//baking schema
var baking = [
  {
    _id: 1,
    bakedGood: "cupcake",
    levelOfEase: "easy and fast",
    tastiness: "riding unicorns across a rainbow",
  },
  {
    _id: 2,
    bakedGood: "macaron",
    levelOfEase: "difficult and touchy",
    tastiness: "euphoric puffs",
  },
  {
    _id: 3,
    bakedGood: "cheesecake",
    levelOfEase: "somewhat difficult and half day required to 'set' cake ",
    tastiness: "results may vary",
  }
];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/roxnlopez", // CHANGED
    base_url: "https://lit-earth-42827.heroku.com/apps", // CHANGED
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/profiles", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  });
});

//build my routes here
//GET for /profile
app.get('/api/profile', function(req,res) {
  res.json(profile);
});

//GET for /baking
app.get('/api/baking', function(req,res) {
  res.json(baking);
});

//POST for adding another item
app.post('/api/baking', function(req,res) {
  baking.push(req.body);
  res.json(baking);
});

//UPDATE baked goods list
app.put('/api/baking/:id', function(req,res) {
  baking[req.params.id -1] = req.body;
  res.json(req.body);
});

//DELETE an item
app.delete('/api/baking/:id', function(req,res) {
  var bakingId = req.params.id;
  var deleteBakingIndex = baking.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id));
  });
  var bakingToDelete = baking[deleteBakingIndex];
  baking.splice(deleteBakingIndex, 1);
  res.json(bakingToDelete);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
