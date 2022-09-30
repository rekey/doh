const siteSvc = require('./service/site');
const domainSvc = require('./service/domain');

// Promise.all([
//     siteSvc.updateList('gfw'),
//     siteSvc.updateList('china'),
// ]).then(() => {
//     console.log(11111);
// });

console.log(domainSvc.getDnsIP('i0.hdslb.com'));