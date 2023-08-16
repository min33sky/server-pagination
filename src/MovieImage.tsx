import getImage from '@/lib/getImage';
import Image from 'next/image';

interface MovieImageProps {
  imageUrl: string;
}

export default async function MovieImage({ imageUrl }: MovieImageProps) {
  const { base64, img } = await getImage(
    `https://image.tmdb.org/t/p/w500${imageUrl}`,
  );

  return (
    <Image
      {...img}
      alt="movie poster"
      className="group-hover:scale-105 transition rounded-lg object-cover"
      placeholder="blur"
      blurDataURL={base64}
    />
  );
}
