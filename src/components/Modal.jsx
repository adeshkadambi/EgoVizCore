import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { adls } from "../data/adls";

const Modal = (props) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full sm:p-6'>
                <div>
                  <div className='mt-2'>
                    <Dialog.Title
                      as='h3'
                      className='text-xl leading-6 font-bold text-center text-slate-900 mb-4'>
                      ADL and IADL Categories
                    </Dialog.Title>

                    {adls.map((adl) => (
                      <div className='mb-2 mt-2 text-sm text-slate-500 text-left'>
                        <p className='text-base font-semibold text-slate-600'>{adl.name}</p>
                        <p className='text-sm font-normal'>{adl.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-400 text-base font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm'
                    onClick={() => props.setOpen(false)}>
                    Back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
