import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const session = context.switchToHttp().getRequest().session;

    if (!session.viewsItems) {
      session.viewsItems = [];
    }

    if (!session.items) {
      session.items = {};
    }

    return next.handle();
  }
}
