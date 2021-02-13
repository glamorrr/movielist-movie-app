import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';

const Poster = ({ backdrop, imagesTMDbAPIConfiguration }) => {
  const { file_path } = backdrop;
  const { base_url, backdrop_sizes } = imagesTMDbAPIConfiguration;

  return (
    <CSSTransition classNames="CSSTransitionScale" timeout={300} appear={true} in={true}>
      <a href={`${base_url}${backdrop_sizes[3]}${file_path}`} target="_blank">
        <article className="text-gray-500 transition-colors cursor-pointer hover:text-blue-400">
          <div className="bg-blue-100 shadow-md aspect-w-16 aspect-h-9">
            <Image
              src={`${base_url}${backdrop_sizes[1]}${file_path}`}
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
