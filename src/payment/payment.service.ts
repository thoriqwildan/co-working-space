import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Logger } from 'winston';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {}

    async createPayment(createPaymentDto: CreatePaymentDto) {
        const data = await this.prismaService.payment.create({
            data: {
                booking_id: createPaymentDto.booking_id,
                amount: createPaymentDto.amount,
                payment_method: createPaymentDto.payment_method,
            }
        })
        await this.prismaService.booking.update({
            where: {booking_id: createPaymentDto.booking_id},
            data: {status: 'PAID'}
        })

        return data
    }
}
