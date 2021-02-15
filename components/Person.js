import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import PosterPrimary from '@/components/PosterPrimary';
import parseToDashedString from '@/utils/parseToDashedString';

const Person = ({ person, imagesTMDbAPIConfiguration }) => {
  const { id, name, profile_path } = person;
  const { base_url, profile_sizes } = imagesTMDbAPIConfiguration;

  return (
    <CSSTransition classNames="CSSTransitionScale" timeout={300} appear={true} in={true}>
      <Link href={`/movie/${id}-${parseToDashedString(name)}`}>
        <a className="block text-gray-500 transition-colors cursor-pointer hover:text-blue-400">
          <PosterPrimary
            maxWidth="185px"
            path={profile_path}
            src={`${base_url}${profile_sizes[1]}${profile_path}`}
            alt={name}
          />
          <h2 className="mt-2 text-sm font-medium leading-5 md:mt-3 font-poppins sm:text-base md:font-semibold line-clamp-2">
            {name}
          </h2>
        </a>
      </Link>
    </CSSTransition>
  );
};

export default Person;
