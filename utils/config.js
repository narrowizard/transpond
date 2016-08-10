var nconf = require('nconf');

exports.loadConfig = function () {
    nconf.file({ file: "webconfig.json" });
    global.PORT = nconf.get("port");
    global.REMOTEADDR = nconf.get("remoteAddress");
    global.REMOTEPATH = nconf.get("remotePath");
    global.REMOTEPORT = nconf.get("remotePort");
    global.DEBUG = nconf.get("mode") == "debug";
    global.PROJECTID = nconf.get("projectId");
}