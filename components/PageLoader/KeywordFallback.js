import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';

const KeywordFallback = () => {
  return (
    <>
      <Head>
        <title>MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-24 bg-white" />
        <LayoutWrapper>
          <div className="grid grid-cols-3 pb-12 mx-auto mt-8 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
            {new Array(10).fill().map((_) => {
              return (
                <div style={{ maxWidth: '185px' }}>
                  <div className="overflow-hidden bg-blue-100 rounded-md shadow-lg animate-pulse aspect-w-2 aspect-h-3 lg:rounded lg:shadow-xl"></div>
                </div>
              );
            })}
          </div>
        </LayoutWrapper>
      </main>
    </>
  );
};

export default KeywordFallback;
