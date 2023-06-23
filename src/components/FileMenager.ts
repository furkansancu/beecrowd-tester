import * as fs from 'fs';
import * as path from 'path';;

class FileMenagement {
    temp_folder_location = path.join(process.env.localappdata, "\\beecrowd-tester-cli");

    GetTempFileLocation (file_name: string) {
        return path.join(this.temp_folder_location, file_name);
    }

    async ClearTempFolder () {
        const folder_items = await fs.promises.readdir(this.temp_folder_location);

        for (const folder_item in folder_items) {
            await fs.promises.unlink(path.join(this.temp_folder_location, folder_item));
        }
    }

    async ReadFile (file_path: string) {
        return fs.promises.readFile(file_path, 'utf8');
    }

    async AddFile (file_path: string, content: string) {
        return fs.promises.writeFile(file_path, content, {encoding:'utf8',flag:'w'});
    }
}

const FileMenager = new FileMenagement();

export default FileMenager;