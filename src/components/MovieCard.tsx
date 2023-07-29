import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg truncate">{movie.title}</CardTitle>
        <CardDescription title={movie.overview} className="line-clamp-3">
          {movie.overview}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={500}
          height={500}
          alt="movie poster"
          className="group-hover:scale-105 transition rounded-lg object-cover"
        />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="line-clamp-1">{movie.original_title}</p>
        <p className="font-normal text-sm">
          {new Date(movie.release_date).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
