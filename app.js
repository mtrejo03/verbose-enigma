const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;  
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// console.log(uri);



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))


//begin all my middlewarres


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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);



async function getData() {

 // await client.connect();
// point to collection 

app.get('/insert', async (req,res)=> { 

  console.log('in /insert');

 // let newSong = req.query.myName;

  console.log(newSong);



await client.connect();
await client.db("guitar-app-database").collection("guitar-app-songs").insertOne({ song: newSong});

res.redirect('/read');

});

  let results = await collection.find({}).toArray();
   // .limit(50)
  //  .toArray();

  console.log(results);
  return results;

}
  

  app.get('/read', async function (req, res) {
    let getDataResults = await getData();
    console.log("in /read: ", getDataResults);
    res.render('songs',
    { songData : getDataResults} );
  

 // res.send(results).status(200);

})

app.post('/delete/:id', async (req,res)=>{

  console.log("in delete, req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("guitar-app-database").collection("guitar-app-songs");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)}).then(result => {
  console.log(result); 
  res.redirect('/');})

  //insert into it

})


app.get('/', function (req, res) {
  res.sendFile('index.html');

})



app.get('/nodemon', function (req, res) {
  res.send('');

})

app.post('/saveMyName', (req,res)=>{
  console.log('did we hit the post endpoint?'); 

  console.log(req.body); 

  //res.redirect('/ejs'); 

  res.render('word',
    {pageTitle: req.body.myName});

})

app.get('/saveMyNameGet', (req,res)=>{
  console.log('did we hit the get endpoint?'); 

  console.log('req.query: ', req.query); 

  //console.log('req.params: ', req.params);

 // res.redirect('/ejs'); 

 let reqName = req.query.myNameGet;

 res.render('word',
 {pageTitle: reqName});

})

app.get('/ejs', function (req, res) {
  res.render('word',
    {pageTitle: 'my cool ejs page'}
  );
})


//endpoint, middleware(s)
app.get('/helloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back to home</a>')
})




app.listen(
  port, 
  ()=> console.log(
    `server is running on ... localhost:${port}`
    )
  );