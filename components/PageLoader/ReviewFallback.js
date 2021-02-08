import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';

const ReviewFallback = () => {
  return (
    <>
      <Head>
        <title>MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-blue-200 backdrop--shadow h-52 md:h-96 animate-pulse" />
        <div className="-mt-28 md:-mt-36">
          <LayoutWrapper>
            <div
              style={{ maxWidth: '650px' }}
              className="relative z-10 p-5 mx-auto bg-white rounded mt-14 md:mt-20"
            >
              <div className="w-full h-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-full h-3 mt-3 bg-blue-100 rounded animate-pulse" />
              <div className="w-2/3 h-3 mt-3 bg-blue-100 rounded animate-pulse" />
            </div>
          </LayoutWrapper>
        </div>
      </main>

      <style jsx>{`
        .backdrop--shadow {
          background-image: linear-gradient(180deg, rgba(6, 13, 34, 0) 10%, rgba(6, 13, 34, 0.4));
        }
      `}</style>
    </>
  );
};

export default ReviewFallback;
