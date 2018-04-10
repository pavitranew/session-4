const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('app'));


const mongoUrl = 'mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl';

MongoClient.connect(mongoUrl, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});

app.get('/', (req, res) => {
  db
    .collection('entries')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      const navigation = result.map((entry) => `${entry.label}`)
      res.render('index.ejs', { entries: result, navigation});
    });
});

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});

app.get('/:name?', (req, res) => {
  let name = req.params.name;
  db
    .collection('entries')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      const navigation = result.map(entry => `${entry.label}`)
      const thisItem = result.filter(result => result.label == name)
      res.render('index.ejs', { entries: thisItem, navigation});
    });
});
