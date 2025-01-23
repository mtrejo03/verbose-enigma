const express = require('express')
const app = express()
const port = process.env.PORT || 3000;  
const bodyParser = require('body-parser')



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

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

  console.log(req.query); 

  res.redirect('/ejs'); 

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