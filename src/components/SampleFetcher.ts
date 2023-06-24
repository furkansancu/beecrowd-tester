import ConsoleMenager from "./ConsoleMenager";
const x = require('x-ray')();

class BeecrowdCrawler {
    async FetchSamples (test_id: number) {
        const fetch_url: string = this.ConstuctUrl(test_id);

        const result: string[][] = await new Promise(resolve => {
            x(fetch_url, {
                ins: ['table tbody td.division p'],
                outs: ['table tbody td:not(.division) p']
            })
            .then((results: { ins: string[], outs: string[] }) => {
                let output: string[][] = [];
                for (let i = 0; i < results.ins.length; i++) output.push([]);
                results.ins.map((value: string, index: number) => { output[index].push(value.slice(1, -1)) });
                results.outs.map((value: string, index: number) => { output[index].push(value.slice(1, -1)) });
                resolve(output);
            })
            .catch((error: any) => {
                ConsoleMenager.Error("Can not fetch test samples from Beecrowd.");
                console.log(error);
            });
        });
        
        if (result.length < 1) ConsoleMenager.Error(
            "Please define a valid challange id.",
            `Challange (Number: ${test_id}) does not exists.`
        );

        return result;
    }

    ConstuctUrl (test_id: number) {
        return `https://www.beecrowd.com.br/repository/UOJ_${test_id}_en.html`;
    }
}

const Crawler = new BeecrowdCrawler();

export default Crawler;