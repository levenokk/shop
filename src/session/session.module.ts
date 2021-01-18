import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectMongo = require('connect-mongo');

const MongoStore = connectMongo(session);

export const Session = SessionModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService, getConnectionToken()],
  useFactory: (
    config: ConfigService,
    connection: Connection,
  ): NestSessionOptions => {
    return {
      session: {
        store: new MongoStore({ mongooseConnection: connection }),
        secret: config.SESSION_SECRET,
      },
    };
  },
});
