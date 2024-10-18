import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class BasicAuth {
  constructor(private readonly userRepository: UserRepository) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request?.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException();
    }
    const credentialsBase64 = authHeader.split(' ')[1];
    const credentials = Buffer.from(credentialsBase64, 'base64').toString(
      'ascii',
    );
    const [login, password] = credentials.split(':');
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) throw new UnauthorizedException();
    return password === user.password;
  }
}
