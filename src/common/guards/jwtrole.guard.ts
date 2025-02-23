import {
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class JwtRoleGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean;
    if (!activate) {
      return false;
    }

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    this.logger.info(`Required roles: ${JSON.stringify(requiredRoles)}`);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new HttpException('Access Denied', 403);
    }

    const hasRole = requiredRoles.includes(user.role);
    this.logger.debug(
      `User role: ${user.role} - Has required role: ${hasRole}`,
    );

    if (!hasRole) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    return true;
  }
}
