require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5001;
const axios = require('axios');
const app = express();
const { ObjectId } = require('mongodb');
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

const sendVerificationEmail = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Define the frontend URL for email verification (change this to your actual frontend URL)
  const verificationUrl = `https://checksnbalances.us/verifyToken/${token}`;

  const params = {
    Source: 'noreply@checksnbalances.us', // Your verified email in SES
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: 'Email Verification' },
      Body: {
        // Include both Text and Html versions for email clients that don't support HTML
        Text: { Data: `Please verify your email by visiting the following link: ${verificationUrl}` },
        Html: { Data: `<html><body><p>Please verify your email by clicking the following link: <a href="${verificationUrl}">Verify Email</a></p><p>This link will expire in 1 hour.</p></body></html>` }
      }
    }
  };

  return ses.sendEmail(params).promise();
};


const sendPasswordResetEmail = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Define the frontend URL for password reset
  const passwordResetUrl = `http://checksnbalances.us/resetPassword/${token}`;

  const params = {
    Source: 'noreply@checksnbalances.us', // Your verified email in SES
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: 'Password reset' },
      Body: {
        // Include both Text and Html versions for email clients that don't support HTML
        Text: { Data: `Please reset your password by visiting the following link: ${passwordResetUrl}` },
        Html: { Data: `<html><body><p>Please reset your password by visiting the following link: <a href="${passwordResetUrl}">Reset Password</a></p><p>This link will expire in 1 hour.</p></body></html>` }
      }
    }
  };
  return ses.sendEmail(params).promise();
};

// Utility function to capitalize the first letter of a string and make the rest lower case
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}










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
  // Takes in a token.
  // Returns an array of the user's interests.
  const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        var userId = decoded.id;

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
  const { billName } = req.query;
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
          return res.status(200).json(ret);
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

// Update/Delete intersts (takes in token and full array of new interests)
app.post('/api/updateInterests', async (req, res) => {
    try {
        const { token, interests } = req.body;
        const db = client.db('POOSBigProject');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        var userId = decoded.id;
        
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

        res.json({ interests: user.Interests });
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

// Run this ONLY to populate MongoDB database with fresh bills. NOT FOR FRONTEND USE
app.post('/api/mongoBill', async (req, res, next) =>
{
  // incoming: offset, limit
  // outgoing: bill id
  const { offset, limit } = req.body;
  const API_KEY = process.env.CONGRESS_KEY;
  
  const response = await axios.get("https://api.congress.gov/v3/bill",
    {
      params: {
        format: 'json',
        offset: offset,
        limit: limit,
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });
    
  for (let i = 0; i < limit; i++)
  {
    let type = (response.data.bills[i].type).toLowerCase();
    let number = response.data.bills[i].number;
    let congress = response.data.bills[i].congress;
    let updateDate = response.data.bills[i].updateDate;

    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", type);
    let test3 = test2.concat("/", number);
    let finalText = test3.concat("/", "titles");

    const retVal = await axios.get(finalText,
    {
      params: {
        format: 'json',
        api_key: API_KEY,
      },
      headers: {
        accept: 'application/json',
      }
    });

    
    initText = 'https://api.congress.gov/v3/bill';
    test1 = initText.concat("/", congress);
    test2 = test1.concat("/", type);
    test3 = test2.concat("/", number);
    finalText = test3.concat("/", "committees");

    const retVal2 = await axios.get(finalText,
      {
        params: {
          format: 'json',
          api_key: API_KEY,
        },
        headers: {
          accept: 'application/json',
        }
      });
      

    let title = retVal.data.titles[0].title;

    // Some of these are null for whatever reason, and hence should be left as N/A
    let committee = "N/A";
    let committeeName = "N/A"
    if (retVal2.data.committees[0] != null) {
      committee = retVal2.data.committees[0].systemCode;
      committeeName = retVal2.data.committees[0].name;
    }
    
    let interest = "Miscellaneous";
    
    for (let k = 0; k < interestList.length && interest === "Miscellaneous"; k++)
    {
      for (let b = 1; b < interestList[k].length; b++)
      {
        if (committee === interestList[k][b])
        {
          interest = interestList[k][0];
        }
        break;
      }
    }

    initText = 'https://api.congress.gov/v3/bill';
    test1 = initText.concat("/", congress);
    test2 = test1.concat("/", type);
    test3 = test2.concat("/", number);

    const retVal3 = await axios.get(test3,
      {
        params: {
          format: 'json',
          api_key: API_KEY,
        },
        headers: {
          accept: 'application/json',
        }
      });
      
      let sponsor = (retVal3.data.bill.sponsors[0].firstName).concat(" ", retVal3.data.bill.sponsors[0].lastName);
    
      initText = 'https://api.congress.gov/v3/bill';
      test1 = initText.concat("/", congress);
      test2 = test1.concat("/", type);
      test3 = test2.concat("/", number);
      finalText = test3.concat("/", "cosponsors");
  
      const retVal4 = await axios.get(finalText,
        {
          params: {
            format: 'json',
            api_key: API_KEY,
          },
          headers: {
            accept: 'application/json',
          }
        });
      
      let ourCosponsors = [];
      for (let q = 0; q < retVal4.data.cosponsors.length; q++) {
        const firstName = capitalize(retVal4.data.cosponsors[q].firstName);
        const lastName = capitalize(retVal4.data.cosponsors[q].lastName);
        ourCosponsors[q] = `${firstName} ${lastName}`;
      }

    const newBill = {BillType: type, BillNumber: number, CongressNum: congress, LastUpdated: updateDate, Title: title, Committee: committee, RelatedInterest: interest, Sponsor: sponsor, Cosponsors: ourCosponsors};
    var error = '';
    
     try {
      const db = client.db('POOSBigProject');
      const result = await db.collection('Bills').insertOne(newBill);
  
    } catch(e) {
      if (e.code === 11000) {
        error = 'Bill already exists';
      }
      else {
        error = e.toString();
      }
    }
  
    var ret = { error: error };
  }
  res.status(200).json(ret);
  });

  // This endpoint searches through Mongo and returns all bills of a specific interest
  app.post('/api/searchBillsByInterest', async (req, res, next) =>
  {
    try {
      // We expect one field, "Interest", in the post body.
      // We return a list of bills with all information stored in them.
      const { Interest } = req.body;
      const db = client.db('POOSBigProject');
      
      let response = await (db.collection('Bills').find({ RelatedInterest: Interest})).toArray();

      if (!response) {
          return res.status(404).json({ error: 'No bills found' });
      }

      res.json({ response });
  } catch (error) {
      res.status(500).json({ error: "Interests Not Found" });
  }
  });

  // This endpoint searches bills by name, number, or a member's sponsored bills
  app.post('/api/searchBillsBasic', async (req, res, next) =>
  {
    try {
      // We expect one field, "input", in the post body.
      // We return a list of bills with all information stored in them.
      const { input } = req.body;
      const db = client.db('POOSBigProject');
      
      let response = await db.collection('Bills').find({ 
                              $or: [
                                { BillNumber: { $regex: input, $options: "i"} } ,
                                { Title: { $regex: input, $options: "i"} }, 
                                { Sponsor: { $regex: input, $options: "i"} },
                                { Cosponsors: { $elemMatch: { $regex: input, $options: "i" } } }
                              ]
                            }).toArray();

      if (!response) {
          return res.status(404).json({ error: 'No bills found' });
      }

      res.json({ response });
  } catch (error) {
      res.status(500).json({ error: "Interests Not Found" });
  }
  });

  // This endpoint searches for a member's sponsored bills
  app.post('/api/searchBillsSponsors', async (req, res, next) =>
  {
    try {
      // We expect one field, "member", in the post body. This is in the form Firstname Lastname.
      // We return a list of bills with all information stored in them.
      const { member } = req.body;
      const db = client.db('POOSBigProject');
      
      let response = await db.collection('Bills').find({ 
                              $or: [
                                { Sponsor: member } ,
                                { Cosponsors: { $elemMatch: { $eq: member } } }
                              ]
                            }).toArray();

      if (!response) {
          return res.status(404).json({ error: 'No bills found' });
      }

      res.json({ response });
  } catch (error) {
      res.status(500).json({ error: "Interests Not Found" });
  }
  }); 

// DEPRECATED API
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

// DEPRECATED API
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

//DEPRECATED API
app.get('/api/getMemberID', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { name } = req.query;
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

//DEPRECATED API
app.get('/api/getSponsoredBills', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { memberID, offset } = req.query;
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

//DEPRECATED API
app.get('/api/getBillsByInterest', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { interest, offset, limit, fromDateTime, toDateTime } = req.body;
  const ourIndex = 0;
  // Takes Interest, a limit of bills you want back, and a fromDateTime and toDateTime given in the form YYYY-MM-DDT00:00:00Z
  // Returns list of bill numbers, billType, congress number, and update date.

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
          let test3 = test2.concat("/", "bills");
          const response = await axios.get(test3,
          {
            params: {
              format: 'json',
              offset: offset,
              limit: limit,
              fromDateTime: fromDateTime,
              toDateTime: toDateTime,
              api_key: API_KEY,
            },
            headers: {
              accept: 'application/json',
            }
          });
          let temp = response.data['committee-bills'];
          for (let j = 0; j < limit; j++)
          {
            if (temp.bills[j] === undefined)
            {
              console.log("We (tried) broke out");
              break;
            }
            console.log(temp.bills[j]);
            let smallArray = [temp.bills[j].number, temp.bills[j].type, temp.bills[j].congress, temp.bills[j].updateDate];
            bigArray[j] = smallArray;
          }
        }
      }
    }
    bigArray = bigArray.reverse();
    res.json(bigArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

// Should be unnecessary; you have access to titles from MongoDB.
app.get('/api/getBillTitles', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns list of legislative subjects of bill.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
    let initText = 'https://api.congress.gov/v3/bill';
    let test1 = initText.concat("/", congress);
    let test2 = test1.concat("/", billType);
    let test3 = test2.concat("/", billNumber);
    let finalText = test3.concat("/", "titles");

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


    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillSubjects', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns list of legislative subjects of bill.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {

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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillAmendments', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns list of amendments to a bill
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillRelatedBills', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of related bills.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillSummaries', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of bill summaries
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillCosponsors', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of bill cosponsors.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillActions', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of actions taken on a bill.
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

app.get('/api/getBillCommittees', async(req, res, next) => {
  const API_KEY = process.env.CONGRESS_KEY;
  const { congress, billType, billNumber } = req.query;
  // Takes Congress number, the type of bill, and the number of the specific bill
  // Returns a list of committees tied to a bill
  if (!billType)
  {
    return res.status(400).json({ error: 'Missing bill_type parameter'});
  }

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bill data '});
  }
})

// DEPRECATED API
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
  // Incoming: token
  // Outgoing: President, Senator1, Senator2, Representative
  try {
    const { token } = req.body;
    const apiKey = process.env.GOOGLE_KEY;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    var address = decoded.address;
    
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

// DEPRECATED API
app.get('/api/getBills', async (req, res, next) => {
  // Incoming: billType
  // Outgoing: Bill numbers

  const API_KEY = process.env.CONGRESS_KEY;
  const { billType } = req.query; // Use req.query to get query parameters

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
  // incoming: email, password
  // outgoing: id, FirstName, LastName, Email, Verified, Address, error

  var error = '';

  const { email, password } = req.body;

  const db = client.db('POOSBigProject');
  const results = await db.collection('Users').find({ Email: email, Password: password }).toArray();

  if (results.length > 0) {
    // Check if the user is verified
    if (!results[0].Verified) {
      error = 'Account not verified. Please check your email for the verification link.';
      return res.status(403).json({ error: error });
    }

    // Assign user details to variables
    var id = results[0]._id.toString();
    var firstName = results[0].FirstName;
    var lastName = results[0].LastName;
    var address = results[0].Address;
  
    var token = jwt.sign({ id, firstName, lastName, password, email, address }, process.env.JWT_SECRET, { expiresIn: '24h' });

  } else {
    error = 'Invalid email or password.';
    return res.status(401).json({ error: error });
  }
  
  var ret = { token: token };
  res.status(200).json(ret);
});

app.get('/api/getUser', async (req, res, next) => {
  // incoming: token
  // outgoing: firstName, lastName, email, address, error
  try 
  {
    const {token} = req.query;
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  var ret = { firstName: decoded.firstName, lastName: decoded.lastName, email: decoded.email, address: decoded.address };
  res.status(200).json(ret)
  }
  catch{
    error = 'Invalid JWT';
    return res.status(401).json({ error: error });
  }
});


app.post('/api/register', async (req, res, next) =>
{
  // incoming: email, password, firstName, lastName, address
  // outgoing: id, error

  const { firstName, lastName, email, password, address } = req.body;
  
  const newUser = {FirstName: firstName, LastName: lastName, Email: email, Password: password, Address: address, Verified: false, Interests: defaultInterests};
  var error = '';
  
   try {
    const db = client.db('POOSBigProject');
    const result = await db.collection('Users').insertOne(newUser);

    // Send verification email
    await sendVerificationEmail(email);
  } catch(e) {
    if (e.code === 11000) {
      error = 'User with that email already exists.';
    }
    else
      error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.get('/api/verify-email', async (req, res) => {
  
  const { token } = req.query;
  console.error(token);

  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Update user verification status
    const db = client.db('POOSBigProject');
    await db.collection('Users').updateOne(
      { Email: email },
      { $set: { Verified: true } }
    );

    res.send('Email verified successfully (THIS IS FROM THE API)');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
});

app.post('/api/send-password-reset', async (req, res, next) =>
{
  // incoming: email
  // outgoing: id, error

  const {email} = req.body;
  
  var error = '';
  
   try {
    // Send password reset email
    await sendPasswordResetEmail(email);
  } catch(e) {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});



app.get('/api/password-reset', async (req, res) => {
  const { token, newPassword } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Reset user password
    const db = client.db('POOSBigProject');
    await db.collection('Users').updateOne(
      { Email: email },
      { $set: { Password: newPassword } }
    );

    res.send('Password successfully reset');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
});

// DEPRECATED API
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


/* MAP API */
const { Client } = require('@googlemaps/google-maps-services-js');
const googleMaps = new Client({});
const Geocodio = require('geocodio-library-node');
const geocodio = new Geocodio(process.env.GEOCODIO_KEY);
app.get('/api/geocode', (request, response) => {
  const {address, state} = request.query;
  // console.log(`Address: ${address} State: ${state}`)

  googleMaps.geocode({
    params: {
      // components: `administrative_area:${state}`,
      address: address,
      key: process.env.GOOGLE_MAPS_KEY
    }
  })
  .then(mapsRes => {
    if (mapsRes.data.status === 'ZERO_RESULTS') {
      // console.log('No results');
      response.status(200).send('');
      return;
    }
    // console.log('Found result: ' + mapsRes.data.results.formatted_address);
    // console.log(mapsRes.data);
    const latLngBounds = [];
    latLngBounds[0] = +mapsRes.data.results[0].geometry.location.lat;
    latLngBounds[1] = +mapsRes.data.results[0].geometry.location.lng;
    console.log(mapsRes.data.results[0]);
    mapsRes.data.results[0].geometry.coords = [...latLngBounds];
    response.status(200).send(mapsRes.data.results[0]);
  })
  .catch(error => {
    console.log(error);
    response.status(500);
  });

})
app.get('/api/predictAddress', (request, response) => {
  const {address, state, stateOrigin} = request.query;
  console.log(`Address: ${address} State: ${state}`)

  if (address === '') {
    console.log('Empty response');
    response.status(200).send('');
    return;
  }

  googleMaps.placeAutocomplete({
    params: {
      components: `country:us`,
      input: `${address}, ${state}`,
      location: stateOrigin, 
      radius: 100000,
      key: process.env.GOOGLE_MAPS_KEY
    }
  })
  .then(mapsRes => {
    if (mapsRes.data.status !== 'OK') {
      response.status(200).send([]);
      return;
    }
    // mapsRes.data.predictions.filter(prediction => {
      
    // });
    response.status(200).send(mapsRes.data.predictions);
  })
  .catch(error => {
    console.log(error);
    response.status(500);
  });
})
app.get('/api/getPlaceDetails', async (request, response) => {
  const {place_id} = request.query;
  try {
    const placeDetails = await googleMaps.placeDetails({
      params: {
        place_id,
        key: process.env.GOOGLE_MAPS_KEY
      }
    })
    response.status(200).send(placeDetails.data.result);
    return;
  }
  catch {
    // console.log(response);
    response.status(500);
    return;
  }
});
app.get('/api/getDistrict', async (request, response) => {
  // console.log(request.query.coords)
  const coords = request.query.coords;
  // console.log(coords.toString());
  const results = await geocodio.reverse(`${coords[0]},${coords[1]}`, ['cd'])
    .then(geocodioRes => {
      // if (geocodioRes.results[0] === undefined) response.status(400);
      console.log(geocodioRes.results[0]);
      return geocodioRes.results[0];
      // return geocodioRes.results[0].fields.congressional_districts[0].district_number;
    });
  response.status(200).json(results);
});
/* MAP API */

// (WE HAVE NO IDEA WHAT THIS DOES, SO DON'T TOUCH)
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

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