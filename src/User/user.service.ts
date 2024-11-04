import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(googleId: string, email: string, name: string): Promise<User> {
    // 기존 사용자가 있는지 확인
    const existingUser = await this.userRepository.findOne({
      where: [
        { googleId },
        { email }
      ]
    });

    if (existingUser) {
      console.log("이미 사용자가 있어요")
      return existingUser;
    }

    const user = this.userRepository.create({ googleId, email, name });
    console.log("신규 유저가 가입되었어요")
    return this.userRepository.save(user);
  }
}
