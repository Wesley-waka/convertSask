import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigurableModuleClass, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } from "./config-module-definition";


@Module({})
export class ConfigModule extends ConfigurableModuleClass{
    static register(options: typeof OPTIONS_TYPE): DynamicModule{
        return{
           ...super.register(options)
        }
    }

    static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule{
        return {
            ...super.registerAsync(options)
        }
    }
}
