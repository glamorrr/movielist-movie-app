import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';

const Poster = ({ poster, imagesTMDbAPIConfiguration }) => {
  const { file_path } = poster;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  return (
    <CSSTransition classNames="CSSTransitionScale" timeout={300} appear={true} in={true}>
      <a href={`${base_url}${poster_sizes[6]}${file_path}`} target="_blank">
        <article className="text-gray-500 transition-colors cursor-pointer hover:text-blue-400">
          <div className="bg-blue-100 shadow-md aspect-w-2 aspect-h-3">
            <Image
              src={`${base_url}${poster_sizes[3]}${file_path}`}
              alt="poster"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </article>
      </a>
    </CSSTransition>
  );
};

export default Poster;
