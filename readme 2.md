# III - Responsive Design, ExpressJS and an Introduction to GIT

Today we continue to work with NPM, responsive design and start looking at Expressjs - exploring some of its capabilities.

## Homework

* watch Traversy's [Crash Course on Express](https://youtu.be/gnsO8-xJ8rs) and follow along in your editor
* download the `spr2018-done` branch of this repo, review the steps below, and get the communication between the form and your own account on mLab working
* Optional - do the Git / Github tutorial at [the Git Website](https://try.github.io/levels/1/challenges/1)

## GIT and GITHUB

Since we've created a nice, reusable package.json we should save it for future use.

Git - a version control system originally invented for use developing Linux by Linus Torvalds - integrates with Github to permit collaboration.

There is a very simple tutorial for Git on [the Git Website](https://try.github.io/levels/1/challenges/1) which is highly recommended for those new to git and github.

1. make sure terminal is in the correct directory using `cd` (drag-and-drop, copy paste)
1. initialize the repo:

```sh
git init
```

Configuring Git for the first time (only if you haven't done this before):

```sh
git config --global user.name " ***** "
git config --global user.email " ***** "
git config --list
```

* Add (watch) all your files:

```sh
git add .
```

Perform an initial commit. (Once you have made changes you will need to add and commit them again.)

```sh
git commit -m 'initial commit'
```

Note: `git commit` without the `-m` flag goes into VI - a text popular UNIX text editor.

To avoid this always using the -m flag when committing. (If you end up in VI, hit ESC and type “:q” to exit.)

* Git Status  - use this command liberally until your familiar with the system.

```sh
$ git status
> On branch master
> nothing to commit, working directory clean
```

* Create and checkout a new branch:

```sh
git branch <new branchname>
git checkout <new branchname>
git branch
```

* merge branches:

* make sure the branch you want to merge is clear (`$ git status` > clean)
* checkout the branch you want to merge into
* run status on that branch too (make sure it is clear)

```sh
git checkout master
git status
git merge <new branchname>
```

* delete branches:

```sh
git branch -d <branchname>
```

or (to delete an unmerged branch)

```sh
git branch -D <branchname>
```

Note: be sure to delete while _not_ on the targeted branch

* pushing files to remote repos - Github

Note: always create a .gitignore file to prevent local working/utility files from being pushed e.g.:

```js
.DS_store
node_modules
```

* Log into Github, create and new repo and follow the instructions e.g.:

```sh
git remote add origin https://github.com/<nameofgithubrepo>
git push -u origin master
```

Finally - when downloading a github repo use the `clone` method to move it to your local disk while retaining the git history and branches.

## Babel

* cd into the session directory install the dev-dependencies and run the script:

```sh
npm install
```

Install the dependencies babel-cli and babel-preset-es2015 and add presets to package.json.

`$ npm install babel-cli --save-dev`

`$ npm install --save-dev babel-preset-es2015`

Note the documentation for [babel-cli](https://babeljs.io/docs/usage/cli/) and the message:

`🙌 Thanks for using Babel: we recommend using babel-preset-env now: please read babeljs.io/env to update!`

Add a babel script (note the output path references a min folder we need to create) and babel presets to package.json:

```js
{
  ...
  "scripts": {
    ...
    "babel": "babel app/js/main.js --watch --source-maps --out-file app/js/main-compiled.js",
    ...
  },

  "devDependencies": {
    "babel-cli": "^6.22.2",
    "babel-preset-es2015": "^6.22.0",

  },
  "babel": {
    "presets": [
      "es2015"
    ]
  }
}
```

Add babel to our script:

```bash
"boom!": "concurrently \"npm run start\" \"npm run babel\" "
```

Don't forget to change the link to the main.js in index.html to point to the new file.

`<script src="js/main-compiled.js"></script>`

and run `npm run boom!`.

Remember, you can pick and choose commands or create new batches using concurrently. For users using VS Code for SASS transpiling and browser refresh:  `npm run babel` or 

`"boomy!": "concurrently \"npm run start\" \"npm run babel\" "`

## Hashes - Solved

```js
// hashes
const siteWrap = document.querySelector('.site-wrap');

window.onload = function(){
  let newContent;
  if(!window.location.hash){
    newContent = navItems.filter(
      navItem => navItem.link == '#watchlist'
    )
  } else {
    newContent = navItems.filter(
      navItem => navItem.link == window.location.hash
    )
  }
  renderPage(newContent)
}

window.onhashchange = function() {
  let newloc = window.location.hash;
  let newContent = navItems.filter(
    navItem => navItem.link == newloc
  )
  renderPage(newContent);
  window.scrollTo(0,0);
}

function renderPage(newContent){
  siteWrap.innerHTML = `
  <h2>${newContent[0].header}</h2>
  ${newContent[0].content}
  `
}
```

## Responsive Navigation - continued

* Reminder - use the meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to ensure responsive design works on devices.

Nest and refactor the CSS rules for the nav:

```css
nav {
    background: #007eb6;
    width: 100%;
    transition: all 0.5s;
    .fixed-nav & {
        position: fixed;
        top: 0;
        box-shadow: 0 5px 3px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }
    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5rem;
    }
    li {
        flex: 1;
        text-align: center;
    }
    a {
        text-decoration: none;
        display: inline-block;
        color: white;
    }
}

.logo {
    max-width: 0;
    overflow: hidden;
    background: white;
    img {
        padding-top: 0.25rem;
        width: 2.5rem;
    }
}
```

We are using the logo as a hamburger.

Display the logo on small screens while hiding it on large:

```css
.logo {
    background: white;
    display: block;
    @media(min-width: $break-two){
        display: none;
    }
    img {
        padding-top: 0.25rem;
        width: 2.5rem;
    }
}
```

Get the navigation to display vertically on small screens.

Hide the nav-links initially on small screens while maintaining the flex display characteristics on wide:

```css
ul {
    display: none;
    height: 2.5rem;
    list-style: none;
    @media(min-width: $break-two){
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
```

Make clicking on the logo show the menu on narrow screens:

```js
const logo = document.querySelector('.logo');
logo.addEventListener('click', showMenu);

function showMenu() {
  document.body.classList.toggle('showmenu');
  event.preventDefault();
}
```

Use the class to make the nav visible:

```css
.showmenu #nav-links {
    display: flex;
    flex-direction: column;
}
```

Adjust the formatting of the list items:

```css
li {
    background: #007eb6;
    flex: 1;
    padding: 0.5rem;
    @media(min-width: $break-two){
      text-align: center;
    }
}
```

Final `_nav.scss` partial:

```css
nav {
    background: #007eb6;
    width: 100%;
    transition: all 0.5s;
    position: relative;
    z-index: 1;
    .fixed-nav & {
        position: fixed;
        top: 0;
        box-shadow: 0 5px 3px rgba(0, 0, 0, 0.2);
        width: 100%;
    }
    ul {
        display: none;
        height: 2.5rem;
        list-style: none;
        @media(min-width: $break-two){
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    li {
        background: $link;
        flex: 1;
        padding: 0.5rem;
        @media(min-width: $break-two){
        text-align: center;
        }
    }
    a {
        text-decoration: none;
        display: inline-block;
        color: white;
    }
}

.logo {
    background: white;
    display: block;
    @media(min-width: $break-two){
        display: none;
    }
    img {
        padding-top: 0.25rem;
        width: 2.5rem;
    }
}

.showmenu #nav-links {
    display: flex;
    flex-direction: column;
}
  body.fixed-nav .site-wrap {
    transform: scale(1);
  }
```

You should consider making the menu disappear on small screen after a selection has been made using a conditional in the hashchange script:

```js
if (window.innerWidth <= 740) {
  showMenu();
}
```

## NODE and Express JS

### NODE

A simple node.js [server](https://nodejs.org/en/about/).

Note the use of ES6 const, template strings and arrow functions as well as the request and response variables.

DEMO: Save this as app.js in the project folder and run it using `node script.js`

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Express

The local server we are using (browser sync or live server) won't cut it when it comes to all the features needed to develop a website with the http services we will need.

Express is a framework for building web applications on Node.js. It simplifies the server creation process that is already available in Node and allows you to use JavaScript as your server-side language.

Aside: Here is the [generator](https://expressjs.com/en/starter/generator.html). 

Note the directory structure and the use of [Pug](https://pugjs.org/api/getting-started.html) as the default templating tool.

Let's look at the canonical "Hello world" [example](https://expressjs.com/en/starter/hello-world.html).

Install express using npm `$ npm install --save express`

Edit `app.js` in the root folder of our project.

```js
const express = require('express');
// require the npm library
const app = express();
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const port = 9000;

app.get('/', (req, res) => res.send('Hello World!')); // our first route

app.get('/watchlist', function(req, res) {  // our second route
  res.send(`
    <h1>Watchlist</h1>
    <p>Commentary on Watchlists will go here.</p>
    `);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
```

Run with `$ node app.js`

Note and test the `watchlist` route above.

Note that console.log is now using the terminal, _not_ the browser's console.

Note the [get](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) verb used in our [basic express route](https://expressjs.com/en/starter/basic-routing.html).

Common web-development tasks are not directly supported by Node. If you want to add specific handling for different HTTP verbs (e.g. GET, POST, DELETE, etc.), separately handle requests at different URL paths ("routes"), serve static files, or use templates to dynamically create the response, you will need to write the code yourself. Or simply use ExpressJS.

Add a second route that includes a variable:

```js
app.get('/entry/:name', function(req, res) {
  let name = req.params.name;
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    `);
});
```

Test in the browser after restarting the node process.: `http://localhost:9000/entry/watchlist`.

Multiple parameters:

```js
app.get('/entry/:name?/:link', function(req, res) {
  let name = req.params.name;
  let link = `${req.params.link}`;
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${link}</p>
    `);
});
```

Test in the browser after restarting the node app: `http://localhost:9000/entry/watchlist/test`.

## Nodemon

We need to restart the server whenever we make a change to app.js. Let’s streamline it by using nodemon.

`$ npm install -save-dev nodemon`

To use nodemon we simply call it (instead of node) in the terminal with the name of our file:

`nodemon app.js`

We no longer need to restart our server after making changes. Nodemon will watch for changes and take care of that for us.

## Test Nodemon

Add this after the last route:

```js
app.get('*', function(req, res){
  res.send(`
    <h1>Page not found</h1>
    `)
})
```

Upon save nodemon should restart the server.

## Express Middleware

[Middleware](http://expressjs.com/en/resources/middleware.html) is used extensively in Express apps in order to simplify common web development tasks like working with cookies, sessions, user authentication, accessing request POST and JSON data, logging, etc.

DEMO: We will eventually be using [static](https://expressjs.com/en/starter/static-files.html) middleware (the only middleware _built in_ to Express) to serve files in our exercise.

Add to app.js (above the app.get... line):

```js
app.use(express.static('app'));
```

Comment out `app.use(express.static('app'))` - we'll make use of this later.

## CRUD

CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (using the http verbs POST, GET, PUT and DELETE respectively). This is what [each operation does](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods):

* Read (GET) - Retrieve something, requests a representation of the specified resource
* Create (POST) - Make something, a message for a bulletin board, newsgroup, mailing list, or comment thread; a block of data that is the result of submitting a web form to a data-handling process
* Update (PUT) - Alter an existing item, if the URL refers to an already existing resource, it is modified; if not, then the server can create the resource with that URL
* Delete (DELETE)- deletes the specified resource.

As we have seen, in Express, we handle a GET request with the get method:

`app.get('/', (req, res) => res.send('Hello World!'))`

The first argument, `/,` is the path of the GET request (anything that comes after your domain name). For localhost:3000, the browser is actually looking for localhost:3000/. The path argument in this case is /.

The second argument `(req, res) => res.send('Hello World!')` is a callback function that tells the server what to do when the path is matched. It takes two arguments, a request object and a response object (req, res).

Let’s use the res object to serve an index.html page back to the browser.

sendFile is a method that’s provided by the res object:

```js
app.get('/', (req, res) => {
  // console.log(__dirname)
  res.sendFile(__dirname + '/index.html');
});
```

`__dirname` is a global variable for the directory that contains the app.js.

Create index.html in the top level:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test</title>
</head>
<body>
  <p>Testing 1 2 3</p>
</body>
</html>
```

You should be able to see the HTML file in the browser at the specified port number.

## CRUD - CREATE

The CREATE operation is performed only by the browser if a POST request is sent to the server. This POST request can triggered either with JavaScript or through a `<form>` element.

Add the following to index.html

```html
<form action="/entries" method="POST">
  <input type="text" placeholder="label" name="label">
  <input type="text" placeholder="header" name="header">
  <textarea type="text" placeholder="content" name="content"></textarea>
  <button type="submit">Submit</button>
</form>
```

```html
<style>
  input, textarea {
    display: block;
    margin: 1rem;
    width: 70%;
  }
</style>
```

Our form requires:

1. an action attribute
2. a method attribute
3. and name attributes on all `<input>` elements within the form

The action attribute tells the browser where to navigate to in our Express app.

The method attribute tells the browser what to request to send. In this case, it’s a POST request.

On our server, we can handle this POST request with a post method that Express provides. It takes the same arguments as the GET method:

```js
app.post('/entries', (req, res) => {
  console.log('Hello');
});
```

Refresh your browser then click the form button. You should see 'Hello' in your command line.

Express doesn’t handle reading data from the `<form>` element on it’s own. We have to add a middleware package called body-parser to gain this functionality.

`$ npm install body-parser --save`

Make the following changes to app.js:

```js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;
app.use(bodyParser.urlencoded({ extended: true }));
```

The urlencoded method within body-parser tells body-parser to extract data from the `<form>` element and add them to the body property in the request object.

Now, when you test your form, you should be able to see everything in the form field within the req.body object. Try doing a console.log:

```js
app.post('/entries', (req, res) => {
  console.log(req.body);
});
```

The object `{ label: '1', header: '2', content: '3' }` is packaged by the body parser and sent to the server as part of the request body.

## MongoDB

Express apps can use any database mechanism supported by Node including PostgreSQL, MySQL, Redis, SQLite, MongoDB, etc.

We first have to install the driver for the popular NoSQL MongoDB through npm if we want to use it as our database.

`$ npm install mongodb@2.2.5 --save`

Once installed, we can connect to MongoDB through the Mongo.Client‘s connect method as shown in the sample code below:

```js
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) throw err;

  db
    .collection('mammals')
    .find()
    .toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
    });
});
```

Let's start with:

```js
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
});
```

The next part is to get the correct link to our database. For our first attempt we'll use a cloud service - [MongoLab](https://mlab.com).

Create a free account with MongoLab. Once you’re done, create a new MongoDB database and set the plan to sandbox (free) and call it bcl.

Once you’re done creating the deployment, click into it and create a database user and database password.

![user](https://github.com/mean-spring-2017/session-3/blob/master/notes/mlab-user.png)
![user](https://github.com/mean-spring-2017/session-3/blob/master/notes/mlab-user2.jpg)

Remember these because you’re going to use it to connect the database you’ve just created.

Finally, grab the MongoDB url and add it to your MongoClient.connect method. Make sure you use your database user and password!

`MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {...}`

We want to start our servers only when the database is connected so let’s move app.listen into the connect method. We’re also going to create a db variable to allow us to use the database when we handle requests from the browser.

```js
MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});
```

Start the server using `nodemon app.js` and check for any errors.

Now, let’s create a collection - a named location to store data - to store content for our application.

We can create the collection by using the string `entries` while calling MongoDB’s db.collection() method. Since a collection is created if it doesn't already exist we can save our first entry into the database while using the `save` method.

Also, once we’re done saving, we have to redirect the user somewhere (or they’ll be stuck waiting for our server to go the `/entries` which doesn't exist except as a post route).

In this case, we’re going to redirect them back to `/`:

```js
app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
```

Now enter something into the `<form>` element and you’ll be able to see an entry in your MongoDB collection.

### Showing entries to users

We have to do two things to show the entries stored in MongoLab to our users.

1. Get entries from MongoLab
2. Use a some form of dynamic html (a template engine) to display the entries

We can get the entries from MongoLab by using the find method available in the collection method:

```js
app.get('/', (req, res) => {
  var cursor = db.collection('entries').find();
  console.log(cursor);
  res.sendFile(__dirname + '/index.html');
});
```

The find method returns a cursor (A Mongo Object) that probably doesn’t make much sense when you `console.log` it out.

This cursor object contains all entries from our database. It also contains a bunch of other properties and methods that allow us to work with data easily. One such method is the `toArray` method.

The `toArray` method takes in a callback function that allows us to do stuff with entries we retrieved from MongoLab. Let’s try doing a console.log() for the results and see what we get:

```js
app.get('/', (req, res) => {
  db
    .collection('entries')
    .find()
    .toArray((err, results) => {
      console.log(results);
      res.sendFile(__dirname + '/index.html');
    });
});
```

Refresh the page and see an array of entries in the terminal.

Let's generate HTML that displays all our entries.

## Template Engines

[Template engines](http://expressjs.com/en/guide/using-template-engines.html)

We can’t serve our index.html file and expect entries to magically appear because there’s no way to add dynamic content to a plain HTML file. What we can do instead, is to use template engines to help us out. Some popular template engines include jade/pug, Embedded JavaScript and Nunjucks.

For today, we’re going to use Embedded JavaScript (ejs) as our template engine because it’s easy to start with.

We can use EJS by first installing it, then setting the view engine in Express to ejs.

`$ npm install ejs --save`

and in app.js:

`app.set('view engine', 'ejs')`

Let’s first create an index.ejs file within a views folder so we can start populating data.

```sh
mkdir views
touch views/index.ejs
```

Now, copy the contents of index.html into index.ejs and add.

```html
<div>
  <% for(let i=0; i<entries.length; i++) { %>
    <h2><%= entries[i].label %></h2>
    <p><%= entries[i].content %></p>
  <% } %>
</div>
```

In EJS, you can write JavaScript within `<%` and `%>` tags.

You can also output JavaScript as strings if you use the `<%=` and `%>` tags.

Here, you can see that we’re basically looping through the entries array and creating strings with `entries[i].label` and `entries[i].content`.

The complete `index.ejs` file so far should be something like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
  <style>
    input, textarea {
      display: block;
      margin: 1rem;
      width: 70%;
    }
  </style>
</head>
<body>

  <form action="/entries" method="POST">
    <input type="text" placeholder="label" name="label">
    <input type="text" placeholder="header" name="header">
    <textarea type="text" placeholder="content" name="content"></textarea>
    <button type="submit">Submit</button>
  </form>

  <div>
    <% for(var i=0; i<entries.length; i++) { %>
    <h2><%= entries[i].label %></h2>
    <p><%= entries[i].content %></p>
    <% } %>
  </div>

</body>
</html>
```

Finally, we have to render `index.ejs` when handling the GET request.

Here, we’re setting the results (an array) as the entries array we used in `index.ejs` above.

```js
app.get('/', (req, res) => {
  db
    .collection('entries')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      res.render('index.ejs', { entries: result });
    });
});
```

Now, refresh your browser and you should be able to see all entries.

## Notes

### Integration with the old site

Copy the old `app/index.html` into `index.ejs` and re-enable the `app.use(express.static('app'));` middleware.

Edit our package.json to proxy the browser sync to our express port number and add nodemon to our list of currently running scripts:

```js
 "scripts": {
    "sassy": "node-sass --watch \"scss/styles.scss\"  --output \"app/css/\" --source-map true",
    "start": "browser-sync start --proxy 'localhost:9000' --server \"app\" --files \"app\"",
    "babel": "babel app/js/main.js --watch --source-maps --out-file app/js/main-compiled.js",
    "boom!": "concurrently \"nodemon app.js\" \"npm run start\" \"npm run sassy\" \"babel\" "
    "boom-no-sass!": "concurrently \"nodemon app.js\" \"npm run start\" \"babel\" "
  },
```

You will have to comment out the onload function in order to see index.ejs:

```js
// window.onload = function () {
//   window.location.hash = '#watchlist'
// }
```

### Server Accounts

Username is the first seven letters of your last name + first letter of first name

Hostname is oit2.scps.nyu.edu

Password is first initial, last initial, 123890

e.g. devereld // dd123890

Test to see if your account is active by entering this URL into a new browser tab (use your username after the tilde):

`http://oit2.scps.nyu.edu/~******`

Ensure you are using sFTP (port 22).

Suggested clients: Cyberduck, FileZilla
