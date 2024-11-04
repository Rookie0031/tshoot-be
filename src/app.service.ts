import { Injectable } from '@nestjs/common';
import { initialize, isEnabled } from 'unleash-client';

@Injectable()
export class AppService {
  private unleash;

  constructor() {
    this.unleash = initialize({
      url: 'http://unleash-api-url/api',
      appName: 'my-app',
      instanceId: 'my-instance-id',
    });
  }

  getHello(): string {
    if (isEnabled('my-feature-toggle')) {
      return 'Feature is ON!';
    }
    return 'Feature is OFF!';
  }
}
