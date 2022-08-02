import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

export const AUTHORIZATION_HEADER_KEY = 'authorization';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const tok = req.headers[AUTHORIZATION_HEADER_KEY] as string | undefined;

    try {
      req['user'] = await this.authService.validateUser(
        this.authService.removeBearerKeyword(tok),
      );
      return true;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
