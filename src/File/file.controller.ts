import { createReadStream } from "fs";
import { join } from "path";
import { Controller, Get, Res, StreamableFile } from "@nestjs/common";


@Controller('file')
export class FileController{
    @Get()
    getFile(): StreamableFile{
        const file = createReadStream(join(process.cwd(),'package.json'));
        return new StreamableFile(file,{
            type: 'application/json',
            disposition: 'attachment; filename="package.json"'
        })
    }
}