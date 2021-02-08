const Footer = () => {
  return (
    <footer className="py-8 mt-4 font-light text-gray-500 md:mt-10 md:flex md:justify-between font-poppins">
      <p>MovieList &copy; 2020</p>
      <p className="mt-2 md:m-0">
        This product uses the{' '}
        <a
          href="https://www.themoviedb.org/"
          className="text-blue-300 underline transition-colors hover:text-blue-400"
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
