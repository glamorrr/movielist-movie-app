import cookie from 'cookie';

/**
 * Parse cookies string to objects.
 * Cookie.parse must read a string,
 * if not, it will break.
 * @param {object} req - Request to server.
 * @return {object} - Cookies object.
 */
const parseCookies = (req) => {
  return cookie.parse(req.headers.cookie || '');
};

export default parseCookies;
