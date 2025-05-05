import Link from 'next/link';
import PosterSecondary from '@/components/PosterSecondary';
import parseToDashedString from '@/utils/parseToDashedString';

const RecommendationMovieCard = ({ movie, imagesTMDbAPIConfiguration }) => {
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;
  const { title, id, poster_path } = movie;

  return (
    <Link legacyBehavior href={`/movie/${id}-${parseToDashedString(title)}`}>
      <a
        style={{ maxWidth: '150px' }}
        className="flex-shrink-0 block w-full text-gray-500 transition-colors cursor-pointer hover:text-blue-400"
      >
        <PosterSecondary
          maxWidth="150px"
          path={poster_path}
          src={`${base_url}${poster_sizes[2]}${poster_path}`}
          alt={title}
        />
        <h3 className="mt-2 text-sm font-medium leading-5 md:mt-3 font-poppins lg:text-base line-clamp-2">
          {title}
        </h3>
      </a>
    </Link>
  );
};

export default RecommendationMovieCard;
