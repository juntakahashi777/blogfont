var sys = require('sys'),
	http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs'),
	express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	monk = require('monk'),
	ObjectId = require('mongodb').ObjectID,
	assert = require('assert'),
	mongo_url = 'mongodb://localhost:27017/test',
	engines = require('consolidate');
var app = express();
var db = monk(mongo_url);

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use("/handlers.js", express.static('handlers.js'));
app.use(function(req, res, next) {
	req.db = db;
	next();
});

MongoClient.connect(mongo_url, function(err, db) {
	assert.equal(null, err);
	console.log('connected to mongodb');
});

app.get('/', function(req, res) {
	filename = 'homepage.html';

	var db = req.db;
	var collection = db.get('test');
	collection.find({},{},function(e,docs){
		res.render(filename, {
			"db_entries": docs
		});
	});
});


app.listen(8000, 'localhost');
console.log('Server running at http://127.0.0.1:8000/');