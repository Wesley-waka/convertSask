import { Injectable } from "@nestjs/common";
import { BullModuleOptions, sharedBullConfigurationFactory } from "@nestjs/bullmq";


@Injectable()
class BullConfigService implements sharedBullConfigurationFactory{
    createSharedConfiguration(): BullModuleOptions{
        return{
            connection: {
                host: 'localhost',
                port: 6379
            }
        }
    }
}