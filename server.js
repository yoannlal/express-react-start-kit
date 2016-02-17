
var browserify = require('browserify-middleware');

var babelify = require("babelify");
var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    mongoose = require('mongoose');

    var sass = require('node-sass-middleware');

    var React = require('react');
    var Router = require('react-router');


var app = express();

app.set('port', (process.env.PORT || 5000));

//===================LOGS=====================

if (app.get('env') == 'production') {
  var accessLogStream = fs.createWriteStream(__dirname + '/log/morgan.log');
  app.use(morgan('combined', { stream: accessLogStream}));
} else {
  app.use(morgan('dev'));
}

//================COOKIES=====================

app.use(cookieParser());

//==============BODY PARSER=====================

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

//===========METHODE OVERRIDE=====================

app.use(methodOverride('X-HTTP-Method-Override'));

//===========MONGO DB=====================

//MONGOLAB_URI: ...

/*const dbURI = '...';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
  console.log(mongoose.connection.readyState);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
*/

//===========SASS IMPLEMENTATION=====================

app.use(
    sass({
        src: __dirname + '/sass', //where the sass files are
        dest: __dirname + '/public', //where css should go
        debug: true
    })
);


//===================API===================

//var API = require('./models/...');

var router = express.Router();

/*router.use(function(req, res, next) {
    // EXEMPLE LOGING SYSTEM
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
*/

//===============ROUTES===================

// Browserify lead the app to the single page js file
// ES6 with Babel

app.get('/app.js', 
        browserify(__dirname + '/client/main.js', {
          transform: [babelify.configure({
            presets: ["es2015", "react"]
          })]
        }
));

//Put static folder
app.use(express.static(__dirname + '/public'));


app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

