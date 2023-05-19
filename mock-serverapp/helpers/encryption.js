const { hashSync, compareSync } = require("bcryptjs");

const encryption = {
  encrypt(palinText) {
    try {
      return hashSync(palinText);
    } catch (err) {
      console.log(err);
    }
    return null;
  },
  compare(palinText, ciperText) {
    try {
      return compareSync(palinText, ciperText);
    } catch (err) {
      consolr.log(err);
    }
    return null;
  },
};

module.exports = encryption;
