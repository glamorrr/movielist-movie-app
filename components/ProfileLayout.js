import Head from 'next/head';
import Image from 'next/image';
import MobileNavbar from '@/components/MobileNavbar';
import ProfileNavbar from '@/components/ProfileNavbar';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import { useAuth } from '@/utils/auth';

const ProfileLayout = ({ children, imagesTMDbAPIConfiguration, page }) => {
  const { user } = useAuth();
  const { base_url, profile_sizes } = imagesTMDbAPIConfiguration;
  const imgSrc = user.avatar?.tmdb?.avatar_path
    ? `${base_url}${profile_sizes[2]}${user.avatar.tmdb.avatar_path}`
    : `https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}`;

  return (
    <>
      <Head>
        <title>My Profile &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="User profile." />
      </Head>
      <MobileNavbar />
      <LayoutWrapper>
        <div className="flex items-end pt-10 space-x-4 md:pt-20 md:space-x-6">
          <div className="w-24 rounded shadow-lg md:w-40">
            <div className="bg-blue-100 aspect-w-1 aspect-h-1">
              <Image src={imgSrc} alt="profile" layout="fill" objectFit="cover" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-wide text-gray-800 md:text-3xl font-poppins">
            {user.username}
          </h1>
        </div>
      </LayoutWrapper>
      <div className="py-3 mt-6 bg-white">
        <ProfileNavbar selected={page} />
      </div>
      {children}
      <LayoutWrapper>
        <Footer />
      </LayoutWrapper>
    </>
  );
};

export default ProfileLayout;
