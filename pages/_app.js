import Router from 'next/router';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';
import '@/styles/global.css';

// Page loading progress bar.
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen text-gray-900 bg-gray-100 font-raleway">
      <Component {...pageProps} />
    </div>
  );
}
