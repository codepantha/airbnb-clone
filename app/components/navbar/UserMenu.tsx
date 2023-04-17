'use client';

import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  return (
    <div className="relative">
      <div className="userMenu">
        <div onClick={() => {}} className="userMenu__left">
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className="userMenu__right">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white
            overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClickHandler={() => {}} label="Login" />
              <MenuItem onClickHandler={() => {}} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
