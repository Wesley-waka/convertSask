import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function Auth(){
    applyDecorators(
        setMetadata('roles',roles),
        UseGuards(AuthGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({description: 'Unauthorized'})
    )
}