import { Global, Module } from '@nestjs/common';
import { WinstonService } from './logger.service';
import { PrismaModule } from './prisma/prisma.module';

@Global()
@Module({
    imports: [PrismaModule],
    providers: [WinstonService],
    exports: [WinstonService, PrismaModule]
})
export class CommonModule {}
