const siteSvc = require('./service/site');

Promise.all([
    siteSvc.updateList('gfw'),
    siteSvc.updateList('china'),
]).then(() => {
    console.log(11111);
});