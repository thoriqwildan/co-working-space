import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { SpaceRepository } from './repositories/space.repository';

@Module({
  providers: [SpacesService, SpaceRepository],
  controllers: [SpacesController],
})
export class SpacesModule {}
