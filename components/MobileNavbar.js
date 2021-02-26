import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { MdMenu, MdClose, MdExplore, MdPerson } from 'react-icons/md';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import Icon from '@/components/Icon';
import { useAuth } from '@/utils/auth';

const MobileNavbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
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
        <nav
          className={
            (user ? 'grid-cols-2 gap-x-6 gap-y-4' : 'grid-cols-3 gap-4') +
            ' fixed z-40 grid items-center px-6 py-4 text-xs text-blue-400 bg-white rounded-lg shadow-lg justify-items-center font-poppins bottom-7 right-4'
          }
        >
          {user ? (
            <button
              type="button"
              className="cursor-pointer focus:outline-none"
              onClick={async () => {
                setIsOpen(false);
                await logout();
                router.push('/browse');
              }}
            >
              <Icon size="2rem" className="mx-auto">
                <BiLogOut />
              </Icon>
              <p className="mt-1 font-semibold tracking-wider">log out</p>
            </button>
          ) : (
            <Link href="/login">
              <a
                onClick={() => sessionStorage.removeItem('urlBeforeLogin')}
                className="cursor-pointer"
              >
                <Icon size="2rem" className="mx-auto">
                  <BiLogIn />
                </Icon>
                <p className="mt-1 font-semibold tracking-wider">log in</p>
              </a>
            </Link>
          )}
          {user && (
            <Link href="/profile/favorites">
              <a className="cursor-pointer">
                <Icon size="2rem" className="mx-auto">
                  <MdPerson />
                </Icon>
                <p className="mt-1 font-semibold tracking-wider">profile</p>
              </a>
            </Link>
          )}
          <Link href="/browse">
            <a className="cursor-pointer">
              <Icon size="2rem" className="mx-auto">
                <MdExplore />
              </Icon>
              <p className="mt-1 font-semibold tracking-wider">browse</p>
            </a>
          </Link>
          <button type="button" onClick={() => setIsOpen(false)} className="focus:outline-none">
            <Icon size="1.75rem" className="cursor-pointer">
              <MdClose />
            </Icon>
          </button>
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
