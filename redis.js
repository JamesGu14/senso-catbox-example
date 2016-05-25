const Catbox = require('catbox');

const options = {
    host: '127.0.0.1',
    port: '6379',
    password: '',
    partition: 'cue'
  };

var client = new Catbox.Client(require('catbox-redis'), options);

module.exports.client = client;

module.exports.startClient = function(callback) {
  
  client.start(callback);
}


