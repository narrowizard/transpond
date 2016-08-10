var http = require('http');
var querystring = require('querystring');
var url = require('url');

var log = require('./log');

exports.handle = function (req, res) {

    // 解析url参数
    var query = url.parse(req.url).query;
    var addr = global.REMOTEADDR;
    var path = global.REMOTEPATH;
    var port = global.REMOTEPORT;

    // post param
    var postData = '';

    // remote response
    var responseContent = '';

    // 发送给远程服务器的表单参数
    var newData = {};
    newData.Url = req.url;
    newData.Method = req.method;
    newData.UrlData = query;

    // 解析post参数
    req.on('data', function (d) {
        postData += d;
    }).on('end', function () {
        newData.PostData = postData;

        var data = querystring.stringify(newData);

        var options = {
            host: addr,
            path: path,
            method: "POST",
            port: port,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        // 转发请求
        var remoteReq = http.request(options, function (remoteRes) {
            remoteRes.on('data', function (d) {
                responseContent += d;
            }).on('end', function () {
                res.end(responseContent);
            });
        });

        remoteReq.write(data);
        remoteReq.end();
    });

}