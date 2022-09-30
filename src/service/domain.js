const {Packet} = require('dns2');

const config = require('../config');
let gfwData = require('../data/gfw.json');
let chinaData = require('../data/china.json');

const dnsApi = config.dns;

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

function getLast(domain) {
    const arr = domain.split('.');
    return arr[arr.length - 1];
}

function getDnsIP(domain) {
    if (config.mode === 'global') {
        return dnsApi.global;
    }
    if (config.mode === 'china') {
        return dnsApi.china;
    }
    if (getLast(domain) === 'cn') {
        return dnsApi.china;
    }
    const root = getRootDomain(domain);
    if (root === 'com.cn') {
        return dnsApi.china;
    }
    if (config.mode === 'china-list') {
        if (chinaData[root]) {
            return dnsApi.china;
        }
        return dnsApi.global;
    }
    if (gfwData[root]) {
        return dnsApi.global;
    }
    return dnsApi.china;
}

module.exports = {
    getDomain,
    getDnsIP(domain) {
        const ips = getDnsIP(domain);
        return ips[Math.floor(Math.random() * ips.length)];
    },
    update() {
        gfwData = require('../data/gfw.json');
        chinaData = require('../data/china.json');
    }
};
