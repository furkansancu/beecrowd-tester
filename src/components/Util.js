import fs from 'fs';
const beautify = require('js-beautify/js').js;

const Util = {
    ClearFilesFromError (str, filename = "temp.js") {
        str.split('\n').filter(line => line.indexOf( filename ) == -1).join('\n');
    },

    TidyJS (str) {
        return beautify(str, { "preserve-newlines": false, "eol": ";" });
    },

    PurifyString (str) {
        return str.replace("\n", " \\n ");
    },
}

export default Util;