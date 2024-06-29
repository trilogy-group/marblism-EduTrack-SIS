import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ScheduleCreateDto {
  @IsString()
  @IsOptional()
  dayOfWeek?: string

  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  endTime?: string

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

export class ScheduleUpdateDto {
  @IsString()
  @IsOptional()
  dayOfWeek?: string

  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  endTime?: string

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
