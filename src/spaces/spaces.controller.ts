import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { Roles } from 'src/common/role.decorator';
import { CreateSpaceDto } from './dto/spaces.dto';
import { SpaceResponseDto } from './dto/space-response.dto';
import { Space } from './domain/space';
import { SpacesService } from './spaces.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/user/domain/user';
import { NullableType } from 'src/common/types/nullable.type';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { FilterSpaceDto } from './dto/query-space.dto';

@ApiBearerAuth()
@ApiTags('Spaces')
@UseGuards(JwtRoleGuard)
@Roles('admin')
@Controller('spaces')
export class SpacesController {
    constructor(private spaceService: SpacesService) {}

    @Post()
    async create(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
        return this.spaceService.create(createSpaceDto)
    }

    @Get()
    async findAll(@Query() paginationDto: FilterSpaceDto) {
        return this.spaceService.findAll(paginationDto)
    }

    @ApiOkResponse({
        type: Space
    })
    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async findOne(@Param('id') id: User['id']): Promise<SpaceResponseDto> {
        return this.spaceService.findById(id)
    }

    @ApiOkResponse({
        type: Space
    })
    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async update(@Param('id') id: User['id'], @Body() updateSpaceDto: UpdateSpaceDto): Promise<SpaceResponseDto> {
        return this.spaceService.update(id, updateSpaceDto)
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async remove(@Param('id') id: User['id']) {
        await this.spaceService.remove(id)
        return { msg: "Space Deleted" }
    }
}
