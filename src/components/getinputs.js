const x = require('x-ray')();

const GetInputs = (testid) =>
    new Promise((resolve, reject) => {
        x(`https://www.beecrowd.com.br/repository/UOJ_${testid}_en.html`, {
            ins: ['table tbody td.division p'],
            outs: ['table tbody td:not(.division) p']
        })
        .then(results => {
            let output = [];
            results.ins = results.ins.map(x => x.slice(1, -1));
            results.outs = results.outs.map(x => x.slice(1, -1));
            for (let i = 0; i < results.ins.length; i++) {
                output.push([results.ins[i], results.outs[i]]);
            }
            resolve(output);
        })
        .catch(error => {
            reject(error);
        })
    });

export default GetInputs;