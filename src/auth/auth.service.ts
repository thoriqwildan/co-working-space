import { HttpException, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/common/prisma/prisma.service";
import { ResetPasswordDto, ResetPasswordSchema, UserLoginDto, UserLoginSchema, UserRegisterDto, UserRegisterSchema } from "src/common/schemas/user.schema";
import * as bcrypt from 'bcrypt'
import { ValidationService } from "src/common/validation.service";
import { Request } from "express";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    async register(dto: UserRegisterDto) {  
        const registerReq = this.validationService.validate(UserRegisterSchema, dto)

        const sameEmail = await this.prismaService.user.count({
            where: { email: registerReq.email }
        })
        if (sameEmail > 0) { throw new HttpException('Email already registered', 400) }
        registerReq.password = await bcrypt.hash(registerReq.password, 10)

        const data = await this.prismaService.user.create({
            data: {
                name: registerReq.name,
                email: registerReq.email,
                phone_number: registerReq.phone_number,
                password: registerReq.password
            }
        })

        return data
    }

    async login(dto: UserLoginDto) {
        const loginReq = this.validationService.validate(UserLoginSchema, dto)
        const user = await this.prismaService.user.findUnique({ where: { email: loginReq.email } })

        if (!user) throw new UnauthorizedException('Invalid Credentials')
        
        const isPasswordValid = await bcrypt.compare(dto.password, user.password)
        if (!isPasswordValid) { throw new UnauthorizedException('Invalid Credentials') }

        const token = this.jwtService.sign({ id: user.user_id, email: user.email, role: user.role })

        return token
    }

    async resetpassword(@Req() req: Request, dto: ResetPasswordDto) {
        const resetReq = this.validationService.validate(ResetPasswordSchema, dto)

        resetReq.new_password = await bcrypt.hash(resetReq.new_password, 10)
        await this.prismaService.user.update({
            where: {user_id: req.user!['id']},
            data: { password: resetReq.new_password }
        })

        return "Password Reset Successfully"
    }
}