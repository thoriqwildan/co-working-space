import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller('/user')
export class UserController {
    @Get('/error')
    getError() {
        throw new NotFoundException('user not found')
    }
}
