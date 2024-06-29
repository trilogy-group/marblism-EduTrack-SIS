import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DocumentCreateDto {
  @IsString()
  @IsOptional()
  documentUrl?: string

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

export class DocumentUpdateDto {
  @IsString()
  @IsOptional()
  documentUrl?: string

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
