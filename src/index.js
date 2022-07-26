const Koa = require('koa');
const request = require('request');
const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');

const domainSvc = require('./service/domain');
const siteSvc = require('./service/site');
const config = require('./config');

const logFile = path.resolve(__dirname, 'logs/doh.log');
const app = new Koa();

function log(...args) {
    args.unshift(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    fs.appendFile(logFile, args.join(' ') + '\n', () => {

    });
}

app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        ctx.body = {};
        return;
    }
    let dnsIP = '';
    let domain = ctx.query.name;
    if (ctx.path === '/resolve') {
        dnsIP = domainSvc.getDnsIP(domain);
    } else {
        domain = domainSvc.getDomain(ctx.query.dns);
        dnsIP = domainSvc.getDnsIP(domain);
    }
    log(domain, dnsIP);
    const headers = {};
    if (config.net === 'public') {
        headers['X-Forwarded-For'] = ctx.ip;
    }
    ctx.body = request({
        uri : `https://${dnsIP}${ctx.path}`,
        qs  : ctx.query,
        headers,
    });
});

app.listen(12335);

(async () => {
    let canRun = true;
    while (canRun) {
        try {
            await Promise.all([
                siteSvc.updateList('gfw'),
                siteSvc.updateList('china'),
            ]);
            domainSvc.update();
        } catch (e) {

        }
        await new Promise((resolve) => {
            setTimeout(resolve, 1000 * 60 * 60 * 24);
        });
    }
})();
