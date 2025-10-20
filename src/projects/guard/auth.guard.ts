import {Injectable,CanActivate,ExecutionContext} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>{
        // const request = context.switchToHttp().getRequest();
        // return validateRequest(request);
        return true;
    }
}
// export class RolesGuard implements CanActivate{
//     constructor(private reflector: Reflector){}

//     canActivate(context: ExecutionContext): boolean{
//         const roles = this.reflector.get(Roles,context.getHandler());
//         if(!roles){
//             return true;
//         }

//         const request= context.switchToHttp().getRequest();
//         const user = request.user;
//         return matchRoles(roles,user.roles)

//     }
// }