import Image from 'next/image';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import PersonIdentity from '@/components/PersonIdentity';
import PersonBiography from '@/components/PersonBiography';
import parseToDashedString from '@/utils/parseToDashedString';

const PersonDetails = ({ person, imagesTMDbAPIConfiguration }) => {
  const { name, profile_path, biography, movie_credits, external_ids } = person;
  const { base_url, profile_sizes, poster_sizes } = imagesTMDbAPIConfiguration;
  const externalIds = {
    IMDb: external_ids.imdb_id,
    Twitter: external_ids.twitter_id,
    Instagram: external_ids.instagram_id,
    Facebook: external_ids.facebook_id,
  };

  return (
    <>
      <div className="pt-8 pb-32 bg-white md:pt-12 md:pb-8 gap-x-12">
        <LayoutWrapper>
          <div
            style={{ gridTemplateColumns: '14rem auto' }}
            className="md:grid gap-x-12 font-poppins"
          >
            <h1 className="col-start-2 text-3xl font-semibold text-center text-gray-800 md:text-left">
              {person.name}
            </h1>
          </div>
        </LayoutWrapper>
      </div>
      <LayoutWrapper>
        <div style={{ gridTemplateColumns: '14rem auto' }} className="relative md:grid gap-x-12">
          <div
            style={{ maxWidth: '230px' }}
            className="w-full mx-auto md:top-11 md:relative -mt-28"
          >
            <div className="overflow-hidden bg-blue-100 rounded-md shadow-xl aspect-w-2 aspect-h-3 lg:rounded lg:shadow-xl">
              <Image
                src={
                  profile_path
                    ? `${base_url}${profile_sizes[2]}${profile_path}`
                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                }
                alt={name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-start-2 mt-8 md:mt-6">
            <PersonIdentity person={person} />
            <p className="mt-3">
              {Object.keys(externalIds).map((socialMedia) => {
                if (!externalIds[socialMedia]) return;
                let url;
                if (socialMedia === 'IMDb') url = 'https://www.imdb.com/name';
                if (socialMedia === 'Twitter') url = 'https://www.twitter.com';
                if (socialMedia === 'Instagram') url = 'https://www.instagram.com';
                if (socialMedia === 'Facebook') url = 'https://www.facebook.com';
                return (
                  <a
                    className="mr-3 text-blue-500 hover:underline font-poppins"
                    href={`${url}/${externalIds[socialMedia]}`}
                    target="_blank"
                  >
                    {socialMedia}
                  </a>
                );
              })}
            </p>
            <div className="mt-4">
              <PersonBiography biography={biography} />
            </div>
          </div>
        </div>
        {movie_credits.length && (
          <div className="mt-12">
            {movie_credits.map(({ year, credits }) => {
              if (!credits.length) return;
              return (
                <section className="mt-10" key={year}>
                  <h2 className="text-2xl font-semibold text-gray-700 font-poppins">
                    {year || 'Others'}
                  </h2>
                  <div className="grid grid-cols-3 mx-auto mt-5 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 md:gap-6 lg:gap-8">
                    {credits.map(({ character, id, job, poster_path, title }) => (
                      <Link
                        key={id + (character || job)}
                        href={`/movie/${id}-${parseToDashedString(title)}`}
                      >
                        <a className="block cursor-pointer font-poppins group">
                          <div style={{ maxWidth: '185px' }}>
                            <div className="overflow-hidden bg-blue-100 rounded-md shadow-lg aspect-w-2 aspect-h-3 lg:rounded lg:shadow-xl">
                              <Image
                                src={
                                  poster_path
                                    ? `${base_url}${poster_sizes[2]}${poster_path}`
                                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                                }
                                alt={title}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          </div>
                          <p className="mt-2 font-semibold text-gray-800 transition-colors group-hover:text-blue-500 line-clamp-1">
                            {job || 'Actor'}
                            {character && (
                              <span className="text-sm text-gray-600 transition-colors group-hover:text-blue-400 font-raleway">
                                {' '}
                                {character}
                              </span>
                            )}
                          </p>
                          <p className="text-xs font-medium tracking-wide text-gray-500 transition-colors group-hover:text-blue-300">
                            {title}
                          </p>
                        </a>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </LayoutWrapper>
    </>
  );
};

export default PersonDetails;
