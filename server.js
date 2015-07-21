var sys = require('sys'),
    http = require('http'),
    path = require('path'),
    url = require('url'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    monk = require('monk'),
    ObjectId = require('mongodb').ObjectID,
    assert = require('assert'),
    mongoUrl = 'mongodb://localhost:27017/entries',
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    consolidate = require('consolidate');
var app = express();
var db = monk(mongoUrl);

app.set('views', __dirname + '/');
app.engine('html', consolidate.mustache);
app.set('view engine', 'html');

app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(bodyParser.urlencoded( {extended: false}));
app.use(passport.initialize());
app.use(passport.session());

MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log('connected to mongodb');
});

passport.use(new GoogleStrategy({
    returnURL: '/auth/google/return',
    realm: '/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));





app.get('/', function(req, res) {
    filename = 'homepage.html';

    var db = req.db;
    var collection = db.get('entries');
    collection.find({},{},function(e,docs){
        res.render(filename, {
            "db_entries": docs
        });
    });
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));

app.get('/login', function(req, res) {
    res.redirect('/');
});


app.get('/newpost', function(req, res) {
    res.render('newpost');
});

app.get('/admin', function(req, res) {
    res.render('adminPage');
});

app.get('/clearall', function(req, res) {
    var db = req.db;
    var collection = db.get('entries');
    collection.remove({});
    res.redirect('/');
});

app.post('/publish', function(req, res) {
    var db = req.db;
    var postBody = req.body.postBody;

    var collection = db.get('entries');
    collection.insert({
        "item": postBody
    }, function (err, doc)
    {
        if (err) {
            res.send("Problem occurred in publishing");
        }
        else {
            res.redirect('/');
        }
    });
});

app.listen(8000, '0.0.0.0');
console.log('Server running at http://127.0.0.1:8000/');