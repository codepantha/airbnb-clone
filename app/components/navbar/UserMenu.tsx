'use client';

import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="userMenu">
        <div onClick={onRent} className="userMenu__left">
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className="userMenu__right">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
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
                <MenuItem label="My trips" onClickHandler={() => {router.push('/trips')}} />
                <MenuItem label="My favorites" onClickHandler={() => {}} />
                <MenuItem label="My reservations" onClickHandler={() => {router.push('/reservations')}} />
                <MenuItem label="My properties" onClickHandler={() => {}} />
                <MenuItem label="Airbnb your home" onClickHandler={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClickHandler={signOut} />
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
