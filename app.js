const path = require('path')
const express = require('express')
const data = require('./db/fakedata.json')
const app = express()
const mongojs = require("mongojs");
const jwtGen = require("./jwt");
const bcrypt = require("bcryptjs")

var PORT = process.env.PORT || 3001;

app.use(express.urlencoded())
app.use(express.json())

app.get("/api/all", (req, res) => {
  console.log(req.headers['user-agent'])
  res.json(data)
})

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-rn/build/index.html'))
  })
}

var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/userInfo_db';
var collections = ["userInfo"];

var db = mongojs(databaseUrl, collections);


db.on("error", function (error) {
  console.log("Database Error:", error);
});

app.post('/signIn', async (req, res) => {
  console.log(req.body)
  db.userInfo.findOne({
    userEmail: req.body.userEmail
  },async (error, result) => {
    if (await bcrypt.compare(req.body.userPassword, result.userPassword)) {
      // password match then generate a token for user login
      const token = jwtGen(result._id);
      db.userInfo.update(
        {_id: result._id},
        {$set: { "token": token}});
        res.status(200).send({token})
    } else {
      res.status(404).send({'error': 'Invalid Credentials'})
    }
  })
})

app.post('/signUp', async (req, res) => {
  console.log(req.body)
  db.userInfo.findOne({
    userEmail: req.body.userEmail
  }, async function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).send()
    }
    if (result) {
      console.log('user exists')
      res.status(400).send({'error': 'User Email Already Exists'})
    } else if (!result) {
      var hashPassword = await bcrypt.hash(req.body.userPassword, 8)
      db.userInfo.insert({
        userFullName: req.body.userFullName,
        userPassword: hashPassword,
        userEmail: req.body.userEmail
      }, function (error, savedUserInfo) {
        // Log any errors
        if (error) {
          console.log(error);
          res.status(500).send()
        } else {
          const token = jwtGen(savedUserInfo._id);
          console.log(token);
          db.userInfo.update(
            {_id: savedUserInfo._id},
            {$set: { "token": token}});
            savedUserInfo['token'] = token
          res.status(201).json(savedUserInfo);
        }
      });
    }
  })
 
// }
// res.send()
})


// app.get("/userInfo", function (req, res) {
//   db.userInfo.find({}, function (error, result) {
//     res.json(result);
//   })
// })

// app.post("/userInfo", function (req, res) {
//   console.log(req.body)

//   db.userInfo.insert({
//     userFirstName: req.body.userFirstName,
//     userLastName: req.body.userLastName,
//     userPassword: req.body.userPassword,
//     userEmail: req.body.userEmail
//   }, function (error, savedUserInfo) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     } else {
//       //the reason why we are sending the savedSong back is because we now have an _id to give to the client
//       res.json(savedUserInfo);
//     }
//   });
// });




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})