import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';

const MovieImagesFallback = () => {
  return (
    <>
      <Head>
        <title>MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-blue-200 backdrop--shadow h-52 md:h-96 animate-pulse" />
        <LayoutWrapper>
          <div className="relative z-10 h-32 max-w-3xl mx-auto -mt-8 bg-white shadow-md" />
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

export default MovieImagesFallback;
