import Router from 'next/router';
import NProgress from 'nprogress/nprogress';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/utils/auth';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/global.css';

// Page loading progress bar.
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  const contextClass = {
    success: 'bg-green-400',
  };

  return (
    <div className="min-h-screen text-gray-900 bg-gray-100 font-raleway">
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || 'default'] +
          ' mt-5 flex p-3 rounded-md justify-between cursor-pointer'
        }
        bodyClassName={() => 'p-1 font-white font-semibold'}
      />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
