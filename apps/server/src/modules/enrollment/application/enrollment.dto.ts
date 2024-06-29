import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class EnrollmentCreateDto {
  @IsString()
  @IsOptional()
  enrollmentDate?: string

  @IsString()
  @IsOptional()
  studentId?: string

  @IsString()
  @IsOptional()
  courseId?: string

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

export class EnrollmentUpdateDto {
  @IsString()
  @IsOptional()
  enrollmentDate?: string

  @IsString()
  @IsOptional()
  studentId?: string

  @IsString()
  @IsOptional()
  courseId?: string

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
