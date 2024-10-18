import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './modules/company.module';
import { UserModule } from './modules/user.module';
import { VehicleModule } from './modules/vehicle.module';
import { AuthModule } from './modules/auth.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en-us',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    DatabaseModule,
    AuthModule,
    CompanyModule,
    UserModule,
    VehicleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
