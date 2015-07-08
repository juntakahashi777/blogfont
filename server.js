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

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');