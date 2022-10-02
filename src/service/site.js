const fs = require('fs');
const path = require('path');
const {got} = require('got-cjs');

const config = require('../config');
const gfwFile = path.resolve(__dirname, '../data/gfw.json');
const gfwSiteListUrl = config.site.gfw;
const chinaFile = path.resolve(__dirname, '../data/china.json');
const chinaSiteListUrl = config.site.china;

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
