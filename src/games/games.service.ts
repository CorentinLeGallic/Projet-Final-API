import { Injectable } from '@nestjs/common';
import { GameType } from 'types/games.types';
import GAMES from 'assets/data/bgg_dataset.json';

interface GetGamesType {
  offset: number;
  limit: number;
}

@Injectable()
export class GamesService {
  games: GameType[];

  constructor() {
    this.games = GAMES;
  }

  getGames(params: GetGamesType) {
    const { offset, limit } = params;

    return this.games.slice(offset * limit, offset * limit + limit);
  }

  getGameById(gameId: number): GameType | null {
    return this.games.find((game) => game.id === Number(gameId)) ?? null;
  }

  createGame(data: Omit<GameType, 'id'>) {
    const gameId = Math.max(...this.games.map((game) => game.id ?? 0)) + 1;

    this.games.push({
      id: gameId,
      ...data,
    });

    return gameId;
  }

  gameExists(gameId: number): boolean {
    return !!this.games.find((game) => game.id === Number(gameId));
  }

  updateGame(gameId: number, gameOptions: Omit<GameType, 'id'>) {
    const game = this.getGameById(gameId);

    if (!game) return;

    Object.assign(game, gameOptions);
  }

  deleteGame(gameId: number) {
    this.games = this.games.filter((_game) => _game.id !== gameId);
  }
}
