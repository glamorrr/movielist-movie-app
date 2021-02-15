import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MdExpandMore } from 'react-icons/md';
import Icon from '@/components/Icon';

const Dropdown = ({ fontSize = 'text-2xl', buttonText, dropdownText, linkToPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const refButton = useRef(null);
  const refDropdown = useRef(null);

  /**
   * Handling click,
   * if user click outside button, dropdown closed.
   */
  const handleClick = (e) => {
    // toggle dropdown if user click button
    if (refButton.current.contains(e.target)) {
      setIsDropdownOpen((prev) => !prev);
      return;
    }

    // if user click user, dropdown will not close
    if (refDropdown.current.contains(e.target)) return;

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={fontSize + ' relative'}>
      <button
        ref={refButton}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className="px-3 py-2 font-semibold tracking-wide text-gray-600 bg-gray-200 rounded-md cursor-pointer font-poppins focus:outline-none"
        aria-expanded={isDropdownOpen}
        aria-controls="dropdown"
        aria-label="toggle movies trending time selector"
      >
        {buttonText}{' '}
        <Icon size="2.25rem" className="relative inline -ml-1 text-gray-400">
          <MdExpandMore />
        </Icon>
      </button>
      <div
        ref={refDropdown}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className={
          (isDropdownOpen ? 'scale-y-100' : 'scale-y-0') +
          ' absolute z-10 shadow-lg -bottom-16 left-0 px-4 py-2 font-poppins font-medium text-2xl text-gray-600 bg-white rounded-md transform transition-transform origin-top'
        }
        id="dropdown"
      >
        <Link href={linkToPage}>
          <a>{dropdownText}</a>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
