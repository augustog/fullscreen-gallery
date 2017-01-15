/**
 * Created by augusto on 2/12/16.
 */

//Imports
var Flickr = require('flickrapi');
var express = require('express');
var app = express();
var logger = require('morgan'); //
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

require('dotenv').config();

//Configurations

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const USER_ID = process.env.USER_ID;

//Initialise API module


//Connect to API
var flickroptions = {
    api_key: API_KEY,
    api_secret: API_SECRET
};



//App middleware
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json(
    {
        type: 'application/vnd.api+json'
    }
));
app.use(methodOverride());


//Models

//REST API

Flickr.tokenOnly(flickroptions, function (error, flickr){
    if (error)
        console.log(error);

    app.get('/api/albums', function(req, res){
        flickr.photosets.getList(
            {
                user_id: USER_ID,
                per_page: 500,
                page: 1,
                primary_photo_extras: 'url_sq'
            },
            function (error, data){
                console.log(data);
                return res.json(data);
            });
    });
    
    app.get('/api/photos/:album', function(req, res){
        var album = req.params.album != 0 ? req.params.album : 72157644295378789; //TODO: Replace by something more programmatic
        flickr.photosets.getPhotos(
            {
                user_id: USER_ID,
                photoset_id: album,
                privacy_filter: 1,
                media: 'photos',
                per_page: 500,
                page: 1,
                extras: 'url_o'
            },
            function(error, data){
                console.log(data);
                return res.json(data);
            }
        );
    });

});


//Routes
app.get('/', function(req,res){
   res.sendFile('public/index.html', {root: __dirname});
});


app.listen(8080);
console.log('Listening on port 8080');