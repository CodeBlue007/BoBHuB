const nodeCache = require("node-cache");

exports.myCache = new nodeCache({ stdTTL: 0, checkperiod: 600 });
