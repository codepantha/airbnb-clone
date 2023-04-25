'use client';

import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

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
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips"
                  onClickHandler={() => {}}
                />
                <MenuItem 
                  label="My favorites"
                  onClickHandler={() => {}}
                />
                <MenuItem 
                  label="My reservations"
                  onClickHandler={() => {}}
                />
                <MenuItem 
                  label="My properties"
                  onClickHandler={() => {}}
                />
                <MenuItem 
                  label="Airbnb your home"
                  onClickHandler={() => {}}
                />
                <hr />
                <MenuItem 
                  label="Logout"
                  onClickHandler={signOut}
                />
              </>
            ) : (
              <>
                <MenuItem onClickHandler={loginModal.onOpen} label="Login" />
                <MenuItem
                  onClickHandler={registerModal.onOpen}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
