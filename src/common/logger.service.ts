import { Injectable, LoggerService, LogLevel } from "@nestjs/common";
import * as winston from 'winston'

@Injectable()
export class WinstonService implements LoggerService {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                winston.format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
            transports: [new winston.transports.Console()]
        })
    }

    log(message: any, ...optionalParams: any[]) {
        this.logger.info(message)
    }
    error(message: any, ...optionalParams: any[]) {
        this.logger.error(message)
    }
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(message)
    }
    debug?(message: any, ...optionalParams: any[]) {
        this.logger.debug(message)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        this.logger.verbose(message)
    }
    fatal?(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error("Method not implemented.");
    }
}