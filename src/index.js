const Koa = require('koa');
const {got} = require('got-cjs');

const domainSvc = require('./service/domain');

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
    console.log(domain, dnsIP);
    const headers = Object.assign({}, ctx.headers);
    // 反向代理给ip或者域名header的host都有可能导致结果不符合预期
    delete headers.host;
    ctx.body = got(`https://${dnsIP}${ctx.path}`, {
        headers,
        method       : ctx.method,
        searchParams : ctx.query,
        isStream     : true,
    });
});

app.listen(12335);
