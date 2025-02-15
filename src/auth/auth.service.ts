import { HttpException, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/common/prisma/prisma.service";
import { ResetPasswordSchema, UserLoginDto, UserLoginSchema, UserRegisterDto, UserRegisterSchema } from "src/common/schemas/user.schema";
import * as bcrypt from 'bcrypt'
import { ValidationService } from "src/common/validation.service";
import { Request } from "express";
import { User } from "src/user/domain/user";
import { ResetPasswordDto } from "./dto/auth.dto";

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

        if (!user) throw new UnauthorizedException('Username or Password or Wrong')
        
        const isPasswordValid = await bcrypt.compare(dto.password, user.password)
        if (!isPasswordValid) { throw new UnauthorizedException('Username or Password is Wrong') }

        const token = this.jwtService.sign({ id: user.user_id, email: user.email, role: user.role })

        const userData: User = { 
            id: user.user_id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            img_url: user.imgUrl,
            role: user.role
         }

        return {token, userData}
    }

    async resetpassword(@Req() req: Request, dto: ResetPasswordDto) {

        dto.password = await bcrypt.hash(dto.password, 10)
        await this.prismaService.user.update({
            where: {user_id: req.user!['id']},
            data: { password: dto.password }
        })

        return "Password Reset Successfully"
    }
}