import { IsEnum, IsString, IsDateString } from 'class-validator';
import { Field } from './trouble.entity';

export class CreateTroubleDto {
  @IsString()
  userId: string;  // userId 추가

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

export class UpdateTroubleDto {
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
