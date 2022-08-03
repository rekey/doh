const fs = require('fs');
const path = require('path');
const {got} = require('got-cjs');

const gfwFile = path.resolve(__dirname, '../data/gfw.json');

let data = {};

try {
    data = require(gfwFile);
} catch (e) {

}

async function save() {
    const resp = await got('https://raw.githubusercontent.com/rekey/doh/gh-pages/gfw.conf');
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
    data = results;
    fs.writeFileSync(gfwFile, JSON.stringify(data, null, 4));
}

module.exports = {
    save,
};
