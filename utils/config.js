var nconf = require('nconf');

exports.loadConfig = function () {
    nconf.file({ file: "webconfig.json" });
    global.PORT = nconf.get("port");
    global.REMOTEADDR = nconf.get("remoteAddress");
    global.REMOTEPORT = nconf.get("remotePort");
    global.LOCALADDR = nconf.get("localAddress");
    global.LOCALPORT = nconf.get("localPort");
    global.AUTHPATH = nconf.get("authPath");
    global.DEBUG = nconf.get("mode") == "debug";
}