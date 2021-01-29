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
      <div className="md:hidden mt-8 p-5 flex font-poppins bg-white rounded shadow-sm overflow-x-scroll whitespace-nowrap">
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
      </div>
      {/* Desktop */}
      <div className="hidden flex-shrink-0 md:block mt-6 mr-8 lg:mr-10 w-56 font-poppins">
        <div className="p-5 bg-white rounded shadow-sm">
          {informations.map((info, i) => {
            if (!info.data) return;
            const isFirstItem = i === 0;
            return (
              <div key={info.title} className={isFirstItem ? undefined : 'mt-4'}>
                <h2 className="text-xs text-gray-400">{info.title}</h2>
                {Array.isArray(info.data) ? (
                  info.data.map((item) => (
                    <li key={item} className="list-none text-sm text-gray-700">
                      {item}
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-700">{info.data}</p>
                )}
              </div>
            );
          })}
        </div>
        {keywords.length > 0 && (
          <div className="mt-6">
            <h2 className="font-medium">Keywords</h2>
            {keywords.map((keyword, i) => {
              const isFirstItem = i === 0;
              return (
                <div
                  key={keyword.id}
                  className={(isFirstItem ? 'mt-3' : 'mt-4') + ' bg-white rounded shadow-sm'}
                >
                  <p className="p-2 text-sm text-gray-800">{keyword.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieInformation;
