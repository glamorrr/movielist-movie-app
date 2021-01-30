import Image from 'next/image';

const MovieReviewCard = ({ avatarPath, content, imagesTMDbAPIConfiguration }) => {
  const { base_url, profile_sizes } = imagesTMDbAPIConfiguration;

  return (
    <div className="flex space-x-4 items-start">
      <div className="w-12 shadow-lg">
        <div className="aspect-w-1 aspect-h-1 bg-blue-100">
          <Image
            src={`${base_url}${profile_sizes[1]}${avatarPath}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <article
        className="prose p-5 w-full bg-white rounded shadow-sm"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default MovieReviewCard;
