import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AttendanceCreateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  enrollmentId?: string

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

export class AttendanceUpdateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  enrollmentId?: string

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
