import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, ReactNode } from 'react';

interface IModal {
  children: ReactNode | string;
  title: string;
  footer?: ReactNode;
  onClose: () => void;
  open?: boolean;
}

export const Modal: FC<IModal> = ({
  children,
  title,
  footer,
  onClose,
  open = false,
}) => {
  if (!open) return <></>;
  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full flex bg-gray-800 bg-opacity-75'>
        <div className='absolute w-full h-full top-0' onClick={onClose}></div>
        <div className='relative w-full h-full max-w-2xl md:h-auto m-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                {title}
              </h3>
              <button
                type='button'
                onClick={onClose}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <FontAwesomeIcon icon={faXmark} className='w-5 h-5' />
              </button>
            </div>
            <div className='p-6 space-y-6'>{children}</div>
            {footer && (
              <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
