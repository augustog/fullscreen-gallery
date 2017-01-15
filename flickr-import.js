/**
 * Created by augusto on 4/12/16.
 */

var mongoose = require('mongoose');
//Initialise API module
var Flickr = require('flickrapi'),
    flickroptions = {
        api_key: '***REMOVED***',
        api_secret: '***REMOVED***'
    };
//Connect to API
var flickr = Flickr.tokenOnly(flickroptions, function flickrCallback(error, flickr){
    if (error)
        console.log('Error: ' + error);
        throw error;
    return flickr;
});

//Connect to DB
mongoose.connect('mongodb://augustog:Mongoose845963@olympia.modulusmongo.net:27017/Ytyp9ere');



