import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Movie } from '@/types/movie';
import MovieImage from '@/MovieImage';

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
        <MovieImage imageUrl={movie.poster_path} />
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
