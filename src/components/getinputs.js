const x = require('x-ray')();

const GetInAndOutput = (testid) =>
    new Promise((resolve, reject) => {
        x(`https://www.beecrowd.com.br/repository/UOJ_${testid}_en.html`, {
            ins: ['table tbody td.division p'],
            outs: ['table tbody td:not(.division) p']
        })
        .then(results => {
            results.ins = results.ins.map(x => x.slice(1, -1));
            results.outs = results.outs.map(x => x.slice(1, -1));
            resolve(results);
        })
        .catch(error => {
            reject(error);
        })
    });

export default GetInAndOutput;