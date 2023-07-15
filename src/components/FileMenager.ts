import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

class FileMenagement {
    temp_folder_location = path.join(os.tmpdir(), "\\beecrowd-tester-cli");

    GetTempFileLocation (file_name: string) {
        return path.join(this.temp_folder_location, file_name);
    }

    async InitializeTempFolder () {
        return await fs.promises.mkdir(this.temp_folder_location, { recursive: true });
    }

    async ClearTempFolder () {
        await fs.promises.rm(this.temp_folder_location, { recursive: true, force: true });
        await fs.promises.mkdir(this.temp_folder_location, { recursive: true });
    }

    async ReadFile (file_path: string) {
        return fs.promises.readFile(file_path, 'utf8');
    }

    async AddFile (file_path: string, content: string) {
        return fs.promises.writeFile(file_path, content, {encoding:'utf8',flag:'w'});
    }

    async CheckFile (file_path: string) {
        return fs.promises.access(file_path, fs.constants.R_OK)
        .then(()=>{return true})
        .catch(()=>{return false})
    }
}

const FileMenager = new FileMenagement();

export default FileMenager;