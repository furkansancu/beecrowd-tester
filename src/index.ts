#!/usr/bin/env node

import SampleFetcher from "./components/SampleFetcher";
import Languages from "./components/Languages";
import ConsoleMenager from "./components/ConsoleMenager";
import FileMenager from "./components/FileMenager";
import Util from "./components/Util";

async function TestScript () {
    const arguements = process.argv.slice(2);

    await Util.CheckInputs(arguements.slice(0, 3));

    const file_path: string = arguements[0];
    const challange_id: number = +arguements[1];
    const script_language: string = arguements[2].toLowerCase();

    const Selected_Langauge = Languages.Get(script_language);

    await FileMenager.InitializeTempFolder();

    const Langauge = new Selected_Langauge();
    await Langauge.Verify();

    const Samples = await SampleFetcher.FetchSamples(challange_id);
    const Result = await Langauge.Run(file_path, Samples);
    
    ConsoleMenager.FinalResult(Result);
    
    await FileMenager.ClearTempFolder();
}

TestScript();