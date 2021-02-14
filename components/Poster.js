import PosterSecondary from '@/components/PosterSecondary';

const Poster = ({ poster, imagesTMDbAPIConfiguration }) => {
  const { file_path } = poster;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  return (
    <a
      className="block cursor-pointer"
      href={`${base_url}${poster_sizes[6]}${file_path}`}
      target="_blank"
    >
      <PosterSecondary
        maxWidth="342px"
        path={file_path}
        src={`${base_url}${poster_sizes[3]}${file_path}`}
        alt="poster"
      />
    </a>
  );
};

export default Poster;
