import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import FileAccessException from '../exception/FileAccessException';

@Injectable()
export default class FileService {

    read(file: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, content) => {
                if (err) {
                    reject(new FileAccessException(err));
                } else {
                    resolve(content.toString());
                }
            });
        });
    }

}