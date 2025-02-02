import { HttpException, Inject, Injectable, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateProfileDto, UpdateProfileSchema } from 'src/common/schemas/user.schema';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private validationService: ValidationService
    ) {}

    toProfileRes(data: User) {
        return {
            id: data.user_id,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            role: data.role
        }
    }

    async getProfile(@Req() req: Request) {
        const data = await this.prismaService.user.findFirst({
            where: {user_id: req.user!['id']}
        })

        if (!data) { throw new HttpException('Profile not found', 404) }

        return this.toProfileRes(data)
    }

    async updateProfile(@Req() req: Request, dto: UpdateProfileDto) {
        const updateReq = this.validationService.validate(UpdateProfileSchema, dto)

        const data = await this.prismaService.user.update({
            where: { user_id: req.user!['id'] },
            data: { name: updateReq.name, phone_number: updateReq.phone_number }
        })

        return this.toProfileRes(data)
    }

}
