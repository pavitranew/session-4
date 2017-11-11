# Express and Templating (continued)

## Homework

Complete the Express application so that each navigation item works (i.e. displays relevant content in the browser)

## Set up and Db Connection

Review the package.json. Note the use of a proxy for browser sync and separate mac and pc scripts.

* cd into the `working` directory 
* npm install all dependencies
* review the connection settings in app.js
* log into / create an account on mLab.com
* find / create your database and database user

Note the instructions for connecting with the db username and password in the connection URL 

`mongodb://<dbuser>:<dbpassword>@ds139969.mlab.com:39969/bcl`

e.g.:

`const mongoUrl = 'mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl'` 

(You will replace it with your own later in class.)

```
MongoClient.connect(mongoUrl, (err, database) => {...}
```

We can also download a GUI for Mongo called Compass at https://www.mongodb.com/download-center#compass

Run `npm run <boom-mac or pc>` or simply `nodemon app.js` (demo - app.use static).

### Showing entries to users

Review app.js.

```js
app.get('/', (req, res) => {
  console.log('hey')
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    // res.render('index.ejs', {entries: result})
    res.send('it works!')
  })
})
```

```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    // res.render('index.ejs', {entries: result})
    const foo = { name: 'daniel', age: 100, bar: true }
    res.json(foo)
  })
})
```

Get params from the location string:

`http://localhost:9001/?name=daniel&foo=true`

```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    // res.render('index.ejs', {entries: result})
    res.send(req.query.name)
  })
})
```

Can also send the query directly to json:

`res.json(req.query)`

In our current template we have:

`app.use(bodyParser.urlencoded({extended: true}))`

Which encodes data for us so we can use things like `req.body`.

## Variables in a route

```js
app.get('/rewind/:animal', (req, res) => {
  res.send('yeah')
  // res.send(req.params.animal)
  })
```

```js
app.get('/rewind/:animal', (req, res) => {
  const rewinder = [...req.params.animal].reverse().join('')
  res.send(rewinder)
  })
```

You should review some of the [documentation for express](http://expressjs.com/en/api.html#express).

### Showing Entries

To show the entries stored in MongoLab:

1. Get entries from MongoLab
1. Use Javascript to display the entries

We can get the entries from MongoLab by using the find method that’s available in the [collection method](https://docs.mongodb.com/manual/reference/method/js-collection/).

Edit the primary route:

```js
app.get('/', (req, res) => {
  let cursor = db.collection('entries').find()
  console.log(cursor)
  res.sendFile(__dirname + '/index.html')
})
```

The find method returns a cursor. You will see it's contents in the terminal if you refresh the page, a complex Mongo Object.

This cursor object contains all entries from our database. It also contains a [bunch of other properties and methods](https://docs.mongodb.com/manual/reference/method/js-cursor/) that allow us to work with data more easily. One method is the [toArray](https://docs.mongodb.com/manual/reference/method/cursor.toArray/) method.

The `toArray` method takes a callback function that allows us to perform actions on the entries we retrieved from MongoLab. Try doing a console.log() for the results and see the results in the console:


```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, results) => {
    console.log(results)
    res.sendFile(__dirname + '/index.html')
  })
})
```

The array of entries should appear in the terminal on refresh. 

Other pertinent methods here include the `.find()` method. It is run against a collection and is just one of a [series of methods](https://docs.mongodb.com/manual/reference/method/js-collection/).

We are also using the `connect()` method which is documented [here](https://docs.mongodb.com/manual/reference/method/connect/)

#### Generate HTML to contain the entries

The standard method for outputting content fetched from a database is to use a templating engine. Some popular template engines include Jade/pug, [Moustache](https://mustache.github.io/#demo), Embedded JavaScript [(ejs)](http://www.embeddedjs.com) and Nunjucks. React and Angular offer their own templating engines - but to conclude this exercise we will use Embedded JavaScript (ejs). It’s the easiest to implement.

We use ejs by first installing it and then setting the view engine in Express to ejs.

`$ npm install ejs --save`

and in app.js we add:

`app.set('view engine', 'ejs')`

Let’s first create an `index.ejs` file within a `views` folder so we can start populating data.

```bash
$ mkdir views
$ touch views/index.ejs
```

Now, copy the contents of index.html into index.ejs and add.

```html
<% for(var i=0; i<entries.length; i++) { %>
<div class="entry">
  <h2><%= entries[i].label %></h2>
  <p><%= entries[i].content %></p>
</div>
<% } %>
```

In EJS, you can write JavaScript within <% and %> tags. You can also output JavaScript as strings with the <%= and %> tags.

We’re going to loop through the entries array and create strings with `entries[i].label` and `entries[i].content`.

Add a touch of css:

```css
.entry {
  background: #eee;
  padding: 0.5rem;
}
```

The complete index.ejs file so far should be:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test</title>
  <style>
    input, textarea {
      display: block;
      margin: 1rem;
      width: 70%;
    }
    .entry {
      background: #eee;
      padding: 0.5rem;
    }
  </style>
</head>
<body>
  <% for(var i=0; i<entries.length; i++) { %>
  <div class="entry">
    <h2><%= entries[i].label %></h2>
    <p><%= entries[i].content %></p>
  </div>
  <% } %>

  <form action="/entries" method="POST">
    <input type="text" placeholder="label" name="label">
    <input type="text" placeholder="header" name="header">
    <textarea type="text" placeholder="content" name="content"></textarea>
    <button type="submit">Submit</button>
  </form>

</body>
</html>
```

Finally, we have to render this index.ejs file when handling the GET request. Here, we’re setting the results (an array) as the entries array we used in index.ejs above.


```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})
```

Refresh your browser and you should be able to see all entries.

## Integration with the old site

We need to:

1. check our npm scripts to integrate nodemon and proxy browser-sync
1. move the old index.html into index.ejs 
1. re-enable app.use static. 

Edit package.json to proxy the browser sync to our express port number and add nodemon to our list of currently running scripts.

```js
 "scripts": {
    "watch-node-sass": "node-sass --watch scss/styles.scss --output public/css/  --source-map true",
    "start": "browser-sync start --proxy 'localhost:9000' --browser \"google chrome\"  --files 'public'",
    "boom!": "concurrently \"nodemon app.js\" \"npm run start\" \"npm run watch-node-sass\" "
  },
```

Migrate index.html into index.ejs something like the below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <head>
    <meta charset="UTF-8">
    <title>EJS Barclays Live</title>
    <link rel="stylesheet" href="/css/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      input, textarea {
        display: block;
        margin: 1rem;
        width: 70%;
      }
      .entry {
        background: #eee;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Not on the app store!</h1>
    </header>

    <nav id="main">
      <a class="logo" href="#0"><img src="/img/logo.svg" /></a>
      <ul id="nav-links"></ul>
    </nav>

    <div class="site-wrap">
      <% for(var i=0; i<entries.length; i++) { %>
      <div class="entry">
        <h2><%= entries[i].label %></h2>
        <p><%= entries[i].content %></p>
      </div>
      <% } %>

      <form action="/entries" method="POST">
        <input type="text" placeholder="label" name="label">
        <input type="text" placeholder="header" name="header">
        <textarea type="text" placeholder="content" name="content"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
    <script src="/js/navitems.js"></script>
    <script src="/js/main.js"></script>
  </body>
</html>
```

Change the name of index.html to something else.

Enable use.static in app.js, rename /public/index.html (otherwise express will serve it instead of index.ejs), halt nodemon, and run:

`npm run <script>`

Get one entry using parameters:

```js
app.get('/:name?', (req, res) => {
  let name = req.params.name
  db.collection('entries').find({
    "label": name
  }).toArray((err, result) => {
    res.render('index.ejs', {entries: result})
  })
})
```

Try: `http://localhost:3000/watchlist`

Edit main.js to remove onload and remove the hashes form markup:

```
const markup = `${navItems.map(listItem => `<li><a href="${listItem.link}">${listItem.label}</a></li>`).join('')}`;

// window.location.hash = '#watchlist'
```

Now, create your own db on mLab and, using your own connection, make the interface work with your own content.

### Nav - an blunt approach

```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result, nav: ['Watchlist', 'Research', 'Markets']})
  })
})
```

```html
<nav>
  <% for(var i=0; i<nav.length; i++) { %>
  <li>
    <a href="#"><%= nav[i] %></a>
  </li>
  <% } %>
</nav>
```

```js
app.get('/:name?', (req, res) => {
  let name = req.params.name
  db.collection('entries').find({
    "label": name
  }).toArray((err, result) => {
    res.render('index.ejs', {entries: result, nav: ['watchlist', 'research', 'markets']})
  })
})
```


### Notes

https://github.com/expressjs/body-parser#bodyparserurlencodedoptions

http://mongoosejs.com/docs/

Homework

Go to:

`https://api.github.com/users/dannyboynyc`

Your job is to extract your username from your github api and display it on a page using Angular. You need not use Express or npm, a plain html file will do. 

Here's some code that should prove helpful:

```
app.controller("NavController", function( $scope, $http ) {

var onUserComplete = function (response){
  $scope.user = response.data
}
$http.get('https://api.github.com/users/dannyboynyc')
.then( onUserComplete )
```

`<p>{{ user.name }}</p>` 

