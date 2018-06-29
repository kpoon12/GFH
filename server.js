var socketio = require('socket.io');

var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , path = require('path')
    , io = require('socket.io').listen(server)
    , spawn = require('child_process').spawn;

// all environments
app.set('port', process.env.TEST_PORT || 5000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var port = "5000";
var host = "128.1.3.21";

server.listen(app.get('port'), function () {
    console.log('Server is running on port ' + app.get('port'));
});

console.log('');
console.log('Nodejs Version: ', process.version);
//console.log('     Listening: http://', host, ':', port);
console.log('    Socket.IO : v', socketio.version);
console.log('');