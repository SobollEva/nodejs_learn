const debug = require('debug')('app:error-hendler');

module.exports = function (req: any, resp: any) {
    debug(req.method + ' ' + req.url);
};
