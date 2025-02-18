import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';

@ApiBearerAuth()
@ApiTags('Payment')
@UseGuards(JwtRoleGuard)
@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {}

    @Post()
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        const result = await this.paymentService.createPayment(createPaymentDto)
        return {
            "msg": "Payment created successfully",
            data: result
        }
    }
}
