const nodeCache = require("node-cache");

exports.myCacheCheckperiod = (checkperiod = 600) => new nodeCache({ stdTTL: 0, checkperiod });
