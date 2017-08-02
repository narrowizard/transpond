var http = require('http');
var querystring = require('querystring');
var url = require('url');
var log = require('./log');
var router = require('./router').router;

exports.handle = function (req, res) {
    log.info(req.url);
    router.parse(req.url, [req, res]);
}

