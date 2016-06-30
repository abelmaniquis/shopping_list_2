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

Storage.prototype.put = function(req, res) {

   for (var i = 0; i < storage.items.length; i++) {
       if (req.params.id == storage.items[i].id) {
           storage.items[storage.items.indexOf(storage.items[i])].name = req.body.name;
       }
   }

   res.status(204).json(storage.items);
};



Storage.prototype.post = function(req, res){
  if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item); //means created
};

Storage.prototype.delete = function(req, res) {
    
   var i = res.id
   storage.items.splice(storage.items[i], 1);

   res.status(200).json(storage.items);
   console.log(storage.items.length);
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

//You are treating id as an index, it is not. That is where the problems are coming from.


app.get('/items', storage.get);
app.post('/items', storage.post);
app.put('/items/:id', storage.put);
app.delete('/items/:id', storage.delete);


app.listen(process.env.PORT || 3005);

exports.app = app;
exports.storage = storage;