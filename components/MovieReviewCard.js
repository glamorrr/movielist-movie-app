import Image from 'next/image';

const MovieReviewCard = ({ author, avatarPath, content, imagesTMDbAPIConfiguration }) => {
  const { base_url, profile_sizes } = imagesTMDbAPIConfiguration;
  const gravatarURLRegex = /secure.gravatar.com/gi;
  let profilePicture;

  if (!avatarPath) {
    profilePicture = null;
  } else if (gravatarURLRegex.test(avatarPath)) {
    profilePicture = avatarPath.substr(1, avatarPath.length);
  } else {
    profilePicture = `${base_url}${profile_sizes[1]}${avatarPath}`;
  }

  return (
    <div className="flex space-x-4 items-start">
      <div className="w-12 shadow-lg">
        <div className="aspect-w-1 aspect-h-1 bg-blue-100">
          <Image
            src={
              profilePicture ||
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='10 10 20 20'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
            }
            alt={`${author} profile picture`}
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
