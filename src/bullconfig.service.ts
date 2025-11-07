import { Injectable } from "@nestjs/common";


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