var colors = require("colors");

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

exports.info = function () {
    if (global.DEBUG) {
        var msg = "";
        for (var i = 0; i < arguments.length; i++) {
            msg += arguments[i] + "\t";
        }
        var fileAndLine = traceCaller(1);
        console.log(fileAndLine + '[Info]'.info + "\t" + (new Date()).toLocaleString() + "\t" + msg);
    }
}

exports.warning = function () {
    if (global.DEBUG) {
        var msg = "";
        for (var i = 0; i < arguments.length; i++) {
            msg += arguments[i] + "\t";
        }
        var fileAndLine = traceCaller(1);
        console.log(fileAndLine + '[Warning]'.warn + "\t" + (new Date()).toLocaleString() + "\t" + msg);
    }
}

exports.error = function () {
    var msg = "";
    for (var i = 0; i < arguments.length; i++) {
        msg += arguments[i] + "\t";
    }
    var fileAndLine = traceCaller(1);
    console.log(fileAndLine + '[Error]'.error + "\t" + (new Date()).toLocaleString() + "\t" + msg);
}

function traceCaller(n) {
    if (isNaN(n) || n < 0) n = 1;
    n += 2;
    var s = (new Error()).stack;
    var b = s;
    while (n--) {
        b = b.substr(b.indexOf("\n") + 1);
    }
    b = b.substr(0, b.indexOf("\n"));
    b = b.substr(b.lastIndexOf(" "));
    b = b.replace(/[()]/g, "");
    return "[File]" + b + "\t";
}