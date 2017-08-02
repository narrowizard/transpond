/**
 * 转发请求
 * @param {*} req request 
 * @param {*} res response
 * @param {*} host host eg: example.com
 * @param {*} port 
 */
exports.transpond = function (req, res, host, port) {
    // post param
    var postData = '';

    // remote response
    var responseContent = [];

    // 解析post参数
    req.on('data', function (d) {
        postData += d;
    }).on('end', function () {
        var data = postData;
        var options = {
            host: host,
            path: req.url,
            method: req.method,
            port: port,
            headers: req.headers
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