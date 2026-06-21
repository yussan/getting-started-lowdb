import { Controller, Body, Get, Post } from '@nestjs/common';
import { MoviesService } from 'src/movies.service';
import { Movie } from '../database/schema.interface';
import { CreateMovieDto } from 'src/dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  // endpoint GET /movies
  @Get()
  getAllMovies(): Movie[] {
    return this.movieService.findAll();
  }

  @Post()
  async addMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }
}
