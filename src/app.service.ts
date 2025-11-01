import { Injectable } from '@nestjs/common';
import { ProjectService } from './projects/projects.service';
import { ApiConfigService } from './config/config.service';
import { Sequelize } from 'sequelize';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

@Injectable()
export class AppService{
  // constructor(apiConfigService: ApiConfigService){
  //   if(apiConfigService.isAuthEnabled){
      
  //   }
  // }
  constructor(private sequelize: Sequelize){}

}