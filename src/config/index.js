module.exports = {
    // gfw | china-list | global | china
    mode : 'china-list',
    dns  : {
        global : [
            '94.140.14.140',
            '1.1.1.1',
            '1.0.0.1',
            '9.9.9.9',
        ],
        china  : [
            '223.5.5.5',
            '1.12.12.12',
            '120.53.53.53'
        ],
    },
    site : {
        gfw   : 'https://raw.githubusercontent.com/rekey/doh/gh-pages/gfw.conf',
        china : 'https://raw.githubusercontent.com/rekey/doh/gh-pages/china.conf',
    },
    // internal | public
    net : 'internal'
};
