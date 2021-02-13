import { useState } from 'react';

const PersonBiography = ({ biography }) => {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <>
      <p className={(isExtended ? '' : 'line-clamp-5') + ' text-gray-700'}>{biography}</p>
      <button
        className="px-4 py-2 mt-2 text-sm font-medium text-gray-700 transition-colors bg-gray-300 hover:text-gray-800 hover:bg-gray-400 focus:ring-4 focus:outline-none font-poppins"
        type="button"
        onClick={() => setIsExtended(!isExtended)}
      >
        {isExtended ? 'Show Less' : 'Show More'}
      </button>
    </>
  );
};

export default PersonBiography;
