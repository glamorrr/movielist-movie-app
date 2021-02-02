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
        <div className="backdrop--shadow h-52 md:h-96 animate-pulse bg-blue-200" />
        <div className="-mt-28 md:-mt-36">
          <LayoutWrapper>
            <div
              style={{ maxWidth: '650px' }}
              className="relative z-10 mx-auto p-5 mt-14 md:mt-20 bg-white rounded"
            >
              <div className="w-full h-3 bg-blue-100 animate-pulse rounded" />
              <div className="mt-3 w-full h-3 bg-blue-100 animate-pulse rounded" />
              <div className="mt-3 w-full h-3 bg-blue-100 animate-pulse rounded" />
              <div className="mt-3 w-full h-3 bg-blue-100 animate-pulse rounded" />
              <div className="mt-3 w-full h-3 bg-blue-100 animate-pulse rounded" />
              <div className="mt-3 w-2/3 h-3 bg-blue-100 animate-pulse rounded" />
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
