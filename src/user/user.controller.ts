import { Body, Controller, Get, Inject, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { Roles } from 'src/common/role.decorator';
import { Request } from 'express';
import { UpdateProfileDto } from 'src/common/schemas/user.schema';

@Controller('/user')
export class UserController {
    constructor(
       private userService: UserService,
       @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger 
    ) {}

    @Get('/me')
    @UseGuards(JwtRoleGuard)
    @Roles('user')
    async getMe(@Req() req: Request) {
        return this.userService.getProfile(req)
    }

    @Put('/me')
    @UseGuards(JwtRoleGuard)
    @Roles('user')
    async updateMe(@Req() req: Request, @Body() dto: UpdateProfileDto) {
        const result = await this.userService.updateProfile(req, dto)

        return result
    }
}
