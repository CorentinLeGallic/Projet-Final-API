import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class GetGamesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number = 20;
}

export class CreateGameDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  published_at: string;

  @Type(() => Number)
  @IsInt()
  min_players: string;

  @Type(() => Number)
  @IsInt()
  max_players: string;

  @Type(() => Number)
  @IsInt()
  duration: string;

  @Type(() => Number)
  @IsNumber()
  age_min: number;
}

export class UpdateGameParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  id: number;
}

export class UpdateGameBodyDto {
  @IsString()
  @IsOptional()
  name: string;

  @Type(() => Number)
  @IsInt()
  published_at: string;

  @Type(() => Number)
  @IsInt()
  min_players: string;

  @Type(() => Number)
  @IsInt()
  max_players: string;

  @Type(() => Number)
  @IsInt()
  duration: string;

  @Type(() => Number)
  @IsInt()
  age_min: number;
}

export class DeleteGameDto {
  @Type(() => Number)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  id: number;
}
