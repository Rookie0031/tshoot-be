import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';import { UserModule } from './User/User.Module';
import { User } from './User/user.entity';
import { TroubleModule } from './troubles/trouble.module';
import { AuthModule } from './auth/auth.module';

@Module({   
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // 또는 Docker 컨테이너 이름
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword', 
      database: 'tshoot',
      entities:[User],
      synchronize: true, // 개발 환경에서만 사용, 자동으로 데이터베이스 스키마를 동기화
    }),
    UserModule,
    TroubleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
