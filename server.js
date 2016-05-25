'use strict';


const Http = require('http');
var client = require('./redis').client;

const internals = {};

// Define routing
internals.handler = function(req, res) {

  internals.getResponse((err, item) => {

    if (err) {
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(item);
    }

  });

};

// Prepare response function
internals.getResponse = function(callback) {

  const key = {
    segment: 'api',
    id: 'a'
  };

  const cacheValue = 'my example';
  const ttl = 30000;

  client.get(key, (err, cached) => {
    if (err) {
      return callback(err);
    } else if (cached) {
      return callback(null, 'From cache: ' + cached.item);
    }

    client.set(key, cacheValue, ttl, (error) => {
      callback(error, cacheValue);
    });

  });

};

internals.startServer = function(err) {
  
  if(err) {
    console.log(err);
    console.log('Could not connect to redis. Ending process.');
    process.exit();
  }
  else {
    const server = Http.createServer(internals.handler);
    server.listen(8080);
    console.log('Server started at http://localhost:8080');

    require('./redis').startClient(function() {
      console.log('Redis ready.');
    });

  }
};

// Start server call.
internals.startServer();
