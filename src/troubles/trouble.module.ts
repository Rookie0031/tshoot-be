import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TroubleController } from './trouble.controller';
import { TroubleService } from './trouble.service';
import { Trouble } from './trouble.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trouble]),
    JwtModule.register({
      secret: 'js-dc-secret-key', // AuthModule과 동일한 시크릿 키 사용
    }),
  ],
  controllers: [TroubleController],
  providers: [TroubleService],
})
export class TroubleModule {}
