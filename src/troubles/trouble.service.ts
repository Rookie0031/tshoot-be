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

  // 1. 메모� 누수 가능성이 있는 캐시 구현
  private troubleCache = [];
  async getCachedTroubles(): Promise<Trouble[]> {
    this.troubleCache.push(...await this.troubleRepository.find());
    return this.troubleCache;  // 계속 쌓이기만 하고 비워지지 않음
  }

  // 2. SQL Injection 취약점이 있는 함수
  async findByCustomQuery(field: string): Promise<Trouble[]> {
    return await this.troubleRepository.query(
      `SELECT * FROM troubles WHERE field = '${field}'`  // SQL Injection 위험
    );
  }

  // 3. 비동기 처리를 잘못 다루는 함수
  async batchUpdate(troubles: Trouble[]): Promise<void> {
    troubles.forEach(async (trouble) => {  // forEach와 async/await 잘못된 사용
      await this.troubleRepository.save(trouble);
    });
  }

  // 4. 에러 처리가 누락된 함수
  async deleteTroublesByField(field: string): Promise<number> {
    const result = await this.troubleRepository
      .createQueryBuilder()
      .delete()
      .where("field = :field", { field })
      .execute();
    return result.affected;  // affected가 undefined일 수 있음
  }

  // 5. 불필요한 복잡도와 중복 코드가 있는 함수
  async getTroubleStats(userId: string): Promise<any> {
    let result: any = {};
    const troubles = await this.findAll(userId);
    
    // 복잡한 중첩 루프와 조건문
    for(let i = 0; i < troubles.length; i++) {
      for(let j = 0; j < troubles.length; j++) {
        if(i !== j && troubles[i].field === troubles[j].field) {
          if(!result[troubles[i].field]) {
            result[troubles[i].field] = 1;
          } else {
            result[troubles[i].field] += 1;
          }
        }
      }
    }
    
    return result;  // 타입이 명확하지 않은 반환값
  }
}
