var log = require('./log');
var crossroads = require('crossroads');
var transpond = require('./transponder').transpond;

crossroads.ignoreState = true;

function routerHandler(host, port) {
    return function (req, res) {
        transpond(req, res, host, port);
    }
}

crossroads.addRoute("/auth/{children*}", routerHandler("localhost", 8080))

exports.router = crossroads;