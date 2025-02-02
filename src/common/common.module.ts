import { Global, Module } from '@nestjs/common';
import { WinstonService } from './logger.service';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationService } from './validation.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import { JwtRoleGuard } from './guards/jwtrole.guard';

@Global()
@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        WinstonModule.forRoot({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                winston.format.printf(
                info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
            transports: [new winston.transports.Console()]
        }),
    ],
    providers: [ValidationService, JwtStrategy],
    exports: [PrismaModule, ValidationService]
})
export class CommonModule {}
