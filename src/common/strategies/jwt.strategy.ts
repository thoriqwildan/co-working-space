import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Logger } from 'winston';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies['access_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.getSecretKey(configService),
    });
  }

  private static getSecretKey(configService: ConfigService): string {
    return configService.get<string>('JWT_SECRET')!;
  }

  validate(payload: any): unknown {
    this.logger.info(`Payload: ${JSON.stringify(payload)}`);
    return payload;
  }
}
