

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('app'));

MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.get('/watchlist', function(req, res) {  // our second route
  res.send(`
    <h1>Watchlist</h1>
    <p>Commentary on Watchlists will go here.</p>
    `);
});

app.get('/entry/:name', function(req, res) {
  let name = req.params.name;
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    `);
});

app.get('/entry/:name?/:link', function(req, res) {
  let name = req.params.name;
  let link = `${req.params.link}`;
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${link}</p>
    `);
});


// app.listen(port, function() {
//   console.log(`Listening on port ${port}!`);
// });