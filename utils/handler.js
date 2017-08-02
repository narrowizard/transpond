var http = require('http');
var querystring = require('querystring');
var url = require('url');

var log = require('./log');

exports.handle = function (req, res) {
    log.info(req.url);
    // 解析url参数
    var urlParse = url.parse(req.url);
    var query = urlParse.query;
    var addr = "";
    var port = "";
    if (urlParse.pathname.indexOf(global.AUTHPATH) > -1) {
        addr = global.REMOTEADDR;
        port = global.REMOTEPORT;
    } else {
        addr = global.LOCALADDR;
        port = global.LOCALPORT;
    }
    var path = urlParse.pathname;
    if (query) {
        path += "?" + query;
    }

    // post param
    var postData = '';

    // remote response
    var responseContent = [];

    // 解析post参数
    req.on('data', function (d) {
        postData += d;
    }).on('end', function () {
        var data = postData;
        var tempHeaders = req.headers;
        tempHeaders["Content-Type"] = 'application/x-www-form-urlencoded';
        tempHeaders["Content-Length"] = Buffer.byteLength(data);
        var options = {
            host: addr,
            path: path,
            method: req.method,
            port: port,
            headers: tempHeaders
        };
        // 转发请求
        var remoteReq = http.request(options, function (remoteRes) {
            remoteRes.on('data', function (d) {
                responseContent.push(d);
            }).on('end', function () {
                var headers = remoteRes.headers;
                res.writeHead(200, headers);
                for (var i = 0; i < responseContent.length; i++) {
                    res.write(responseContent[i]);
                }
                res.end();
            });
        });

        remoteReq.write(data);
        remoteReq.end();
    });

}