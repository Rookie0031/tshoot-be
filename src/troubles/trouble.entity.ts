import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../User/user.entity';

export enum Field {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  MOBILE = 'mobile',
  NETWORK = 'network',
  DB = 'db',
  CICD = 'cicd',
  ETC = 'etc'
}

@Entity('troubleshootingrecords')
export class Trouble {
  @PrimaryGeneratedColumn({ name: 'record_id' })
  id: number;  // PostgreSQL sequence는 보통 number 타입입니다

  @Column({ type: 'date' })
  date: string;  // YYYY-MM-DD 형식

  @Column({
    type: 'enum',
    enum: Field,
  })
  field: Field;

  @Column('text')
  problem: string;

  @Column('text')
  try: string;

  @Column('text')
  solve: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  user: User;
}
