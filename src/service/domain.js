const {Packet} = require('dns2');

const config = require('../config');
const gfwData = require('../data/gfw.json');
const chinaData = require('../data/china.json');

const globalIP = '8.8.8.8';
const chinaIP = '223.5.5.5';

function getDomain(str) {
    try {
        const buffer = Buffer.from(str, 'base64');
        const packet = Packet.parse(buffer);
        const question = packet.questions[0];
        return question.name;
    } catch (e) {
        console.error(e);
    }
    return '';
}

function getRootDomain(domain) {
    const arr = domain.split('.');
    if (arr.length < 2) {
        return domain;
    }
    return arr.slice(arr.length - 2).join('.');
}

async function getDnsIP(domain) {
    if (config.mode === 'global') {
        return globalIP;
    }
    if (config.mode === 'china') {
        return chinaIP;
    }
    const root = getRootDomain(domain);
    if (config.mode === 'china-list') {
        if (chinaData[root]) {
            return chinaIP;
        }
        return globalIP;
    }
    if (gfwData[root]) {
        return globalIP;
    }
    return chinaIP;
}

module.exports = {
    getDomain,
    getDnsIP,
};
