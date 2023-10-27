require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5001;
// Loading the Google API Client Library
// Uncomment line 10 when ready for Google Testing
//gapi.load('client', init);

const app = express();
var cardList =
[
  'Roy Campanella',
  'Paul Molitor',
  'Tony Gwynn',
  'Dennis Eckersley',
  'Reggie Jackson',
  'Gaylord Perry',
  'Buck Leonard',
  'Rollie Fingers',
  'Charlie Gehringer',
  'Wade Boggs',
  'Carl Hubbell',
  'Dave Winfield',
  'Jackie Robinson',
  'Ken Griffey, Jr.',
  'Al Simmons',
  'Chuck Klein',
  'Mel Ott',
  'Mark McGwire',
  'Nolan Ryan',
  'Ralph Kiner',
  'Yogi Berra',
  'Goose Goslin',
  'Greg Maddux',
  'Frankie Frisch',
  'Ernie Banks',
  'Ozzie Smith',
  'Hank Greenberg',
  'Kirby Puckett',
  'Bob Feller',
  'Dizzy Dean',
  'Joe Jackson',
  'Sam Crawford',
  'Barry Bonds',
  'Duke Snider',
  'George Sisler',
  'Ed Walsh',
  'Tom Seaver',
  'Willie Stargell',
  'Bob Gibson',
  'Brooks Robinson',
  'Steve Carlton',
  'Joe Medwick',
  'Nap Lajoie',
  'Cal Ripken, Jr.',
  'Mike Schmidt',
  'Eddie Murray',
  'Tris Speaker',
  'Al Kaline',
  'Sandy Koufax',
  'Willie Keeler',
  'Pete Rose',
  'Robin Roberts',
  'Eddie Collins',
  'Lefty Gomez',
  'Lefty Grove',
  'Carl Yastrzemski',
  'Frank Robinson',
  'Juan Marichal',
  'Warren Spahn',
  'Pie Traynor',
  'Roberto Clemente',
  'Harmon Killebrew',
  'Satchel Paige',
  'Eddie Plank',
  'Josh Gibson',
  'Oscar Charleston',
  'Mickey Mantle',
  'Cool Papa Bell',
  'Johnny Bench',
  'Mickey Cochrane',
  'Jimmie Foxx',
  'Jim Palmer',
  'Cy Young',
  'Eddie Mathews',
  'Honus Wagner',
  'Paul Waner',
  'Grover Alexander',
  'Rod Carew',
  'Joe DiMaggio',
  'Joe Morgan',
  'Stan Musial',
  'Bill Terry',
  'Rogers Hornsby',
  'Lou Brock',
  'Ted Williams',
  'Bill Dickey',
  'Christy Mathewson',
  'Willie McCovey',
  'Lou Gehrig',
  'George Brett',
  'Hank Aaron',
  'Harry Heilmann',
  'Walter Johnson',
  'Roger Clemens',
  'Ty Cobb',
  'Whitey Ford',
  'Willie Mays',
  'Rickey Henderson',
  'Babe Ruth'
];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

function loadClient(){
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error

  const { userId, card } = req.body;

  const newCard = {Card:card,UserId:userId};
  var error = '';

  try
  {
    const db = client.db('COP4331Cards');
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }

  cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});


app.post('/api/login', async (req, res, next) =>
{
  // incoming: username, password
  // outgoing: id, FirstName, LastName, Email, Verified, Address, ZipCode, error

 var error = '';

  const { username, password } = req.body;
  // console.log(username, password);

  const db = client.db('POOSBigProject');
  //console.log(db);
  const results = await db.collection('Users').find({ $and: [{ Login: username }, { Password: password }] }).toArray();
  // console.log(results);

  var id = -1;
  var fn = '';
  var ln = '';
  var em = '';
  var vf = '';
  var ad = '';
  var zc = '';

  if( results.length > 0 )
  {
    id = results[0]._id.toString();
    fn = results[0].FirstName;
    ln = results[0].LastName;
    em = results[0].Email;
    vf = results[0].Verified;
    ad = results[0].Address;
    zc = results[0].ZipCode;
  }
  
  var ret = { id:id, firstName:fn, lastName:ln, email: em, verified: vf, address: ad, zipCode: zc, error:''};
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) =>
{
  // incoming: username, password, email, firstName, lastName, address, zipCode
  // outgoing: id, error

  const { firstName, lastName, username, email, password, address, zipCode } = req.body;

  const newUser = {FirstName: firstName, LastName: lastName, Login: username, Email: email, Password: password, Address: address, Verified: false, ZipCode: zipCode};
  var error = '';

  try
  {
    const db = client.db('POOSBigProject');
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  //cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});

// Note: Get Nikolai to make an env variable for Google API Key
// Note: This is the endpoint we're using to get representative data for locations
app.post('/api/getReps', async (req, res, next) =>
{
  // incoming: address
  // outgoing: headOfState, legislatorUpperBody, legislatorLowerBody
  
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  
  var error = '';

  const { address } = req.body;
  // console.log(username, password);

  const db = client.db('POOSBigProject');
  //console.log(db);
  const results = await gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": address,
      "includeOffices": true,
      "roles": [
        "headOfState",
        "legislatorUpperBody",
        "legislatorLowerBody"
      ]
    })
  // console.log(results);

  var id = -1;
  var fn = '';
  var ln = '';
  var em = '';
  var vf = '';
  var ad = '';
  var zc = '';

  // I have no idea how to capture this thing's output, though.
  if( results.length > 0 )
  {
    id = results[0]._id.toString();
    fn = results[0].FirstName;
    ln = results[0].LastName;
    em = results[0].Email;
    vf = results[0].Verified;
    ad = results[0].Address;
    zc = results[0].ZipCode;
  }
  
  var ret = { id:id, firstName:fn, lastName:ln, email: em, verified: vf, address: ad, zipCode: zc, error:''};
  res.status(200).json(ret);
});


app.post('/api/searchcards', async (req, res, next) =>
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();

  const db = client.db('COP4331Cards');
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();

  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }

  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
}); // start Node + Express server on port 5000
