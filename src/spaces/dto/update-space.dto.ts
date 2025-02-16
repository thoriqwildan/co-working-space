import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateSpaceDto } from "./spaces.dto";

export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {
    @ApiPropertyOptional({ example: 'Ruang Rapat 2', type: String })
    name?: string | undefined;
    
    @ApiPropertyOptional({ example: 'Gedung A lantai 1', type: String })
    location?: string | undefined;

    @ApiPropertyOptional({ example: 3, type: Number })
    capacity?: number | undefined;

    @ApiPropertyOptional({ example: 'Meeting Room', type: String })
    type?: string | undefined;

    @ApiPropertyOptional({ example: 'Proyektor || null', type: String })
    equipment?: string | undefined;
}