import { useRouter } from 'next/router';
import Image from 'next/image';
import parseToDashedString from '@/utils/parseToDashedString';

const RecommendationMovieCard = ({ movie, imagesTMDbAPIConfiguration }) => {
  const router = useRouter();
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;
  const { title, id, poster_path } = movie;

  const handleClick = (e) => {
    e.preventDefault();
    const dashedMovieTitle = parseToDashedString(title);
    router.push(`/movie/${id}-${dashedMovieTitle}`).then(() => window.scrollTo(0, 0));
  };

  return (
    <article
      className="text-gray-500 hover:text-blue-400 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="w-28">
        <div className="aspect-w-2 aspect-h-3 bg-blue-100 shadow-lg">
          <Image
            src={
              poster_path
                ? `${base_url}${poster_sizes[2]}${poster_path}`
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
            }
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <h2 className="mt-2 md:mt-3 font-poppins text-sm font-medium line-clamp-2 leading-5">
        {title}
      </h2>
    </article>
  );
};

export default RecommendationMovieCard;
