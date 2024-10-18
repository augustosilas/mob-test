import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext, I18nService, I18nTranslation } from 'nestjs-i18n';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = I18nContext.current<I18nTranslation>(host);
    const response = host.switchToHttp().getResponse<Response>();
    const data = exception.getResponse();
    const status = exception.getStatus();
    if (typeof data === 'string') {
      return response.status(status).json({ message: data });
    }
    if ('msg' in data && typeof data.msg === 'string') {
      const translation = await this.i18nService.translate(data.msg, {
        lang: i18n.lang,
        args: (data as any).args,
      });
      return response.status(status).json({ message: translation });
    }
    return response.status(status).json({ message: data });
  }
}
