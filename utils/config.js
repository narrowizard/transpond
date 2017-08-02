var nconf = require('nconf');

exports.loadConfig = function () {
    nconf.file({ file: "webconfig.json" });
    global.PORT = nconf.get("port");
    global.DEBUG = nconf.get("mode") == "debug";
}