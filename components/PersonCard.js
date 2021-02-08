import Image from 'next/image';

const PersonCard = ({ name, role, profilePath, imagesTMDbAPIConfiguration }) => {
  const { base_url, profile_sizes } = imagesTMDbAPIConfiguration;

  return (
    <div className="flex overflow-hidden bg-white rounded shadow-sm">
      <div
        style={{ width: '60px', height: '90px', minWidth: '60px' }}
        className="relative flex items-center justify-center bg-blue-100"
      >
        <Image
          src={
            profilePath
              ? `${base_url}${profile_sizes[1]}${profilePath}`
              : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
          }
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative flex flex-col justify-between p-3">
        <h3 className="font-medium leading-5 text-gray-700 font-poppins">{name}</h3>
        <p
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}
          className="overflow-hidden text-sm text-gray-500 font-poppins"
        >
          {role}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
