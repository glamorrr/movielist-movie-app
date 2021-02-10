import Link from 'next/link';
import parseToDashedString from '@/utils/parseToDashedString';

const MovieInformation = ({ movie }) => {
  const {
    status,
    release_date,
    runtime,
    genres,
    vote_average,
    original_title,
    production_companies,
    budget,
    revenue,
    director,
    keywords: { keywords },
  } = movie;

  const informations = [
    { title: 'Status', data: status },
    { title: 'Release Date', data: release_date },
    { title: 'Runtime', data: runtime },
    { title: 'Genres', data: genres.length ? genres.map((genre) => genre.name) : null },
    { title: 'User Score', data: vote_average },
    { title: 'Original Title', data: original_title },
    {
      title: 'Production Companies',
      data: production_companies.length
        ? production_companies.map((company) => company.name)
        : null,
    },
    {
      title: 'Director',
      data: director,
    },
    { title: 'Budget', data: budget },
    { title: 'Revenue', data: revenue },
  ];

  return (
    <>
      {/* Mobile */}
      <section
        style={{ WebkitOverflowScrolling: 'touch' }}
        className="flex p-5 mt-8 overflow-x-scroll bg-white rounded shadow-sm md:hidden font-poppins whitespace-nowrap"
      >
        {informations.map((info) => {
          if (!info.data) return;
          return (
            <div key={info.title} className="pr-7">
              <h2 className="text-sm text-gray-400">{info.title}</h2>
              <p className="text-gray-700">
                {Array.isArray(info.data) ? info.data.join(', ') : info.data}
              </p>
            </div>
          );
        })}
      </section>
      {/* Desktop */}
      <div className="flex-shrink-0 hidden w-56 mt-6 mr-8 md:block lg:mr-10 font-poppins">
        <section className="p-5 bg-white rounded shadow-sm">
          {informations.map((info, i) => {
            if (!info.data) return;
            const isFirstItem = i === 0;
            return (
              <div key={info.title} className={isFirstItem ? undefined : 'mt-4'}>
                <h2 className="text-xs text-gray-400">{info.title}</h2>

                {Array.isArray(info.data) ? (
                  <ul>
                    {info.data.map((item) => (
                      <li key={item} className="text-sm text-gray-700 list-none">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-700">{info.data}</p>
                )}
              </div>
            );
          })}
        </section>
        {keywords.length > 0 && (
          <section className="mt-6">
            <h2 className="font-medium">Keywords</h2>
            {keywords.map((keyword, i) => {
              const isFirstItem = i === 0;
              return (
                <div
                  key={keyword.id}
                  className={(isFirstItem ? 'mt-3' : 'mt-4') + ' bg-white rounded shadow-sm'}
                >
                  <Link href={`/keyword/${keyword.id}-${parseToDashedString(keyword.name)}`}>
                    <a className="block p-2 text-sm text-gray-800 transition-colors hover:text-blue-500">
                      {keyword.name}
                    </a>
                  </Link>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default MovieInformation;
