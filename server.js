'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser());


/*
  I want you to decouple all the function as I did in the app.delete
  I want you to TRY figure out why is our UI not updating when we click on delete (x button)
*/


var Storage = function(){
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {
        name: name,
        id: this.id
    };
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.get = function(req,res){
  res.json(storage.items);
}

Storage.prototype.put = function(req,res){
  storage.items[req.body.id].name = req.body.name;
  console.log(req.body.name);
  console.log(storage.items[req.body.id]);
  res.json(storage.items[req.body.id].name);
};

Storage.prototype.post = function(req, res){
  if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
};


Storage.prototype.delete = function(req, res) {
    console.log(storage.items);
    storage.items.splice(req.params.id,1);
    console.log(storage.items);
    res.status(201).json(storage.items);
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


app.get('/items', storage.get);
app.post('/items', storage.post);
app.put('/items/:id', storage.put);
app.delete('/items/:id', storage.delete);


app.listen(process.env.PORT || 3005);

exports.app = app;
exports.storage = storage;