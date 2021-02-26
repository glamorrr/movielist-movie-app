import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';

const ProfileFallback = () => {
  return (
    <>
      <Head>
        <title>My Profile &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="User profile." />
      </Head>
      <LayoutWrapper>
        <div className="flex items-end pt-10 space-x-4 md:pt-20 md:space-x-6">
          <div className="w-24 rounded shadow-lg md:w-40">
            <div className="w-full bg-blue-100 aspect-w-1 aspect-h-1 animate-pulse" />
          </div>
          <div className="w-48 h-8 bg-blue-100 md:h-9 md:w-64 animate-pulse" />
        </div>
      </LayoutWrapper>
      <div className="h-12 mt-6 bg-white" />
    </>
  );
};

export default ProfileFallback;
