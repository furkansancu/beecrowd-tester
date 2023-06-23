process.env.FORCE_COLOR = 'true';

import SampleFetcher from "./components/SampleFetcher";
import Languages from "./components/Languages";
import ConsoleMenager from "./components/ConsoleMenager";

const arguements = process.argv.slice(2);

const file_path: string = arguements[0];
const challange_id: number = +arguements[1];
const script_language: string = arguements[2].toLowerCase();

const Selected_Langauge = Languages.Get(script_language);

async function TestScript () {
    const Langauge = new Selected_Langauge();
    await Langauge.Verify();
    const Samples = await SampleFetcher.FetchSamples(challange_id);
    const Result = await Langauge.Run(file_path, Samples);
    if (Result) ConsoleMenager.FinalResult();
}

TestScript();