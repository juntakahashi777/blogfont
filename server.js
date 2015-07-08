<<<<<<< HEAD
var http = require('http'),
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    assert = require('assert'),
    url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('connected to mongodb');
    db.collection('test').insert(
    {
        item: "abc"
    });
    db.close();
});

http.createServer(function (req, res) {
    filename = './homepage.html'
    fs.readFile(filename, 'binary', function(err, file) {
        if (err)
        {
            res.writeHead(500);
            res.write(err + '\n');
            res.end();
            return;
        }
        res.writeHead(200);
        res.write(file, 'binary');
        res.end();
    });
=======
var sys = require('sys'),
	http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs'),
	express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID,
	assert = require('assert'),
	mongo_url = 'mongodb://localhost:27017/test';
var app = express();
app.use("/handlers.js", express.static('handlers.js'));

MongoClient.connect(mongo_url, function(err, db) {
	assert.equal(null, err);
	console.log('connected to mongodb');
	db.collection('test').insert(
	{
		item: "abc"
	});
	db.close();
});

app.get('/', function(req, res) {
	filename = 'homepage.html';

	fs.readFile(filename, 'binary', function(err, file) {
		if (err)
		{
			res.writeHead(500);
			res.write(err + '\n');
			res.end();
			return;
		}
		res.writeHead(200);
		res.write(file, 'binary');
		res.end();
	});
});
>>>>>>> 1871a1db68f0d5e8a906e67e0c33b9e985e3a3bd

app.listen(8000, 'localhost');
console.log('Server running at http://127.0.0.1:8000/');