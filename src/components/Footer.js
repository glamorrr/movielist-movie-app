const Footer = () => {
  return (
    <footer className="mt-4 md:mt-10 py-8 md:flex md:justify-between font-poppins font-light text-gray-500">
      <p>MovieList &copy; 2020</p>
      <p className="mt-2 md:m-0">
        This product uses the{' '}
        <a
          href="https://www.themoviedb.org/"
          className="text-blue-300 hover:text-blue-400 underline transition-colors"
          target="_blank"
        >
          TMDb API
        </a>{' '}
        but is not endorsed or certified by TMDb.
      </p>
    </footer>
  );
};

export default Footer;
