const {Packet} = require('dns2');

async function check(str) {
    try {
        const buffer = Buffer.from(str, 'base64');
        const packet = Packet.parse(buffer);
        const question = packet.questions[0];
        return question.name === 'twitter.com';
    } catch (e) {

    }
    return false;
}

async function getDnsIP(str) {
    const isGFW = await check(str);
    return isGFW ? '1.1.1.1' : '223.5.5.5';
}

module.exports = {
    check,
    getDnsIP,
};
