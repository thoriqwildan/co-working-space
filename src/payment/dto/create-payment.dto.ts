import { ApiProperty } from "@nestjs/swagger"
import { IsDecimal, IsNumber, IsString } from "class-validator"

export class CreatePaymentDto {
    @IsNumber()
    @ApiProperty({
        example: 1
    })
    booking_id: number

    @IsDecimal()
    @ApiProperty({
        example: 1000
    })
    amount: number

    @IsString()
    @ApiProperty({
        example: 'Paypal'
    })
    payment_method: string
}