import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class FinancialCreateDto {
  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  dueDate?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  studentId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class FinancialUpdateDto {
  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  dueDate?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  studentId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
