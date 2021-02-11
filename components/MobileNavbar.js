import { useState } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { MdMenu, MdClose, MdExplore } from 'react-icons/md';
import Icon from '@/components/Icon';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animationDuration = 300;

  return (
    <>
      {/* Hamburger */}
      <div
        className={
          (isOpen ? 'hidden' : 'fixed') +
          ' z-50 p-2 bg-white rounded-lg shadow-lg cursor-pointer bottom-7 right-4'
        }
        onClick={() => setIsOpen(true)}
      >
        <Icon size="2.75rem" className="text-blue-400">
          <MdMenu />
        </Icon>
      </div>
      {/* Menus */}
      <CSSTransition unmountOnExit classNames="menu" timeout={animationDuration} in={isOpen}>
        <nav className="fixed z-40 grid items-center grid-cols-2 gap-4 px-6 py-4 text-blue-400 transition-all bg-white rounded-lg shadow-lg bottom-7 right-4 justify-items-center">
          <Link href="/browse">
            <a className="cursor-pointer">
              <Icon size="2rem" className="mx-auto">
                <MdExplore />
              </Icon>
              <p className="mt-1 text-xs font-semibold tracking-wider font-poppins">browse</p>
            </a>
          </Link>
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
