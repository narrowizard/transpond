var http = require('http');
var log = require('./utils/log');

http.createServer(function (req, res) {
    var url = req.url;
    
}).listen(8257);

log.info('server running at 8257');