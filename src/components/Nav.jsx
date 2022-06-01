import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/outline";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Disclosure as='nav' className='bg-slate-700 shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex justify-between h-16'>
              <div className='flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src='/logo.svg'
                    alt='egoviz'
                  />
                  <img
                    className='hidden lg:block h-10 w-auto'
                    src='/logotext-sky.svg'
                    alt='Workflow'
                  />
                </div>
              </div>
              <div className='flex items-center justify-center py-2 text-2xl font-semibold text-sky-50'>
                <h1>Welcome, Adesh!</h1>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='bg-slate-700 p-1 rounded-full text-sky-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                  <LogoutIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
