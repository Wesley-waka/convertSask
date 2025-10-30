import { Inject, Injectable } from "@nestjs/common";
import path from "path";
import fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigModule } from "@nestjs/config";


interface EnvConfig{
    [key: string]: string;
};

@Injectable()
export class ConfigService{
    private readonly envConfig: EnvConfig;

    constructor(@Inject('MODULE_OPTIONS_TOKEN') private options: Record<string,any>){
        const filePath = `${process.env.NODE_ENV || 'development'}.env`;
        const envFile = path.resolve(__dirname,'../../',options.folder,filePath);
        this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    }

    get(key: string): string{
        return this.envConfig[key];
    }
}

@Injectable()
export class ApiConfigService{
    constructor(private configService: ConfigService){}

    get isAuthEnabled(): boolean{
        return this.configService.get('AUTH_ENABLED') === 'true';
    }
}

// export async function getStorageModule(){
//     await ConfigModule.envVariablesLoaded;
//     return process.env.STORAGE === 'S3' ? S3StorageModule : DefaultStorageModule;
// }