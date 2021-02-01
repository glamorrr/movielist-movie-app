import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';

const MovieFallback = () => {
  return (
    <>
      <Head>
        <title>MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="backdrop--shadow h-52 md:h-96 animate-pulse bg-blue-200" />
        <div className="pb-12 md:pb-0 bg-white">
          <LayoutWrapper>
            <div style={{ gridTemplateColumns: '14rem auto' }} className="md:grid">
              <div className="relative -top-28 -mb-12 w-28 md:w-56 h-40 md:h-80 justify-center bg-blue-100 rounded shadow-lg md:shadow-xl animate-pulse" />
              <div className="hidden md:block mt-7 ml-8">
                <div className="w-52 h-10 bg-blue-100 animate-pulse" />
                <div className="mt-6 w-full h-3 bg-blue-100 animate-pulse rounded" />
                <div className="mt-3 w-full h-3 bg-blue-100 animate-pulse rounded" />
                <div className="mt-3 w-2/3 h-3 bg-blue-100 animate-pulse rounded" />
              </div>
            </div>
            <div className="md:hidden -mt-20 w-40 h-10 bg-blue-100 animate-pulse" />
          </LayoutWrapper>
        </div>
        <LayoutWrapper>
          <div className="md:hidden p-5 mt-8 bg-white rounded">
            <div className="w-full h-3 bg-blue-100 animate-pulse rounded" />
            <div className="mt-3 w-full h-3 bg-blue-100 animate-pulse rounded" />
            <div className="mt-3 w-2/3 h-3 bg-blue-100 animate-pulse rounded" />
          </div>
        </LayoutWrapper>
      </main>

      <style jsx>{`
        .backdrop--shadow {
          background-image: linear-gradient(180deg, rgba(6, 13, 34, 0) 30%, rgba(6, 13, 34, 0.25));
        }
      `}</style>
    </>
  );
};

export default MovieFallback;
