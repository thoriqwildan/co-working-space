import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FilterSpaceDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    filter?: string

    @ApiPropertyOptional()
    @IsOptional()
    price_gte?: number

    @ApiPropertyOptional()
    @IsOptional()
    price_lte?: number
}