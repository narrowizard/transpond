var http = require('http');
var log = require('./log');

exports.handle = function (req, res) {

    var url = req.url;
    var addr = global.REMOTEADDR;
    var path = global.REMOTEPATH;
    var port = global.REMOTEPORT;

    var options = {
        host: addr,
        path: path,
        method: "POST",
        port: port
    };
    // remote response
    var responseContent = '';
    // post param
    var postData = '';

    // 解析post参数
    req.on('data', function (d) {
        postData += d;
    }).on('end', function () {
        log.info(postData);
    });

    // 转发请求
    var remoteReq = http.request(options, function (remoteRes) {
        remoteRes.on('data', function (d) {
            responseContent += d;
        }).on('end', function () {
            res.end(responseContent);
        });
    });


    remoteReq.end();
}