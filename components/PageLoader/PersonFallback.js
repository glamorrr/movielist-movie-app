import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';

const PersonFallback = () => {
  return (
    <>
      <Head>
        <title>MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-white h-49 md:h-29" />
        <LayoutWrapper>
          <div style={{ gridTemplateColumns: '14rem auto' }} className="md:grid gap-x-12">
            <div className="mx-auto md:mx-0" style={{ maxWidth: '230px' }}>
              <div className="bg-blue-100 rounded shadow-lg -mt-28 md:-mt-18 aspect-w-2 aspect-h-3 md:shadow-xl animate-pulse" />
            </div>
            <div className="mt-8 md:mt-6">
              <div className="w-full h-3 mt-6 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-2/3 h-3 mt-3 bg-blue-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="pb-16 mt-20">
            <div className="grid grid-cols-3 mx-auto sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-7 md:gap-8 lg:gap-11">
              {new Array(7).fill().map((_, i) => {
                return (
                  <div key={i} style={{ maxWidth: '185px' }}>
                    <div className="overflow-hidden bg-blue-100 rounded-md shadow-lg animate-pulse aspect-w-2 aspect-h-3 lg:rounded lg:shadow-xl" />
                  </div>
                );
              })}
            </div>
          </div>
        </LayoutWrapper>
      </main>
    </>
  );
};

export default PersonFallback;
