import { AssetPathType, EntityType, PathType, PersonPathType, UserPathType } from '@app/infra/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Optional, ValidateUUID } from '../domain.util';

const PathEnum = Object.values({ ...AssetPathType, ...PersonPathType, ...UserPathType });

export class AuditDeletesDto {
  @IsDate()
  @Type(() => Date)
  after!: Date;

  @ApiProperty({ enum: EntityType, enumName: 'EntityType' })
  @IsEnum(EntityType)
  entityType!: EntityType;

  @Optional()
  @IsUUID('4')
  @ApiProperty({ format: 'uuid' })
  userId?: string;
}

export enum PathEntityType {
  ASSET = 'asset',
  PERSON = 'person',
  USER = 'user',
}

export class AuditDeletesResponseDto {
  needsFullSync!: boolean;
  ids!: string[];
  requestedAt?: Date;
}

export class FileReportDto {
  orphans!: FileReportItemDto[];
  extras!: string[];
}

export class FileChecksumDto {
  @IsString({ each: true })
  filenames!: string[];
}

export class FileChecksumResponseDto {
  filename!: string;
  checksum!: string;
}

export class FileReportFixDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileReportItemDto)
  items!: FileReportItemDto[];
}

// used both as request and response dto
export class FileReportItemDto {
  @ValidateUUID()
  entityId!: string;

  @ApiProperty({ enumName: 'PathEntityType', enum: PathEntityType })
  @IsEnum(PathEntityType)
  entityType!: PathEntityType;

  @ApiProperty({ enumName: 'PathType', enum: PathEnum })
  @IsEnum(PathEnum)
  pathType!: PathType;

  @IsString()
  pathValue!: string;

  checksum?: string;
}
