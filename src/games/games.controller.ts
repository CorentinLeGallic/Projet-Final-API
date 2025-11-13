import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GamesService } from './games.service';
import {
  CreateGameDto,
  DeleteGameDto,
  GetGamesDto,
  UpdateGameBodyDto,
} from './games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  getGames(@Query() query: GetGamesDto) {
    const { offset, limit } = query;

    return this.gamesService.getGames({ offset, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  getTask(@Param('id') id: number) {
    const game = this.gamesService.getGameById(id);

    if (!game) throw new NotFoundException('Game not found');

    return game;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ always: true, whitelist: true }))
  createGame(@Body() body: CreateGameDto) {
    const { name, published_at, min_players, max_players, duration, age_min } =
      body;

    const gameId = this.gamesService.createGame({
      name,
      published_at,
      min_players,
      max_players,
      duration,
      age_min,
    });

    return gameId;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ always: true }))
  updateGame(@Param('id') id: number, @Body() body: UpdateGameBodyDto) {
    if (!this.gamesService.gameExists(id))
      throw new NotFoundException('Game not found');

    this.gamesService.updateGame(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ always: true }))
  deleteTask(@Param() params: DeleteGameDto) {
    const { id } = params;

    if (!this.gamesService.gameExists(id))
      throw new NotFoundException('Task not found');

    this.gamesService.deleteGame(id);
  }
}
