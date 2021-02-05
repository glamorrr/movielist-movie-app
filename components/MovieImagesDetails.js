import { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import MovieDetailsTab from '@/components/MovieDetailsTab';
import Poster from '@/components/Poster';
import Backdrop from '@/components/Backdrop';

const MovieImagesDetails = ({ movie, imagesTMDbAPIConfiguration }) => {
  const [selectedTab, setSelectedTab] = useState('Posters');
  const tabs = ['Posters', 'Backdrops'];
  const { posters, backdrops } = movie.images;
  const isPosters = posters.length > 0;
  const isBackdrops = backdrops.length > 0;

  if (!isPosters && !isBackdrops) {
    return <p className="mt-12 text-2xl text-center text-gray-500">No Images</p>;
  }

  return (
    <div className="mt-6">
      <LayoutWrapper>
        <ul className="mx-auto px-5 md:pb-0.5 py-4 w-min flex justify-center space-x-4 font-poppins bg-white shadow-sm">
          {tabs.map((tab) => {
            if (tab === 'Posters' && !isPosters) {
              setSelectedTab('Backdrops');
              return;
            }
            if (tab === 'Backdrops' && !isBackdrops) return;
            return (
              <MovieDetailsTab
                key={tab}
                tab={tab}
                isSelected={selectedTab === tab}
                handleClick={() => setSelectedTab(tab)}
              />
            );
          })}
        </ul>
        {selectedTab === 'Posters' && (
          <div className="grid grid-cols-2 gap-6 mt-8 sm:gap-7 md:gap-10 sm:grid-cols-3 lg:gap-8 lg:grid-cols-5">
            {posters.map((poster) => (
              <Poster
                key={poster.file_path}
                poster={poster}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
            ))}
          </div>
        )}
        {selectedTab === 'Backdrops' && (
          <div className="grid grid-cols-1 gap-8 mt-8 sm:gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-8">
            {backdrops.map((backdrop) => (
              <Backdrop
                key={backdrop.file_path}
                backdrop={backdrop}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
            ))}
          </div>
        )}
      </LayoutWrapper>
    </div>
  );
};

export default MovieImagesDetails;
