GOALS:

Understand the basics of CRUD and REST.
Create a RESTful endpoint using Node's HTTP module
and POST it using Postman.

---------------------------------------------------------------------
REST and CRUD:

REST: A set of principles for designing APIs.
REST constrains your API to only communicate the state of resources.


CRUD(Create, Read, Update, Delete):

The REST pattern also constrains your URL design to make sure you
only deal with resources.

It is better to use noun centric URLs
----------------------------------------------------------------
npm init

install body, express, parser

---------------------------------------------------------------------
GETting a list of Items:

You will build the functionality that allows users to view the
items in your shopping list.

1.Come up with URL:
  
  /items
  
  This URL is noun centric and easily understandable.
  
  First endpoint will be for the HTTP GET method. By specifying
  that the HTTP method must be GET, it will be clear to your API
  users that this endpoint retrieves the item list
  
  HTTP request line should look like:
  
  GET/items
  


2. The following code should be in your server.js file:

var express = require('express');

/*
This stores and managages the list of items:
*/
var Storage = function(){
  this.items = [];
  this.id = 0;
};

Storage.prototype.add = function(name){
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

/*
The app object uses the express.static middleware
which tells express to serve any static content
contained in the public folder.
*/

var app = express();
app.use(express.static('public'));

app.get('/items',function(req,res){
  res.json(storage.items);
});

app.listen(process.env.PORT || 8080);

run this and add /items to the URL


--------------------------------------------------------
POSTing new shopping items.

The last section made an endpoint to retrieve items. Now you create
an endpoint to add items.


To create items, the verb POST is used in REST.

This is what our HTTP request line looks like:

POST/items

Along with the request line, an HTTP message includes 
headers and a body. The body is the standard place to 
put info that gets transmitted to the server.

Items in the list are formatted using JSON

Sample Request:

  POST /items HTTP/1.1
  Content-Type: application/JSON
  {"name": "Durian"}

Note how the request includes the header explaining how 
the data in body is encoded, and it includes the body itself 
after an empty line.

You need a way to access the body of the post request.
body-parser gathers the body data as it is streamed 
from the client, and then parses it according to its data type.
------------------------------------------------------------------
Your code should now look like this:

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
/*
This stores and manages the list of items:
*/
var Storage = function(){
  this.items = [];
  this.id = 0;
};

Storage.prototype.add = function(name){
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

/*
The app object uses the express.static middleware
which tells express to serve any static content
contained in the public folder.
*/

var app = express();
app.use(express.static('public'));

app.get('/items',function(req,res){
  res.json(storage.items);
});

app.post('/items',jsonParser,function(req,res){
  if(!req.body){
    return res.sendStatus(400);
  }
  
  var item = storage.add(req.body.name);
  res.status(201).json(item);
});

app.listen(process.env.PORT || 8080);


Notice how the second argument to the post method is jsonParser.
    
    -tells express to use the jsonParser middleware when requests
     for the route are made.
    -Middleware adds a new attribute, req.body, to the request object.
    -If there is no body, or if it is not correctly formatted JSON, ypu use
      req.body.name to indicate a 400 bad request.
    -If the body exists, then you simply add the item to the shopping list
     and return a 201 status, along with the item.
     
When you run the app, you should see that you can append items to the list.
----------------------------------------------------------------------------------------
PUTing and DELETEing items:
     
You need a way to delete the items from the 
list when you have successfully picked them
up from the store

create a DELETE endpoint





# shopping_list_2
# shopping_list_2
