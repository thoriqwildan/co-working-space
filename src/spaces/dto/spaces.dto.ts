import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateSpaceDto {
    @IsString()
    @ApiProperty({
        example: 'Ruang Rapat 3'
    })
    name: string

    @IsString()
    @ApiProperty({
        example: 'Gedung A lantai 2'
    })
    location: string

    @IsNumber()
    @ApiProperty({
        example: 4
    })
    capacity: number

    @IsString()
    @ApiProperty({
        example: 'Meeting Room'
    })
    type: string

    @ApiProperty({
        example: 50000,
        description: 'Price per hour'
    })
    @IsNumber()
    price: number

    @IsString()
    @ApiProperty({
        example: 'Proyektor || null'
    })
    equipment?: string
}