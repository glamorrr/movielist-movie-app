import { useState } from 'react';
import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';
import { MdMenu, MdClose, MdExplore } from 'react-icons/md';
import Icon from '@/components/Icon';

const MobileNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const animationDuration = 300;

  return (
    <>
      {/* Hamburger */}
      <div
        className={
          (isOpen ? 'hidden' : 'fixed') +
          ' z-50 bottom-7 right-4 p-2 bg-white rounded-lg shadow-lg cursor-pointer'
        }
        onClick={() => setIsOpen(true)}
      >
        <Icon size="2.75rem" className="text-blue-400">
          <MdMenu />
        </Icon>
      </div>
      {/* Menus */}
      <CSSTransition unmountOnExit classNames="menu" timeout={animationDuration} in={isOpen}>
        <nav className="fixed z-40 bottom-7 py-4 px-6 right-4 grid grid-cols-2 gap-4 justify-items-center items-center text-blue-400 bg-white rounded-lg shadow-lg transition-all">
          <div
            className="cursor-pointer"
            onClick={() => router.push('/browse').then(() => window.scrollTo(0, 0))}
          >
            <Icon size="2rem" className="mx-auto">
              <MdExplore />
            </Icon>
            <p className="mt-1 font-poppins font-semibold text-xs tracking-wider">browse</p>
          </div>
          <div onClick={() => setIsOpen(false)}>
            <Icon size="1.75rem" className="cursor-pointer">
              <MdClose />
            </Icon>
          </div>
        </nav>
      </CSSTransition>

      <style jsx>{`
        .menu-enter {
          transform: scale(0.8);
          opacity: 0;
        }

        .menu-enter-active {
          transform: scale(1);
          opacity: 1;
          transition: transform ${animationDuration}ms ease-in-out,
            opacity ${animationDuration - 100}ms ease-in-out;
        }

        .menu-exit {
          transform: scale(0);
          transition: transform 0ms;
        }
      `}</style>
    </>
  );
};

export default MobileNavbar;
