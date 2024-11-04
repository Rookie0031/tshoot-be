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
    const trouble = this.troubleRepository.create({
      ...createTroubleDto,
      userId: createTroubleDto.userId
    });
    
    console.log('Creating trouble for user:', createTroubleDto.userId);
    return await this.troubleRepository.save(trouble);
  }

  async findAll(category?: string, userId?: string): Promise<Trouble[]> {
    const query = this.troubleRepository.createQueryBuilder('trouble');
    
    if (userId) {
      query.where('trouble.userId = :userId', { userId });
    }
    
    if (category) {
      query.andWhere('trouble.field = :category', { category });
    }
    
    return await query.getMany();
  }

  async findOne(id: string): Promise<Trouble> {
    const trouble = await this.troubleRepository.findOne({ 
      where: { id: parseInt(id) } // string을 number로 변환
    });
    
    if (!trouble) {
      throw new NotFoundException(`Trouble with ID ${id} not found`);
    }
    return trouble;
  }

  async update(id: string, updateTroubleDto: UpdateTroubleDto): Promise<Trouble> {
    const trouble = await this.findOne(id);
    Object.assign(trouble, updateTroubleDto);
    return await this.troubleRepository.save(trouble);
  }

  async remove(id: string): Promise<void> {
    const result = await this.troubleRepository.delete(parseInt(id)); // string을 number로 변환
    if (result.affected === 0) {
      throw new NotFoundException(`Trouble with ID ${id} not found`);
    }
  }
}
