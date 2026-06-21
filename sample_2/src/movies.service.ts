import { Injectable, Inject } from '@nestjs/common';
import { DatabaseSchema, Movie } from './database/schema.interface';
import { LOWDB_TOKEN } from './database/database.module';
import { Low } from 'lowdb';
import { nanoid } from 'nanoid';

@Injectable()
export class MoviesService {
  constructor(@Inject(LOWDB_TOKEN) private readonly db: Low<DatabaseSchema>) {}

  // show all data
  findAll(): Movie[] {
    return this.db.data.movies;
  }

  // add new movie, id auto generate by nano db
  async create(movieData: Omit<Movie, 'id'>): Promise<Movie> {
    const newMovie: Movie = {
      id: nanoid(8),
      ...movieData,
    };

    // push to lowdb
    this.db.data.movies.push(newMovie);

    // sync to this.db.json
    await this.db.write();

    return newMovie;
  }
}
