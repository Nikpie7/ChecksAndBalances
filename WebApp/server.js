require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5001;
//Hello World 2!
const axios = require('axios');
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

app.get('/api/getVotesSenate', async (req, res, next) => {
  const API_KEY = 'celRz6ypa6JuFoqCsYBelBwS5HxkGTHbcTMQGo8V';

  try {
    
    const response = await axios.get('https://api.propublica.org/congress/v1/senate/votes/recent.json', {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve roll call vote data' });
  }
});

app.get('/api/getVotesHouse', async (req, res, next) => {
  const API_KEY = 'celRz6ypa6JuFoqCsYBelBwS5HxkGTHbcTMQGo8V';

  try {
    
    const response = await axios.get('https://api.propublica.org/house/v1/house/votes/recent.json', {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve roll call vote data' });
  }
});

app.get('/api/getVotesMember', async (req, res, next) => {
  const API_KEY = 'celRz6ypa6JuFoqCsYBelBwS5HxkGTHbcTMQGo8V';
  const { memberID } = req.body;

  let initText = 'https://api.propublica.org/congress/v1/members'
  let finalText = initText.concat("/", memberID)

  try {
    
    const response = await axios.get(finalText, {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve roll call vote data' });
  }
});

app.get('/api/getBillSubjects', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns list of legislative subjects of bill.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "subjects");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillAmendments', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns list of amendments to a bill
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "amendments");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillRelatedBills', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of related bills.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "relatedbills");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillSummaries', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of bill summaries
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "summaries");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillCosponsors', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of bill cosponsors.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "cosponsors");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillActions', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of actions taken on a bill.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "actions");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillCommittees', async(req, res, next) => {
  const API_KEY = '1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ';
  const { congress, billType, billNumber } = req.body;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of committees tied to a bill
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

    //const response = await axios.get('https://api.congress.gov/v3/bill/117/hr?format=json&offset=0&limit=112&api_key=1bFnnjNn8xkUuTvnhjdLO2URpY5eK3dTYkhpoBaQ');
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "committees");

    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });


    // const response = await axios.get('https://api.congress.gov/v3/bill/{congress}/{billType}',
    // {
    //   params: {
    //     congress: 117,
    //     billType: billType,
    //     api_key: API_KEY,
    //   },
    // });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.post('/api/getReps', async (req, res, next) => {
  // Incoming: Address
  // Outgoing: President, Senator1, Senator2, Representative
  try {
    const { address } = req.body;
    const apiKey = process.env.GOOGLE_KEY;

    const response = await axios.get('https://civicinfo.googleapis.com/civicinfo/v2/representatives', {
      params: {
        address,
        includeOffices: true,
        levels: ["country"],
        roles: ["headOfState", "legislatorUpperBody", "legislatorLowerBody"],
        key: apiKey,
      }
    });
    var pres = '';
    var sen1 = '';
    var sen2 = '';
    var rep = '';

    pres = response.data.officials[0].name;
    sen1 = response.data.officials[2].name;
    sen2 = response.data.officials[3].name;
    rep = response.data.officials[4].name;

    var ret = {President:pres, Senator1:sen1, Senator2:sen2, Representative:rep};
    res.status(200).json(ret);
    //res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
});

app.get('/api/getBills', async(req, res, next) => {
  //Incoming: billType
  //Outgoing: The Motherlode of bills
  const API_KEY = process.env.CONGRESS_KEY;
  const { billType } = req.body;

  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
    const response = await axios.get('https://api.congress.gov/v3/bill/117/s',
    {
      params: {
        congress: 117,
        format: 'json',
        billType: billType,
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
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
