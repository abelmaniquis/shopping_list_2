var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var Storage = function(){
  this.items = [];
  this.id = 0;
};


Storage.prototype.add = function(name){
  console.log(name);
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};
Storage.prototype.delete = function(name){
  this.id -=1;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
/*
The app object uses the express.static middleware
which tells express to serve any static content
contained in the public folder
*/

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

app.put('/items/:id',function(req,res){
  console.log(storage.items);
  res.json(storage.items);
});

app.delete('/items/:id',function(req,res){
  console.log(req)
});




app.listen(process.env.PORT || 8080);