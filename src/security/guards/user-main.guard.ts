import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../entities/user.entity';
import { RoleType } from '../role-type';

@Injectable()
export class UserMainGuard {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const companyId = request.query?.companyId;
    const user = request.user as User;
    if (user?.roles?.includes(RoleType.MAIN)) return true;
    if (companyId && +companyId !== user.companyId) return false;
    return true;
  }
}
