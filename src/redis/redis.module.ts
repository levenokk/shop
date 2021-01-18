import { DynamicModule } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const Redis: DynamicModule = RedisModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService): RedisModuleOptions => {
    return {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    };
  },
});
