const Koa = require('koa');
const request = require('request');

const domainSvc = require('./service/domain');
const config = require('./config');

const app = new Koa();

app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        ctx.body = {};
        return;
    }
    let dnsIP = '';
    let domain = ctx.query.name;
    if (ctx.path === '/resolve') {
        dnsIP = await domainSvc.getDnsIP(domain);
    } else {
        domain = domainSvc.getDomain(ctx.query.dns);
        dnsIP = await domainSvc.getDnsIP(domain);
    }
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
