import { Injectable } from '@nestjs/common';
import { ProjectService } from './projects/projects.service';
import { ApiConfigService } from './config/config.service';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

@Injectable()
export class AppService{
  constructor(apiConfigService: ApiConfigService){
    if(apiConfigService.isAuthEnabled){
      
    }
  }

}