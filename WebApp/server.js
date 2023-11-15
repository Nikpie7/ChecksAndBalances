require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5001;
const axios = require('axios');
const app = express();

// AWS STUFF
const AWS = require('aws-sdk');

// Configure AWS with your access and secret key
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2' // Change to your AWS SES region
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const jwt = require('jsonwebtoken');

const sendVerificationEmail = (email, username) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const params = {
    Source: 'noreply@checksnbalances.us', // Your verified email in SES
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: 'Email Verification' },
      Body: {
        Text: { Data: `Please verify your email using this token: ${token}` }
      }
    }
  };

  return ses.sendEmail(params).promise();
};





























app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

var interestList =
[
  ['Agriculture', 'hsag00', 'ssaf00'],
  ['Spending', 'hsap00', 'ssap00', 'hsbu00', 'ssbu00'],
  ['Military & National Defense', 'hsas00', 'ssas00', 'hlig00', 'sslin00', 'hshm00', 'ssga00'],
  ['Veterans', 'hsvr00', 'ssva00'],
  ['Taxation', 'hswm00'],
  ['Finance', 'ssbk00', 'ssfi00', 'hsba00'],
  ['Education', 'hsed00'],
  ['Labor', 'hsed00', 'hssm00', 'sssb00'],
  ['Energy', 'sseg00', 'hsif00', 'hsii00'],
  ['Science & Technology', 'sscm00', 'hssy00'],
  ['Governmental Reform', 'hsso00', 'slet00', 'slia00', 'hsha00', 'hsgo00', 'hsju00', 'ssju00', 'ssra00'],
  ['Foreign Affairs', 'hsfa00', 'ssfr00'],
  ['Infrastructure', 'ssev00', 'hspw00'],
  ['Health', 'sshr00', 'spag00', 'scnc00']
];

const defaultInterests = [
  {"InterestName": "Agriculture", "value": false},
  {"InterestName": "Spending", "value": false},
  {"InterestName": "Military & National Defense", "value": false},
  {"InterestName": "Veterans", "value": false},
  {"InterestName": "Taxation", "value": false},
  {"InterestName": "Finance", "value": false},
  {"InterestName": "Education", "value": false},
  {"InterestName": "Labor", "value": false},
  {"InterestName": "Energy", "value": false},
  {"InterestName": "Science & Technology", "value": false},
  {"InterestName": "Governmental Reform", "value": false},
  {"InterestName": "Foreign Affairs", "value": false},
  {"InterestName": "Infrastructure", "value": false},
  {"InterestName": "Health", "value": false}
];

// Intrests CRUDs

// Read Interests
app.get('/api/readInterests', async (req, res) => {
    try {
        const { userId } = req.body;
        const db = client.db('POOSBigProject');
        // const user = await db.collection('Users').findById(userId);
        const user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ Interests: user.Interests });
    } catch (error) {
        res.status(500).json({ error: "Interests Not Found" });
    }
});

// THIS IS THE ENDPOINT YOU USE TO GET A VOTE
app.get('/api/getBillVote', async (req, res, next) => {
  // Only works for most recent congress with this implementation
  // Takes one input, billName, with a string as its field (example: H.R.4820)
  const API_KEY = process.env.PRO_KEY;
  const { billName } = req.body;
  try {
    let myOffset = 0;
    let mostRecent = 0;
    const response1 = await axios.get("https://api.propublica.org/congress/v1/both/votes/recent.json", {
      params: {
        offset: myOffset,
        format: 'json',
      },
      headers: {
        'X-API-Key': API_KEY,
      }
    });
    mostRecent = response1.data.results.votes[0].roll_call;

    for (let i = mostRecent; i >= 0; i = i - 20)
    {
      console.log("We iterated. Yippee");
      const response2 = await axios.get("https://api.propublica.org/congress/v1/both/votes/recent.json", {
        params: {
          offset: myOffset,
          format: 'json',
        },
        headers: {
          'X-API-Key': API_KEY,
        }
      });
      console.log(myOffset);
      myOffset = myOffset + 20;
      for (let k = 0; k < 20; k++)
      {
        //Bug Testing Code For Future Use
        //console.log(response2.data.results.votes[k].bill.number)
        
        if (response2.data.results.votes[k].bill.number === billName)
        {
          let ret = response2.data.results.votes[k]
          return res.status(500).json(ret);
        }
      }
    }
  }
  catch
  {
    res.status(500).json({ error: 'Failed to retrieve roll call vote data' });
  }
  //let initText = 'https://api.propublica.org/congress/v1/members'
  //let finalText = initText.concat("/", memberID)
});

// Update/Delete intersts (takes in userID and full array of new interests)
app.post('/api/updateInterests', async (req, res) => {
    try {
        const { userId, interests } = req.body;
        const db = client.db('POOSBigProject');

        // Find the user in the Users collection by userId and update their interests
        const user = await db.collection('Users').findOneAndUpdate(
            { _id: new ObjectId(userId)},
            { $set: { Interests: interests }},
            { returnDocument: 'after' } // Return the updated document
        );

        // Check if the user object exists and has a value property
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        res.json({ interests: user.value.Interests });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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

// Takes the lowercase abbreviation of a state (i.e. fl) and returns its senators.
app.post('/api/getSenByState', async (req, res, next) => {
  try {
    const { state } = req.body;
    const apiKey = process.env.GOOGLE_KEY;

    let initText = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division';
    let test1 = initText.concat("%2Fcountry%3Aus%2Fstate");
    let finalText = test1.concat("%3A", state);

    const response = await axios.get(finalText, {
      params: {
        levels: "country",
        recursive: false,
        roles: "legislatorUpperBody",
        key: apiKey,
      }
    });

    res.status(200).json(response.data);
    //res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
});

// Takes an id (district number) and a state (lowercase abbreviation)
app.post('/api/getRepByDistrict', async (req, res, next) => {
  try {
    const { id, state } = req.body;
    const apiKey = process.env.GOOGLE_KEY;

    let initText = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives/ocd-division';
    let test1 = initText.concat("%2Fcountry%3Aus%2Fstate");
    let test2 = test1.concat("%3A", state);
    let test3 = test2.concat("%2F", "cd");
    let finalText = test3.concat("%3A", id);

    const response = await axios.get(finalText, {
      params: {
        levels: "country",
        recursive: true,
        roles: "legislatorLowerBody",
        key: apiKey,
      }
    });

    res.status(200).json(response.data);
    //res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
});
app.get('/api/getMemberID', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { name } = req.body;
  let memberID = '';
  // This name should be given as "Leahy, Patrick J." or as "Kelly, Mark"
  let bigList = [];
  // Takes Congress member name, returns their member ID
  // Returns list of amendments to a bill
  try {
    let responseList = await axios.get('https://api.congress.gov/v3/member', {
      params: {
        format: 'json',
        limit: 250,
        api_key: API_KEY,
      }
    })

    let responseList2 = await axios.get('https://api.congress.gov/v3/member', {
      params: {
        format: 'json',
        offset: 250,
        limit: 250,
        api_key: API_KEY,
      }
    })

    let responseList3 = await axios.get('https://api.congress.gov/v3/member', {
      params: {
        format: 'json',
        offset: 500,
        limit: 35,
        api_key: API_KEY,
      }
    })
    responseList.data.members = responseList.data.members.concat(responseList2.data.members);
    responseList.data.members = responseList.data.members.concat(responseList3.data.members);
    responseList.data.members.sort((a,b) => {return a.name - b.name});
    for (let iterator = 0; iterator < responseList.data.members.length; iterator++)
    {
      if (responseList.data.members[iterator].name.includes(name))
      {
        memberID = responseList.data.members[iterator].bioguideId;
        break;
      }
    }
    res.status(200).json(memberID);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
});

app.get('/api/getSponsoredBills', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { memberID, offset } = req.body;
  // Takes memberID from getMemberID endpoint, as well as an offset to load older legislation
  try{
    let initText = 'https://api.congress.gov/v3/member';
    let intermediateText = initText.concat("/", memberID);
    let finalText = intermediateText.concat("/sponsored-legislation");

    let bigArray = [];
    const response = await axios.get(finalText,
    {
      params: {
        format: 'json',
        offset: offset,
        limit: 20,
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });
    for (let i = 0; i < response.data.sponsoredLegislation.length; i++)
    {
      if (response.data.sponsoredLegislation[i].number == null)
      {
        continue;
      }
      bigArray = bigArray.concat(response.data.sponsoredLegislation[i].number);
    }
    res.status(200).json(bigArray);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
});

app.get('/api/getBillsByInterest', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { interest } = req.body;
  const ourIndex = 0;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns list of bill numbers.

  try {
    let bigArray = [];
    for (let k = 0; k < interestList.length; k++)
    {
      let ourIndex = 0;
      if (interest === interestList[k][0])
      {
        for (let i = 1; i < interestList[k].length; i++)
        {
          let chamber = "house";
          if (interestList[k][i].includes('ss') || interestList[k][i].includes('sc') || interestList[k][i].includes('sp') || interestList[k][i].includes('sl'))
          {
            chamber = "senate";
          }
          let initText = 'https://api.congress.gov/v3/committee';
          let test1 = initText.concat("/", chamber);
          let test2 = test1.concat("/", interestList[k][i]);
          let finalText = test2.concat("/", "bills");
          const response = await axios.get(finalText,
          {
            params: {
              format: 'json',
              limit: 20,
              api_key: API_KEY,
            },
            headers: {
              accept: 'application/json',
            }
          });
          let temp = response.data['committee-bills'];
          for (let j = 0; j < 20; j++)
          {
            bigArray = bigArray.concat(temp.bills[j].number);
          }
        }
      }
    }
    res.json(bigArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

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

app.get('/api/getBills', async (req, res, next) => {
  // Incoming: billType
  // Outgoing: Bill numbers

  const API_KEY = process.env.CONGRESS_KEY;
  const { billType } = req.body; // Use req.query to get query parameters

  if (!billType) {
    return res.status(400).json({ error: 'Missing bill_type parameter' });
  }

  try {
    const response = await axios.get('https://api.congress.gov/v3/bill/117',
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
    
    const billNumbers = response.data.bills.map(bill => bill.number);

    res.json({ billNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill numbers' });
  }
});

app.post('/api/login', async (req, res, next) => {
  // incoming: username, password
  // outgoing: id, FirstName, LastName, Email, Verified, Address, ZipCode, error

  var error = '';

  const { username, password } = req.body;

  const db = client.db('POOSBigProject');
  const results = await db.collection('Users').find({ Login: username, Password: password }).toArray();

  if (results.length > 0) {
    // Check if the user is verified
    if (!results[0].Verified) {
      error = 'Account not verified. Please check your email for the verification link.';
      return res.status(401).json({ error: error });
    }

    // Assign user details to variables
    var id = results[0]._id.toString();
    var fn = results[0].FirstName;
    var ln = results[0].LastName;
    var em = results[0].Email;
    var vf = results[0].Verified;
    var ad = results[0].Address;
    var zc = results[0].ZipCode;

  } else {
    error = 'Login failed: Invalid username or password.';
    return res.status(401).json({ error: error });
  }
  
  var ret = { id: id, firstName: fn, lastName: ln, email: em, verified: vf, address: ad, zipCode: zc, error: error };
  res.status(200).json(ret);
});


app.post('/api/register', async (req, res, next) =>
{
  // incoming: username, password, email, firstName, lastName, address, zipCode
  // outgoing: id, error

  const { firstName, lastName, username, email, password, address, zipCode } = req.body;
  
  const newUser = {FirstName: firstName, LastName: lastName, Login: username, Email: email, Password: password, Address: address, Verified: false, ZipCode: zipCode, Interests: defaultInterests};
  var error = '';
  
   try {
    const db = client.db('POOSBigProject');
    const result = await db.collection('Users').insertOne(newUser);

    // Send verification email
    await sendVerificationEmail(email, username);
  } catch(e) {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.get('/api/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    // Update user verification status
    const db = client.db('POOSBigProject');
    await db.collection('Users').updateOne(
      { Login: username },
      { $set: { Verified: true } }
    );

    res.send('Email verified successfully');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
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
