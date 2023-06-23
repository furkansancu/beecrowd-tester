import ConsoleMenager from "./ConsoleMenager";
const x = require('x-ray')();

class BeecrowdCrawler {
    async FetchSamples (test_id: number) {
        const fetch_url: string = this.ConstuctUrl(test_id);

        return new Promise(resolve => {
            x(fetch_url, {
                ins: ['table tbody td.division p'],
                outs: ['table tbody td:not(.division) p']
            })
            .then(results => {
                results.ins = results.ins.map((x: string) => x.slice(1, -1));
                results.outs = results.outs.map((x: string) => x.slice(1, -1));
                const output = results.ins.map((x: string, i: number) => [x, results.outs[i]]);
                resolve(output);
            })
            .catch(error => {
                ConsoleMenager.Error("Can not fetch test samples from Beecrowd.", error);
            })
        });
    }

    ConstuctUrl (test_id: number) {
        return `https://www.beecrowd.com.br/repository/UOJ_${test_id}_en.html`;
    }
}

const Crawler = new BeecrowdCrawler();

export default Crawler;