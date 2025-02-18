import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class BookingResponseDto {
    @IsNumber()
    @ApiProperty({
        example: 1
    })
    booking_id: number
    
    @IsNumber()
    @ApiProperty({
        example: 1
    })
    space_id: number
    
    @IsString()
    @ApiProperty({
        example: '2024-02-16T10:00:00.000Z'
    })
    start_time: string
    
    @IsString()
    @ApiProperty({
        example: '2024-02-16T10:00:00.000Z'
    })
    end_time: string
    
    @IsString()
    @ApiProperty({
        example: 'In-progress'
    })
    status: string
}