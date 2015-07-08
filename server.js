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
	// db.collection('test').insert(
	// {
	// 	item: "abc"
	// });
	var myCursor = db.collection('test').find({},{item:1}).limit(1);
	console.log(myCursor.objsLeftInBatch());
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

app.listen(8000, 'localhost');
console.log('Server running at http://127.0.0.1:8000/');