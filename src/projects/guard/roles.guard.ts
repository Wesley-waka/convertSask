import { ExecutionContext, Injectable } from "@nestjs/common";
import {  Reflector } from "@nestjs/core";
import { Roles } from "../decorator/roles.decorator";

@Injectable()
export class RolesGuard {
    constructor(context: ExecutionContext,private reflector: Reflector){
        // const roles = this.reflector.get(Roles,context.getHandler())
        // const roles = this.reflector.getAllAndOverride(Roles,[context.getHandler(),context.getClass()]);
        const roles = this.reflector.getAllAndMerge(Roles,[context.getHandler(),context.getClass()]);
    }
}