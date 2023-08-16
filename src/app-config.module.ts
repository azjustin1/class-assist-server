import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

const SYSTEM_MODULES = [UserModule, RoleModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
    ...SYSTEM_MODULES,
  ],
  exports: [],
})
export class AppConfigModule {}
