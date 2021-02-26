import Link from 'next/link';

const ProfileNavbar = ({ selected }) => {
  const list = ['Favorites', 'Watchlist'];

  return (
    <ul className="flex justify-center space-x-8 font-poppins">
      {list.map((item) => (
        <li
          key={item}
          className={
            (selected === item
              ? 'text-purple-500'
              : 'text-gray-700 hover:text-purple-400 transition-colors') + ' cursor-pointer'
          }
        >
          <Link href={`/profile/${item.toLowerCase()}`}>
            <a>{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfileNavbar;
