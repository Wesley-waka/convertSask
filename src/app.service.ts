import { Injectable } from '@nestjs/common';
import { ProjectService } from './projects/projects.service';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

@Injectable()
export class AppService{
  constructor(private helloService: ProjectService){}

  getHello(): string{
    this.helloService.findAll()
    return 'This action returns all projects';
  }

}