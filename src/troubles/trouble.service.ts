import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trouble } from './trouble.entity';
import { CreateTroubleDto, UpdateTroubleDto } from './trouble.dto';

@Injectable()
export class TroubleService {
  constructor(
    @InjectRepository(Trouble)
    private troubleRepository: Repository<Trouble>,
  ) {}

  async create(createTroubleDto: CreateTroubleDto): Promise<Trouble> {
    const trouble = this.troubleRepository.create(createTroubleDto);
    return await this.troubleRepository.save(trouble);
  }

  async findAll(userId: string, category?: string): Promise<Trouble[]> {
    const query = this.troubleRepository.createQueryBuilder('trouble');
    
    // user_id 컬럼명 사용
    query.where('trouble.user_id = :userId', { userId });
    
    if (category) {
      query.andWhere('trouble.field = :category', { category });
    }
    
    // 생성일 기준 내림차순 정렬 추가
    query.orderBy('trouble.created_at', 'DESC');
    
    return await query.getMany();
  }

  async findOne(id: string, userId: string): Promise<Trouble> {
    const trouble = await this.troubleRepository.findOne({ 
      where: { 
        id: parseInt(id),
        userId 
      } 
    });
    
    if (!trouble) {
      throw new NotFoundException(`Trouble with ID ${id} not found`);
    }
    return trouble;
  }

  async update(id: string, updateTroubleDto: UpdateTroubleDto, userId: string): Promise<Trouble> {
    const trouble = await this.findOne(id, userId);
    Object.assign(trouble, updateTroubleDto);
    return await this.troubleRepository.save(trouble);
  }

  async remove(id: string, userId: string): Promise<void> {
    const trouble = await this.findOne(id, userId);
    await this.troubleRepository.remove(trouble);
  }
}
