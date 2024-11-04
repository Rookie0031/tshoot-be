import { Injectable } from '@nestjs/common';
import { initialize, isEnabled } from 'unleash-client';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
