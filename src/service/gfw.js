const {got} = require('got-cjs');

got('https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt')
    .then((resp) => {
        const buffer = Buffer.from(resp.body, 'base64');
        console.log(buffer.toString());
    });