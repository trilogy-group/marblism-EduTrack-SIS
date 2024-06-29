import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class StudentCreateDto {
  @IsString()
  @IsOptional()
  grade?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  parentId?: string

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

export class StudentUpdateDto {
  @IsString()
  @IsOptional()
  grade?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  parentId?: string

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
