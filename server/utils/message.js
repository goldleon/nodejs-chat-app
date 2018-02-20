const moment = require("moment");

var generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        fromURL : `https://google.com/maps?q=${lat},${lng}`,
        genereratedAt : moment().valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};