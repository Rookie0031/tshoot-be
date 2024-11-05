import { IsEnum, IsString, IsDateString } from 'class-validator';
import { Field } from './trouble.entity';

export class CreateTroubleDto {
  @IsString()
  userId: string;  // userId를 DTO에 포함

  @IsDateString()
  date: string;

  @IsEnum(Field)
  field: Field;

  @IsString()
  problem: string;

  @IsString()
  try: string;

  @IsString()
  solve: string;
}

export class UpdateTroubleDto extends CreateTroubleDto {}
