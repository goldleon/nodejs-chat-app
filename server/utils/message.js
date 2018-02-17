var generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    }
};

var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        fromURL : `https://google.com/maps?q=${lat},${lng}`,
        genereratedAt : new Date().getTime()
    }
};

module.exports = {generateMessage, generateLocationMessage};