/* eslint-disable prettier/prettier */
// custom-interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { hassPassword } from 'src/helpers/securePassword';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    request.body = {
      ...request.body,
      password: hassPassword(request.body.password),
    };

    return next.handle();
  }
}
