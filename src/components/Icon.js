import { IconContext } from 'react-icons';

const Icon = ({ children, size, className }) => {
  return <IconContext.Provider value={{ size, className }}>{children}</IconContext.Provider>;
};

export default Icon;
