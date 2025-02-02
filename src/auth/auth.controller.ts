import { Body, Controller, Delete, Get, Inject, Post, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResetPasswordDto, UserLoginDto, UserRegisterDto } from "src/common/schemas/user.schema";
import { Request, Response } from "express";
import { JwtRoleGuard } from "src/common/guards/jwtrole.guard";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Roles } from "src/common/role.decorator";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService, @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

    @Post('/register')
    register(@Body() dto: UserRegisterDto) {
        return this.authService.register(dto)
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto, @Res() res: Response) {
        const result = await this.authService.login(dto)
        res.cookie('access_token', result, {
            maxAge: 1000 * 60 * 60 * 24
        })

        return res.json({"message": "Login Successfully"})
    }

    @Delete('/logout')
    async logout(@Res({passthrough: true}) res: Response) {
        res.clearCookie('access_token')
        return {custommsg: "Logout Successfully"}
    }

    // @Get('/test') 
    // async test() {
    //     return {
    //         custommsg: 'coba',
    //         data: 'ini data coba'
    //     }
    // }

    @Post('/reset-password')
    @UseGuards(JwtRoleGuard)
    @Roles('user')
    async resetpassword(@Req() req: Request, @Body() dto: ResetPasswordDto) {
        const result = await this.authService.resetpassword(req, dto)
        return { "message": result }
    }
}