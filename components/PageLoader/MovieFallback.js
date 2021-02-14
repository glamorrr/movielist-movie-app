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
        <div className="bg-blue-200 backdrop--shadow h-52 md:h-96 animate-pulse" />
        <div className="pb-12 bg-white md:pb-0">
          <LayoutWrapper>
            <div style={{ gridTemplateColumns: '14rem auto' }} className="md:grid">
              <div className="relative justify-center -mb-12 bg-blue-100 rounded shadow-lg h-42 -top-28 w-28 md:w-56 md:h-84 md:shadow-xl animate-pulse" />
              <div className="hidden ml-8 md:block mt-7">
                <div className="h-10 bg-blue-100 w-52 animate-pulse" />
                <div className="w-full h-3 mt-6 bg-blue-100 rounded animate-pulse" />
                <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
                <div className="w-2/3 h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="w-40 h-10 -mt-20 bg-blue-100 md:hidden animate-pulse" />
          </LayoutWrapper>
        </div>
        <LayoutWrapper>
          <div className="p-5 mt-8 bg-white rounded md:hidden">
            <div className="w-full h-3 bg-blue-100 rounded animate-pulse" />
            <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
            <div className="w-2/3 h-3 mt-3 bg-blue-100 rounded animate-pulse" />
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
