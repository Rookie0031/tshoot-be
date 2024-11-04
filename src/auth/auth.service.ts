import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(googleId: string, email: string, name: string) {
    // 사용자 생성 또는 조회
    const user = await this.userService.createUser(googleId, email, name);

    // JWT 토큰 생성
    const payload = { 
      sub: user.id,
      email: user.email,
      name: user.name 
    };

    // 프론트엔드 구조에 맞게 accessToken으로 키 이름 변경
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
} 
