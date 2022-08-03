const fs = require('fs');
const path = require('path');
const {got} = require('got-cjs');

const gfwFile = path.resolve(__dirname, '../data/gfw.json');
const gfwSiteListUrl = 'https://raw.githubusercontent.com/rekey/doh/gh-pages/gfw.conf';
const chinaFile = path.resolve(__dirname, '../data/china.json');
const chinaSiteListUrl = 'https://raw.githubusercontent.com/rekey/doh/gh-pages/china.conf';

let gfwData = {};
try {
    gfwData = require(gfwFile);
} catch (e) {

}
let chinaData = {};
try {
    chinaData = require(chinaFile);
} catch (e) {

}

async function updateList(type) {
    const url = type === 'gfw' ? gfwSiteListUrl : chinaSiteListUrl;
    const resp = await got(url);
    if (resp.statusCode !== 200) {
        return Promise.reject('request error');
    }
    const lines = resp.body.split('\n');
    const results = {};
    lines.forEach((line) => {
        if (line.includes('server')) {
            const domain = line.split('/')[1];
            results[domain] = 1;
        }
    });
    if (type === 'gfw') {
        gfwData = results;
    } else {
        chinaData = results;
    }
    fs.writeFileSync(type === 'gfw' ? gfwFile : chinaFile, JSON.stringify(results, null, 4));
}

module.exports = {
    updateList,
};
