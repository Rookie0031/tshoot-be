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
  @PrimaryGeneratedColumn('increment', { name: 'record_id' })
  id: number;

  @Column({ 
    name: 'date',
    type: 'date',
    nullable: true
  })
  date: string;

  @Column({
    type: 'enum',
    enum: Field,
    name: 'field'
  })
  field: Field;

  @Column({ name: 'problem' })
  problem: string;

  @Column({ name: 'try' })
  try: string;

  @Column({ name: 'solve' })
  solve: string;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;
}
