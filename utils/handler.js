var http = require('http');
var querystring = require('querystring');
var url = require('url');

var log = require('./log');

exports.handle = function (req, res) {
    log.info(req.url);
    // 解析url参数
    var urlParse = url.parse(req.url);
    var query = urlParse.query;
    var addr = global.REMOTEADDR;
    var path = global.REMOTEPATH;
    var port = global.REMOTEPORT;
    var pid = global.PROJECTID;

    // post param
    var postData = '';

    // remote response
    var responseContent = '';

    // 发送给远程服务器的表单参数
    var newData = {};
    newData.Url = urlParse.pathname;
    newData.Method = req.method;
    newData.UrlData = query;
    newData.ProjectId = pid;

    // 解析post参数
    req.on('data', function (d) {
        postData += d;
    }).on('end', function () {
        newData.PostData = postData;

        var data = querystring.stringify(newData);
        var tempHeaders = req.headers;
        tempHeaders["Content-Type"] = 'application/x-www-form-urlencoded';
        tempHeaders["Content-Length"] = Buffer.byteLength(data);
        var options = {
            host: addr,
            path: path,
            method: "POST",
            port: port,
            headers: tempHeaders
        };

        // 转发请求
        var remoteReq = http.request(options, function (remoteRes) {
            remoteRes.setEncoding('utf-8');
            remoteRes.on('data', function (d) {
                responseContent += d;
            }).on('end', function () {
                var headers = remoteRes.headers;
                headers["Access-Control-Allow-Origin"] = "*";
                res.writeHead(200, headers);
                res.end(responseContent);
            });
        });

        remoteReq.write(data);
        remoteReq.end();
    });

}