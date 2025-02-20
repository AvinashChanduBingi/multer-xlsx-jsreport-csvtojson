const crypto = require("crypto");

const hash = crypto.createHash("sha256");

hash.update("rajurani");

console.log(hash.digest('hex'));