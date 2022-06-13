import { createQueryBuilder, getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder("game")
      .where("game.title ilike :title", { title: `%${param}%` })
      .getMany();

    if (!games) {
      throw new Error("Game not found");
    }
    return games;
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await getRepository(User)
      .createQueryBuilder("users")
      .leftJoin("users.games", "games")
      .where("games.id = :id", { id })
      .getMany();
    return users;
    // Complete usando query builder
  }
}
