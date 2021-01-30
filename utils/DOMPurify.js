/**
 * Server side DOMPurify
 * Read more on documentation.
 */
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export default DOMPurify;
