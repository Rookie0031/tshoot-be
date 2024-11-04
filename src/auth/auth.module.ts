import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'js-dc-secret-key', // 실제 환경에서는 환경변수로 관리
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {} 
